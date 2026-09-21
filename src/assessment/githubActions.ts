import type { ImplementationGuide } from './types'

export const githubImplementations: Record<string, ImplementationGuide> = {
  'precondition-infrastructure': {
    kind: 'github',
    surface:
      'Repository Actions and Environments; organization security configurations; Copilot usage and billing',
    steps: [
      'Choose one representative repository and require its standard build, test, and lint workflow before merge.',
      'Create the staging or production environment used by the scoped workflow and configure its reviewer and deployment-branch rules.',
      'Apply the intended organization security configuration to the repository.',
      'Record the expected AI Credit and GitHub Actions-minute budget for the pilot volume.',
    ],
    verification: [
      'A test pull request cannot merge while a required workflow fails.',
      'A test deployment cannot enter the protected environment without the configured approval.',
      'The repository is listed under the intended security configuration.',
      'The pilot issue links to the current Copilot and Actions usage or budget view.',
    ],
  },
  'precondition-skills': {
    kind: 'operating-model',
    surface: 'Operating model outside GitHub configuration',
    steps: [
      'Name the human director who owns intent, constraints, and the decision to delegate.',
      'Name the human assessor who owns evidence quality and final acceptance.',
      'Run one calibration exercise where both reviewers independently assess the same agent-produced plan or pull request, then reconcile differences.',
    ],
    verification: [
      'The pilot charter names the director, assessor, and escalation contact.',
      'The calibration record lists agreed acceptance and stop criteria.',
    ],
  },
  'precondition-culture': {
    kind: 'operating-model',
    surface: 'Pilot charter and leadership operating agreement',
    steps: [
      'State that reliability, customer value, and transparent escalation take priority over agent-usage targets.',
      'Publish a named escalation route for stopping a session or narrowing the pilot.',
      'Review one hypothetical failure with leaders and confirm that reporting it would not penalize the participant.',
    ],
    verification: [
      'The charter contains the stop-work rule and escalation owner.',
      'Pilot participants can identify the escalation route without referring to private notes.',
    ],
  },
  'precondition-access': {
    kind: 'github',
    surface:
      'Enterprise or organization cloud-agent access; repository Copilot MCP servers and Internet access',
    steps: [
      'Restrict Copilot cloud-agent access to the organizations and repositories in scope.',
      'In Repository settings → Copilot → MCP servers, allowlist only the required tools. Review the GitHub and Playwright MCP servers that are enabled by default.',
      'Configure repository or organization Internet access for the required domains, accounting for the documented firewall limitations.',
      'Keep unrelated Agents secrets, variables, repositories, and environments outside the pilot.',
    ],
    verification: [
      'An approved tool call succeeds in a test session.',
      'An out-of-scope repository, MCP tool, or domain is denied or unavailable.',
      'Protected configuration files have an accountable CODEOWNER.',
    ],
  },
  'governance-scope': {
    kind: 'github',
    surface:
      'Enterprise AI controls; organization cloud-agent access; repository Copilot, hooks, setup steps, and CODEOWNERS',
    steps: [
      'Record which organizations and repositories have Copilot cloud-agent access and explicitly exclude the rest.',
      'Review Repository settings → Copilot → MCP servers and Internet access, and remove tools or domains not required by the scoped workflow.',
      'Add default-branch hook files under .github/hooks/ only for checks that have a named owner and a falsifiable expected result.',
      'Review .github/workflows/copilot-setup-steps.yml permissions, runner choice, timeout-minutes, installed dependencies, and network behavior.',
      'Protect Copilot instructions, MCP-related files, hooks, setup steps, and workflow files with CODEOWNERS and required code-owner review.',
    ],
    verification: [
      'The enabled organization and repository lists match the written scope.',
      'A pull request changing protected Copilot configuration requests the expected owner.',
      'A test session shows only the approved MCP tools and required network paths.',
      'A failing hook blocks or reports the documented condition in the session log.',
    ],
  },
  'governance-proportionality': {
    kind: 'github',
    surface:
      'Organization repository custom properties and organization rulesets; repository branch rules where local requirements differ',
    steps: [
      'Create organization repository properties for agent_risk, data_classification, and deployment_impact.',
      'Assign controlled values to the repositories in scope.',
      'Create organization rulesets targeted by those property values. Use repository rulesets only for repository-local branch requirements.',
      'Test one low-risk path that should flow without a manual approval and one high-impact path that should require deeper review.',
      'If a ruleset blocks Copilot cloud agent, change the incompatible rule or grant only the minimum documented bypass. Do not give a blanket bypass.',
    ],
    verification: [
      'Ruleset insights show the expected organization ruleset evaluating each repository class.',
      'The low-risk test proceeds through required automated checks without an unnecessary manual queue.',
      'The high-impact test cannot merge without the required accountable review.',
      'Any Copilot bypass is limited to a named rule and has a documented owner and review date.',
    ],
  },
  'governance-layered': {
    kind: 'github',
    surface:
      'Rulesets, CODEOWNERS, Environments, organization security configurations, and enterprise audit log',
    steps: [
      'Require pull requests, status checks, resolved conversations, and code-owner review for the relevant paths.',
      'Configure protected environments and keep production secrets outside the agent session and setup steps.',
      'Apply the intended organization security configuration and review dependency-graph coverage.',
      'Create saved audit searches for Copilot policy changes, repository access, rulesets, workflow activity, and deployments.',
    ],
    verification: [
      'A test pull request cannot merge with a failed required check or missing owner review.',
      'An agent-authored change cannot deploy to the protected environment without the configured approval.',
      'The test change can be traced from identity to pull request, checks, approval, merge, and deployment.',
    ],
  },
  'knowledge-guidance': {
    kind: 'github',
    surface:
      'Organization instructions; .github/copilot-instructions.md; .github/instructions/**/*.instructions.md; AGENTS.md; copilot-setup-steps.yml',
    steps: [
      'Use organization instructions only for rules that apply across the organization.',
      'Keep repository-wide commands and boundaries in .github/copilot-instructions.md.',
      'Use path-specific instruction files or AGENTS.md only where the current Copilot surface supports them.',
      'Configure .github/workflows/copilot-setup-steps.yml for dependencies or tools that must exist before the agent starts.',
      'Add an owner and review date to the instruction entry point.',
    ],
    verification: [
      'From a clean clone, every documented build, test, and lint command exits successfully.',
      'A test change in each path receives the expected path-specific or agent instruction.',
      'The setup workflow completes with minimum permissions and does not expose protected secrets.',
    ],
  },
  'knowledge-definition': {
    kind: 'github',
    surface: 'Repository issue forms and Copilot cloud-agent planning sessions',
    steps: [
      'Create an agent-task issue form with required fields for outcome, constraints, affected systems, acceptance criteria, and validation evidence.',
      'Add a field confirming that the task fits one repository and one independently reviewable pull request.',
      'Ask Copilot cloud agent to research and propose a plan before requesting code changes.',
      'Record the human director decision and unresolved trade-offs in the issue.',
    ],
    verification: [
      'The issue form cannot be submitted without outcome and validation fields.',
      'The approved plan cites repository evidence and maps every acceptance criterion to a validation step.',
      'Tasks exceeding the repository, pull-request, or session boundary are split before delivery.',
    ],
  },
  'knowledge-context': {
    kind: 'github',
    surface:
      'CODEOWNERS, repository custom properties, docs/adr/, dependency graph, and linked workflow or metric evidence',
    steps: [
      'Add CODEOWNERS coverage for application code, workflows, infrastructure, security configuration, and instruction files.',
      'Set organization repository properties for owner, service tier, data classification, and deployment impact where those values drive governance.',
      'Store active decisions under docs/adr/ and link the relevant records from the task issue.',
      'Link the dependency graph, alert, workflow run, deployment, or Copilot metric that informs the task.',
    ],
    verification: [
      'A contributor unfamiliar with the repository can identify the accountable owner from the repository.',
      'The issue links the decision and dependency context needed for the scoped change.',
      'Repository property values match the current owner and impact classification.',
    ],
  },
  'adoption-define': {
    kind: 'github',
    surface: 'GitHub Issues and Copilot cloud-agent research and planning',
    steps: [
      'Start from the completed agent-task issue and request repository research or a plan before code changes.',
      'Keep the human director responsible for scope, trade-offs, and acceptance criteria.',
      'If the agent is expected to assess its own plan, require it to identify missing evidence and contradictory constraints explicitly.',
    ],
    verification: [
      'The plan links to repository evidence and distinguishes facts, assumptions, and unresolved decisions.',
      'The issue records the human decision before delivery starts.',
    ],
  },
  'adoption-deliver': {
    kind: 'github',
    surface:
      'GitHub Issues, Copilot cloud-agent sessions, pull requests, rulesets, hooks, and code review',
    steps: [
      'Choose a reversible task class that fits one repository, one pull request, and the documented session limit.',
      'Start the Copilot cloud-agent session from the issue and require tests plus a concise evidence summary in the pull request.',
      'Use preToolUse or postToolUse hooks only for deterministic validation or reporting that is tested locally.',
      'Request Copilot code review as additional evidence while retaining required human or code-owner approval where impact demands it.',
    ],
    verification: [
      'The pull request links to the issue, passes required checks, and can be reverted independently.',
      'The hook produces the expected pass and fail results with test input.',
      'Copilot review does not satisfy the required accountable review unless that policy was explicitly chosen and tested.',
    ],
  },
  'adoption-detect': {
    kind: 'github',
    surface:
      'GitHub Actions runs, security alerts, deployments, Copilot usage metrics, and linked GitHub Issues',
    steps: [
      'Choose one named source such as a failing workflow, security alert, deployment regression, or repository-level Copilot metric.',
      'Use Copilot cloud agent to summarize or correlate only the approved evidence.',
      'Open a human-owned issue that links the source, separates facts from assumptions, and states the decision required.',
    ],
    verification: [
      'The finding links to the originating run, alert, deployment, or metrics report.',
      'The issue names the accountable owner and decision deadline.',
      'A sample false positive is recorded and used to review signal quality.',
    ],
  },
  'value-outcomes': {
    kind: 'github',
    surface:
      'GitHub issue forms, pull requests, deployments, Projects fields, and external metric links',
    steps: [
      'Add required issue fields for the named outcome, metric source, baseline window, expected change, and follow-up date.',
      'Link the implementation pull request and deployment to the issue.',
      'Record the comparison-window result and the resulting product or operating decision.',
    ],
    verification: [
      'The issue contains a dated baseline and comparison window from a named source.',
      'The observed result is recorded as improved, unchanged, or regressed.',
      'The issue links the next decision, follow-up task, or rollback.',
    ],
  },
  'value-quality': {
    kind: 'github',
    surface:
      'Copilot usage metrics dashboard or API, pull request history, Actions runs, incident issues, and billing views',
    steps: [
      'Use the organization or enterprise Copilot usage metrics report, including repository-level cloud-agent pull request activity where available.',
      'Record the baseline and comparison windows for pull requests created and merged, time to merge, failed checks, review effort, rework, defects, and rollbacks.',
      'Record AI Credit and GitHub Actions-minute usage for the same pilot window.',
      'Review speed, quality, correction cost, and usage together before expanding the task class.',
    ],
    verification: [
      'The pilot issue links the exact dashboard export, API query, or repository query used for both windows.',
      'Every reported metric has a source, date range, and defined population.',
      'An expansion decision cites quality and correction-cost evidence, not delivery speed alone.',
    ],
  },
  'learning-loop': {
    kind: 'github',
    surface:
      'GitHub Issues linked to instructions, issue forms, tests, rulesets, policies, and product decisions',
    steps: [
      'Open an owned issue for each material finding from incidents, reviews, customer outcomes, or pilot measurements.',
      'Classify the finding as a definition, knowledge, governance, participation, or product-decision change.',
      'Link the finding to the pull request or configuration change that updates the next cycle.',
      'Verify the new behavior before closing the finding.',
    ],
    verification: [
      'Every closed finding links to a merged or configured change and its verification evidence.',
      'A repeated task uses the updated issue form, instruction, test, rule, or policy without rediscovering the same gap.',
    ],
  },
}
