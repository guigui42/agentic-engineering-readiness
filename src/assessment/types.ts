export type AssessmentDimension =
  | 'preconditions'
  | 'governance'
  | 'knowledge'
  | 'adoption'
  | 'value'

export type ScoredDimension = Exclude<AssessmentDimension, 'preconditions'>

export type ResponseValue = 0 | 1 | 2 | 3

export type QuadrantId =
  | 'underdeveloped'
  | 'underused'
  | 'stretched'
  | 'healthy'

export type ActionPhase = 'do-first' | 'do-next' | 'expand' | 'measure'

export interface Source {
  id: string
  title: string
  url: string
  category: 'AES framework' | 'GitHub Well-Architected' | 'GitHub Docs'
}

export interface AssessmentQuestion {
  id: string
  dimension: AssessmentDimension
  title: string
  prompt: string
  evidence: string[]
  action: {
    title: string
    detail: string
  }
  sourceIds: string[]
  weight: 1 | 2
}

export type Answers = Partial<Record<string, ResponseValue>>

export interface DimensionScore {
  id: ScoredDimension
  label: string
  answered: number
  total: number
  score: number | null
}

export interface Quadrant {
  id: QuadrantId
  label: string
  summary: string
  nextMove: string
}

export interface AssessmentResult {
  dimensions: Record<ScoredDimension, DimensionScore>
  foundationsScore: number | null
  quadrant: Quadrant | null
  answered: number
  total: number
  coreComplete: boolean
  complete: boolean
  missingPreconditions: AssessmentQuestion[]
}

export interface ActionItem {
  id: string
  phase: ActionPhase
  title: string
  detail: string
  successEvidence: string[]
  sourceIds: string[]
  questionId?: string
}
