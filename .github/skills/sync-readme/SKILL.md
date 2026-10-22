---
name: sync-readme
description: Update this Playwright portfolio README after tests, configuration, CI, or project structure change. Use when asked to refresh, synchronize, or review README against the repository.
---

# Sync README with the project

1. Read `README.md`, `package.json`, `playwright.config.ts`, the GitHub Actions workflow, and the relevant files under `tests/`.
2. Compare documented coverage, commands, project layout, and CI behavior with the current repository. Describe only scenarios and checks actually implemented.
3. Make the smallest README change that resolves stale or missing information. Keep commands copyable and use filenames that exist. Do not claim an API suite, browser coverage in CI, or a passing workflow without evidence.
4. Review the diff for accuracy and run a read-only check of documented paths and npm script names. Documentation-only changes do not require rerunning browser tests.
5. Report what changed and how the README was checked.

This skill runs when invoked by a person or assistant. It does not execute automatically on Git pushes.
