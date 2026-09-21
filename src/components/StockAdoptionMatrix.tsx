import type { AssessmentResult, QuadrantId } from '../assessment/types'
import { quadrants } from '../assessment/scoring'

const matrixOrder: QuadrantId[] = [
  'underused',
  'healthy',
  'underdeveloped',
  'stretched',
]

export function StockAdoptionMatrix({ result }: { result: AssessmentResult }) {
  return (
    <div className="matrix-wrap">
      <div className="matrix-axis matrix-axis--vertical">
        <span>Stronger foundations</span>
        <b aria-hidden="true">↑</b>
      </div>
      <div className="stock-matrix" aria-label="AES Stock-Adoption matrix">
        {matrixOrder.map((quadrantId) => {
          const quadrant = quadrants[quadrantId]
          const active = result.quadrant?.id === quadrantId
          return (
            <article
              key={quadrantId}
              className={active ? 'matrix-cell matrix-cell--active' : 'matrix-cell'}
              aria-current={active ? 'true' : undefined}
            >
              <span>{active ? 'Your result' : 'AES quadrant'}</span>
              <strong>{quadrant.label}</strong>
              <p>{quadrant.summary}</p>
            </article>
          )
        })}
      </div>
      <div className="matrix-axis matrix-axis--horizontal">
        <span>Broader agent participation</span>
        <b aria-hidden="true">→</b>
      </div>
    </div>
  )
}
