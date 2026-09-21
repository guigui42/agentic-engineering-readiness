export type AssessmentDimension =
  | 'preconditions'
  | 'governance'
  | 'knowledge'
  | 'adoption'
  | 'value'
  | 'learning'

export type ScoredDimension =
  | 'governance'
  | 'knowledge'
  | 'value'
  | 'learning'

export type ResponseScale = 'readiness' | 'participation'

export type ResponseValue = 0 | 1 | 2 | 3

export type QuadrantId =
  | 'underdeveloped'
  | 'underused'
  | 'stretched'
  | 'healthy'

export type ActionPhase = 'do-first' | 'do-next' | 'measure' | 'expand'

export interface Source {
  id: string
  title: string
  url: string
  category:
    | 'AES framework'
    | 'GitHub Well-Architected'
    | 'GitHub Docs'
    | 'GitHub Changelog'
}

export interface AssessmentQuestion {
  id: string
  dimension: AssessmentDimension
  scale: ResponseScale
  title: string
  prompt: string
  evidence: string[]
  action: {
    title: string
    detail: string
  }
  sourceIds: string[]
}

export type Answers = Partial<Record<string, ResponseValue>>

export interface DimensionScore {
  id: ScoredDimension
  label: string
  answered: number
  total: number
  score: number | null
  band: 'Not scored' | 'Emerging' | 'Developing' | 'Established' | 'Strong'
}

export interface AdoptionPosition {
  answered: number
  total: number
  performerActivities: number
  activities: Record<'define' | 'deliver' | 'detect', ResponseValue | null>
  label: 'Not positioned' | 'Narrow' | 'Assisted' | 'Broad' | 'Embedded'
  description: string
}

export interface Quadrant {
  id: QuadrantId
  label: string
  summary: string
  nextMove: string
}

export type PlacementStatus =
  | 'scope-required'
  | 'preconditions-required'
  | 'core-incomplete'
  | 'ready'

export interface AssessmentResult {
  dimensions: Record<ScoredDimension, DimensionScore>
  foundationsScore: number | null
  weakerFoundation: 'governance' | 'knowledge' | null
  foundationStepsToEstablished: number | null
  adoption: AdoptionPosition
  quadrant: Quadrant | null
  placementStatus: PlacementStatus
  answered: number
  total: number
  baselineAnswered: number
  baselineTotal: number
  coreComplete: boolean
  complete: boolean
  preconditionsReady: boolean
  unresolvedPreconditions: AssessmentQuestion[]
}

export interface ActionItem {
  id: string
  phase: ActionPhase
  title: string
  detail: string
  implementation: ImplementationGuide
  sourceIds: string[]
  questionId?: string
  primary?: boolean
}

export interface ImplementationGuide {
  kind: 'github' | 'operating-model'
  surface: string
  steps: string[]
  verification: string[]
}
