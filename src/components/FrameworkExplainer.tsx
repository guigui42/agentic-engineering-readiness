import {
  BookIcon,
  CheckCircleFillIcon,
  GraphIcon,
  ShieldCheckIcon,
} from '@primer/octicons-react'

const stocks = [
  {
    title: 'Governance',
    text: 'The rules, permissions, reviews, checks, protections, and escalation paths that determine what can be delegated.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Shared knowledge',
    text: 'The code, decisions, documentation, telemetry, and customer evidence that people and agents use to do good work.',
    icon: BookIcon,
  },
  {
    title: 'Customer value',
    text: 'The outcome signal that shows whether faster delivery improves usefulness, reliability, trust, or another customer result.',
    icon: GraphIcon,
  },
]

export function FrameworkExplainer() {
  return (
    <section className="framework" id="framework" aria-labelledby="framework-title">
      <div className="section-heading">
        <div>
          <h2 id="framework-title">Build the conditions for reliable delegation</h2>
        </div>
        <p>
          AES describes three stocks that shape system health, a continuous
          activity loop, and three participation modes for people and agents.
        </p>
      </div>

      <div className="stock-grid">
        {stocks.map(({ title, text, icon: Icon }) => (
          <article key={title} className="stock-card">
            <span className="icon-frame" aria-hidden="true">
              <Icon />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="framework-flow">
        <div>
          <h3>Activities: define, deliver, detect</h3>
          <p>
            Decide what should happen, make the change, observe what happened,
            then feed the evidence into the next cycle.
          </p>
          <div className="loop" aria-label="Define, deliver, detect activity loop">
            <span>Define</span>
            <b aria-hidden="true">→</b>
            <span>Deliver</span>
            <b aria-hidden="true">→</b>
            <span>Detect</span>
            <b aria-hidden="true">↺</b>
          </div>
        </div>
        <div>
          <h3>Modes: director, performer, assessor</h3>
          <ul className="mode-list">
            <li>
              <CheckCircleFillIcon />
              <span><strong>Director</strong> sets intent, scope, and constraints.</span>
            </li>
            <li>
              <CheckCircleFillIcon />
              <span><strong>Performer</strong> carries out the bounded work.</span>
            </li>
            <li>
              <CheckCircleFillIcon />
              <span><strong>Assessor</strong> evaluates evidence, risk, and outcomes.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
