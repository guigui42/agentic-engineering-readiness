import { describe, expect, it } from 'vitest'
import { assessmentQuestions, sources } from './questions'
import {
  buildActionPlan,
  exportAssessmentMarkdown,
} from './recommendations'
import { calculateAssessment } from './scoring'
import type { Answers, ResponseValue } from './types'

function answersFor(
  values: Partial<Record<'governance' | 'knowledge' | 'adoption' | 'value', ResponseValue>>,
): Answers {
  return Object.fromEntries(
    assessmentQuestions
      .filter((question) => values[question.dimension as keyof typeof values] !== undefined)
      .map((question) => [
        question.id,
        values[question.dimension as keyof typeof values],
      ]),
  )
}

describe('AES assessment content', () => {
  it('keeps question and source identifiers unique and valid', () => {
    const sourceIds = new Set(sources.map((source) => source.id))

    expect(sourceIds.size).toBe(sources.length)
    expect(new Set(assessmentQuestions.map((question) => question.id)).size)
      .toBe(assessmentQuestions.length)

    for (const question of assessmentQuestions) {
      expect(question.sourceIds.length).toBeGreaterThan(0)
      for (const sourceId of question.sourceIds) {
        expect(sourceIds.has(sourceId)).toBe(true)
      }
    }
  })

  it('publishes only public HTTPS sources', () => {
    for (const source of sources) {
      expect(source.url).toMatch(/^https:\/\//)
      expect(source.url).not.toContain('seismic')
      expect(source.url).not.toContain('stafftools')
    }
  })

  it.each([
    [3, 3, 3, 'healthy'],
    [3, 3, 0, 'underused'],
    [1, 1, 3, 'stretched'],
    [1, 1, 1, 'underdeveloped'],
  ] as const)(
    'maps governance %s, knowledge %s, and adoption %s to %s',
    (governance, knowledge, adoption, expected) => {
      const result = calculateAssessment(
        answersFor({ governance, knowledge, adoption }),
      )
      expect(result.quadrant?.id).toBe(expected)
    },
  )

  it('does not classify an incomplete core assessment', () => {
    const result = calculateAssessment(answersFor({ governance: 3 }))
    expect(result.quadrant).toBeNull()
    expect(result.coreComplete).toBe(false)
  })

  it('prioritizes missing preconditions before foundation work', () => {
    const answers = {
      ...answersFor({ governance: 1, knowledge: 1, adoption: 3 }),
      'precondition-infrastructure': 0 as const,
    }
    const result = calculateAssessment(answers)
    const plan = buildActionPlan(answers, result)

    expect(plan[0]).toMatchObject({
      phase: 'do-first',
      title: 'Narrow agent scope while repairing foundations',
    })
    expect(plan[1]).toMatchObject({
      phase: 'do-first',
      title: 'Stabilize the delivery foundation',
    })
  })

  it('exports deterministic Markdown with public source links', () => {
    const answers = answersFor({
      governance: 1,
      knowledge: 1,
      adoption: 1,
      value: 1,
    })
    const result = calculateAssessment(answers)
    const plan = buildActionPlan(answers, result)
    const markdown = exportAssessmentMarkdown(result, plan)

    expect(markdown).toContain('Underdeveloped foundations')
    expect(markdown).toContain('## Prioritized action plan')
    expect(markdown).toContain('https://github.com/resources/insights/agentic-engineering-system')
    expect(markdown).not.toContain('seismic')
  })
})
