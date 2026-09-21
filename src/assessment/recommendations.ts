import { githubImplementations } from './githubActions'
import { assessmentQuestions, sources, verifiedDate } from './questions'
import type {
  ActionItem,
  ActionPhase,
  Answers,
  AssessmentQuestion,
  AssessmentResult,
  ResponseValue,
} from './types'

const phaseOrder: ActionPhase[] = ['do-first', 'do-next', 'measure', 'expand']

const dimensionOrder: AssessmentQuestion['dimension'][] = [
  'preconditions',
  'knowledge',
  'governance',
  'learning',
  'value',
  'adoption',
]

export const phaseContent: Record<
  ActionPhase,
  { label: string; description: string }
> = {
  'do-first': {
    label: 'Do first',
    description: 'Resolve the conditions that make placement unreliable.',
  },
  'do-next': {
    label: 'Strengthen the system',
    description:
      'Improve the weaker foundation and the learning loop before expansion.',
  },
  measure: {
    label: 'Measure before expansion',
    description:
      'Make customer value, quality, correction cost, and usage observable.',
  },
  expand: {
    label: 'Expand safely',
    description:
      'Add one bounded participation pattern supported by healthy foundations.',
  },
}

function phaseForQuestion(
  question: AssessmentQuestion,
  result: AssessmentResult,
): ActionPhase {
  if (question.dimension === 'preconditions') {
    return 'do-first'
  }
  if (question.dimension === 'value') {
    return 'measure'
  }
  if (question.dimension === 'adoption') {
    return 'expand'
  }
  if (
    question.dimension === 'knowledge' ||
    question.dimension === 'governance' ||
    question.dimension === 'learning'
  ) {
    return 'do-next'
  }
  return result.adoption.performerActivities >= 2 ? 'measure' : 'do-next'
}

