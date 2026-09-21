import { assessmentQuestions } from '../assessment/questions'
import type { Answers, ResponseValue } from '../assessment/types'
import { QuestionSection } from './QuestionSection'

export function OperatingBaseline({
  answers,
  resetArmed,
  onAnswer,
  onReset,
}: {
  answers: Answers
  resetArmed: boolean
  onAnswer: (questionId: string, value: ResponseValue) => void
  onReset: () => void
}) {
  const questions = assessmentQuestions.filter(
    (question) => question.dimension === 'preconditions',
  )
  const answered = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length

  return (
    <section
      className="operating-baseline"
      id="baseline"
      aria-labelledby="baseline-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="baseline-title">Set the operating baseline once</h2>
        </div>
        <p>
          These four AES preconditions apply across workflow checks. Save them
          once, reuse them, and review them when infrastructure, access,
          skills, or operating expectations change.
        </p>
      </div>

      <div className="baseline-summary">
        <strong>{answered} of {questions.length} baseline items answered</strong>
        <span>
          Stored separately from the workflow scope and workflow answers.
        </span>
      </div>

      <QuestionSection
        dimension="preconditions"
        answers={answers}
        onAnswer={onAnswer}
        open
        nextTarget="assessment"
        nextLabel="workflow readiness check"
      />

      {answered > 0 ? (
        <div className="baseline-reset">
          <button
            type="button"
            className={resetArmed ? 'danger-button' : 'text-button'}
            onClick={onReset}
          >
            {resetArmed ? 'Confirm baseline reset' : 'Reset operating baseline'}
          </button>
          {resetArmed ? (
            <span>This removes only the saved baseline answers.</span>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
