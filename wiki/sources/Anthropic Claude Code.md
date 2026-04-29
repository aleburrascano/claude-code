---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [anthropic-official, claude-code, plugins, configs, distribution]
source_path: (no raw — discovered via hyperlink in raw/repos/davila7-claude-code-templates.md)
source_date: 2026-04-27
source_author: Anthropic
source_url: https://github.com/anthropics/claude-code
license: see LICENSE.md (not explicitly enumerated in README)
---

# Anthropic Claude Code

The **official `anthropics/claude-code` repository** on GitHub: 119k stars, 19.7k forks, 5k+ active issues, 516 PRs.

> [!note] Important: this is NOT the CLI source code
> Despite the name, this repository contains **configuration, plugins, examples, distribution scripts, and documentation references** — not the core Claude Code CLI binary, which is distributed via Homebrew, WinGet, npm, etc.

## Repository contents

```
.claude-plugin/      # Plugin configuration
.claude/commands/    # Custom commands
.devcontainer/       # Development container setup
.github/             # GitHub workflows
.vscode/             # VS Code settings
examples/            # Usage examples
plugins/             # Extension plugins
scripts/             # Utility scripts
```

Language composition: **Shell 47.1%, Python 29.2%, TypeScript 17.7%, PowerShell 4.1%, Dockerfile 1.9%** — confirming this is install/config/plugin tooling, not the agent runtime itself.

## Why it matters for the wiki

1. **Source of truth for installation methods** — README enumerates curl (macOS/Linux), Homebrew, Windows PowerShell, WinGet, NPM (now deprecated). When readers ask "how do I install Claude Code?", point here.
2. **Canonical plugin examples** — the `plugins/` directory hosts plugins shipped by Anthropic. Reference implementations of the [[Plugins|plugin.json schema]].
3. **Devcontainer reference** — the `.devcontainer/` directory is the canonical CC-in-a-container setup. Useful for [[Sandboxing]] readers.
4. **Examples & commands** — `examples/` and `.claude/commands/` are reference patterns for [[Slash Commands]] and project setup.
5. **Issues + PRs visibility** — 5k issues / 516 PRs make this the primary feedback signal back to Anthropic; Boris and other Anthropic engineers reply here.

## Where the *actual* CLI source lives

Not in this repo. The CLI binary is distributed via package managers (Homebrew, WinGet, npm). For reverse-engineered minimal implementations see [[Learn Claude Code (shareAI-lab)]] (~500 lines/session). For extracted system prompts see [[Claude Code System Prompts (Piebald)]].

## Cross-references

- [[Claude Code]] — the platform; this is the official distribution + config repo
- [[Plugins]] — canonical plugin examples
- [[Slash Commands]] — `.claude/commands/` reference patterns
- [[Sandboxing]] — `.devcontainer/` reference
- [[Anthropic Skills]] — sister official repo (skills themselves)
- [[Anthropic Claude Code GitHub Action]] — sister official repo (CI/CD)
- [[Anthropic Claude Quickstarts]] — sister official starter projects
- [[Claude Code Templates (Daniel Avila)]] — community distribution layer that complements this

## Visibility into the actual implementation

The CLI source itself is not open-sourced. For readers asking "where can I see what Claude Code actually does?", the wiki tracks two reverse-engineered or extracted references:

- **[[Learn Claude Code (shareAI-lab)]]** — reverse-engineered minimal Claude Code in ~500 lines/session. Useful for understanding the agentic-loop shape without the production complexity.
- **[[Claude Code System Prompts (Piebald)]]** — version-tracked extraction of CC's actual system prompts. Useful for understanding what Claude is told to do, even if not how it's implemented.

Together these two cover most of the "what is Claude Code actually doing?" surface area without access to the closed CLI source. For architecture rationale, [[Thariq - Seeing like an Agent]] and [[Thariq - Prompt Caching Is Everything]] are the engineer-voice complements.
