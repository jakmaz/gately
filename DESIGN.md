# Gately design

Gately should feel simple, quiet, and approachable. The interface should make digital logic easier to understand and give people room to build and explore. These principles apply across the landing site, Learn, and the web and desktop editors.

## Visual foundation

Use the existing blue identity, neutral surfaces, Geist typography, and shadcn/ui components. Build on shared semantic tokens and established components so colors, controls, borders, and radii remain consistent across the project.

Keep most of the interface visually quiet. Use stronger color for important actions and meaningful states. Prefer subtle borders and surface changes for grouping; use shadows where they help explain layering.

## Layout and hierarchy

Give each screen a clear priority and make the next useful action easy to find. Use spacing, alignment, and typography to organize content. Add containers when they clarify a relationship or boundary.

Keep layouts spacious and selective. Show the information needed for the current task, with supporting detail available when useful. Related elements should feel connected, and separate ideas should have room between them.

Headings should establish hierarchy without dominating the page. Keep body text comfortable to read and text-heavy content within a sensible reading width.

## Visuals and copy

Give the product a strong visual presence on landing pages. Use circuit diagrams, working examples, and authentic screenshots to show what someone can do and what happens. Visuals should carry useful information and fit naturally into the surrounding content.

Reuse the product's gate geometry, terminology, and behavior. Interactive examples must represent correct logic. Keep copy concise, concrete, and supported by the implementation.

## Fit the context

- **Landing:** explain the product quickly, show it in use, and make opening the editor an obvious next step. Vary section compositions to suit their content.
- **Learn:** prioritize reading and understanding. Place explanations, diagrams, and interactive examples together, with clear navigation and comfortable spacing.
- **Editor:** prioritize the circuit workspace. Keep tools organized and accessible, with compact supporting UI where the task needs it. Maintain the shared visual language across web and desktop.

## Interaction and quality

Use familiar controls and clear feedback for actions and states. Provide useful loading, empty, and error states where needed. Keep motion subtle and purposeful, respect reduced-motion preferences, and avoid continuous decorative animation.

Design for light and dark themes, keyboard access, visible focus, and readable contrast. Adapt layouts to smaller screens while keeping controls and product visuals usable. Inspect rendered results at representative desktop and mobile sizes, and check the interactions shown.

## Code references

- [Shared tokens and typography](packages/ui/src/styles/globals.css)
- [Shared UI components](packages/ui/src/components/ui/)
- [Landing components](apps/landing/src/components/home/) and [styles](apps/landing/src/styles/home.css)
- [Learn layout](apps/landing/src/layouts/DocsLayout.astro) and [styles](apps/landing/src/styles/learn.css)
- [Shared editor UI](packages/ui/src/components/simulator/)
