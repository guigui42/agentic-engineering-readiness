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
    title: 'Managing policies and features for GitHub Copilot in your enterprise',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies',
    category: 'GitHub Docs',
  },
  {
    id: 'custom-instructions',
    title: 'Adding repository custom instructions for GitHub Copilot',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot',
    category: 'GitHub Docs',
  },
  {
    id: 'issue-templates',
    title: 'Configuring issue templates for your repository',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository',
    category: 'GitHub Docs',
  },
  {
    id: 'required-reviews',
    title: 'About protected branches',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches',
    category: 'GitHub Docs',
  },
  {
    id: 'dependency-graph',
    title: 'About the dependency graph',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph',
    category: 'GitHub Docs',
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
      'Check the environment AES assumes before deciding how much work to delegate.',
  },
  governance: {
    label: 'Governance',
    eyebrow: 'Leading stock',
    description:
      'Define what people and agents may do, under which conditions, and with which oversight.',
  },
  knowledge: {
    label: 'Shared knowledge',
    eyebrow: 'Leading stock',
    description:
      'Make the right code, decisions, constraints, telemetry, and customer context usable by people and agents.',
  },
  adoption: {
    label: 'Agent adoption',
    eyebrow: 'Participation range',
    description:
      'Assess how deeply agents participate across define, deliver, and detect, and whether that scope matches the foundations.',
  },
  value: {
    label: 'Customer value signals',
    eyebrow: 'Lagging stock',
    description:
      'Verify that faster delivery improves outcomes instead of increasing defects, rework, or review burden.',
  },
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'precondition-infrastructure',
    dimension: 'preconditions',
    title: 'Reliable and secure infrastructure',
    prompt:
      'Can teams and agents rely on stable build, test, deployment, identity, and security foundations?',
    evidence: [
      'Build and deployment paths have clear owners and service expectations.',
      'Identity, secrets, dependencies, and environments have defined controls.',
    ],
    action: {
      title: 'Stabilize the delivery foundation',
      detail:
        'Resolve unreliable build, test, identity, dependency, and deployment paths before expanding autonomous execution.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected'],
    weight: 2,
  },
  {
    id: 'precondition-skills',
    dimension: 'preconditions',
    title: 'Skilled human direction and assessment',
    prompt:
      'Do teams have enough product, engineering, security, and operational skill to direct and assess agent work?',
    evidence: [
      'People can identify unsafe, incomplete, or poorly grounded output.',
      'Escalation paths exist when work exceeds a team or agent boundary.',
    ],
    action: {
      title: 'Build director and assessor capability',
      detail:
        'Train teams to define intent, evaluate evidence, recognize residual risk, and escalate work that needs deeper judgment.',
    },
    sourceIds: ['aes-framework'],
    weight: 2,
  },
  {
    id: 'precondition-culture',
    dimension: 'preconditions',
    title: 'Responsible participation culture',
    prompt:
      'Can people question agent output, report failures, and improve the system without pressure to maximize automation?',
    evidence: [
      'Teams are rewarded for reliable outcomes, not agent usage alone.',
      'Near misses and failed tasks produce learning rather than concealment.',
    ],
    action: {
      title: 'Set responsible adoption expectations',
      detail:
        'Make reliability, customer value, and transparent escalation more important than maximizing agent participation.',
    },
    sourceIds: ['aes-framework'],
    weight: 1,
  },
  {
    id: 'precondition-access',
    dimension: 'preconditions',
    title: 'Sufficient, governed data access',
    prompt:
      'Can people and agents retrieve the relevant code, documentation, decisions, and signals without bypassing access controls?',
    evidence: [
      'Approved tools expose the context needed for the task.',
      'Sensitive or irrelevant information is not broadly exposed by default.',
    ],
    action: {
      title: 'Create governed context paths',
      detail:
        'Provide approved access to task-relevant code, documentation, decisions, and telemetry while preserving least privilege.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected'],
    weight: 2,
  },
  {
    id: 'governance-scope',
    dimension: 'governance',
    title: 'Scope and policy are explicit',
    prompt:
      'Are approved agent capabilities, repositories, tools, identities, and prohibited actions defined centrally?',
    evidence: [
      'Copilot and agent policies target the intended enterprise, organization, and repository scope.',
      'Teams know which source of policy applies to each workflow.',
    ],
    action: {
      title: 'Define the approved agent operating scope',
      detail:
        'Document approved identities, repositories, tools, data paths, and actions, then enforce the available controls centrally.',
    },
    sourceIds: ['aes-framework', 'copilot-policies'],
    weight: 2,
  },
  {
    id: 'governance-risk',
    dimension: 'governance',
    title: 'Delegation matches risk',
    prompt:
      'Is work classified by ambiguity, reversibility, customer impact, and consequence of failure before agent participation expands?',
    evidence: [
      'Low-risk, bounded work has a lighter path than high-impact changes.',
      'Escalation is required when assumptions, scope, or consequences change.',
    ],
    action: {
      title: 'Create a risk-based delegation model',
      detail:
        'Classify work by ambiguity, impact, reversibility, and evidence needs so agent participation expands only where the system supports it.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected'],
    weight: 2,
  },
  {
    id: 'governance-review',
    dimension: 'governance',
    title: 'Review boundaries are enforced',
    prompt:
      'Do repository rules, ownership, required checks, and review requirements match the risk of the change?',
    evidence: [
      'Rulesets and branch protections cannot be bypassed by ordinary delivery paths.',
      'CODEOWNERS and required reviewers cover sensitive code and configuration.',
    ],
    action: {
      title: 'Enforce repository review boundaries',
      detail:
        'Use rulesets, required checks, CODEOWNERS, and protected branches to keep assessment proportional to change risk.',
    },
    sourceIds: ['rulesets', 'codeowners', 'required-reviews'],
    weight: 2,
  },
  {
    id: 'governance-deployment',
    dimension: 'governance',
    title: 'Deployment and security controls are layered',
    prompt:
      'Are production environments, secrets, dependencies, and code security protected independently of the agent?',
    evidence: [
      'Environment protection rules gate sensitive deployments.',
      'Security configurations and dependency visibility apply consistently.',
    ],
    action: {
      title: 'Layer deployment and security controls',
      detail:
        'Protect environments, secrets, dependencies, and code scanning independently so task completion is not equivalent to production authorization.',
    },
    sourceIds: ['environments', 'security-configurations', 'dependency-graph'],
    weight: 2,
  },
  {
    id: 'governance-audit',
    dimension: 'governance',
    title: 'Activity is attributable and reviewable',
    prompt:
      'Can the organization reconstruct what an agent changed, which identity acted, which checks ran, and who approved the outcome?',
    evidence: [
      'Audit events and repository history identify meaningful actions.',
      'Incident responders can connect policy, identity, change, and approval evidence.',
    ],
    action: {
      title: 'Make agent activity attributable',
      detail:
        'Align identity, audit logs, pull requests, checks, and approvals so important actions can be reconstructed and investigated.',
    },
    sourceIds: ['audit-log', 'aes-well-architected'],
    weight: 1,
  },
  {
    id: 'governance-learning',
    dimension: 'governance',
    title: 'Governance improves after evidence',
    prompt:
      'Do incidents, exceptions, review friction, and near misses lead to policy or workflow changes?',
    evidence: [
      'Exceptions have owners and expiry or review dates.',
      'Repeated failures change controls rather than remaining tribal knowledge.',
    ],
    action: {
      title: 'Close the governance feedback loop',
      detail:
        'Review exceptions, incidents, and near misses regularly, then update policies, checks, and escalation paths.',
    },
    sourceIds: ['aes-framework', 'audit-log'],
    weight: 1,
  },
  {
    id: 'knowledge-repository',
    dimension: 'knowledge',
    title: 'Repository guidance is usable',
    prompt:
      'Do repositories contain concise, current instructions about architecture, commands, conventions, validation, and boundaries?',
    evidence: [
      'Instructions identify the correct build, test, and review paths.',
      'Guidance is scoped and avoids stale or contradictory detail.',
    ],
    action: {
      title: 'Curate repository instructions',
      detail:
        'Add concise repository guidance for architecture, commands, conventions, validation, and safety boundaries, with a clear owner.',
    },
    sourceIds: ['custom-instructions', 'aes-framework'],
    weight: 2,
  },
  {
    id: 'knowledge-decisions',
    dimension: 'knowledge',
    title: 'Decisions and ownership are discoverable',
    prompt:
      'Can people and agents find current architecture decisions, service ownership, dependencies, and escalation contacts?',
    evidence: [
      'Important trade-offs and constraints are recorded near the work.',
      'Ownership does not depend on an informal network or one experienced person.',
    ],
    action: {
      title: 'Document decisions and ownership',
      detail:
        'Record current architecture decisions, constraints, owners, dependencies, and escalation paths in durable repository-linked locations.',
    },
    sourceIds: ['aes-framework', 'codeowners', 'dependency-graph'],
    weight: 2,
  },
  {
    id: 'knowledge-definition',
    dimension: 'knowledge',
    title: 'Work is defined with evidence',
    prompt:
      'Do issues include customer context, constraints, acceptance criteria, affected systems, and the evidence needed to assess completion?',
    evidence: [
      'Issue templates prompt for the information the delivery path needs.',
      'Ambiguity is resolved before inexpensive execution creates rework.',
    ],
    action: {
      title: 'Strengthen work definition',
      detail:
        'Use issue forms or templates to capture customer context, constraints, acceptance criteria, affected systems, and assessment evidence.',
    },
    sourceIds: ['aes-framework', 'issue-templates'],
    weight: 2,
  },
  {
    id: 'knowledge-signals',
    dimension: 'knowledge',
    title: 'Operational and customer signals are connected',
    prompt:
      'Can delivery work use relevant telemetry, incidents, support patterns, usage, and customer feedback?',
    evidence: [
      'Signals can be connected to the change or product decision they inform.',
      'Teams can distinguish high-value evidence from high-volume noise.',
    ],
    action: {
      title: 'Connect delivery to real-world signals',
      detail:
        'Make telemetry, incidents, support patterns, usage, and customer feedback discoverable from the work they should influence.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected'],
    weight: 2,
  },
  {
    id: 'knowledge-freshness',
    dimension: 'knowledge',
    title: 'Knowledge has freshness signals',
    prompt:
      'Are critical instructions, runbooks, schemas, and architecture records reviewed, tested, or retired when they become stale?',
    evidence: [
      'Important content has an owner or automated validation path.',
      'Outdated instructions are corrected after task failures or system changes.',
    ],
    action: {
      title: 'Add knowledge freshness controls',
      detail:
        'Assign owners, review dates, tests, or validation workflows to critical instructions, runbooks, schemas, and architecture records.',
    },
    sourceIds: ['aes-framework', 'custom-instructions'],
    weight: 1,
  },
  {
    id: 'knowledge-learning',
    dimension: 'knowledge',
    title: 'Each cycle leaves reusable learning',
    prompt:
      'Are decisions, failures, review findings, and operational outcomes captured where the next define-deliver-detect cycle can use them?',
    evidence: [
      'Post-incident and review findings update durable context.',
      'Repeated work becomes easier because the system retains useful learning.',
    ],
    action: {
      title: 'Capture reusable learning',
      detail:
        'Feed decisions, review findings, incidents, and outcome evidence back into repository guidance and future work definition.',
    },
    sourceIds: ['aes-framework'],
    weight: 1,
  },
  {
    id: 'adoption-define',
    dimension: 'adoption',
    title: 'Agents support define work',
    prompt:
      'Do agents help synthesize evidence, clarify requirements, identify constraints, or draft acceptance criteria under human direction?',
    evidence: [
      'The human director remains accountable for intent and trade-offs.',
      'Agent proposals cite the context they used and expose uncertainty.',
    ],
    action: {
      title: 'Pilot bounded agent support in define',
      detail:
        'Use agents to synthesize evidence and draft requirements while a human owns intent, trade-offs, and acceptance criteria.',
    },
    sourceIds: ['aes-framework'],
    weight: 1,
  },
  {
    id: 'adoption-deliver',
    dimension: 'adoption',
    title: 'Agents perform bounded delivery',
    prompt:
      'Do agents complete low-risk, well-scoped changes with appropriate identity, tests, review, and deployment boundaries?',
    evidence: [
      'The task is small enough to assess and reverse.',
      'The delivery path produces a reviewable pull request and evidence.',
    ],
    action: {
      title: 'Delegate one bounded delivery class',
      detail:
        'Select a low-risk, reversible class of work with strong context and checks, then let agents produce reviewable pull requests.',
    },
    sourceIds: ['aes-framework', 'rulesets'],
    weight: 2,
  },
  {
    id: 'adoption-assess',
    dimension: 'adoption',
    title: 'Agents support assessment',
    prompt:
      'Do agents run tests, compare work with standards, summarize evidence, or flag anomalies without replacing accountable review?',
    evidence: [
      'Automated assessment is tied to intent and known risk.',
      'Human judgment remains where customer impact or accountability requires it.',
    ],
    action: {
      title: 'Add evidence-focused agent assessment',
      detail:
        'Use agents to run checks, compare standards, summarize diffs, and flag anomalies while preserving accountable review.',
    },
    sourceIds: ['aes-framework', 'required-reviews'],
    weight: 1,
  },
  {
    id: 'adoption-detect',
    dimension: 'adoption',
    title: 'Agents support detect work',
    prompt:
      'Do agents help correlate telemetry, incidents, support signals, and recent changes into actionable findings?',
    evidence: [
      'Detection outputs route to an owner and a defined next step.',
      'Signal quality and false positives are measured.',
    ],
    action: {
      title: 'Pilot agent-supported detection',
      detail:
        'Use agents to correlate operational and customer signals, then route evidence to a human-owned decision or issue.',
    },
    sourceIds: ['aes-framework'],
    weight: 1,
  },
  {
    id: 'adoption-portfolio',
    dimension: 'adoption',
    title: 'Participation varies by task',
    prompt:
      'Can teams explain which tasks use agents as directors, performers, or assessors, and why that mix is safe?',
    evidence: [
      'Participation decisions are made per workflow, not as a blanket maturity claim.',
      'High-consequence tasks retain stronger human direction and assessment.',
    ],
    action: {
      title: 'Map participation by workflow',
      detail:
        'Record who directs, performs, and assesses each candidate workflow, then align the mix with risk and foundation health.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected'],
    weight: 2,
  },
  {
    id: 'adoption-evidence',
    dimension: 'adoption',
    title: 'Expansion follows evidence',
    prompt:
      'Does broader agent use depend on task success, quality, rework, review burden, and incident evidence?',
    evidence: [
      'Teams expand one safe class of work at a time.',
      'Scope narrows when foundations or outcomes deteriorate.',
    ],
    action: {
      title: 'Gate expansion on outcome evidence',
      detail:
        'Expand agent participation one workflow at a time only when quality, rework, review burden, and incident signals remain healthy.',
    },
    sourceIds: ['aes-framework'],
    weight: 2,
  },
  {
    id: 'value-outcomes',
    dimension: 'value',
    title: 'Delivery connects to customer outcomes',
    prompt:
      'Can teams connect shipped work to adoption, usefulness, reliability, trust, or another customer outcome?',
    evidence: [
      'Success criteria describe an outcome, not only a merged pull request.',
      'Teams can identify who benefited and how they know.',
    ],
    action: {
      title: 'Define outcome measures before delivery',
      detail:
        'Add adoption, usefulness, reliability, trust, or another customer outcome to the work definition and follow-up.',
    },
    sourceIds: ['aes-framework'],
    weight: 2,
  },
  {
    id: 'value-quality',
    dimension: 'value',
    title: 'Quality keeps pace with speed',
    prompt:
      'Are escaped defects, incidents, rollbacks, and support volume flat or improving as agent use expands?',
    evidence: [
      'Quality trends are compared with delivery and agent adoption trends.',
      'Teams investigate divergence instead of treating speed as success.',
    ],
    action: {
      title: 'Pair speed with quality measures',
      detail:
        'Track escaped defects, incidents, rollbacks, and support volume alongside delivery speed and agent participation.',
    },
    sourceIds: ['aes-framework'],
    weight: 2,
  },
  {
    id: 'value-rework',
    dimension: 'value',
    title: 'Rework and review burden are visible',
    prompt:
      'Do teams measure re-scoping, retries, tool-call churn, abandoned output, and human review effort?',
    evidence: [
      'Fast generation is not counted as a gain when correction cost rises.',
      'Repeated failures identify missing context or weak controls.',
    ],
    action: {
      title: 'Measure the cost of correction',
      detail:
        'Track re-scoping, retries, abandoned output, and human review effort so apparent speed gains include correction cost.',
    },
    sourceIds: ['aes-framework'],
    weight: 1,
  },
  {
    id: 'value-feedback',
    dimension: 'value',
    title: 'Outcome evidence changes the next cycle',
    prompt:
      'Do usage, feedback, incidents, and quality findings update future work, shared knowledge, and governance?',
    evidence: [
      'Detect outputs become structured inputs to define.',
      'The system changes when evidence shows a weak assumption or control.',
    ],
    action: {
      title: 'Feed outcome evidence into the system',
      detail:
        'Route usage, feedback, incidents, and quality findings into future issues, repository knowledge, and governance reviews.',
    },
    sourceIds: ['aes-framework', 'aes-well-architected'],
    weight: 2,
  },
]
