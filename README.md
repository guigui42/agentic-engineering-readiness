# Agentic Engineering readiness

A public, interactive readiness assessment for GitHub's Agentic Engineering
System (AES).

[Open the live site](https://guigui42.github.io/agentic-engineering-readiness/)

## What it does

- Assesses operating preconditions, governance, shared knowledge, agent
  adoption, and customer value signals.
- Places the current operating model in the AES Stock-Adoption matrix.
- Shows separate, transparent dimension scores instead of one opaque maturity
  grade.
- Produces a prioritized GitHub implementation checklist with exact settings
  areas, repository files, workflow steps, and verification evidence.
- Copies the result as Markdown for workshops, issues, and planning documents.
- Stores answers only in the visitor's browser.

This is directional guidance. It is not a certification or a universal
delegation threshold.

## Sources

The publication content is grounded in:

- [GitHub's Agentic Engineering System](https://github.com/resources/insights/agentic-engineering-system)
- [Building an Agentic Engineering System on GitHub](https://learn.github.com/well-architected/governance/recommendations/agentic-engineering-system-on-github)
- Current public GitHub Docs linked from each product-specific recommendation.

Internal collateral, private roadmap information, customer data, and internal
links are not publication sources.

## Local development

Prerequisite: [Bun](https://bun.sh/) 1.3.11 or later.

```bash
bun install --frozen-lockfile
bun run dev
```

The Vite development server uses the GitHub Pages base path:

```text
http://localhost:5173/agentic-engineering-readiness/
```

## Validation

```bash
bun run lint
bun run test
bun run build
bunx playwright install chromium
bun run test:e2e
```

`bun run check` runs the complete local validation sequence.

## Project structure

```text
src/assessment/            Questions, sources, scoring, and recommendations
src/components/            Assessment, matrix, result, and source UI
src/App.tsx                Page composition and local persistence
src/analytics.ts           Privacy-bounded interaction analytics
public/                    Search, sharing, and crawl assets
e2e/site.spec.ts           Browser, accessibility, metadata, and privacy checks
.github/workflows/         CI, GitHub Pages, and content validation
```

## Content methodology

- Keep the AES quadrant model faithful to the current public framework.
- Treat thresholds as directional and keep them visible in the UI and code.
- Verify every GitHub product recommendation against current public
  documentation.
- Never collect assessment answers, scores, quadrant placement, or exported
  plan text in analytics.
- Update the visible verification date, structured metadata, and sitemap when
  factual content changes.

## Deployment

Pushes to `main` build the static site, upload the `dist` artifact, and deploy
through the protected `github-pages` environment.

## License

[MIT](LICENSE)
