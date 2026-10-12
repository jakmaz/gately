# AGENTS.md

Gately is a free visual logic circuit simulator. This is a Bun/Turbo monorepo with an Astro landing site, React/Vite web app, Tauri desktop app, and shared TypeScript packages.

Before UI work, read [DESIGN.md](DESIGN.md).

## Working rules

- Questions are read-only. Analyze before editing and clarify contradictions instead of guessing.
- Use Bun and Bunx, never npm or yarn. The Bun version is pinned in root `package.json` and used by CI and Deploy.
- Do not add dependencies, commit, push, start servers, run builds, or publish/deploy without explicit user instruction for that action.
- Keep changes small, read files before editing, preserve existing patterns, and remove obsolete code when replacing it.
- Use strict TypeScript. Avoid `any`, type/lint suppression, and casts that hide errors.
- Do not add documentation unless asked. This guide and the justfile are the workflow reference.

## Commands

Run from the repository root. `just` lists commands and has no side effects. Just and an authenticated GitHub CLI (`gh`) are needed for release commands; ordinary checks only need Bun.

| Command | Purpose |
| --- | --- |
| `bun install --frozen-lockfile` | Install the locked dependencies |
| `just check` | Lint and typecheck all five workspaces; no builds |
| `bun run lint` | Biome checks without changing files |
| `bun run typecheck` | Native `bun check` in every workspace; no output files |
| `bun run lint:fix` | Apply Biome fixes; review the diff |
| `just release vX.Y.Z` | **Publishes and deploys production; explicit authorization required** |
| `just release-status vX.Y.Z` | List deployment runs for that release tag |

`bun check` uses TypeScript 7 and checks TS/TSX, including landing React components. It does not check Astro/MDX templates. Keep `tsc` for declaration-emitting builds; do not add a package script named `check` that shadows Bun's native command. CI also builds the apps, so a local `just check` alone does not guarantee a production build will pass.

Existing UI tests use `node:test`; the older simulator test imports Vitest and has no configured runner. Root `bun run test` currently has no workspace test tasks. Do not claim a full application test suite passed after running only lint and typechecks.

Only when explicitly authorized:

- `bun run dev:web` / `bun run dev:desktop` start the Vite apps.
- `bun run --cwd apps/landing dev` starts Astro.
- `bun run build:landing` / `bun run build:web` build the two production sites.
- `bun run build` runs all configured workspace builds.

## Project map

| Path | Owns |
| --- | --- |
| `apps/landing/src/pages/` | Astro pages and Markdown/MDX learning content |
| `apps/landing/src/layouts/` | SEO metadata and page layouts |
| `apps/landing/public/` | robots.txt, Cloudflare redirects, public assets |
| `apps/web/src/` | React/Vite simulator entry point and providers |
| `apps/desktop/` | React/Vite app and Tauri shell (`src-tauri/`) |
| `packages/core/src/` | Simulation, circuit types, validation and export utilities |
| `packages/ui/src/` | Shared simulator UI, gate nodes, hooks and state |
| `packages/ui/src/components/ui/` | shadcn-style components built on Base UI |
| `packages/ui/src/components/nodes/base/` | Gate geometry, rendering and handles |
| `packages/ui/src/styles/globals.css` | Tailwind v4 theme and shared styles |
| `justfile` | Shortcuts for checks, publishing releases and deployment status |
| `.github/workflows/` | CI and release-triggered Cloudflare Pages deployment |

Shared packages export source files directly. Typechecking does not require building them first. Typecheck caching is disabled so changes to root compiler settings or Bun always get checked. Turbo retains dependency builds for production builds.

## Code and UI conventions

- Biome: two-space indentation, double quotes, 120-character lines, organized imports. Use type imports for types.
- Use kebab-case filenames, PascalCase components/types, camelCase functions, and uppercase constants.
- React Flow (`@xyflow/react`) renders circuits; Zustand stores circuit state. Motion handles animation.
- Each gate owns its geometry and delegates rendering to the shared gate infrastructure. Keep simulation in `packages/core` and presentation in `packages/ui`.
- Use the shared Tailwind theme, CSS custom properties and `cn()` for styles. Avoid hard-coded theme colors.
- Base UI APIs differ from Radix. For button-styled navigation use a native anchor with `buttonVariants`; do not assume `asChild` exists.
- Handle empty, loading and error states. Keep copy concise and avoid continuously repainting animations.

## Release workflow

Production deploys when a stable GitHub release is published. Publishing a release affects **both `gately.dev` and `app.gately.dev`**. Pushing main runs CI and does not deploy. Drafts/prereleases do not deploy; desktop distribution is separate.

1. Finish the requested changes and run `just check`. Commit and push only if explicitly requested. Before releasing, verify successful CI for the intended commit on GitHub main using `gh run list --workflow ci.yml --branch main`.
2. Only with explicit release/deployment authorization, run `just release vX.Y.Z` with an unused stable version. It runs `gh release create --target main --generate-notes` and publishes from GitHub main. The recipe does not perform preflight checks. Questions about releases are not permission to publish.
3. Run `just release-status vX.Y.Z` to get the Deploy run ID, then `gh run watch <run-id> --exit-status` to wait for its result. Check the live sites after deployment; for SEO changes also check redirects, canonical tags, robots.txt, sitemap and missing-page 404 responses. Report the release URL and deployment result. If deployment fails, investigate that run instead of blindly creating another release.

CI and Deploy use frozen installs and the same pinned Bun runtime. Production deployments run serially and do not cancel a running deployment. Cloudflare credentials stay in GitHub secrets; never print them. Do not change DNS, Cloudflare configuration or production data as part of an ordinary code change.
