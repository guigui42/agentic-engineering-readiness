import type { AssessmentResult, ScoredDimension } from '../assessment/types'

const dimensions: ScoredDimension[] = [
  'governance',
  'knowledge',
  'value',
  'learning',
]

export function DimensionSummary({ result }: { result: AssessmentResult }) {
  return (
    <div className="dimension-summary">
      {dimensions.map((dimension) => {
        const item = result.dimensions[dimension]
        const isFoundation =
          dimension === 'governance' || dimension === 'knowledge'
        return (
          <article key={dimension}>
            <div>
              <strong>{item.label}</strong>
              <span>{item.band}</span>
            </div>
            {item.score === null ? (
              <div className="score-pending">Complete all {item.total} items</div>
            ) : isFoundation ? (
              <>
                <div
                  className="score-track"
                  role="progressbar"
                  aria-label={`${item.label} score`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.score}
                >
                  <span style={{ width: `${item.score}%` }} />
                </div>
                <small>{item.score}% · rounded down to nearest 5</small>
              </>
            ) : (
              <div className="dimension-status">
                {item.answered} of {item.total} item
                {item.total === 1 ? '' : 's'} answered
              </div>
            )}
          </article>
        )
      })}
      <article className="participation-summary">
        <div>
          <strong>Agent participation</strong>
          <span>{result.adoption.label}</span>
        </div>
        <p>{result.adoption.description}</p>
        <div
          className="participation-position"
          aria-label={`${result.adoption.performerActivities} of 3 lifecycle activities use an agent performer`}
        >
          {(['define', 'deliver', 'detect'] as const).map((activity) => (
            <span
              key={activity}
              className={
                (result.adoption.activities[activity] ?? 0) >= 2
                  ? 'participation-position--active'
                  : undefined
              }
            >
              {activity[0].toUpperCase() + activity.slice(1)}
            </span>
          ))}
        </div>
      </article>
    </div>
  )
}
