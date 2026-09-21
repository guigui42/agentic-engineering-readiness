import { CheckIcon, CopyIcon, LinkExternalIcon } from '@primer/octicons-react'
import { sources } from '../assessment/questions'
import { phaseContent } from '../assessment/recommendations'
import type { ActionItem, ActionPhase } from '../assessment/types'

const phases: ActionPhase[] = ['do-first', 'do-next', 'expand', 'measure']

function SourceLinks({
  action,
  sourceMap,
}: {
  action: ActionItem
  sourceMap: Map<string, (typeof sources)[number]>
}) {
  return (
    <div className="action-sources">
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
  )
}

function GitHubImplementation({
  action,
  compact = false,
}: {
  action: ActionItem
  compact?: boolean
}) {
  return (
    <div
      className={
        compact
          ? 'github-implementation github-implementation--compact'
          : 'github-implementation'
      }
    >
      <div className="github-surface">
        <b>GitHub surface</b>
        <span>{action.github.surface}</span>
      </div>
      <div className="github-steps">
        <b>Implement in GitHub</b>
        <ol>
          {action.github.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="github-verification">
        <b>Verify in GitHub</b>
        <ul>
          {action.github.verification.map((evidence) => (
            <li key={evidence}>{evidence}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

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
          <h3 id="action-plan-title">GitHub implementation plan</h3>
          <p>
            Each priority names the GitHub settings, files, or workflow to
            change and the evidence that confirms it works.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onCopy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy GitHub checklist'}
        </button>
      </div>
      {copyError ? <p className="error-message" role="alert">{copyError}</p> : null}

      {actions.length === 0 ? (
        <div className="empty-plan">
          Answer assessment questions to generate a GitHub implementation
          checklist.
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
                  <GitHubImplementation action={action} />
                  <SourceLinks action={action} sourceMap={sourceMap} />
                </div>
              </article>
            ))}
          </div>
          {additionalActions.length > 0 ? (
            <details className="additional-actions">
              <summary>
                {additionalActions.length} additional GitHub action
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
                    <section
                      key={phase}
                      className={`action-group action-group--${phase}`}
                    >
                      <div>
                        <span>{phaseContent[phase].label}</span>
                        <p>{phaseContent[phase].description}</p>
                      </div>
                      <ol>
                        {phaseActions.map((action) => (
                          <li key={action.id}>
                            <strong>{action.title}</strong>
                            <p>{action.detail}</p>
                            <div className="compact-surface">
                              <b>GitHub surface</b>
                              <span>{action.github.surface}</span>
                            </div>
                            <details className="compact-implementation">
                              <summary>Show GitHub implementation</summary>
                              <GitHubImplementation action={action} compact />
                            </details>
                            <SourceLinks
                              action={action}
                              sourceMap={sourceMap}
                            />
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
