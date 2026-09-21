import { LinkExternalIcon } from '@primer/octicons-react'
import {
  assessmentQuestions,
  dimensionContent,
  sources,
} from '../assessment/questions'
import { responseOptions } from '../assessment/scoring'
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
]

export function Assessment({
  answers,
  onAnswer,
}: {
  answers: Answers
  onAnswer: (questionId: string, value: ResponseValue) => void
}) {
  const sourceMap = new Map(sources.map((source) => [source.id, source]))

  return (
    <section className="assessment" id="assessment" aria-labelledby="assessment-title">
      <div className="section-heading">
        <div>
          <h2 id="assessment-title">Assess the system around agent work</h2>
        </div>
        <p>
          Choose the answer supported by evidence today. Answers stay in this
          browser and are never included in analytics.
        </p>
      </div>

      <div className="assessment-scale" aria-label="Assessment response scale">
        {responseOptions.map((option) => (
          <span key={option.value}>
            <b>{option.value}</b>
            {option.label}
          </span>
        ))}
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
                {questions.map((question, questionIndex) => (
                  <fieldset className="question-card" key={question.id}>
                    <legend>
                      <span>{questionIndex + 1}</span>
                      <strong>{question.title}</strong>
                    </legend>
                    <p>{question.prompt}</p>
                    <div className="response-grid">
                      {responseOptions.map((option) => (
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
