import type {
  AssessmentDimension,
  AssessmentQuestion,
  Source,
} from './types'

export const verifiedDate = '2026-09-21'

export const sources: Source[] = [
  {
    id: 'aes-framework',
    title: "GitHub's Agentic Engineering System",
    url: 'https://github.com/resources/insights/agentic-engineering-system',
    category: 'AES framework',
  },
  {
    id: 'aes-well-architected',
    title: 'Building an Agentic Engineering System on GitHub',
    url: 'https://learn.github.com/well-architected/governance/recommendations/agentic-engineering-system-on-github',
    category: 'GitHub Well-Architected',
  },
  {
    id: 'rulesets',
    title: 'About rulesets',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets',
    category: 'GitHub Docs',
  },
  {
    id: 'codeowners',
    title: 'About code owners',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners',
    category: 'GitHub Docs',
  },
  {
    id: 'environments',
    title: 'Managing environments for deployment',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/actions/deployment/targeting-different-environments/managing-environments-for-deployment',
    category: 'GitHub Docs',
  },
  {
    id: 'security-configurations',
    title: 'Creating a custom security configuration',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/code-security/how-tos/secure-at-scale/configure-organization-security/establish-complete-coverage/create-custom-configuration',
    category: 'GitHub Docs',
  },
  {
    id: 'audit-log',
    title: 'About the audit log for your enterprise',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/about-the-audit-log-for-your-enterprise',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-policies',
    title: 'Managing Copilot policies and features for your enterprise',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-agent-access',
    title: 'Managing access to GitHub Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/cloud-agent-access',
    category: 'GitHub Docs',
  },
  {
    id: 'custom-instructions',
    title: 'Adding repository custom instructions for GitHub Copilot',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions',
    category: 'GitHub Docs',
  },
  {
    id: 'custom-instructions-support',
    title: 'Support for different types of custom instructions',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/custom-instructions-support',
    category: 'GitHub Docs',
  },
  {
    id: 'custom-properties',
    title: 'Managing custom properties for repositories',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-agent',
    title: 'About GitHub Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/cloud-agent/about-cloud-agent',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-agent-guardrails',
    title: 'Building guardrails for GitHub Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/cloud-agent/build-guardrails',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-code-review',
    title: 'Using GitHub Copilot code review',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review',
    category: 'GitHub Docs',
  },
  {
    id: 'issue-templates',
    title: 'Configuring issue templates for your repository',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository',
    category: 'GitHub Docs',
  },
  {
    id: 'dependency-graph',
    title: 'About the dependency graph',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph',
    category: 'GitHub Docs',
  },
  {
    id: 'mcp-servers',
    title: 'Configure MCP servers for your repository',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-hooks',
    title: 'Customize agent workflows with hooks',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/use-hooks',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-firewall',
    title: 'Customizing or disabling the firewall for GitHub Copilot',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall',
    category: 'GitHub Docs',
  },
  {
    id: 'agent-environment',
    title: 'Configure the development environment for Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-metrics',
    title: 'Data available in Copilot usage metrics',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/copilot-usage-metrics/copilot-usage-metrics',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-metrics-api',
    title: 'REST API endpoints for Copilot usage metrics',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/rest/copilot/copilot-usage-metrics',
    category: 'GitHub Docs',
  },
  {
    id: 'copilot-billing-update',
    title: 'Updates to GitHub Copilot billing and plans',
    url: 'https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/',
    category: 'GitHub Changelog',
  },
  {
    id: 'copilot-ruleset-bypass',
    title: 'Configure Copilot coding agent as a bypass actor for rulesets',
    url: 'https://github.blog/changelog/2025-11-13-configure-copilot-coding-agent-as-a-bypass-actor-for-rulesets/',
    category: 'GitHub Changelog',
  },
]

export const dimensionContent: Record<
  AssessmentDimension,
  {
    label: string
    eyebrow: string
    description: string
  }
