---
name: Agentic Engineering readiness
description: A GitHub-native workflow readiness check for mapping foundations, participation, outcomes, and preparation work.
colors:
  canvas-light: "#ffffff"
  canvas-subtle-light: "#f6f8fa"
  canvas-inset-light: "#eff2f5"
  foreground-light: "#1f2328"
  foreground-muted-light: "#59636e"
  border-light: "#d1d9e0"
  border-muted-light: "#e7ebef"
  accent-light: "#0969da"
  accent-emphasis: "#1f6feb"
  accent-muted-light: "#ddf4ff"
  governance-light: "#8250df"
  governance-muted-light: "#f5f0ff"
  knowledge-light: "#0969da"
  knowledge-muted-light: "#ddf4ff"
  value-light: "#1a7f37"
  value-muted-light: "#dafbe1"
  attention-light: "#9a6700"
  attention-muted-light: "#fff8c5"
  danger-light: "#cf222e"
  danger-muted-light: "#ffebe9"
  canvas-dark: "#0d1117"
  canvas-subtle-dark: "#161b22"
  canvas-inset-dark: "#010409"
  foreground-dark: "#f0f6fc"
  foreground-muted-dark: "#9198a1"
  border-dark: "#3d444d"
  border-muted-dark: "#262c36"
  accent-dark: "#58a6ff"
  accent-muted-dark: "#121d2f"
  governance-dark: "#a371f7"
  governance-muted-dark: "#271842"
  knowledge-dark: "#58a6ff"
  knowledge-muted-dark: "#121d2f"
  value-dark: "#3fb950"
  value-muted-dark: "#10291b"
  attention-dark: "#d29922"
  attention-muted-dark: "#2b230b"
  danger-dark: "#f85149"
  danger-muted-dark: "#32161a"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "clamp(44px, 6.2vw, 88px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "clamp(32px, 4.2vw, 54px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "clamp(22px, 2.7vw, 34px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  control:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  none: "0"
  control: "6px"
  circle: "50%"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "24": "24px"
  "32": "32px"
  "48": "48px"
  "64": "64px"
  "112": "112px"
components:
  button-primary:
    backgroundColor: "{colors.accent-emphasis}"
    textColor: "{colors.canvas-light}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.foreground-light}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  readiness-item-card:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "26px"
  response-option-selected:
    backgroundColor: "{colors.accent-muted-light}"
    textColor: "{colors.accent-light}"
    rounded: "{rounded.none}"
    padding: "9px 10px"
    height: "58px"
  workflow-scope-input:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "46px"
  progress-dock:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  participation-position:
    backgroundColor: "{colors.canvas-subtle-light}"
    textColor: "{colors.foreground-muted-light}"
    rounded: "{rounded.none}"
    padding: "7px 9px"
  stock-adoption-matrix:
    backgroundColor: "{colors.accent-muted-light}"
    textColor: "{colors.accent-light}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 3.2vw, 40px)"
  site-header:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "10px clamp(16px, 4vw, 48px)"
    height: "64px"
  source-index:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "0"
    height: "68px"
  stock-node:
    backgroundColor: "{colors.governance-muted-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.circle}"
    padding: "18px"
  implementation-panel:
    backgroundColor: "{colors.canvas-subtle-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "18px"
  additional-actions-disclosure:
    backgroundColor: "{colors.canvas-subtle-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "16px 18px"
---

# Design System: Agentic Engineering readiness

## Overview

**Creative North Star: "The Operational System Map"**

The system presents readiness as a connected operating model rather than a dashboard score. GitHub-native neutrals, one-pixel rules, direct typography, and source links create a technical field guide that supports both reading and operating. The instrument is a readiness check for one named workflow: a required scope field and 16 items establish preconditions, foundations, agent participation, customer value, and system learning before producing a result.

The visual voice is crisp, source-forward, and restrained. Violet, blue, and green identify the three AES stocks without turning the page into a multicolor dashboard. Dense readiness-check content stays legible through strong hierarchy, long reading measures, visible borders, and responsive reflow. Preconditions visibly block matrix placement; governance and shared knowledge determine foundations through the weaker stock; agent participation appears as a lifecycle position rather than a percentage. Independent, unofficial, no-analytics, and browser-local framing stays visible near entry and exit points.

**Key Characteristics:**
- GitHub-native light and dark neutral surfaces.
- Strong editorial headings paired with practical evidence text.
- Crisp rules and square field structures instead of rounded dashboard cards.
- Three stock colors with stable semantic roles.
- A workflow scope field followed by 16 items using distinct readiness and participation scales.
- Preconditions that block placement before the result summaries and matrix are interpreted.
- A Stock-Adoption matrix that combines the weaker foundation stock with a lifecycle participation position.
- Percentage rails only for governance and shared knowledge; completed-item bands for customer value and system learning.
- Implementation guidance that moves from either a GitHub surface or an operating-model surface to ordered steps, verification evidence, and public sources.
- Public sources and independent, unofficial, no-analytics assurances placed in the reading flow.

## Colors

The palette uses GitHub neutrals as the operating field, GitHub blue for interaction and current placement, and three stock colors for governance, shared knowledge, and customer value. Every semantic color has a light and dark implementation token in the frontmatter.

### Primary
- **GitHub Action Blue:** Drives links, focus outlines, selected responses, progress, primary actions, and the active matrix placement. The emphasized blue remains stable across themes while supporting surfaces switch between light and dark variants.

### Secondary
- **Governance Violet:** Identifies governance stock nodes and governance evidence.
- **Shared-Knowledge Blue:** Identifies shared knowledge. It intentionally aligns with the interaction-blue family.
- **Customer-Value Green:** Identifies customer value, completion evidence, and positive outcome signals.

### Tertiary
- **Attention Amber:** Marks operating preconditions and constraints that require attention.
- **Danger Red:** Marks copy failures and destructive reset confirmation.

### Neutral
- **Canvas:** The primary reading surface.
- **Subtle Canvas:** Separates grouped controls, framework areas, and hover states without creating detached cards.
- **Inset Canvas:** Recesses progress tracks and other measurement rails.
- **Foreground:** Carries headings, primary labels, and central system nodes.
- **Muted Foreground:** Carries explanations, metadata, counts, and secondary navigation.
- **Border:** Provides the main structural grammar.
- **Muted Border:** Separates internal evidence and action details.

### Named Rules

**The Three Stocks Rule.** Keep violet, blue, and green bound to governance, shared knowledge, and customer value. Do not reassign them for decoration.

**The Neutral Field Rule.** Let neutral canvases and rules carry most of the interface. Color marks meaning, state, or action.

## Typography

**Display Font:** System sans stack, led by the Apple system font and Segoe UI.

**Body Font:** The same system sans stack.

**Character:** The typography is direct and technical, with large tightly tracked headings and calm body copy. Hierarchy comes from scale, weight, measure, and spacing rather than a second display family.

### Hierarchy
- **Display:** The hero promise uses the display token with a compact line height and balanced wrapping.
- **Headline:** Major section headings use the headline token and stay within a controlled measure.
- **Title:** Matrix states, stock names, and action titles use the title token.
- **Body:** Explanations use the body token, usually constrained between 42ch and 85ch depending on context.
- **Control:** Buttons and selectable controls use a semibold control token.
- **Label:** Eyebrows, matrix labels, phases, and category metadata use the label token in uppercase where the implementation specifies it.

### Named Rules

**The Operational Promise Rule.** Use the largest type for consequential statements about the system. Do not spend display scale on ornamental labels or raw scores.

## Layout

The page is a centered field with a maximum width of 1440px. Major sections use fluid horizontal insets from 20px to 88px and a recurring 112px vertical interval. The first viewport pairs the operational promise with the circular AES system map, the 16-item effort estimate, and the independent, unofficial, no-analytics assurance. This composition becomes one column below 1050px.

The readiness check begins with a required workflow-scope field, then six ruled disclosure sections containing 16 items. Preconditions, governance, shared knowledge, customer value, and system learning use the four-state readiness scale: Not present, Partially present, Established, and Measured and improving. Define, deliver, and detect use the participation scale: No agent participation, Agent assists, Agent performs, and Agent performs and assesses.

Result order is deliberate. The heading and scoped-workflow label come first. Any unresolved precondition appears immediately below as an amber blocking panel, before dimension summaries and the matrix. Governance, shared knowledge, customer value, and system learning occupy a four-column evidence row. Agent participation spans the full row beneath them as a Define-Deliver-Detect position panel, never as a percentage rail. The two-by-two matrix follows, placing foundations from the weaker of governance and shared knowledge on the vertical axis and broader agent participation on the horizontal axis.

The first three implementation priorities stay fully expanded. Each priority contains a three-column field for the named surface, ordered implementation steps, and verification evidence, followed by source links. The surface label is **GitHub surface** for product configuration and repository work, or **Implementation surface** for operating-model actions that GitHub cannot solve. Remaining actions sit in one compact native disclosure, grouped by phase; their surface stays visible while detailed implementation opens on demand.

At 760px, most content grids and action phase groups collapse to one column and the header hides text navigation links. At 520px, horizontal insets tighten, hero actions become full-width, the workflow-scope field and result summaries stack, matrix descriptions are hidden to protect the placement view, the participation positions become a vertical list, and implementation panels stack surface, steps, and verification with horizontal separators.

Sticky elements remain functional rather than decorative. The 64px header and readiness-check progress dock keep orientation visible during the long operate-and-read flow. Mobile header height reduces to 58px.

### Named Rules

**The Connected Field Rule.** Prefer adjacent regions separated by shared one-pixel rules over collections of detached cards.

**The Hero Grid Is Local Rule.** The 32px grid and concentric rings belong only to the circular system-map visual. They are not a page background, section texture, or reusable panel treatment.

**The Priority Disclosure Rule.** Keep the first three actions fully inspectable. Place lower-priority actions in one phase-grouped disclosure, with each action's GitHub or operating-model surface and source links visible before its detailed steps are opened.

**The Placement Gate Rule.** Keep unresolved preconditions between the result heading and all placement evidence. Do not visually imply a matrix position while the gate is active.

## Elevation & Depth

The system is flat by default. Borders, tonal surface changes, inset rails, and active-state outlines create most depth. Ambient shadows are reserved for the circular system map, the framework flow, and the sticky progress dock. Readiness-check item cards and the primary button use a short structural bottom edge rather than a soft floating shadow.

### Shadow Vocabulary
- **Ambient Field:** A wide, low-opacity shadow supports a framed system object or sticky orientation aid.
- **Structural Edge:** A short three-pixel bottom shadow gives a readiness-check item card or primary action a tactile edge.
- **Active Inset:** A three-pixel inset accent outline identifies the current matrix placement.

### Named Rules

**The Flat-by-Default Rule.** Use rules and tonal separation first. Add elevation only when an element floats, remains sticky, or represents a framed system object.

## Shapes

The primary form language is square and ruled. Major cards, matrices, progress tracks, warnings, grouped controls, and source rows use no corner radius. Interactive controls use a restrained 6px radius. Circles are reserved for the system map, stock nodes, icons, item numbers, scores, and ordered action markers.

The circular hero map is a signature composition: three stock orbs orbit a dark Define-Deliver-Detect cycle inside concentric rings. That silhouette communicates the model and should not become a generic container.

### Named Rules

**The Circle Means System Rule.** Use circles for stocks, cycles, markers, and bounded positions. Keep reading containers rectilinear.

## Components

### Buttons
- **Shape:** Compact controls with a restrained 6px radius and a minimum height of 44px.
- **Primary:** White text on emphasized blue with 18px horizontal padding and a short structural bottom edge. The entry action reads **Start the readiness check**.
- **Hover / Focus:** Primary actions lift by one pixel. Every interactive element receives a three-pixel blue focus outline with a three-pixel offset.
- **Secondary:** Canvas background, foreground text, and a one-pixel border. Hover changes the border and text to action blue. The result export action reads **Copy implementation checklist**.
- **Text / Danger:** Reset begins as **Reset local readiness check**, an underlined muted text action. Its armed state becomes the red bordered **Confirm reset** action.

### Cards / Containers
- **Corner Style:** Square.
- **Background:** Canvas or subtle canvas according to hierarchy.
- **Shadow Strategy:** Flat by default. Readiness-check item cards use a short structural edge; framed or sticky structures may use the ambient field shadow.
- **Border:** One-pixel semantic border, often shared between adjacent items.
- **Internal Padding:** Dense controls start near 16px. Primary evidence cards use 26px. Framework containers use fluid padding up to 52px.

### Inputs / Fields
- **Workflow scope:** A required text field appears before all item groups and asks **What are you checking?** Its value labels the result and copied checklist. The helper text states that it stays in the browser.
- **Style:** Radio inputs are visually hidden behind full-width response tiles. Tiles use square corners, a one-pixel border, subtle-canvas fill, and a circular value marker.
- **Scales:** Five dimensions use the four-state readiness evidence scale. The three lifecycle participation items use a separate four-state participation scale. Keep both scale legends visible inside their section.
- **Selected:** The border and text turn blue, the fill becomes muted blue, and a three-pixel inset bottom edge confirms selection.
- **Focus:** The response tile receives the same three-pixel visible focus outline used across the page.
- **Evidence Disclosure:** Supporting evidence remains inside native details and summary controls with a plus/minus cue and source links.

### Navigation
- **Style:** A sticky translucent header uses a bottom rule, compact semibold links, and a square 36px theme control. Hover changes text or border to blue.
- **Mobile:** Text section links hide below 760px while repository and theme controls remain available.

### Progress Dock

The sticky progress dock combines an **items answered** count out of 16, a six-pixel inset track, and a **View results** link. It uses an ambient shadow and backdrop blur because it stays above readiness-check content while scrolling.

### Result Summary

An unresolved-preconditions panel appears directly after the result heading and blocks placement language. Four square summary cells report governance, shared knowledge, customer value, and system learning. Governance and shared knowledge are the only cells with percentage rails. Their displayed percentages are rounded down to the nearest five, while their Emerging, Developing, Established, or Strong bands are determined from the raw evidence score before rounding. Customer value and system learning show completed-item bands and answered-item status without percentage rails. A full-width agent-participation panel follows with Narrow, Assisted, Broad, or Embedded copy and three discrete Define-Deliver-Detect positions. Highlight the actual activities answered **Agent performs** or **Agent performs and assesses**; never fill the first N positions from the performer count. Do not render a participation percentage.

### Stock-Adoption Matrix

The matrix is a square two-by-two ruled field with explicit vertical and horizontal axes. The vertical foundations position uses the weaker of governance and shared knowledge, because both are necessary. The horizontal position uses agent participation across define, deliver, and detect. The current quadrant uses muted blue fill and a three-pixel inset blue outline. It never substitutes for the explanatory threshold note that follows it.

### Implementation Plan

The plan turns a recommendation into an inspectable implementation record rather than another summary card.

- **Content hierarchy:** Phase label, action title, and rationale introduce each priority. The implementation field then moves left to right from the named surface, to ordered steps, to verification evidence. Public source links close the record.
- **Surface type:** Use **GitHub surface** for settings, policies, repository files, and workflows. Use **Implementation surface** for team agreements, ownership, facilitation, or other operating-model actions.
- **Priority treatment:** The first three actions use numbered blue markers and show the complete implementation field by default. Verification headings use customer-value green to distinguish evidence from instruction without adding a new status color.
- **Implementation field:** A square, subtle-canvas panel uses shared muted rules, 18px internal padding, compact 13px labels, and 14px operational copy. Steps are ordered; verification evidence remains an unordered list.
- **Additional actions:** One bordered native disclosure reports the remaining count. Inside, actions are grouped by phase. Each action keeps its surface and sources visible, while **Show implementation and verification** reveals only steps and evidence.
- **Responsive behavior:** The full and compact fields use three and two columns respectively on wider screens. Both become one vertical flow below 520px, replacing vertical dividers with horizontal rules.
- **Accessibility:** Use native `details` and `summary` behavior and the global three-pixel focus outline. Disclosure labels state what will appear rather than using icon-only controls.

**The Surface-to-Evidence Rule.** Every implementation recommendation must name its GitHub or operating-model surface, provide ordered changes, state observable verification evidence, and link to its public sources in that sequence.

### Trust Framing

The hero and footer identify the site as an independent, unofficial resource that is not published or endorsed by GitHub, Inc. The same framing states **No analytics are collected** and explains that workflow scope and answers remain in the browser. Keep this copy readable and in the main flow, not hidden behind a legal or privacy disclosure.

### System Map

The hero system map uses three colored circular stock nodes around a central dark activity cycle. Concentric rings and the 32px grid clarify orbital relationships only within this visual. The map settles once with a 720ms blur-and-rise animation and honors reduced-motion preferences.

## Do's and Don'ts

### Do:
- **Do** use crisp one-pixel rules and GitHub-neutral surfaces to structure long reading flows.
- **Do** keep stock colors bound to governance, shared knowledge, and customer value.
- **Do** pair large operational headings with muted source-forward explanations.
- **Do** require one workflow scope before the readiness check can produce a placement.
- **Do** keep unresolved preconditions visibly blocking placement.
- **Do** use the weaker of governance and shared knowledge for the foundations position.
- **Do** reserve percentage rails for governance and shared knowledge, round their displayed scores down to the nearest five, and derive their bands from raw evidence.
- **Do** show customer value and system learning as completed-item bands without percentage rails.
- **Do** show agent participation as discrete lifecycle positions, not a percentage score.
- **Do** highlight the actual Define, Deliver, and Detect activities answered **Agent performs** or **Agent performs and assesses**.
- **Do** include customer value and system learning beside the two foundation summaries.
- **Do** collapse multi-column evidence controls into a clear single-column mobile flow.
- **Do** keep GitHub and operating-model actions ordered from surface to steps to verification, with sources attached to the action.
- **Do** expose the highest-priority actions and progressively disclose the rest by phase.
- **Do** keep the independent, unofficial, no-analytics, browser-local framing visible.
- **Do** preserve visible keyboard focus and reduced-motion behavior.

### Don't:
- **Don't** label the readiness check as a certification or organization-wide score.
- **Don't** turn the hero's 32px grid into a general page background or reusable panel texture.
- **Don't** replace the connected field with detached KPI cards or a generic metrics dashboard.
- **Don't** round major reading containers, matrices, warnings, or evidence groups.
- **Don't** use color without a text label, structural position, or state cue.
- **Don't** average governance and shared knowledge into a stronger-looking foundations placement.
- **Don't** add percentage rails to customer value or system learning, or use a rounded display score to choose a band.
- **Don't** render agent participation as a percentage, maturity score, or progress rail.
- **Don't** highlight the first N participation positions instead of the activities supported by their answers.
- **Don't** hide the implementation surface or public source links inside a disclosure.
- **Don't** present verification evidence as another implementation step.
- **Don't** add ambient shadows to every card.
