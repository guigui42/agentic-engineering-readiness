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

const sourceMap = new Map(sources.map((source) => [source.id, source]))

export function QuestionSection({
  dimension,
  answers,
  onAnswer,
  open = false,
  nextTarget,
  nextLabel,
}: {
  dimension: AssessmentDimension
  answers: Answers
  onAnswer: (questionId: string, value: ResponseValue) => void
  open?: boolean
  nextTarget?: string
  nextLabel?: string
}) {
  const content = dimensionContent[dimension]
  const questions = assessmentQuestions.filter(
    (question) => question.dimension === dimension,
  )
  const answered = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length
  const options =
    dimension === 'adoption' ? participationOptions : readinessOptions

  return (
    <details
      id={`section-${dimension}`}
      className={`assessment-section assessment-section--${dimension}`}
      open={open}
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
        {answered === questions.length && nextTarget && nextLabel ? (
          <a
            className="continue-link"
            href={`#${nextTarget}`}
            onClick={() => {
              document.getElementById(nextTarget)?.setAttribute('open', '')
            }}
          >
            Continue to {nextLabel}
          </a>
        ) : null}
      </div>
    </details>
  )
}
