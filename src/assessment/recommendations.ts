import { assessmentQuestions, sources } from './questions'
import { githubImplementations } from './githubActions'
import type {
  ActionItem,
  ActionPhase,
  Answers,
  AssessmentResult,
  ResponseValue,
} from './types'

const phaseOrder: ActionPhase[] = ['do-first', 'do-next', 'expand', 'measure']

export const phaseContent: Record<
  ActionPhase,
  { label: string; description: string }
> = {
  'do-first': {
    label: 'Do first',
    description: 'Remove blockers and reduce unsafe expansion.',
  },
  'do-next': {
    label: 'Do next',
    description: 'Strengthen the foundations that limit reliable delegation.',
  },
  expand: {
    label: 'Expand safely',
    description: 'Add bounded agent participation where evidence supports it.',
  },
  measure: {
    label: 'Measure',
    description: 'Verify that speed produces quality and customer value.',
  },
}

function phaseForQuestion(
  dimension: string,
  result: AssessmentResult,
): ActionPhase {
  if (dimension === 'preconditions') {
    return 'do-first'
  }
  if (dimension === 'governance' || dimension === 'knowledge') {
    return 'do-next'
  }
  if (dimension === 'value') {
    return 'measure'
  }
  if (
    result.quadrant?.id === 'underdeveloped' ||
    result.quadrant?.id === 'stretched'
  ) {
    return 'do-next'
  }
  return 'expand'
}

