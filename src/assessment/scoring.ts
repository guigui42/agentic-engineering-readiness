import { assessmentQuestions, dimensionContent } from './questions'
import type {
  AdoptionPosition,
  Answers,
  AssessmentResult,
  DimensionScore,
  Quadrant,
  QuadrantId,
  ResponseValue,
  ScoredDimension,
} from './types'

export const readinessOptions: Array<{
  value: ResponseValue
  label: string
  shortLabel: string
}> = [
  { value: 0, label: 'Not present', shortLabel: 'Not present' },
  { value: 1, label: 'Partially present', shortLabel: 'Partial' },
  { value: 2, label: 'Established', shortLabel: 'Established' },
  { value: 3, label: 'Measured and improving', shortLabel: 'Improving' },
]

export const participationOptions: Array<{
  value: ResponseValue
  label: string
  shortLabel: string
}> = [
  { value: 0, label: 'No agent participation', shortLabel: 'None' },
  { value: 1, label: 'Agent assists', shortLabel: 'Assists' },
  { value: 2, label: 'Agent performs', shortLabel: 'Performs' },
  {
    value: 3,
    label: 'Agent performs and assesses',
    shortLabel: 'Performs + assesses',
  },
]

export const scoredDimensions: ScoredDimension[] = [
  'governance',
  'knowledge',
  'value',
  'learning',
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
      'The foundations can support more delegation than the current workflow uses.',
    nextMove:
      'Expand agent participation in one small, well-bounded task class.',
  },
  stretched: {
    id: 'stretched',
    label: 'Stretched agent-native system',
    summary:
      'Agent participation has expanded faster than governance and shared knowledge.',
    nextMove:
      'Narrow agent scope and repair the weaker foundation before expansion.',
  },
  healthy: {
    id: 'healthy',
    label: 'Healthy agent-native system',
    summary:
      'Both foundations support broader, risk-aligned agent participation.',
    nextMove:
      'Expand one bounded workflow at a time and keep outcome evidence visible.',
  },
}

function snapToFiveWithinBand(value: number) {
  return Math.floor(value / 5) * 5
}

function bandForScore(score: number | null): DimensionScore['band'] {
  if (score === null) {
    return 'Not scored'
  }
  if (score < 35) {
    return 'Emerging'
  }
  if (score < 65) {
    return 'Developing'
  }
  if (score < 85) {
    return 'Established'
  }
  return 'Strong'
}

function getDimensionScore(
  answers: Answers,
  dimension: ScoredDimension,
): DimensionScore {
  const questions = assessmentQuestions.filter(
    (question) => question.dimension === dimension,
  )
  const answered = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length
  const complete = answered === questions.length
  const rawScore = complete
    ? (questions.reduce(
        (total, question) => total + (answers[question.id] ?? 0),
        0,
      ) /
        (questions.length * 3)) *
      100
    : null
  const score =
    rawScore === null ? null : snapToFiveWithinBand(rawScore)

  return {
    id: dimension,
    label: dimensionContent[dimension].label,
    answered,
    total: questions.length,
    score,
    band: bandForScore(rawScore),
  }
}

function getAdoptionPosition(answers: Answers): AdoptionPosition {
  const questions = assessmentQuestions.filter(
    (question) => question.dimension === 'adoption',
  )
  const values = questions
    .map((question) => answers[question.id])
    .filter((value): value is ResponseValue => value !== undefined)
  const performerActivities = values.filter((value) => value >= 2).length
  const activities = {
    define: answers['adoption-define'] ?? null,
    deliver: answers['adoption-deliver'] ?? null,
    detect: answers['adoption-detect'] ?? null,
  }

  if (values.length < questions.length) {
    return {
      answered: values.length,
      total: questions.length,
      performerActivities,
      activities,
      label: 'Not positioned',
      description:
        'Answer define, deliver, and detect to position agent participation.',
    }
  }

  if (values.every((value) => value === 0)) {
    return {
      answered: values.length,
      total: questions.length,
      performerActivities,
      activities,
      label: 'Narrow',
      description: 'The scoped workflow currently remains human-performed.',
    }
  }

  if (performerActivities < 2) {
    return {
      answered: values.length,
      total: questions.length,
      performerActivities,
      activities,
      label: 'Assisted',
      description:
        'Agents assist the workflow or perform in only one lifecycle activity.',
    }
  }

  if (performerActivities === 2) {
    return {
      answered: values.length,
      total: questions.length,
      performerActivities,
      activities,
      label: 'Broad',
      description:
        'Agents perform work in two of define, deliver, and detect.',
    }
  }

  return {
    answered: values.length,
    total: questions.length,
    performerActivities,
    activities,
    label: 'Embedded',
    description:
      'Agents perform work across define, deliver, and detect for this workflow.',
  }
}

