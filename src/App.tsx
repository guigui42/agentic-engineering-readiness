import { useEffect, useMemo, useState } from 'react'
import {
  CheckIcon,
  CopyIcon,
  LinkExternalIcon,
  MarkGithubIcon,
  MoonIcon,
  ShieldCheckIcon,
  SunIcon,
} from '@primer/octicons-react'
import {
  buildActionPlan,
  exportAssessmentMarkdown,
} from './assessment/recommendations'
import { calculateAssessment } from './assessment/scoring'
import type { Answers, ResponseValue } from './assessment/types'
import { trackInteraction } from './analytics'
import { ActionPlan } from './components/ActionPlan'
import { Assessment } from './components/Assessment'
import { DimensionSummary } from './components/DimensionSummary'
import { FrameworkExplainer } from './components/FrameworkExplainer'
import { SourceIndex } from './components/SourceIndex'
import { StockAdoptionMatrix } from './components/StockAdoptionMatrix'

const PAGE_LINK =
  'https://guigui42.github.io/agentic-engineering-readiness/'
const STORAGE_KEY = 'agentic-engineering-readiness-v2'
const LEGACY_STORAGE_KEY = 'agentic-engineering-readiness-v1'

interface StoredReadinessCheck {
  version: 2
  scope: string
  answers: Answers
}

function loadReadinessCheck(): StoredReadinessCheck {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as StoredReadinessCheck
      if (
        parsed.version === 2 &&
        typeof parsed.scope === 'string' &&
        typeof parsed.answers === 'object'
      ) {
        return parsed
      }
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy) as { answers?: Answers }
      if (typeof parsed.answers === 'object') {
        return { version: 2, scope: '', answers: parsed.answers }
      }
    }
  } catch (error) {
    console.error('Unable to load the saved readiness check.', error)
  }

  return { version: 2, scope: '', answers: {} }
}

async function copyText(value: string) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard access is not available in this browser.')
  }
  await navigator.clipboard.writeText(value)
}

function resultHeading(
  scope: string,
  placementStatus: ReturnType<typeof calculateAssessment>['placementStatus'],
  quadrantLabel: string | undefined,
) {
  if (placementStatus === 'scope-required') {
    return 'Name the workflow you are checking'
  }
  if (placementStatus === 'preconditions-required') {
    return 'Resolve operating preconditions before placement'
  }
  if (placementStatus === 'core-incomplete') {
    return 'Complete foundations and participation'
  }
  return quadrantLabel ?? `Result for ${scope}`
}

function resultDescription(
  placementStatus: ReturnType<typeof calculateAssessment>['placementStatus'],
  quadrantMove: string | undefined,
) {
  if (placementStatus === 'scope-required') {
    return 'AES places each process or task separately. Start by naming one team, repository class, or workflow.'
  }
  if (placementStatus === 'preconditions-required') {
    return 'Placement is not reliable while an operating precondition is missing or only partially present.'
  }
  if (placementStatus === 'core-incomplete') {
    return 'Answer every governance, shared knowledge, and participation item to place the scoped workflow in the AES matrix.'
  }
  return quadrantMove ?? ''
}