function quadrantAction(result: AssessmentResult): ActionItem | null {
  if (!result.quadrant) {
    return null
  }

  const actions: Record<string, ActionItem> = {
    underdeveloped: {
      id: 'quadrant-underdeveloped',
      phase: 'do-first',
      title: 'Hold broader delegation until foundations improve',
      detail:
        'Keep agent work narrow and reversible while governance and shared knowledge are strengthened.',
      github: {
        surface:
          'Enterprise AI controls, repository custom properties, rulesets, and pilot repository files',
        steps: [
          'Limit agent use to named pilot organizations and repositories in enterprise AI controls.',
          'Classify pilot repositories with custom properties and target a ruleset that requires pull requests, checks, and accountable review.',
          'Add .github/copilot-instructions.md, CODEOWNERS, and an agent-task issue form before enabling another task class.',
        ],
        verification: [
          'The pilot scope, repository classification, enforced ruleset, owners, and instructions are all visible in GitHub.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'copilot-policies',
        'custom-properties',
        'rulesets',
        'custom-instructions',
      ],
    },
    underused: {
      id: 'quadrant-underused',
      phase: 'expand',
      title: 'Choose the next safe class of work',
      detail:
        'Pilot one low-risk, well-defined workflow with clear evidence, review, and rollback paths.',
      github: {
        surface: 'GitHub Issues, Copilot cloud agent, pull requests, and required checks',
        steps: [
          'Choose a low-risk issue class and capture it with the agent-task issue form.',
          'Start a Copilot cloud agent session from the issue and require a reviewable pull request with tests.',
          'Compare review effort, failed checks, rework, and rollback evidence with similar human-delivered work.',
        ],
        verification: [
          'At least one bounded task completes through the full GitHub issue-to-pull-request path without weakening review or quality.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'cloud-agent',
        'issue-templates',
        'rulesets',
      ],
    },
    stretched: {
      id: 'quadrant-stretched',
      phase: 'do-first',
      title: 'Narrow agent scope while repairing foundations',
      detail:
        'Pause expansion in workflows where weak context or controls are creating hidden risk, rework, or review burden.',
      github: {
        surface:
          'Enterprise AI controls, repository custom properties, rulesets, and GitHub Issues',
        steps: [
          'Disable or narrow agent entry points for repository classes with weak context or controls.',
          'Use custom properties to identify affected repositories and target stricter rulesets.',
          'Open owned issues for each missing instruction, review boundary, security configuration, or outcome signal.',
        ],
        verification: [
          'Out-of-bound repositories cannot start the expanded workflow, and every foundation gap is tracked in GitHub.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'copilot-policies',
        'custom-properties',
        'rulesets',
      ],
    },
    healthy: {
      id: 'quadrant-healthy',
      phase: 'expand',
      title: 'Expand one workflow at a time',
      detail:
        'Add the next bounded class of work and keep quality, review burden, and customer outcomes visible.',
      github: {
        surface:
          'GitHub Issues, Copilot cloud agent, Copilot code review, pull requests, and deployments',
        steps: [
          'Select the next task class using completed pilot evidence and define it in a reusable issue form.',
          'Use Copilot cloud agent for bounded delivery and Copilot code review as additional assessment evidence.',
          'Keep human review, required checks, and deployment protections aligned with impact, then record the outcome in the issue.',
        ],
        verification: [
          'The new task class shows healthy review effort, quality, deployment, and customer or operational outcomes.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'cloud-agent',
        'copilot-code-review',
        'required-reviews',
      ],
    },
  }

  return actions[result.quadrant.id]
}

export function buildActionPlan(
  answers: Answers,
  result: AssessmentResult,
): ActionItem[] {
  const items: Array<ActionItem & { value: ResponseValue; weight: number }> = []

  for (const question of assessmentQuestions) {
    const value = answers[question.id]
    if (value === undefined || value >= 2) {
      continue
    }

    const github = githubImplementations[question.id]
    if (!github) {
      throw new Error(`Missing GitHub implementation for ${question.id}`)
    }

    items.push({
      id: `question-${question.id}`,
      phase: phaseForQuestion(question.dimension, result),
      title: question.action.title,
      detail: question.action.detail,
      github,
      sourceIds: question.sourceIds,
      questionId: question.id,
      value,
      weight: question.weight,
    })
  }

  items.sort((left, right) => {
    const phaseDifference =
      phaseOrder.indexOf(left.phase) - phaseOrder.indexOf(right.phase)
    if (phaseDifference !== 0) {
      return phaseDifference
    }
    if (left.value !== right.value) {
      return left.value - right.value
    }
    if (left.weight !== right.weight) {
      return right.weight - left.weight
    }
    return left.title.localeCompare(right.title)
  })

  const primary = quadrantAction(result)
  const actionPlan: ActionItem[] = primary ? [primary, ...items] : items
  actionPlan.sort(
    (left, right) =>
      phaseOrder.indexOf(left.phase) - phaseOrder.indexOf(right.phase),
  )

  return actionPlan.filter(
    (item, index, all) =>
      all.findIndex((candidate) => candidate.id === item.id) === index,
  )
}

export function exportAssessmentMarkdown(
  result: AssessmentResult,
  actions: ActionItem[],
): string {
  const sourceMap = new Map(sources.map((source) => [source.id, source]))
  const lines = [
    '# Agentic Engineering readiness assessment',
    '',
    `- Result: ${result.quadrant?.label ?? 'Assessment in progress'}`,
    `- Governance: ${result.dimensions.governance.score ?? 'Not scored'}%`,
    `- Shared knowledge: ${result.dimensions.knowledge.score ?? 'Not scored'}%`,
    `- Agent adoption: ${result.dimensions.adoption.score ?? 'Not scored'}%`,
    `- Customer value signals: ${result.dimensions.value.score ?? 'Not scored'}%`,
    `- Foundations: ${result.foundationsScore ?? 'Not scored'}%`,
    '',
  ]

  if (result.quadrant) {
    lines.push(result.quadrant.summary, '', `Next move: ${result.quadrant.nextMove}`, '')
  }

  lines.push('## Prioritized action plan', '')

  if (actions.length === 0) {
    lines.push('Complete the assessment to generate prioritized actions.', '')
  } else {
    for (const phase of phaseOrder) {
      const phaseActions = actions.filter((action) => action.phase === phase)
      if (phaseActions.length === 0) {
        continue
      }

      lines.push(`### ${phaseContent[phase].label}`, '')
      for (const action of phaseActions) {
        const links = action.sourceIds
          .map((sourceId) => sourceMap.get(sourceId))
          .filter((source) => source !== undefined)
          .map((source) => `[${source.title}](${source.url})`)
          .join(', ')
        lines.push(
          `- **${action.title}.** ${action.detail}${links ? ` Sources: ${links}.` : ''}`,
        )
        lines.push(`  - GitHub surface: ${action.github.surface}`)
        lines.push('  - Implement:')
        for (const step of action.github.steps) {
          lines.push(`    - ${step}`)
        }
        lines.push('  - Verify:')
        for (const evidence of action.github.verification) {
          lines.push(`    - ${evidence}`)
        }
      }
      lines.push('')
    }
  }

  lines.push(
    'This directional self-assessment is based on GitHub AES. It is not a certification or a universal delegation threshold.',
  )

  return lines.join('\n')
}
