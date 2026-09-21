import { assessmentQuestions, dimensionContent } from './questions'
import type {
  Answers,
  AssessmentResult,
  DimensionScore,
  Quadrant,
  QuadrantId,
  ResponseValue,
  ScoredDimension,
} from './types'

export const responseOptions: Array<{
  value: ResponseValue
  label: string
  shortLabel: string
}> = [
  { value: 0, label: 'Not in place', shortLabel: 'Not in place' },
  { value: 1, label: 'Partially in place', shortLabel: 'Partial' },
  { value: 2, label: 'Established', shortLabel: 'Established' },
  { value: 3, label: 'Measured and improving', shortLabel: 'Improving' },
]

export const scoredDimensions: ScoredDimension[] = [
  'governance',
  'knowledge',
  'adoption',
  'value',
]

export const quadrants: Record<QuadrantId, Quadrant> = {
  underdeveloped: {
    id: 'underdeveloped',
    label: 'Underdeveloped foundations',
    summary:
      'Governance and shared knowledge do not yet support broader delegation reliably.',
    nextMove:
      'Strengthen shared knowledge and governance before expanding agent use.',
  },
  underused: {
    id: 'underused',
    label: 'Healthy but underused',
    summary:
      'The foundations can support more delegation than the current workflows use.',
    nextMove:
      'Expand agent participation in small, well-bounded tasks first.',
  },
  stretched: {
    id: 'stretched',
    label: 'Stretched agent-native system',
    summary:
      'Agent participation has expanded faster than governance and shared knowledge.',
    nextMove:
      'Slow expansion, narrow agent scope, and repair the missing foundations.',
  },
  healthy: {
    id: 'healthy',
    label: 'Healthy agent-native system',
    summary:
      'Strong foundations support broader, risk-aligned agent participation.',
    nextMove:
      'Stay the course and expand to the next safe class of work.',
  },
}

function getDimensionScore(
  answers: Answers,
  dimension: ScoredDimension,
): DimensionScore {
  const questions = assessmentQuestions.filter(
    (question) => question.dimension === dimension,
  )
  const answeredQuestions = questions.filter(
    (question) => answers[question.id] !== undefined,
  )

  if (answeredQuestions.length === 0) {
    return {
      id: dimension,
      label: dimensionContent[dimension].label,
      answered: 0,
      total: questions.length,
      score: null,
    }
  }

  const earned = answeredQuestions.reduce(
    (total, question) =>
      total + (answers[question.id] ?? 0) * question.weight,
    0,
  )
  const available = answeredQuestions.reduce(
    (total, question) => total + 3 * question.weight,
    0,
  )

  return {
    id: dimension,
    label: dimensionContent[dimension].label,
    answered: answeredQuestions.length,
    total: questions.length,
    score: Math.round((earned / available) * 100),
  }
}

export function calculateAssessment(answers: Answers): AssessmentResult {
  const dimensions = Object.fromEntries(
    scoredDimensions.map((dimension) => [
      dimension,
      getDimensionScore(answers, dimension),
    ]),
  ) as Record<ScoredDimension, DimensionScore>

  const answered = assessmentQuestions.filter(
    (question) => answers[question.id] !== undefined,
  ).length
  const coreQuestions = assessmentQuestions.filter((question) =>
    ['governance', 'knowledge', 'adoption'].includes(question.dimension),
  )
  const coreComplete = coreQuestions.every(
    (question) => answers[question.id] !== undefined,
  )
  const complete = answered === assessmentQuestions.length

  const governance = dimensions.governance.score
  const knowledge = dimensions.knowledge.score
  const adoption = dimensions.adoption.score
  const foundationsScore =
    governance === null || knowledge === null
      ? null
      : Math.round((governance + knowledge) / 2)

  let quadrant: Quadrant | null = null
  if (coreComplete && foundationsScore !== null && adoption !== null) {
    const strongFoundations = foundationsScore >= 67
    const expandedAdoption = adoption >= 50
    const quadrantId: QuadrantId = strongFoundations
      ? expandedAdoption
        ? 'healthy'
        : 'underused'
      : expandedAdoption
        ? 'stretched'
        : 'underdeveloped'
    quadrant = quadrants[quadrantId]
  }

  const missingPreconditions = assessmentQuestions.filter(
    (question) =>
      question.dimension === 'preconditions' &&
      answers[question.id] !== undefined &&
      (answers[question.id] ?? 0) < 2,
  )

  return {
    dimensions,
    foundationsScore,
    quadrant,
    answered,
    total: assessmentQuestions.length,
    coreComplete,
    complete,
    missingPreconditions,
  }
}
