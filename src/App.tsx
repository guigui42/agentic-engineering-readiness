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
import { buildActionPlan, exportAssessmentMarkdown } from './assessment/recommendations'
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
const STORAGE_KEY = 'agentic-engineering-readiness-v1'

interface StoredAssessment {
  version: 1
  answers: Answers
}

function loadAnswers(): Answers {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return {}
    }
    const parsed = JSON.parse(stored) as StoredAssessment
    if (parsed.version !== 1 || typeof parsed.answers !== 'object') {
      return {}
    }
    return parsed.answers
  } catch (error) {
    console.error('Unable to load the saved assessment.', error)
    return {}
  }
}

async function copyText(value: string) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard access is not available in this browser.')
  }
  await navigator.clipboard.writeText(value)
}

function App() {
  const [answers, setAnswers] = useState<Answers>(loadAnswers)
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

  const result = useMemo(() => calculateAssessment(answers), [answers])
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
    const stored: StoredAssessment = { version: 1, answers }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }, [answers])

  useEffect(() => {
    if (!resetArmed) {
      return undefined
    }
    const timeout = window.setTimeout(() => setResetArmed(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [resetArmed])

  const handleAnswer = (questionId: string, value: ResponseValue) => {
    setAnswers((current) => ({ ...current, [questionId]: value }))
    trackInteraction({
      category: 'assessment',
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
      await copyText(exportAssessmentMarkdown(result, actions))
      setCopiedPlan(true)
      setCopyError(null)
      trackInteraction({
        category: 'result',
        action: 'copy',
        label: 'markdown-plan',
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
    setAnswers({})
    localStorage.removeItem(STORAGE_KEY)
    setResetArmed(false)
    setCopyError(null)
    trackInteraction({
      category: 'assessment',
      action: 'reset',
      label: 'local-assessment',
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
          <a href="#assessment">Assessment</a>
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
              Assess governance, shared knowledge, agent adoption, and customer
              value signals. Then turn the gaps into exact GitHub settings,
              repository files, workflows, and verification checks.
            </p>
            <div className="hero__actions">
              <a className="primary-button" href="#assessment">
                Start the assessment
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
            <p className="effort-note">26 evidence questions · about 8 minutes</p>
            <p className="privacy-note">
              Your answers stay in this browser. This is directional guidance,
              not a certification or universal risk threshold.
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

        <div className="progress-dock" aria-label="Assessment progress">
          <div>
            <strong>{result.answered} of {result.total}</strong>
            <span>questions answered</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Assessment completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <a href="#results">View results</a>
        </div>

        <Assessment answers={answers} onAnswer={handleAnswer} />

        <section className="results" id="results" aria-labelledby="results-title">
          <div className="section-heading">
            <div>
              <h2 id="results-title">
                {result.quadrant?.label ?? 'Complete the core assessment'}
              </h2>
            </div>
            <p aria-live="polite">
              {result.quadrant
                ? result.quadrant.nextMove
                : 'Answer every governance, shared knowledge, and agent adoption question to place the system in the AES matrix.'}
            </p>
          </div>

          {result.missingPreconditions.length > 0 ? (
            <div className="precondition-warning" role="status">
              <strong>
                {result.missingPreconditions.length} operating precondition
                {result.missingPreconditions.length === 1 ? '' : 's'} need attention.
              </strong>
              <p>
                Treat these as blockers or constraints before expanding agent
                execution.
              </p>
            </div>
          ) : null}

          <DimensionSummary result={result} />
          <StockAdoptionMatrix result={result} />

          <div className="threshold-note">
            <strong>How placement works</strong>
            <p>
              Governance and shared knowledge form the foundations axis.
              Agent adoption forms the participation axis. Established
              foundations begin at 67%, and broader adoption begins at 50%.
              These transparent thresholds provide direction, not a universal
              delegation boundary. Risk appetite and consequence of failure
              still matter.
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
              {resetArmed ? 'Confirm reset' : 'Reset local answers'}
            </button>
            {resetArmed ? (
              <span>This removes the assessment saved in this browser.</span>
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
              <strong>Green checks are not complete assessment.</strong>
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
        <p>Public sources only. Assessment answers remain local.</p>
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
