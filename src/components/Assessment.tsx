import { dimensionContent } from '../assessment/questions'
import type {
  Answers,
  AssessmentDimension,
  ResponseValue,
} from '../assessment/types'
import { QuestionSection } from './QuestionSection'

const workflowDimensions: AssessmentDimension[] = [
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
  return (
    <section className="assessment" id="assessment" aria-labelledby="assessment-title">
      <div className="section-heading">
        <div>
          <h2 id="assessment-title">Check one workflow, not the whole organization</h2>
        </div>
        <p>
          Reuse the operating baseline, then run these twelve items separately
          for each team, repository class, or delivery workflow.
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
        {workflowDimensions.map((dimension, index) => {
          const nextDimension = workflowDimensions[index + 1]
          return (
            <QuestionSection
              key={dimension}
              dimension={dimension}
              answers={answers}
              onAnswer={onAnswer}
              open={index === 0}
              nextTarget={
                nextDimension ? `section-${nextDimension}` : 'results'
              }
              nextLabel={
                nextDimension
                  ? dimensionContent[nextDimension].label
                  : 'results'
              }
            />
          )
        })}
      </div>
    </section>
  )
}
