# Copilot instructions

## Project goal

Maintain a public, source-backed readiness check based on GitHub's Agentic
Engineering System. Help readers assess the system around agent work without
turning AES into an opaque maturity score or certification.

## Content rules

- Ground framework claims in the current public AES page and GitHub
  Well-Architected recommendation.
- Ground GitHub product recommendations in current public GitHub Docs.
- Keep the Stock-Adoption quadrant model, thresholds, and limitations
  transparent.
- Use neutral examples. Never add customer data, credentials, non-public
  sources, or roadmap details.
- Keep the assessment directional. Risk appetite and consequence of failure
  still determine the real delegation boundary.

## Engineering rules

- Keep framework questions in `src/assessment/questions.ts`, concrete GitHub
  implementation steps in `src/assessment/githubActions.ts`, and rendering in
  `src/components/`.
- Preserve the `/agentic-engineering-readiness/` GitHub Pages base path.
- Store scope and answers only in browser local storage.
- Keep Hydro analytics on app ID `aes-assessment` limited to page views and
  fixed interaction identifiers. Never transmit scope, answers, scores,
  placement, recommendation text, or Markdown output.
- Preserve responsive behavior, keyboard access, reduced motion, secure
  external links, and WCAG A/AA checks.
- Update focused tests when scoring, recommendations, metadata, persistence, or
  local-data contracts change.
- When verified content changes, synchronize `verifiedDate`, structured
  metadata, and the sitemap date.
- Edit agentic workflow Markdown sources and regenerate generated workflow
  files with `gh aw compile`.
