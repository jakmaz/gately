set default-list := true
set positional-arguments := true

# Lint and typecheck every workspace without building.
@check:
    bun run lint
    bun run typecheck

# Publish a release from GitHub main, triggering deployment of both sites.
@release version:
    gh release create "$1" --target main --title "$1" --generate-notes

# Show GitHub Actions deployment runs for this release tag.
@release-status version:
    gh run list --workflow deploy.yml --branch "$1" --event release --limit 5