function App() {
  const [readinessCheck, setReadinessCheck] =
    useState<StoredReadinessCheck>(loadReadinessCheck)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('agentic-engineering-theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })
  const [copiedPageLink, setCopiedPageLink] = useState(false)
  const [copiedPlan, setCopiedPlan] = useState(false)
  const [copyError, setCopyError] = useState<string | null>(null)
  const [resetArmed, setResetArmed] = useState(false)

  const { scope, answers } = readinessCheck
  const result = useMemo(
    () => calculateAssessment(answers, scope),
    [answers, scope],
  )
  const actions = useMemo(
    () => buildActionPlan(answers, result),
    [answers, result],
  )
  const progress = Math.round((result.answered / result.total) * 100)

  useEffect(() => {
    document.documentElement.dataset.colorMode = theme
    localStorage.setItem('agentic-engineering-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readinessCheck))
    localStorage.removeItem(LEGACY_STORAGE_KEY)
  }, [readinessCheck])

  useEffect(() => {
    if (!resetArmed) {
      return undefined
    }
    const timeout = window.setTimeout(() => setResetArmed(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [resetArmed])

  const handleAnswer = (questionId: string, value: ResponseValue) => {
    setReadinessCheck((current) => ({
      ...current,
      answers: { ...current.answers, [questionId]: value },
    }))
    trackInteraction({
      category: 'readiness',
      action: 'change',
      label: 'response-selected',
    })
  }

  const handlePageCopy = async () => {
    try {
      await copyText(PAGE_LINK)
      setCopiedPageLink(true)
      setCopyError(null)
      trackInteraction({
        category: 'navigation',
        action: 'copy',
        label: 'page-link',
      })
      window.setTimeout(() => setCopiedPageLink(false), 1800)
    } catch (error) {
      setCopyError(error instanceof Error ? error.message : String(error))
    }
  }

  const handlePlanCopy = async () => {
    try {
      await copyText(exportAssessmentMarkdown(scope, result, actions))
      setCopiedPlan(true)
      setCopyError(null)
      trackInteraction({
        category: 'result',
        action: 'copy',
        label: 'implementation-checklist',
      })
      window.setTimeout(() => setCopiedPlan(false), 1800)
    } catch (error) {
      setCopyError(error instanceof Error ? error.message : String(error))
    }
  }

  const handleReset = () => {
    if (!resetArmed) {
      setResetArmed(true)
      return
    }
    setReadinessCheck({ version: 2, scope: '', answers: {} })
    setResetArmed(false)
    setCopyError(null)
    trackInteraction({
      category: 'readiness',
      action: 'reset',
      label: 'local-readiness-check',
    })
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <button
          type="button"
          className="brand"
          aria-label={copiedPageLink ? 'Page link copied' : 'Copy page link'}
          title={`Copy ${PAGE_LINK}`}
          onClick={handlePageCopy}
        >
          <span><ShieldCheckIcon /></span>
          <strong>Agentic Engineering readiness</strong>
          {copiedPageLink ? <CheckIcon /> : <CopyIcon />}
        </button>
        <nav aria-label="Primary navigation">
          <a href="#assessment">Readiness check</a>
          <a href="#results">Results</a>
          <a href="#sources">Sources</a>
          <a
            href="https://github.com/guigui42/agentic-engineering-readiness"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <MarkGithubIcon />
          </a>
          <button
            type="button"
            className="icon-button"
            aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => {
              const nextTheme = theme === 'dark' ? 'light' : 'dark'
              setTheme(nextTheme)
              trackInteraction({
                category: 'appearance',
                action: 'change',
                label: `theme:${nextTheme}`,
              })
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero">
          <div className="hero__content">
            <h1>Prepare your Agentic Engineering System before you scale the agents.</h1>
            <p>
              Check one workflow against AES preconditions, governance, shared
              knowledge, agent participation, customer value, and system
              learning. Turn the gaps into specific GitHub and operating-model
              actions with observable verification.
            </p>
            <div className="hero__actions">
              <a className="primary-button" href="#assessment">
                Start the readiness check
              </a>
              <a
                className="secondary-button"
                href="https://github.com/resources/insights/agentic-engineering-system"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the AES framework
                <LinkExternalIcon />
              </a>
            </div>
            <p className="effort-note">
              16 items · about 20 minutes alone · 60–75 minutes as a team workshop
            </p>
            <p className="privacy-note">
              Anonymous usage analytics record page views and fixed
              interaction labels. Your scope, answers, scores, placement, and
              copied checklist stay in this browser.
            </p>
          </div>
          <div className="hero__visual" aria-label="AES activity and stock model">
            <div className="orb orb--governance">
              <span>Stock</span>
              <strong>Governance</strong>
            </div>
            <div className="orb orb--knowledge">
              <span>Stock</span>
              <strong>Shared knowledge</strong>
            </div>
            <div className="orb orb--value">
              <span>Stock</span>
              <strong>Customer value</strong>
            </div>
            <div className="cycle">
              <span>Define</span>
              <span>Deliver</span>
              <span>Detect</span>
            </div>
          </div>
        </section>

        <FrameworkExplainer />

        <div className="progress-dock" aria-label="Readiness check progress">
          <div>
            <strong>{result.answered} of {result.total}</strong>
            <span>items answered</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Readiness check completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <a href="#results">View results</a>
        </div>

        <Assessment
          scope={scope}
          answers={answers}
          onScopeChange={(nextScope) =>
            setReadinessCheck((current) => ({
              ...current,
              scope: nextScope,
            }))
          }
          onAnswer={handleAnswer}
        />

        <section className="results" id="results" aria-labelledby="results-title">
          <div className="section-heading">
            <div>
              <h2 id="results-title">
                {resultHeading(
                  scope,
                  result.placementStatus,
                  result.quadrant?.label,
                )}
              </h2>
              {scope.trim() ? <span className="result-scope">{scope.trim()}</span> : null}
            </div>
            <p aria-live="polite">
              {resultDescription(
                result.placementStatus,
                result.quadrant?.nextMove,
              )}
            </p>
          </div>

          {scope.trim() && result.unresolvedPreconditions.length > 0 ? (
            <div className="precondition-warning" role="status">
              <strong>
                {result.unresolvedPreconditions.length} operating precondition
                {result.unresolvedPreconditions.length === 1 ? '' : 's'} unresolved
              </strong>
              <p>
                Placement remains unavailable until every precondition is
                Established or Measured and improving.
              </p>
            </div>
          ) : null}

          <DimensionSummary result={result} />
          <StockAdoptionMatrix result={result} />

          <div className="threshold-note">
            <strong>How placement works</strong>
            <p>
              Governance and shared knowledge are both necessary, so the weaker
              stock sets the foundations position. Established begins when all
              three items in a stock average at least 2 of 3; reported scores
              are rounded down to the nearest 5 so the number cannot cross its
              evidence band. Participation is broad when agents
              perform in at least two of define, deliver, and detect. It is a
              position, not a maturity score. Customer value and system
              learning use their own completed-item bands rather than the
              three-item foundation rule. Risk appetite and consequence of
              failure still determine the real delegation boundary.
              {result.foundationStepsToEstablished !== null &&
              result.foundationStepsToEstablished > 0
                ? ` The weaker stock is ${result.foundationStepsToEstablished} answer step${result.foundationStepsToEstablished === 1 ? '' : 's'} from Established.`
                : ''}
            </p>
          </div>

          <ActionPlan
            actions={actions}
            copied={copiedPlan}
            copyError={copyError}
            onCopy={handlePlanCopy}
          />

          <div className="reset-row">
            <button
              type="button"
              className={resetArmed ? 'danger-button' : 'text-button'}
              onClick={handleReset}
            >
              {resetArmed ? 'Confirm reset' : 'Reset local readiness check'}
            </button>
            {resetArmed ? (
              <span>This removes the scope and answers saved in this browser.</span>
            ) : null}
          </div>
        </section>

        <section className="anti-patterns" aria-labelledby="anti-patterns-title">
          <div className="section-heading">
            <div>
              <h2 id="anti-patterns-title">Avoid speed-shaped failure</h2>
            </div>
          </div>
          <div className="anti-pattern-grid">
            <article>
              <strong>Task completion is not customer value.</strong>
              <p>
                A merged pull request matters only when the change improves a
                customer or operational outcome.
              </p>
            </article>
            <article>
              <strong>Green checks are not complete evaluation.</strong>
              <p>
                Automated checks provide evidence. They do not replace judgment
                about intent, trade-offs, and residual risk.
              </p>
            </article>
            <article>
              <strong>A large context window is not shared knowledge.</strong>
              <p>
                More context does not guarantee that the right information is
                current, relevant, or structured for the task.
              </p>
            </article>
            <article>
              <strong>More agent use is not the target state.</strong>
              <p>
                The goal is the right participation for the work, supported by
                healthy foundations and outcome evidence.
              </p>
            </article>
          </div>
        </section>

        <SourceIndex />
      </main>

      <footer className="site-footer">
        <div>
          <ShieldCheckIcon />
          <strong>Agentic Engineering readiness</strong>
        </div>
        <p>
          Independent, unofficial resource. Not published or endorsed by
          GitHub, Inc. Anonymous usage analytics record page views and fixed
          interaction labels. Scope, answers, scores, placement, and copied
          content remain local.
        </p>
        <nav aria-label="Footer links">
          <a
            href="https://github.com/guigui42/agentic-engineering-readiness"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MarkGithubIcon />
            Repository
          </a>
          <a
            href="https://github.com/guigui42"
            target="_blank"
            rel="noopener noreferrer"
          >
            @guigui42
          </a>
        </nav>
      </footer>
    </>
  )
}

export default App
