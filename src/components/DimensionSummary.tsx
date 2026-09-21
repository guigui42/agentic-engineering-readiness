import type { AssessmentResult, ScoredDimension } from '../assessment/types'

const dimensions: ScoredDimension[] = [
  'governance',
  'knowledge',
  'adoption',
  'value',
]

export function DimensionSummary({ result }: { result: AssessmentResult }) {
  return (
    <div className="dimension-summary">
      {dimensions.map((dimension) => {
        const item = result.dimensions[dimension]
        const score = item.score ?? 0
        return (
          <article key={dimension}>
            <div>
              <strong>{item.label}</strong>
              <span>
                {item.score === null ? 'Not scored' : `${item.score}%`}
              </span>
            </div>
            <div
              className="score-track"
              role="progressbar"
              aria-label={`${item.label} score`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={item.score ?? 0}
            >
              <span style={{ width: `${score}%` }} />
            </div>
            <small>{item.answered} of {item.total} answered</small>
          </article>
        )
      })}
    </div>
  )
}
