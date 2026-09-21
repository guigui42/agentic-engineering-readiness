import { CheckIcon, CopyIcon, LinkExternalIcon } from '@primer/octicons-react'
import { phaseContent } from '../assessment/recommendations'
import { sources } from '../assessment/questions'
import type { ActionItem, ActionPhase } from '../assessment/types'

const phases: ActionPhase[] = ['do-first', 'do-next', 'expand', 'measure']

export function ActionPlan({
  actions,
  copied,
  copyError,
  onCopy,
}: {
  actions: ActionItem[]
  copied: boolean
  copyError: string | null
  onCopy: () => void
}) {
  const sourceMap = new Map(sources.map((source) => [source.id, source]))
  const topActions = actions.slice(0, 3)
  const additionalActions = actions.slice(3)

  return (
    <section className="action-plan" aria-labelledby="action-plan-title">
      <div className="action-plan__header">
        <div>
          <h3 id="action-plan-title">Prioritized preparation plan</h3>
          <p>Address blockers, strengthen foundations, then expand with evidence.</p>
        </div>
        <button type="button" className="secondary-button" onClick={onCopy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy as Markdown'}
        </button>
      </div>
      {copyError ? <p className="error-message" role="alert">{copyError}</p> : null}

      {actions.length === 0 ? (
        <div className="empty-plan">
          Answer assessment questions to generate a prioritized preparation plan.
        </div>
      ) : (
        <>
          <div className="top-actions">
            {topActions.map((action, index) => (
              <article key={action.id}>
                <span>{index + 1}</span>
                <div>
                  <small>{phaseContent[action.phase].label}</small>
                  <strong>{action.title}</strong>
                  <p>{action.detail}</p>
                  <div className="done-when">
                    <b>Done when</b>
                    <ul>
                      {action.successEvidence.map((evidence) => (
                        <li key={evidence}>{evidence}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {additionalActions.length > 0 ? (
            <details className="additional-actions">
              <summary>
                {additionalActions.length} additional action
                {additionalActions.length === 1 ? '' : 's'}
              </summary>
              <div className="action-groups">
          {phases.map((phase) => {
            const phaseActions = additionalActions.filter(
              (action) => action.phase === phase,
            )
            if (phaseActions.length === 0) {
              return null
            }

            return (
              <section key={phase} className={`action-group action-group--${phase}`}>
                <div>
                  <span>{phaseContent[phase].label}</span>
                  <p>{phaseContent[phase].description}</p>
                </div>
                <ol>
                  {phaseActions.map((action) => (
                    <li key={action.id}>
                      <strong>{action.title}</strong>
                      <p>{action.detail}</p>
                      <div>
                        {action.sourceIds.map((sourceId) => {
                          const source = sourceMap.get(sourceId)
                          return source ? (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={source.id}
                            >
                              {source.title}
                              <LinkExternalIcon />
                            </a>
                          ) : null
                        })}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
              </div>
            </details>
          ) : null}
        </>
      )}
    </section>
  )
}
