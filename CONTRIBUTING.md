# Contributing to Gately

Thank you for your interest in contributing to Gately! This document outlines our contribution process and development workflow.

## Development Workflow

### Branch Strategy

We use a two-branch workflow:

- **`main`** - Production branch (always deployable)
- **`develop`** - Development branch (integration branch for features)

### Workflow Steps

1. **Fork the repository** and clone it locally
2. **Create a feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following our code style guidelines (see AGENTS.md)

4. **Test your changes** locally:
   ```bash
   bun install
   bun run build
   bun run lint
   ```

5. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** targeting the `develop` branch (not `main`)

### Pull Request Guidelines

- **Title**: Clear, concise description of changes
- **Description**: Explain what changed and why
- **Target**: Always target `develop` branch (unless it's a hotfix)
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes

### Code Style

- We use **Biome** for linting and formatting
- Run `bun run lint` before committing
- Follow the patterns in AGENTS.md for code style
- Use TypeScript with strict types
- Prefer existing patterns over introducing new ones

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/gately.git
cd gately

# Install dependencies
bun install

# Start development (runs all apps)
bun dev

# Or run individual apps
cd apps/web && bun dev        # Web editor on :5173
cd apps/landing && bun dev    # Landing site on :4321
cd apps/desktop && bun tauri dev  # Desktop app
```

### Project Structure

See the root README.md for the monorepo structure. Key points:

- `apps/web` - Web editor (Vite SPA)
- `apps/landing` - Marketing site (Astro)
- `apps/desktop` - Desktop app (Tauri)
- `packages/ui` - Shared React components
- `packages/core` - Core simulation logic

### Commit Message Guidelines

Use clear, imperative commit messages:

- ✅ `Add truth table export feature`
- ✅ `Fix gate simulation bug for XOR gates`
- ✅ `Update landing page hero section`
- ❌ `fixed stuff`
- ❌ `WIP`
- ❌ `changes`

### What to Contribute

**Good first contributions:**
- Bug fixes
- Documentation improvements
- UI/UX enhancements
- New logic gate types
- Test coverage
- Performance improvements

**Please open an issue first for:**
- Major feature additions
- Breaking changes
- Architectural changes
- New dependencies

### Code Review Process

1. A maintainer will review your PR
2. Address any requested changes
3. Once approved, a maintainer will merge to `develop`
4. `develop` will be periodically merged to `main` for releases

### Release Process

- Features merge to `develop`
- `develop` is tested and stabilized
- `develop` merges to `main` for production deployment
- `main` triggers deployments to:
  - gately.dev (landing site)
  - app.gately.dev (web editor)
  - GitHub releases (desktop app)

### Getting Help

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check AGENTS.md for code style guidelines

### License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

Thank you for contributing to Gately! 🚀