function getFoundationSteps(
  answers: Answers,
  weakerFoundation: 'governance' | 'knowledge' | null,
) {
  if (!weakerFoundation) {
    return null
  }
  const questions = assessmentQuestions.filter(
    (question) => question.dimension === weakerFoundation,
  )
  if (questions.some((question) => answers[question.id] === undefined)) {
    return null
  }
  const current = questions.reduce(
    (total, question) => total + (answers[question.id] ?? 0),
    0,
  )
  return Math.max(0, questions.length * 2 - current)
}

export function calculateAssessment(
  answers: Answers,
  scope = '',
): AssessmentResult {
  const dimensions = Object.fromEntries(
    scoredDimensions.map((dimension) => [
      dimension,
      getDimensionScore(answers, dimension),
    ]),
  ) as Record<ScoredDimension, DimensionScore>
  const adoption = getAdoptionPosition(answers)
  const answered = assessmentQuestions.filter(
    (question) => answers[question.id] !== undefined,
  ).length

  const preconditionQuestions = assessmentQuestions.filter(
    (question) => question.dimension === 'preconditions',
  )
  const unresolvedPreconditions = preconditionQuestions.filter(
    (question) =>
      answers[question.id] === undefined || (answers[question.id] ?? 0) < 2,
  )
  const preconditionsReady = unresolvedPreconditions.length === 0

  const coreQuestions = assessmentQuestions.filter((question) =>
    ['governance', 'knowledge', 'adoption'].includes(question.dimension),
  )
  const coreComplete = coreQuestions.every(
    (question) => answers[question.id] !== undefined,
  )

  const governance = dimensions.governance.score
  const knowledge = dimensions.knowledge.score
  const foundationsScore =
    governance === null || knowledge === null
      ? null
      : Math.min(governance, knowledge)
  const weakerFoundation =
    governance === null || knowledge === null
      ? null
      : governance <= knowledge
        ? 'governance'
        : 'knowledge'
  const foundationStepsToEstablished = getFoundationSteps(
    answers,
    weakerFoundation,
  )

  const placementStatus = !scope.trim()
    ? 'scope-required'
    : !preconditionsReady
      ? 'preconditions-required'
      : !coreComplete
        ? 'core-incomplete'
        : 'ready'

  let quadrant: Quadrant | null = null
  if (placementStatus === 'ready' && foundationsScore !== null) {
    const strongFoundations = foundationsScore >= 65
    const broadParticipation = adoption.performerActivities >= 2
    const quadrantId: QuadrantId = strongFoundations
      ? broadParticipation
        ? 'healthy'
        : 'underused'
      : broadParticipation
        ? 'stretched'
        : 'underdeveloped'
    quadrant = quadrants[quadrantId]
  }

  return {
    dimensions,
    foundationsScore,
    weakerFoundation,
    foundationStepsToEstablished,
    adoption,
    quadrant,
    placementStatus,
    answered,
    total: assessmentQuestions.length,
    coreComplete,
    complete:
      Boolean(scope.trim()) &&
      answered === assessmentQuestions.length &&
      preconditionsReady,
    preconditionsReady,
    unresolvedPreconditions,
  }
}
