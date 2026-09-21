import { LinkExternalIcon } from '@primer/octicons-react'
import {
  assessmentQuestions,
  dimensionContent,
  sources,
} from '../assessment/questions'
import {
  participationOptions,
  readinessOptions,
} from '../assessment/scoring'
import type {
  Answers,
  AssessmentDimension,
  ResponseValue,
} from '../assessment/types'

const dimensionOrder: AssessmentDimension[] = [
  'preconditions',
  'governance',
  'knowledge',
  'adoption',
  'value',
  'learning',
]

export function Assessment({
  scope,
  answers,
  onScopeChange,
  onAnswer,
}: {
  scope: string
  answers: Answers
  onScopeChange: (scope: string) => void
  onAnswer: (questionId: string, value: ResponseValue) => void
}) {
  const sourceMap = new Map(sources.map((source) => [source.id, source]))

  return (
    <section className="assessment" id="assessment" aria-labelledby="assessment-title">
      <div className="section-heading">
        <div>
          <h2 id="assessment-title">Check one workflow, not the whole organization</h2>
        </div>
        <p>
          Use one team, repository class, or delivery workflow. AES places each
          process separately because the surrounding conditions differ.
        </p>
      </div>

      <div className="scope-panel">
        <label htmlFor="assessment-scope">
          Name the workflow, team, or repository class
        </label>
        <input
          id="assessment-scope"
          type="text"
          value={scope}
          maxLength={120}
          aria-describedby="assessment-scope-help"
          placeholder="For example: documentation updates"
          onChange={(event) => onScopeChange(event.target.value)}
        />
        <p id="assessment-scope-help">
          This is a label, not a search. Use a repeatable scope such as
          dependency upgrades, payments bug fixes, or documentation updates.
          It appears in the result and copied checklist.
        </p>
      </div>

      <div className="assessment-sections">
        {dimensionOrder.map((dimension, index) => {
          const content = dimensionContent[dimension]
          const questions = assessmentQuestions.filter(
            (question) => question.dimension === dimension,
          )
          const answered = questions.filter(
            (question) => answers[question.id] !== undefined,
          ).length
          const nextDimension = dimensionOrder[index + 1]
          const nextTarget = nextDimension
            ? `section-${nextDimension}`
            : 'results'
          const nextLabel = nextDimension
            ? dimensionContent[nextDimension].label
            : 'results'
          const options =
            dimension === 'adoption' ? participationOptions : readinessOptions

          return (
            <details
              id={`section-${dimension}`}
              className={`assessment-section assessment-section--${dimension}`}
              key={dimension}
              open={index === 0}
            >
              <summary>
                <span>
                  <small>{content.eyebrow}</small>
                  <strong>{content.label}</strong>
                  <em>{content.description}</em>
                </span>
                <b>{answered}/{questions.length}</b>
              </summary>
              <div className="question-list">
                <div className="section-scale" aria-label={`${content.label} response scale`}>
                  {options.map((option) => (
                    <span key={option.value}>
                      <b>{option.value}</b>
                      {option.label}
                    </span>
                  ))}
                </div>
                {questions.map((question, questionIndex) => (
                  <fieldset className="question-card" key={question.id}>
                    <legend>
                      <span>{questionIndex + 1}</span>
                      <strong>{question.title}</strong>
                    </legend>
                    <p>{question.prompt}</p>
                    <div className="response-grid">
                      {options.map((option) => (
                        <label key={option.value}>
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={answers[question.id] === option.value}
                            onChange={() => onAnswer(question.id, option.value)}
                          />
                          <span>
                            <b>{option.value}</b>
                            {option.shortLabel}
                          </span>
                        </label>
                      ))}
                    </div>
                    <details className="evidence">
                      <summary>Evidence to look for</summary>
                      <ul>
                        {question.evidence.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <div className="inline-sources">
                        {question.sourceIds.map((sourceId) => {
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
                    </details>
                  </fieldset>
                ))}
                {answered === questions.length ? (
                  <a
                    className="continue-link"
                    href={`#${nextTarget}`}
                    onClick={() => {
                      if (nextDimension) {
                        document
                          .getElementById(nextTarget)
                          ?.setAttribute('open', '')
                      }
                    }}
                  >
                    Continue to {nextLabel}
                  </a>
                ) : null}
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}