> = {
  preconditions: {
    label: 'Operating preconditions',
    eyebrow: 'Readiness gate',
    description:
      'Confirm the conditions AES assumes before interpreting a Stock-Adoption placement.',
  },
  governance: {
    label: 'Governance',
    eyebrow: 'Leading stock',
    description:
      'Check whether agent boundaries are explicit, proportional to risk, and independently enforced.',
  },
  knowledge: {
    label: 'Shared knowledge',
    eyebrow: 'Leading stock',
    description:
      'Check whether the scoped workflow has current guidance, clear work definition, and discoverable context.',
  },
  adoption: {
    label: 'Agent participation',
    eyebrow: 'Position, not maturity',
    description:
      'Record how agents participate in define, deliver, and detect. More participation is not automatically better.',
  },
  value: {
    label: 'Customer value',
    eyebrow: 'Outcome stock',
    description:
      'Check whether delivery is connected to a named outcome and whether quality and correction cost are visible.',
  },
  learning: {
    label: 'System learning',
    eyebrow: 'Feedback loop',
    description:
      'Check whether evidence changes governance, shared knowledge, and the next cycle of work.',
  },
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'precondition-infrastructure',
    dimension: 'preconditions',
    scale: 'readiness',
    title: 'Reliable delivery path',
    prompt:
      'Can the scoped workflow complete its standard build, test, and deployment path reliably?',
    evidence: [
      'A representative change follows a documented path from pull request to the intended environment.',
      'Required checks and deployment approvals fail closed when deliberately tested.',
      'Runner, AI Credit, and Actions-minute budgets are reviewed for the planned volume.',
    ],
    action: {
      title: 'Prove the delivery path before expanding agent work',
      detail:
        'Run one representative change through the same build, test, review, and deployment controls the agent will use.',
    },
    sourceIds: [
      'cloud-agent-guardrails',
      'environments',
      'agent-environment',
      'copilot-billing-update',
    ],
  },
  {
    id: 'precondition-skills',
    dimension: 'preconditions',
    scale: 'readiness',
    title: 'Accountable human capability',
    prompt:
      'Is a named human able to direct and assess this workflow?',
    evidence: [
      'A named owner can define intent, identify unacceptable trade-offs, and stop the workflow.',
      'Reviewers can distinguish task completion from correct, useful, and safe outcomes.',
    ],
    action: {
      title: 'Assign and calibrate human directors and assessors',
      detail:
        'This capability gap cannot be fixed by a GitHub setting. Name accountable people and run a review-calibration exercise before delegation.',
    },
    sourceIds: ['aes-framework'],
  },
  {
    id: 'precondition-culture',
    dimension: 'preconditions',
    scale: 'readiness',
    title: 'Permission to challenge agent work',
    prompt:
      'Can participants challenge or stop agent work without pressure to maximize automation?',
    evidence: [
      'The pilot charter prioritizes reliability and customer value over agent-usage targets.',
      'A named escalation contact accepts concerns, failures, and near misses.',
    ],
    action: {
      title: 'Set the operating expectations outside GitHub',
      detail:
        'No repository control creates psychological safety. Publish the pilot charter, escalation route, and decision owner before the readiness check continues.',
    },
    sourceIds: ['aes-framework'],
  },
  {
    id: 'precondition-access',
    dimension: 'preconditions',
    scale: 'readiness',
    title: 'Approved context access',
    prompt:
      'Can the agent retrieve only the approved context required for this workflow?',
    evidence: [
      'The repository, tool, MCP, secret, and network scope is explicitly listed.',
      'An out-of-scope repository or tool is denied in a test session.',
    ],
    action: {
      title: 'Define and test the approved context boundary',
      detail:
        'Restrict the pilot to selected repositories and tools, then test both an allowed request and a denied out-of-scope request.',
    },
    sourceIds: [
      'cloud-agent-access',
      'mcp-servers',
      'copilot-firewall',
      'copilot-policies',
    ],
  },
  {
    id: 'governance-scope',
    dimension: 'governance',
    scale: 'readiness',
    title: 'Enforced operating scope',
    prompt:
      'Is the permitted agent scope explicit and enforced?',
    evidence: [
      'Enterprise or organization policy identifies the enabled organizations and repositories.',
      'Repository MCP, firewall, hook, setup-step, and instruction files have named owners.',
      'Repositories outside the approved class are excluded from cloud-agent access.',
    ],
    action: {
      title: 'Enforce the pilot boundary in GitHub',
      detail:
        'Align enterprise and organization access, repository MCP tools, network access, hooks, and protected configuration files with the declared scope.',
    },
    sourceIds: [
      'copilot-policies',
      'cloud-agent-access',
      'mcp-servers',
      'copilot-hooks',
      'copilot-firewall',
      'cloud-agent-guardrails',
    ],
  },
  {
    id: 'governance-proportionality',
    dimension: 'governance',
    scale: 'readiness',
    title: 'Risk-proportional flow',
    prompt:
      'Do review gates match task risk without needlessly queueing low-risk work?',
    evidence: [
      'Repository custom properties classify the workflow by impact and reversibility.',
      'Organization rulesets target repository classes, while repository rules handle local branch requirements.',
      'Any cloud-agent bypass is limited to the minimum incompatible rule and reviewed explicitly.',
      'Low-risk work can proceed without manual gates that add no assessment value.',
    ],
    action: {
      title: 'Make GitHub controls proportional to task risk',
      detail:
        'Use organization custom properties and rulesets to separate low-risk flow from high-impact review, then test both paths.',
    },
    sourceIds: [
      'aes-framework',
      'custom-properties',
      'rulesets',
      'cloud-agent-guardrails',
      'copilot-ruleset-bypass',
    ],
  },
  {
    id: 'governance-layered',
    dimension: 'governance',
    scale: 'readiness',
    title: 'Independent production controls',
    prompt:
      'Can a change reach production only through controls independent of the agent?',
    evidence: [
      'Required checks, environment approvals, and security configuration apply to agent and human pull requests.',
      'A test change can be traced from identity to pull request, checks, approval, merge, and deployment.',
    ],
    action: {
      title: 'Layer merge, deployment, security, and audit controls',
      detail:
        'Keep required checks, environment approvals, security configurations, and attribution independent of how the change was authored.',
    },
    sourceIds: [
      'rulesets',
      'codeowners',
      'environments',
      'security-configurations',
      'audit-log',
      'cloud-agent-guardrails',
    ],
  },
  {
    id: 'knowledge-guidance',
    dimension: 'knowledge',
    scale: 'readiness',
    title: 'Usable repository guidance',
    prompt:
      'Can a new contributor follow current repository guidance to validate work?',
    evidence: [
      'A clean clone can run every documented build, test, and lint command successfully.',
      'Repository-wide, path-specific, agent, and organization instructions are used only where supported.',
      'Instruction files name an owner and review date.',
    ],
    action: {
      title: 'Build a tested instruction hierarchy',
      detail:
        'Use the supported instruction scopes for the workflow and validate the documented commands from a clean environment.',
    },
    sourceIds: [
      'custom-instructions',
      'custom-instructions-support',
      'agent-environment',
    ],
  },
  {
    id: 'knowledge-definition',
    dimension: 'knowledge',
    scale: 'readiness',
    title: 'Evidence-based work definition',
    prompt:
      'Does each task define the intended outcome before delivery starts?',
    evidence: [
      'The issue records acceptance criteria, constraints, affected systems, and validation evidence.',
      'The task is small enough for one repository and one reviewable pull request.',
    ],
    action: {
      title: 'Create a bounded agent-task issue form',
      detail:
        'Require the outcome, constraints, affected systems, acceptance criteria, and evidence before starting a Copilot cloud-agent session.',
    },
    sourceIds: ['aes-framework', 'issue-templates', 'cloud-agent'],
  },
  {
    id: 'knowledge-context',
    dimension: 'knowledge',
    scale: 'readiness',
    title: 'Discoverable ownership and context',
    prompt:
      'Can participants find the current owner and decision context for the task?',
    evidence: [
      'CODEOWNERS and repository properties identify accountable teams.',
      'The task links relevant architecture decisions, dependencies, and operational signals.',
    ],
    action: {
      title: 'Connect ownership, decisions, dependencies, and signals',
      detail:
        'Make the accountable owner and the context needed for this workflow discoverable from the issue and repository.',
    },
    sourceIds: [
      'codeowners',
      'custom-properties',
      'dependency-graph',
      'aes-framework',
    ],
  },
  {
    id: 'adoption-define',
    dimension: 'adoption',
    scale: 'participation',
    title: 'Define participation',
    prompt:
      'What is the highest agent participation used in Define for this workflow?',
    evidence: [
      'Assists: synthesizes evidence or drafts acceptance criteria under human direction.',
      'Performs: proposes scope and a plan from approved context.',
      'Performs and assesses: challenges its proposed plan against constraints before a human decision.',
    ],
    action: {
      title: 'Pilot agent support in Define',
      detail:
        'Use a Copilot cloud-agent planning session only after the task context and accountable human director are established.',
    },
    sourceIds: ['aes-framework', 'cloud-agent'],
  },
  {
    id: 'adoption-deliver',
    dimension: 'adoption',
    scale: 'participation',
    title: 'Deliver participation',
    prompt:
      'What is the highest agent participation used in Deliver for this workflow?',
    evidence: [
      'Assists: drafts code or tests while a human performs the change.',
      'Performs: creates a bounded change and reviewable pull request.',
      'Performs and assesses: runs checks and compares the result with task evidence before review.',
    ],
    action: {
      title: 'Pilot one bounded delivery class',
      detail:
        'Choose a reversible issue class that fits one repository, one pull request, and the cloud-agent session limit.',
    },
    sourceIds: ['aes-framework', 'cloud-agent', 'cloud-agent-guardrails'],
  },
  {
    id: 'adoption-detect',
    dimension: 'adoption',
    scale: 'participation',
    title: 'Detect participation',
    prompt:
      'What is the highest agent participation used in Detect for this workflow?',
    evidence: [
      'Assists: summarizes a named run, alert, or customer signal.',
      'Performs: correlates approved evidence and opens a human-owned finding.',
      'Performs and assesses: checks signal quality and identifies missing evidence before escalation.',
    ],
    action: {
      title: 'Pilot evidence-linked detection',
      detail:
        'Start from a specific GitHub Actions run, alert, deployment, or metric and route the result to a human-owned issue.',
    },
    sourceIds: ['aes-framework', 'cloud-agent', 'copilot-metrics'],
  },
  {
    id: 'value-outcomes',
    dimension: 'value',
    scale: 'readiness',
    title: 'Named customer outcome',
    prompt:
      'Is delivery connected to a named customer or operational outcome?',
    evidence: [
      'The issue names the metric source, baseline window, expected change, and follow-up date.',
      'The pull request and deployment link back to the outcome issue.',
    ],
    action: {
      title: 'Define the outcome before delivery',
      detail:
        'Record a measurable customer or operational outcome, its source, and the comparison window in the issue.',
    },
    sourceIds: ['aes-framework', 'copilot-metrics', 'copilot-metrics-api'],
  },
  {
    id: 'value-quality',
    dimension: 'value',
    scale: 'readiness',
    title: 'Quality and correction cost',
    prompt:
      'Are quality and correction cost tracked alongside delivery speed?',
    evidence: [
      'A baseline and comparison window record merged pull requests, time to merge, review effort, failed checks, rework, and defects.',
      'Copilot usage metrics or a documented repository query provides the source data.',
      'AI Credit and Actions-minute usage is reviewed with the delivery evidence.',
    ],
    action: {
      title: 'Measure quality, correction cost, and usage together',
      detail:
        'Use Copilot usage metrics and linked workflow evidence to compare speed with rework, defects, review effort, AI Credits, and Actions minutes.',
    },
    sourceIds: [
      'aes-framework',
      'copilot-metrics',
      'copilot-metrics-api',
      'copilot-billing-update',
    ],
  },
  {
    id: 'learning-loop',
    dimension: 'learning',
    scale: 'readiness',
    title: 'Evidence changes the system',
    prompt:
      'Does outcome evidence change the next cycle of work?',
    evidence: [
      'A finding links to a changed issue form, instruction, test, rule, policy, or product decision.',
      'The change is verified before the finding is closed.',
    ],
    action: {
      title: 'Close the learning loop in GitHub',
      detail:
        'Route material findings to owned issues and link each one to the merged or configured change that improves the next cycle.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected', 'audit-log'],
  },
]
