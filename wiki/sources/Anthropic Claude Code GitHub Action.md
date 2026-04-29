---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [anthropic, official, github-actions, ci-cd, automation]
source_url: https://github.com/anthropics/claude-code-action
source_author: Anthropic
license: (Anthropic Commercial Terms)
---

# Anthropic Claude Code GitHub Action

The **official GitHub Action** for integrating Claude AI into CI/CD workflows. v1.0 released August 26, 2025. 7.3k stars, 1.8k forks. Strong production adoption.

For our wiki, this is the canonical "Claude in your CI" reference. Pairs with [[Routines|Anthropic Routines]] (cloud) and [[Claude Code|headless mode `claude -p`]] (local CI).

## What it enables

- **Interactive code assistance** — answer questions, analyze PR changes, suggest improvements, implement fixes/refactors/features
- **Automated code review** with structured feedback
- **Issue triage & labeling** — automatic categorization
- **PR/issue integration** via GitHub comments + reviews
- **Scheduled maintenance** — automated repo health checks
- **Documentation sync** — keep docs updated with code changes

## Activation modes

The action auto-detects when to activate:
- `@claude` mentions in PR/issue comments
- Issue assignments to Claude
- Explicit automation prompts in workflows

## Provider support

Authentication and API calls go to your chosen provider:
- **Anthropic API** (direct)
- **AWS Bedrock**
- **Google Vertex AI**
- **Microsoft Foundry**

Runs entirely on your GitHub runners. Code stays on your infrastructure.

## Installation

```bash
claude
/install-github-app
```

The slash command guides through:
- GitHub app setup
- Repository secrets configuration
- Authentication

Requires repository admin access.

## Example workflows (from Solutions Guide)

- 🔍 Automatic PR Code Review
- 📂 Path-Specific Reviews (trigger on critical files)
- 👥 External Contributor Reviews
- 📝 Custom Review Checklists
- 🔒 **Security-Focused Reviews (OWASP-aligned)**
- 📊 DIY Progress Tracking

## Developer experience

- **Dynamic progress tracking** with checkbox updates in comments
- **Structured JSON outputs** become GitHub Action outputs (consumable by downstream jobs)
- **Flexible tool access** (GitHub APIs, file operations)

## Security

- Runs entirely on your runners (no code leaves your infrastructure)
- Unified configuration via `prompt` and `claude_args` inputs
- Simplified secret management through Action secrets
- See `docs/security.md` for access control, permissions, commit signing

## Why this matters for our wiki

For Alessandro's focus areas:

1. **CI/CD as primary surface** — for teams that want Claude-in-CI without rolling their own. Significantly easier than `claude -p "..."` in shell scripts. Especially relevant once you're past prototyping.

2. **`/install-github-app` is the easiest install path** — much friendlier than typical GitHub App setup.

3. **Auto-detection vs explicit triggering** — the `@claude` mention pattern is the right shape (lightweight, intuitive).

4. **Multi-provider support** — important if your org has Bedrock/Vertex/Foundry contracts already.

Comparison to alternatives:
- **vs [[Routines|Anthropic Routines]]** — Routines run on Anthropic's infrastructure (cron-shaped), this Action runs on your GitHub runners (event-driven primarily). Different deployment models.
- **vs `claude -p` in CI** — Action provides structured outputs, automatic GitHub integration. Lower-level `claude -p` gives more flexibility but requires more wiring.
- **vs [[Claude Code Templates (Daniel Avila)|Claude Code Templates]]** — Templates is for individual dev setup; this is for team CI/CD.

## Cross-references

- [[Claude Code]] (headless mode + Agent SDK)
- [[Routines]] (cloud-hosted scheduling alternative)
- [[Auto Mode]] (relevant for unattended CI runs)
- [[Verification Loops]] (CI is a natural verification surface)
- [[Reducing Hallucinations]] (multi-agent review built into the Action)
