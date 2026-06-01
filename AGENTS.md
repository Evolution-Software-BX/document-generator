Don't make any changes without my approval.

First, describe the plan.

# Global Codex rules

- Work in strict budget mode.
- Never recursively scan repositories.
- Read only files relevant to the task.
- Ask before opening more than 5 files.
- Do not run tests unless explicitly requested.
- Do not install dependencies unless explicitly requested.
- Do not inspect lock files unless explicitly requested.
- Prefer targeted fixes over broad refactors.
- Do not write comments in scripts.

Forbidden paths

Never read or analyze these paths unless explicitly requested:

- node_modules/**
- vendor/**
- dist/**
- build/**
- coverage/**
- logs/**
- reports/**
- tmp/**
- .cache/**
- package-lock.json
- yarn.lock
- pnpm-lock.yaml
- composer.lock
- *.log
- *.min.js
- *.map
- *.json
