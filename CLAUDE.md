# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working in this repository.

---

## Repository Overview

**Repository:** balach-Rahu
**Owner:** AmeenKhaninu
**License:** MIT
**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · JavaScript

An interactive strategic blueprint for an AI-powered Pakistani fashion platform. The app visualizes a six-phase development roadmap, technical architecture, critique of the original plan, and budget tiers — all in a single dark-themed editorial UI.

---

## Current State

```
balach-Rahu/
├── app/
│   ├── globals.css          # Tailwind v4 import + base resets
│   ├── layout.js            # Root layout — Cormorant Garamond font, metadata
│   └── page.js              # Entry point — renders FashionTechBlueprint
├── components/
│   └── FashionTechBlueprint.jsx  # Main interactive component (client component)
├── .gitignore
├── CLAUDE.md                ← this file
├── LICENSE
├── eslint.config.mjs
├── next.config.mjs
├── package.json
└── postcss.config.mjs
```

---

## Git Workflow

### Branch Naming

| Branch prefix | Purpose |
|---------------|---------|
| `master` | Stable, production-ready code |
| `claude/` | Branches created and used by Claude Code (AI assistant) |
| `feature/` | New features under development |
| `fix/` | Bug fixes |
| `chore/` | Maintenance tasks (deps updates, formatting, etc.) |

The active branch for AI-driven work follows the pattern:
```
claude/claude-md-<session-id>
```

### Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>

[optional body]
```

Common types:

| Type | When to use |
|------|-------------|
| `feat` | Adding new functionality |
| `fix` | Correcting a bug |
| `docs` | Documentation changes only |
| `chore` | Build process, dependency updates, tooling |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `ci` | CI/CD pipeline changes |

**Examples:**
```
feat(auth): add JWT-based authentication
fix(api): handle null response from upstream service
docs: add setup instructions to README
```

### Push Protocol

Always push with the upstream flag:
```bash
git push -u origin <branch-name>
```

For AI (Claude) branches:
```bash
git push -u origin claude/<session-id>
```

---

## Development Guidelines for AI Assistants

### Before Making Changes

1. **Read before modifying.** Never modify a file without reading it first.
2. **Understand the context.** Check related files and imports before changing logic.
3. **Prefer editing over creating.** Edit existing files rather than creating new ones unless a new file is clearly required.

### Code Quality

- Keep changes minimal and focused on the task at hand.
- Do not add unsolicited refactors, comments, or features.
- Do not add error handling for scenarios that cannot happen.
- Remove unused code completely rather than commenting it out.
- Avoid backwards-compatibility shims unless explicitly required.

### Security

Never introduce:
- Command injection vulnerabilities
- SQL injection
- XSS (cross-site scripting)
- Hardcoded secrets, API keys, or credentials
- Insecure default configurations

Validate input at system boundaries (user input, external APIs). Trust internal framework guarantees.

### File Operations

- Use the minimal set of files needed for the task.
- Never create documentation files (README, CLAUDE.md, etc.) unless explicitly requested.
- Do not create helper utilities or abstractions for one-off operations.

---

## Project Setup

### Requirements

- Node.js 18+

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
# → http://localhost:3000
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
npm start
```

---

## Architecture Conventions

### Component Rules

- `app/` — App Router pages and layouts only. No business logic.
- `components/` — Reusable React components. All stateful components must include `"use client"` at the top.
- No `src/` directory — files live at project root per Next.js App Router convention.

### Styling

- Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`).
- The main component (`FashionTechBlueprint.jsx`) uses inline styles exclusively for fine-grained design control. This is intentional for this component — do not convert to Tailwind classes without explicit instruction.
- Design tokens (colors, accent, icon) are co-located on each `phases` data object, not in a separate file.

### Fonts

- `Cormorant Garamond` loaded via `next/font/google` in `app/layout.js`.
- CSS variable: `--font-cormorant`.
- The component references `'Cormorant Garamond', Georgia, serif` directly in inline styles.

### Data

All content (phases, critiques, budget tiers, architecture layers) lives as static arrays at the top of `components/FashionTechBlueprint.jsx`. There is no external data fetching. To update content, edit those arrays directly.

### Client vs Server Components

| File | Type | Reason |
|------|------|--------|
| `app/layout.js` | Server | No interactivity needed |
| `app/page.js` | Server | Simply re-exports the component |
| `components/FashionTechBlueprint.jsx` | Client (`"use client"`) | Uses `useState` |

---

## Updating This File

This file should be updated whenever:

- A language, framework, or runtime is chosen and added
- A test runner or CI/CD pipeline is configured
- New development conventions or coding standards are established
- The directory structure changes significantly
- New developer tooling (linters, formatters, pre-commit hooks) is added

Keep this file accurate and concise — it is the primary reference for any AI assistant working in this repository.