function quadrantAction(result: AssessmentResult): ActionItem | null {
  if (!result.quadrant) {
    return null
  }

  const actions: Record<string, ActionItem> = {
    underdeveloped: {
      id: 'quadrant-underdeveloped',
      phase: 'do-next',
      primary: true,
      title: 'Strengthen the weaker foundation before delegation expands',
      detail:
        'Low agent participation is appropriate here. Focus the next cycle on governance and shared knowledge, not on increasing agent use.',
      implementation: {
        kind: 'github',
        surface:
          'Repository instructions and issue forms; organization custom properties and rulesets',
        steps: [
          'Use the weaker stock shown in the result to select the first foundation action.',
          'Implement and test that action in one representative repository.',
          'Repeat the readiness check for the same scoped workflow before enabling another agent-performed activity.',
        ],
        verification: [
          'Both governance and shared knowledge reach Established for the scoped workflow.',
          'The weaker stock independently reaches Established.',
        ],
      },
      sourceIds: ['aes-framework', 'aes-well-architected'],
    },
    underused: {
      id: 'quadrant-underused',
      phase: 'expand',
      primary: true,
      title: 'Pilot one bounded agent-performed activity',
      detail:
        'The foundations support a controlled expansion. Choose one activity, not an organization-wide rollout.',
      implementation: {
        kind: 'github',
        surface:
          'GitHub Issues, Copilot cloud-agent sessions, pull requests, and required checks',
        steps: [
          'Choose Define, Deliver, or Detect based on the lowest-risk useful task class.',
          'Create a bounded issue with outcome, constraints, acceptance criteria, and validation evidence.',
          'Run the pilot with the existing rulesets, accountable review, and deployment protections.',
          'Record quality, correction cost, AI Credits, Actions minutes, and the named outcome before deciding whether to repeat it.',
        ],
        verification: [
          'The task stays within one repository and one independently reviewable pull request or finding.',
          'The pilot decision links to measured quality and outcome evidence.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'cloud-agent',
        'rulesets',
        'copilot-metrics',
      ],
    },
    stretched: {
      id: 'quadrant-stretched',
      phase: 'do-first',
      primary: true,
      title: 'Narrow agent participation while foundations recover',
      detail:
        'Do not add another agent-performed activity. Restrict the current scope and repair the weaker foundation first.',
      implementation: {
        kind: 'github',
        surface:
          'Enterprise or organization cloud-agent access, repository custom properties, rulesets, and owned issues',
        steps: [
          'Restrict cloud-agent access to the repositories and task class with verified controls.',
          'Use repository properties to identify the stretched workflow class and target stricter organization rulesets.',
          'Open owned issues for every missing knowledge or governance control.',
          'Measure customer value, quality, and correction cost before re-expanding.',
        ],
        verification: [
          'Out-of-scope repositories cannot start the expanded workflow.',
          'Every foundation gap and value gap has a GitHub owner, artifact, and verification step.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'cloud-agent-access',
        'custom-properties',
        'rulesets',
        'copilot-metrics',
      ],
    },
    healthy: {
      id: 'quadrant-healthy',
      phase: 'expand',
      primary: true,
      title: 'Expand one workflow class and preserve the evidence loop',
      detail:
        'Broader participation is supported for this scope, but expansion still happens one bounded workflow at a time.',
      implementation: {
        kind: 'github',
        surface:
          'GitHub Issues, Copilot cloud agent, code review, pull requests, deployments, and usage metrics',
        steps: [
          'Select the next workflow class using completed pilot evidence.',
          'Reuse the tested issue form, instructions, rulesets, hooks, review, and deployment path.',
          'Record repository-level cloud-agent activity, quality, correction cost, AI Credits, Actions minutes, and the named outcome.',
          'Update the readiness check when evidence changes the workflow or its risk.',
        ],
        verification: [
          'The expanded workflow preserves Established governance and shared knowledge.',
          'The comparison window shows acceptable quality, correction cost, usage, and customer or operational outcome.',
        ],
      },
      sourceIds: [
        'aes-framework',
        'cloud-agent',
        'copilot-code-review',
        'copilot-metrics',
        'copilot-billing-update',
      ],
    },
  }

  return actions[result.quadrant.id]
}

function shouldIncludeQuestionAction(
  question: AssessmentQuestion,
  value: ResponseValue,
  result: AssessmentResult,
) {
  if (question.dimension === 'adoption') {
    return result.quadrant?.id === 'underused' && value < 2
  }
  return value < 2
}

export function buildActionPlan(
  answers: Answers,
  result: AssessmentResult,
): ActionItem[] {
  const items: Array<
    ActionItem & {
      value: ResponseValue
      dimension: AssessmentQuestion['dimension']
    }
  > = []

  for (const question of assessmentQuestions) {
    const value = answers[question.id]
    if (
      value === undefined ||
      !shouldIncludeQuestionAction(question, value, result)
    ) {
      continue
    }

    const implementation = githubImplementations[question.id]
    if (!implementation) {
      throw new Error(`Missing implementation guide for ${question.id}`)
    }

    items.push({
      id: `question-${question.id}`,
      phase: phaseForQuestion(question, result),
      title: question.action.title,
      detail: question.action.detail,
      implementation,
      sourceIds: question.sourceIds,
      questionId: question.id,
      value,
      dimension: question.dimension,
    })
  }

  items.sort((left, right) => {
    const phaseDifference =
      phaseOrder.indexOf(left.phase) - phaseOrder.indexOf(right.phase)
    if (phaseDifference !== 0) {
      return phaseDifference
    }
    const dimensionDifference =
      dimensionOrder.indexOf(left.dimension) -
      dimensionOrder.indexOf(right.dimension)
    if (dimensionDifference !== 0) {
      return dimensionDifference
    }
    if (left.value !== right.value) {
      return left.value - right.value
    }
    return left.title.localeCompare(right.title)
  })

  const primary = quadrantAction(result)
  const actionPlan: ActionItem[] = primary ? [primary, ...items] : items

  return actionPlan.filter(
    (item, index, all) =>
      all.findIndex((candidate) => candidate.id === item.id) === index,
  )
}

export function exportAssessmentMarkdown(
  scope: string,
  result: AssessmentResult,
  actions: ActionItem[],
): string {
  const sourceMap = new Map(sources.map((source) => [source.id, source]))
  const placementStatusLabels = {
    'scope-required': 'Name the workflow before placement.',
    'preconditions-required':
      'Resolve operating preconditions before placement.',
    'core-incomplete':
      'Complete governance, shared knowledge, and participation before placement.',
    ready: 'Placement available.',
  } as const
  const lines = [
    '# Agentic Engineering readiness check',
    '',
    '> Independent, unofficial resource. Not published or endorsed by GitHub, Inc. The AES framework and quadrant model are GitHub publications; this readiness check, scoring, and thresholds are not.',
    '',
    `- Scope: ${scope.trim() || 'Not specified'}`,
    `- Content verified: ${verifiedDate}`,
    `- Operating baseline: ${result.preconditionsReady ? 'Ready' : `${result.baselineAnswered} of ${result.baselineTotal} items answered; unresolved items remain`}`,
    `- Placement: ${result.quadrant?.label ?? 'Not available'}`,
    `- Placement status: ${placementStatusLabels[result.placementStatus]}`,
    `- Governance: ${result.dimensions.governance.band}${result.dimensions.governance.score === null ? '' : ` (${result.dimensions.governance.score}%)`}`,
    `- Shared knowledge: ${result.dimensions.knowledge.band}${result.dimensions.knowledge.score === null ? '' : ` (${result.dimensions.knowledge.score}%)`}`,
    `- Agent participation: ${result.adoption.label}`,
    `- Customer value: ${result.dimensions.value.band} (${result.dimensions.value.answered} of ${result.dimensions.value.total} items answered)`,
    `- System learning: ${result.dimensions.learning.band} (${result.dimensions.learning.answered} of ${result.dimensions.learning.total} item answered)`,
    '',
    'Foundation scores are rounded down to the nearest 5 and shown only when every item in the stock is answered. Customer value and system learning use completed-item bands without percentages. Stock-Adoption placement uses the weaker of governance and shared knowledge.',
    '',
  ]

  if (result.unresolvedPreconditions.length > 0) {
    lines.push('## Preconditions needing attention', '')
    for (const question of result.unresolvedPreconditions) {
      lines.push(`- ${question.title}`)
    }
    lines.push('')
  }

  if (result.quadrant) {
    lines.push(
      result.quadrant.summary,
      '',
      `Next move: ${result.quadrant.nextMove}`,
      '',
    )
  }

  lines.push('## Implementation plan', '')

  if (actions.length === 0) {
    lines.push('Complete the readiness check to generate actions.', '')
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
        lines.push(`- **${action.title}.** ${action.detail}`)
        lines.push(
          `  - ${action.implementation.kind === 'github' ? 'GitHub surface' : 'Implementation surface'}: ${action.implementation.surface}`,
        )
        lines.push('  - Implement:')
        for (const step of action.implementation.steps) {
          lines.push(`    - ${step}`)
        }
        lines.push('  - Verify:')
        for (const evidence of action.implementation.verification) {
          lines.push(`    - ${evidence}`)
        }
        if (links) {
          lines.push(`  - Sources: ${links}`)
        }
      }
      lines.push('')
    }
  }

  lines.push(
    'Run this readiness check separately for each team, repository class, or workflow. Risk appetite and consequence of failure determine the real delegation boundary.',
  )

  return lines.join('\n')
}
