# Agentic Engineering readiness

An independent, unofficial readiness check based on GitHub's public Agentic
Engineering System (AES) framework. This project is not published or endorsed
by GitHub, Inc.

[Open the live site](https://guigui42.github.io/agentic-engineering-readiness/)

## What it does

- Checks one named team, repository class, or workflow at a time.
- Treats missing operating preconditions as blockers to placement.
- Uses the weaker of governance and shared knowledge for the foundations axis.
- Positions agent participation across define, deliver, and detect without
  treating more participation as a maturity goal.
- Produces a prioritized GitHub implementation checklist with exact settings
  areas, repository files, workflow steps, and verification evidence.
- Includes explicit operating-model actions where no GitHub control can solve
  the gap.
- Copies the scoped result as Markdown for workshops and planning documents.
- Stores answers only in the visitor's browser.
- Collects no analytics.

The questions, scoring, and thresholds are project-authored directional
guidance. They are not an official GitHub assessment, certification, or
universal delegation threshold.

## Sources

The publication content is grounded in:

- [GitHub's Agentic Engineering System](https://github.com/resources/insights/agentic-engineering-system)
- [Building an Agentic Engineering System on GitHub](https://learn.github.com/well-architected/governance/recommendations/agentic-engineering-system-on-github)
- Current public GitHub Docs linked from each product-specific recommendation.

Only public sources are publication sources.

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
src/assessment/            Scope, questions, scoring, actions, and sources
src/components/            Assessment, matrix, result, and source UI
src/App.tsx                Page composition and local persistence
public/                    Search, sharing, and crawl assets
e2e/site.spec.ts           Browser, accessibility, metadata, and local-data checks
.github/workflows/         CI, GitHub Pages, and content validation
```

## Content methodology

- Keep the AES quadrant model faithful to the current public framework.
- Run placement per workflow and require all operating preconditions.
- Treat governance and shared knowledge as jointly necessary.
- Keep participation positional rather than presenting it as a maturity score.
- Treat thresholds as project-authored, directional, and visible.
- Verify every GitHub product recommendation against current public
  documentation.
- Do not add analytics or transmit the scope, answers, result, or export.
- Update the visible verification date, structured metadata, and sitemap when
  factual content changes.

## Deployment

Pushes to `main` build the static site, upload the `dist` artifact, and deploy
through the protected `github-pages` environment.

## License

[MIT](LICENSE)
