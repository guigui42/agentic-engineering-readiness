import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { githubImplementations } from './githubActions'
import { assessmentQuestions, sources } from './questions'
import {
  buildActionPlan,
  exportAssessmentMarkdown,
} from './recommendations'
import { calculateAssessment } from './scoring'
import type { Answers, AssessmentDimension, ResponseValue } from './types'

function answersFor(
  values: Partial<Record<AssessmentDimension, ResponseValue>>,
): Answers {
  return Object.fromEntries(
    assessmentQuestions
      .filter((question) => values[question.dimension] !== undefined)
      .map((question) => [question.id, values[question.dimension]]),
  )
}

function placementAnswers({
  governance,
  knowledge,
  adoption,
}: {
  governance: ResponseValue
  knowledge: ResponseValue
  adoption: ResponseValue
}) {
  return answersFor({
    preconditions: 2,
    governance,
    knowledge,
    adoption,
  })
}

describe('AES readiness content', () => {
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

  it('publishes only approved public source hosts', () => {
    const allowedHosts = new Set([
      'docs.github.com',
      'github.com',
      'github.blog',
      'learn.github.com',
    ])

    for (const source of sources) {
      const url = new URL(source.url)
      expect(url.protocol).toBe('https:')
      expect(allowedHosts.has(url.hostname)).toBe(true)
    }
  })

  it('keeps non-public provenance, telemetry, and design notes out of public text', () => {
    const files = [
      'README.md',
      'PRODUCT.md',
      'DESIGN.md',
      'index.html',
      '.github/copilot-instructions.md',
      '.github/workflows/weekly-content-validation.md',
    ]
    const forbiddenFragments = [
      ['S', 'e', 'i', 's', 'm', 'i', 'c'].join(''),
      ['S', 'l', 'a', 'c', 'k'].join(''),
      ['c', 'o', 'l', 'l', 'e', 'c', 't', 'o', 'r', '.', 'g', 'i', 't', 'h', 'u', 'b', 'a', 'p', 'p', '.', 'c', 'o', 'm'].join(''),
      ['T', 'H', 'E', 'S', 'I', 'S', ':'].join(''),
      ['O', 'W', 'N', '-', 'W', 'O', 'R', 'L', 'D', ':'].join(''),
    ]

    for (const file of files) {
      const content = readFileSync(resolve(process.cwd(), file), 'utf8')
      for (const fragment of forbiddenFragments) {
        expect(content).not.toContain(fragment)
      }
    }
  })

  it('grounds every question in an implementation or operating-model guide', () => {
    expect(Object.keys(githubImplementations).sort()).toEqual(
      assessmentQuestions.map((question) => question.id).sort(),
    )

    for (const implementation of Object.values(githubImplementations)) {
      expect(['github', 'operating-model']).toContain(implementation.kind)
      expect(implementation.surface.length).toBeGreaterThan(10)
      expect(implementation.steps.length).toBeGreaterThanOrEqual(2)
      expect(implementation.verification.length).toBeGreaterThan(0)
    }
  })

  it.each([
    [3, 3, 2, 'healthy'],
    [3, 3, 1, 'underused'],
    [1, 1, 2, 'stretched'],
    [1, 1, 0, 'underdeveloped'],
  ] as const)(
    'maps governance %s, knowledge %s, and participation %s to %s',
    (governance, knowledge, adoption, expected) => {
      const result = calculateAssessment(
        placementAnswers({ governance, knowledge, adoption }),
        'Payments bug fixes',
      )
      expect(result.quadrant?.id).toBe(expected)
    },
  )

  it('uses the weaker foundation instead of averaging away a gap', () => {
    const result = calculateAssessment(
      placementAnswers({ governance: 3, knowledge: 1, adoption: 1 }),
      'Payments bug fixes',
    )

    expect(result.dimensions.governance.score).toBe(100)
    expect(result.dimensions.knowledge.score).toBe(30)
    expect(result.dimensions.knowledge.band).toBe('Emerging')
    expect(result.foundationsScore).toBe(30)
    expect(result.quadrant?.id).toBe('underdeveloped')
  })

  it('records the actual lifecycle activities where agents perform', () => {
    const result = calculateAssessment(
      {
        ...placementAnswers({
          governance: 2,
          knowledge: 2,
          adoption: 0,
        }),
        'adoption-detect': 2,
      },
      'Payments bug fixes',
    )

    expect(result.adoption.activities).toEqual({
      define: 0,
      deliver: 0,
      detect: 2,
    })
    expect(result.adoption.performerActivities).toBe(1)
    expect(result.adoption.label).toBe('Assisted')
  })

  it('blocks placement until scope and preconditions are ready', () => {
    const answers = placementAnswers({
      governance: 3,
      knowledge: 3,
      adoption: 2,
    })

    expect(calculateAssessment(answers).placementStatus).toBe('scope-required')

    const blocked = {
      ...answers,
      'precondition-infrastructure': 1 as const,
    }
    const result = calculateAssessment(blocked, 'Payments bug fixes')
    expect(result.placementStatus).toBe('preconditions-required')
    expect(result.quadrant).toBeNull()
  })

  it('does not render partial dimension answers as a percentage', () => {
    const result = calculateAssessment(
      { 'governance-scope': 3 },
      'Payments bug fixes',
    )
    expect(result.dimensions.governance.score).toBeNull()
    expect(result.dimensions.governance.band).toBe('Not scored')
  })

  it('suppresses expansion actions when foundations are underdeveloped', () => {
    const answers = placementAnswers({
      governance: 1,
      knowledge: 1,
      adoption: 0,
    })
    const result = calculateAssessment(answers, 'Payments bug fixes')
    const plan = buildActionPlan(answers, result)

    expect(plan[0]).toMatchObject({
      primary: true,
      title: 'Strengthen the weaker foundation before delegation expands',
    })
    expect(
      plan.some((action) => action.questionId?.startsWith('adoption-')),
    ).toBe(false)
  })

  it('pins the quadrant action ahead of question actions', () => {
    const answers = {
      ...placementAnswers({
        governance: 1,
        knowledge: 1,
        adoption: 2,
      }),
      'precondition-infrastructure': 2 as const,
      'precondition-skills': 2 as const,
      'precondition-culture': 2 as const,
      'precondition-access': 2 as const,
    }
    const result = calculateAssessment(answers, 'Payments bug fixes')
    const plan = buildActionPlan(answers, result)
    expect(plan[0].primary).toBe(true)
    expect(plan[0].title).toBe(
      'Narrow agent participation while foundations recover',
    )
  })

  it('exports scope, caveats, preconditions, and implementation evidence', () => {
    const answers = {
      ...placementAnswers({
        governance: 1,
        knowledge: 1,
        adoption: 1,
      }),
      'precondition-infrastructure': 0 as const,
    }
    const result = calculateAssessment(answers, 'Payments bug fixes')
    const plan = buildActionPlan(answers, result)
    const markdown = exportAssessmentMarkdown(
      'Payments bug fixes',
      result,
      plan,
    )

    expect(markdown).toContain('Independent, unofficial resource')
    expect(markdown).toContain('Scope: Payments bug fixes')
    expect(markdown).toContain('Preconditions needing attention')
    expect(markdown).toContain('GitHub surface:')
    expect(markdown).toContain('Implement:')
    expect(markdown).toContain('Verify:')
    expect(markdown).not.toMatch(/Customer value:.*%/)
    expect(markdown).not.toMatch(/System learning:.*%/)
  })
})
