import type { GitHubImplementation } from './types'

export const githubImplementations: Record<string, GitHubImplementation> = {
  'precondition-infrastructure': {
    surface:
      'Repository settings: Actions, Environments, and Code security configurations',
    steps: [
      'Choose one representative pilot repository and make its default build, test, and lint workflow required before merge.',
      'Create a protected staging environment and require a reviewer for deployments that change customer-facing or production systems.',
      'Apply an organization security configuration so code scanning, secret scanning, and dependency controls are consistent across the pilot repositories.',
    ],
    verification: [
      'A pull request cannot merge when the required workflow fails.',
      'A staging or production deployment records the approving reviewer.',
      'The repository appears under the intended organization security configuration.',
    ],
  },
  'precondition-skills': {
    surface:
      'Repository files: .github/CODEOWNERS, pull request template, and review guidance',
    steps: [
      'Add CODEOWNERS entries for application code, workflows, infrastructure, security configuration, and repository instructions.',
      'Add a pull request checklist that asks reviewers to confirm intent, evidence, rollback, and customer impact for agent-authored changes.',
      'Require the relevant code owner review for sensitive paths through a ruleset or protected branch.',
    ],
    verification: [
      'A pull request changing a sensitive path automatically requests the expected owner.',
      'The pull request template makes assessment evidence visible before approval.',
    ],
  },
  'precondition-culture': {
    surface: 'GitHub Issues: issue forms, labels, and a recurring review issue',
    steps: [
      'Create an issue form for agent failures and near misses with fields for the task, missing context, failed control, impact, and follow-up owner.',
      'Add labels such as agent-failure, context-gap, control-gap, and review-burden.',
      'Open a recurring monthly issue that reviews unresolved failures and records changes to instructions, rulesets, or policies.',
    ],
    verification: [
      'Teams can report an agent failure without using free-form private notes.',
      'Every accepted finding has an owner and a linked repository or policy change.',
    ],
  },
  'precondition-access': {
    surface:
      'Enterprise AI controls, organization Copilot policies, and repository access',
    steps: [
      'Limit the initial Copilot and agent rollout to named organizations, repositories, and pilot teams.',
      'Document which GitHub identities and approved tools may read or write each repository class.',
      'Review repository access and remove unrelated repositories, package scopes, secrets, and environments from the pilot path.',
    ],
    verification: [
      'A pilot user can identify the enterprise or organization policy governing the workflow.',
      'The agent cannot access an out-of-scope repository or protected environment.',
    ],
  },
  'governance-scope': {
    surface: 'Enterprise settings → AI controls → Copilot',
    steps: [
      'Record which Copilot features and agent entry points are enabled for each pilot organization.',
      'Define approved repositories, GitHub identities, MCP servers, plugins, and write operations in a repository-linked policy document.',
      'Keep non-pilot organizations and repositories disabled until their foundations are assessed.',
    ],
    verification: [
      'The enabled organization list matches the documented pilot scope.',
      'A repository owner can link from the pilot repository to the policy that governs it.',
    ],
  },
  'governance-risk': {
    surface: 'Organization settings → Repository → Custom properties and Rulesets',
    steps: [
      'Create repository properties such as agent_risk, data_classification, and deployment_impact with controlled values.',
      'Assign values to pilot repositories and require owners to review them when the repository purpose changes.',
      'Target rulesets and review requirements using those properties instead of maintaining manual repository lists.',
    ],
    verification: [
      'Every pilot repository has a risk and impact value.',
      'Changing a repository property changes the applicable ruleset as expected.',
    ],
  },
  'governance-review': {
    surface: 'Repository settings → Rules → Rulesets, plus .github/CODEOWNERS',
    steps: [
      'Create a branch ruleset for the default branch that requires pull requests, status checks, resolved conversations, and code owner review where needed.',
      'Add CODEOWNERS coverage for workflows, infrastructure, security configuration, and production-critical code.',
      'Test the ruleset with a pull request that intentionally fails one required check.',
    ],
    verification: [
      'The test pull request cannot merge while a required check or review is missing.',
      'Ruleset insights show the rule evaluating the pilot repository.',
    ],
  },
  'governance-deployment': {
    surface:
      'Repository settings → Environments and organization Code security → Configurations',
    steps: [
      'Create separate staging and production environments with scoped secrets and deployment branches.',
      'Require human approval for production and for changes with difficult-to-reverse customer impact.',
      'Apply the intended security configuration and review dependency graph coverage for the repository.',
    ],
    verification: [
      'An agent-authored pull request can deploy to staging but cannot deploy to production without the configured approval.',
      'Security configuration and dependency graph status are visible for the repository.',
    ],
  },
  'governance-audit': {
    surface: 'Enterprise settings → Audit log and repository pull request history',
    steps: [
      'Create saved audit searches for Copilot policy changes, repository access changes, ruleset changes, and workflow or deployment activity.',
      'Require agent work to use attributable GitHub identities and reviewable pull requests.',
      'Document the audit search and pull request evidence responders should collect during an incident.',
    ],
    verification: [
      'A reviewer can trace a test change from identity to pull request, checks, approval, merge, and deployment.',
      'The saved audit searches return the expected policy or repository events.',
    ],
  },
  'governance-learning': {
    surface: 'GitHub Issues linked to rulesets, policies, workflows, and audit evidence',
    steps: [
      'Use the agent-failure issue form for exceptions, near misses, and repeated review friction.',
      'Link each accepted finding to the ruleset, Copilot policy, workflow, CODEOWNERS entry, or instruction change that addresses it.',
      'Close the issue only after the control change is tested in a pull request or pilot workflow.',
    ],
    verification: [
      'Every closed governance finding links to a tested GitHub configuration or repository change.',
      'Temporary exceptions include an owner and review date.',
    ],
  },
  'knowledge-repository': {
    surface:
      'Repository file: .github/copilot-instructions.md and repository README',
    steps: [
      'Create .github/copilot-instructions.md with the supported build, test, lint, architecture, and validation paths.',
      'State boundaries explicitly, including files that must not change, operations requiring approval, and the expected pull request evidence.',
      'Link to deeper architecture and runbook documents instead of copying large, stale context into the instruction file.',
    ],
    verification: [
      'A fresh Copilot task uses the documented commands without correction.',
      'A reviewer can identify the owner and last verification date for the instructions.',
    ],
  },
  'knowledge-decisions': {
    surface:
      'Repository files: .github/CODEOWNERS and docs/adr/, plus repository custom properties',
    steps: [
      'Add CODEOWNERS entries that identify accountable teams for services, workflows, and architecture documents.',
      'Store active architecture decisions under docs/adr/ and link relevant decisions from issues and pull requests.',
      'Use repository custom properties for owner, service tier, data classification, and deployment impact where those values drive governance.',
    ],
    verification: [
      'An engineer unfamiliar with the repository can find the owner and relevant decision record from the repository.',
      'The repository properties match the current service and risk classification.',
    ],
  },
  'knowledge-definition': {
    surface: 'Repository files: .github/ISSUE_TEMPLATE/*.yml',
    steps: [
      'Create an agent-task issue form with required fields for outcome, customer context, constraints, acceptance criteria, affected systems, and validation.',
      'Add a risk field that distinguishes reversible, low-impact work from changes requiring deeper direction and review.',
      'Require links to relevant code, decisions, telemetry, or prior issues before the task can enter delivery.',
    ],
    verification: [
      'A new agent task cannot be submitted without acceptance criteria and validation evidence.',
      'A reviewer can decide whether the issue is safe to delegate without a separate discovery meeting.',
    ],
  },
  'knowledge-signals': {
    surface: 'GitHub Issues and pull requests linked to alerts, deployments, and external telemetry',
    steps: [
      'Add issue fields for the alert, dashboard, support pattern, customer feedback, or usage signal that triggered the work.',
      'Link the delivery pull request and deployment back to the issue.',
      'Record the expected signal change and a follow-up date in the issue before merge.',
    ],
    verification: [
      'The issue connects the original signal, implementation pull request, deployment, and observed outcome.',
      'The follow-up records whether the signal improved, stayed flat, or regressed.',
    ],
  },
  'knowledge-freshness': {
    surface:
      'CODEOWNERS, scheduled GitHub Actions workflows, and documentation pull requests',
    steps: [
      'Assign owners to instructions, runbooks, schemas, and architecture records through CODEOWNERS.',
      'Add a scheduled workflow that checks links, generated schemas, or documented commands that can be validated automatically.',
      'Open an issue or pull request when a check fails instead of allowing stale guidance to remain silent.',
    ],
    verification: [
      'A deliberately broken documentation link or command fails the scheduled workflow.',
      'Critical knowledge files have an accountable reviewer.',
    ],
  },
  'knowledge-learning': {
    surface: 'Pull request template, docs/adr/, repository instructions, and linked issues',
    steps: [
      'Add a pull request prompt asking what the change taught the team and which durable document needs an update.',
      'Update the relevant ADR, runbook, schema, or Copilot instruction in the same pull request when the learning changes future work.',
      'Link incidents and review findings to the durable update that incorporates the lesson.',
    ],
    verification: [
      'Repeated tasks use the updated guidance without rediscovering the same constraint.',
      'A closed incident or review finding links to a merged knowledge update.',
    ],
  },
  'adoption-define': {
    surface: 'GitHub Issues and Copilot cloud agent planning sessions',
    steps: [
      'Start with a structured agent-task issue containing customer context, constraints, acceptance criteria, and source links.',
      'Ask Copilot cloud agent to research the repository and propose a plan before requesting code changes.',
      'Have the human director edit or approve the plan and record unresolved trade-offs in the issue.',
    ],
    verification: [
      'The approved plan cites repository evidence and matches the issue acceptance criteria.',
      'Human decisions and unresolved trade-offs are visible before delivery starts.',
    ],
  },
  'adoption-deliver': {
    surface: 'GitHub Issues → Copilot cloud agent → pull requests',
    steps: [
      'Select one low-risk issue class such as documentation, test coverage, or a small reversible bug fix.',
      'Start a Copilot cloud agent session from the issue and require it to open a pull request with tests and a concise evidence summary.',
      'Keep branch rules, required checks, code owner review, and environment protections identical to comparable human work.',
    ],
    verification: [
      'The pull request links to the issue, passes required checks, and can be reverted independently.',
      'Review effort and rework are recorded for the pilot task class.',
    ],
  },
  'adoption-assess': {
    surface: 'Pull request reviewers → Copilot code review plus accountable human review',
    steps: [
      'Request a Copilot code review on pilot pull requests and keep its comments visible as assessment evidence.',
      'Retain required human or code owner approval for work with customer, security, architecture, or production impact.',
      'Track recurring Copilot findings and convert useful patterns into tests, rules, or repository instructions.',
    ],
    verification: [
      'Copilot review comments do not silently replace the required accountable reviewer.',
      'Repeated findings lead to a durable automated check or instruction update.',
    ],
  },
  'adoption-detect': {
    surface:
      'Failing GitHub Actions runs, security alerts, audit findings, and linked GitHub Issues',
    steps: [
      'Choose one recurring detection source, such as a failing workflow, dependency alert, or deployment regression.',
      'Start a Copilot cloud agent session to investigate and summarize evidence, without granting automatic production remediation.',
      'Route the result to an issue with an owner, severity, proposed next step, and links to the source evidence.',
    ],
    verification: [
      'The investigation links to the originating run or alert and identifies evidence separately from assumptions.',
      'A human-owned issue decides whether remediation should proceed.',
    ],
  },
  'adoption-portfolio': {
    surface:
      'Repository custom properties, issue labels, rulesets, and Copilot policies',
    steps: [
      'Create an agent_participation property with values such as none, assist, perform, and assess.',
      'Set the property per repository or workflow class and document which human mode remains accountable.',
      'Use labels or issue form fields to mark the intended participation mode for each agent task.',
    ],
    verification: [
      'A repository and task show the intended agent participation before work starts.',
      'Rulesets and policies remain stricter for higher-impact repository classes.',
    ],
  },
  'adoption-evidence': {
    surface: 'GitHub Issues, pull requests, checks, review history, and deployment records',
    steps: [
      'Add pilot labels for the task class and whether Copilot acted in define, perform, assess, or detect.',
      'Record task success, review effort, rework, failed checks, rollback, and escaped defects in the linked issue.',
      'Review the evidence before enabling the same task class in another repository or organization.',
    ],
    verification: [
      'The expansion decision links to a sample of completed pull requests and outcome evidence.',
      'Scope narrows when rework, incidents, or review burden exceed the agreed boundary.',
    ],
  },
  'value-outcomes': {
    surface: 'GitHub Issues, pull requests, deployments, and Projects fields',
    steps: [
      'Add an outcome field to the issue form for adoption, reliability, support volume, trust, or another customer result.',
      'Link the implementation pull request and deployment to the issue.',
      'Set an owner and follow-up date for recording the observed outcome after release.',
    ],
    verification: [
      'The issue contains a before-and-after outcome signal, not only a merged pull request.',
      'The follow-up result informs the next issue, roadmap decision, or rollback.',
    ],
  },
  'value-quality': {
    surface:
      'Required checks, Code security configurations, deployments, and incident issues',
    steps: [
      'Track escaped defects, security findings, failed deployments, rollbacks, and support issues for the pilot task class.',
      'Keep required checks and security configuration consistent as agent participation expands.',
      'Review quality and delivery trends together before changing the delegation boundary.',
    ],
    verification: [
      'Quality remains flat or improves while the pilot delivers faster.',
      'A regression creates a linked issue and blocks further expansion until reviewed.',
    ],
  },
  'value-rework': {
    surface: 'Pull request review history, GitHub Actions runs, and linked pilot issues',
    steps: [
      'Record major re-scoping, repeated Copilot iterations, failed checks, abandoned pull requests, and human review time in the pilot issue.',
      'Use a consistent label or issue field so results can be compared across the same task class.',
      'Convert repeated correction patterns into better issue fields, tests, rulesets, or repository instructions.',
    ],
    verification: [
      'The pilot reports correction cost alongside delivery time.',
      'A repeated source of rework has a linked improvement pull request or configuration change.',
    ],
  },
  'value-feedback': {
    surface:
      'GitHub Issues linked to deployments, incidents, support signals, repository instructions, and rulesets',
    steps: [
      'Create follow-up issues from material usage, customer feedback, incident, and quality findings.',
      'Classify each finding as a definition gap, knowledge gap, governance gap, or product decision.',
      'Update the relevant issue form, instruction file, test, ruleset, or Copilot policy and link the change back to the finding.',
    ],
    verification: [
      'A detected outcome changes a future issue, durable repository document, or enforced GitHub control.',
      'Closed feedback issues link to the merged or configured system change.',
    ],
  },
}
