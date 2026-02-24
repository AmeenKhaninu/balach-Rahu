# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working in this repository.

---

## Repository Overview

**Repository:** balach-Rahu
**Owner:** AmeenKhaninu
**License:** MIT
**Status:** Newly initialized — no source code has been added yet.

This repository was created on December 12, 2025 and currently contains only a LICENSE file. The project is at the planning/setup stage. This document should be updated as the codebase grows.

---

## Current State

```
balach-Rahu/
├── .git/
├── LICENSE
└── CLAUDE.md   ← this file
```

No source code, tests, configuration files, or CI/CD pipelines have been committed yet.

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

## Setting Up This Project (Template)

When the project is initialized with a specific language or framework, update this section with:

### Installation

```bash
# Add installation steps here when the stack is decided
```

### Running Locally

```bash
# Add local dev server / run commands here
```

### Running Tests

```bash
# Add test commands here
```

### Building for Production

```bash
# Add build steps here
```

---

## Updating This File

This file should be updated whenever:

- A language, framework, or runtime is chosen and added
- A test runner or CI/CD pipeline is configured
- New development conventions or coding standards are established
- The directory structure changes significantly
- New developer tooling (linters, formatters, pre-commit hooks) is added

Keep this file accurate and concise — it is the primary reference for any AI assistant working in this repository.
