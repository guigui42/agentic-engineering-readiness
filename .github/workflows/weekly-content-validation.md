---
description: Validate public AES assessment claims and links against authoritative sources
intent: Keep the public readiness assessment accurate without publishing internal material or making unsupported scoring changes.
labels: [documentation, maintenance]
on:
  schedule: weekly on monday
  workflow_dispatch:
  skip-if-match: 'is:pr is:open in:title "[content-validation]"'

permissions:
  contents: read
  copilot-requests: write

strict: true

engine:
  id: copilot
  args:
    - --allow-all-urls

network:
  allowed:
    - defaults
    - docs.github.com
    - github
    - guigui42.github.io
    - learn.github.com
    - node
    - playwright
    - schema.org
    - sitemaps.org
    - www.w3.org

tools:
  edit:
  bash:
    - curl
    - bun run lint
    - bun run test
    - bun run build
    - bun run test:e2e

steps:
  - name: Set up Bun
    uses: oven-sh/setup-bun@0c5077e51419868618aeaa5fe8019c62421857d6 # v2
    with:
      bun-version: 1.3.11
  - name: Install dependencies
    run: bun install --frozen-lockfile
  - name: Install Chromium
    run: bunx playwright install --with-deps chromium

safe-outputs:
  noop:
    report-as-issue: false
  create-pull-request:
    title-prefix: "[content-validation] "
    draft: true
    max: 1
    if-no-changes: ignore
    fallback-as-issue: false
    allowed-branches:
      - content-validation/*
    allowed-files:
      - src/assessment/questions.ts
      - src/App.tsx
      - README.md
      - index.html
      - public/robots.txt
      - public/sitemap.xml
      - public/social-card.svg
    protected-files:
      policy: blocked
      exclude:
        - README.md
    max-patch-files: 7
    max-patch-size: 512
---

# Weekly public AES content validation

Audit the public assessment claims and links against current authoritative
sources. Create one focused draft pull request only when public evidence
supports a substantive correction.

## Scope

Review these files completely:

- `src/assessment/questions.ts`
- `src/App.tsx`
- `README.md`
- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/social-card.svg`

## Source policy

Use only current public sources:

1. GitHub's Agentic Engineering System:
   `https://github.com/resources/insights/agentic-engineering-system`
2. GitHub Well-Architected:
   `https://learn.github.com/well-architected/governance/recommendations/agentic-engineering-system-on-github`
3. GitHub Enterprise Cloud documentation under:
   `https://docs.github.com/en/enterprise-cloud@latest`

Do not use Seismic, Slack, internal repositories, roadmap material, customer
data, private links, or search-result summaries as publication evidence.

## Validation rules

- Verify the AES stock names, activity names, participation modes, quadrant
  names, quadrant guidance, and stated limitations.
- Verify every GitHub product recommendation and URL in the source index.
- Preserve the distinction between leading stocks, customer value signals,
  operating preconditions, and agent adoption.
- Do not turn the assessment into a certification or universal risk threshold.
- Do not change scoring thresholds or recommendation priority logic. Those
  require human review and are outside this workflow's allowed files.
- Keep assessment answers, scores, quadrant placement, and Markdown output out
  of analytics.
- Keep metadata, verification dates, and sitemap dates synchronized when
  factual content changes.
- Replace stale or redirected documentation URLs with current canonical URLs.
- Do not reword accurate content for style alone.

## Required checks

After any change, run:

```bash
bun run lint
bun run test
bun run build
bun run test:e2e
```

If evidence is incomplete or conflicting, make no change.
