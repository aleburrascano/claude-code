---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, tips, token-efficiency, multi-model, container-workflows]
source_url: https://github.com/ykdojo/claude-code-tips
source_author: ykdojo
---

# Claude Code Tips (ykdojo)

A repository of **45 practical tips** for maximizing Claude Code productivity, from foundational commands through system-prompt patching, multi-agent orchestration, and containerized execution. The author advocates a "billion token rule" philosophy: mastery comes through sustained volume of experimentation, not theoretical study.

For our focus areas this is the densest practical source on **token efficiency** and **workflow tactics** — many tips translate directly to time-and-money savings.

## Thematic clusters

| Theme | Representative tips |
|---|---|
| **Foundational workflows** (0–7) | Status line customization, slash commands, voice input, terminal aliases, basic decomposition |
| **Context & token management** (5–8, 15) | Fresh context principles, proactive compaction, **system prompt patching (~50% overhead reduction)**, lazy-loading MCP tools |
| **Verification & testing** (9, 28, 34) | Write-test cycles, tmux-based automation, Playwright MCP, TDD |
| **Advanced patterns** (16–17, 21, 36) | Git worktrees for parallel work, manual exponential backoff, **containerized risky tasks**, background subagent orchestration |
| **Structural knowledge** (12, 25, 30–31) | CLAUDE.md management, skills vs slash commands vs plugins, periodic review cycles |

## Standout tips (with our focus lens)

For [[Token Efficiency]]:

1. **Tip 15: Slim Down System Prompt** — Patches the system prompt to remove ~10k tokens (~50% overhead reduction) while preserving essentials. Directly material savings on every turn.
2. **Tip 8: Proactive Handoff Documents** — Summarize state before starting fresh conversations; new agents inherit only essential context, not full transcript baggage.
3. **Tip 23: Conversation Cloning & Half-Cloning** — Fork conversations at decision points; "half-clone" keeps only recent messages (no summaries) to reduce context burden.
4. **Tip 5–7: Fresh context principles** — The author explicitly frames context as a renewable but expensive resource.

For [[Context Engineering]]:

5. **Tip 12: CLAUDE.md file management** — Discipline around which CLAUDE.md you load and when.
6. **Tip 25: Distinguishing skills/slash commands/plugins** — Choosing the right primitive for the job is itself context engineering.

For multi-model / capability extension:

7. **Tip 11: Multi-Model Fallback (Gemini CLI)** — Bypass Claude Code's WebFetch limitations by delegating blocked fetches to Gemini, executed via a tmux subagent pattern. Pattern generalizes: any limitation can be delegated to a sibling tool.

For [[Reducing Hallucinations]]:

8. **Tip 9: Complete Write-Test Cycles** — Use tmux to run interactive applications (Claude Code itself), capture output, verify results. Enables autonomous git bisect and similar verification tasks.
9. **Tip 35: Iterative Problem-Solving in Unknown Domains** — Combine human judgment with agent exploration; control abstraction level and pacing to solve problems despite knowledge gaps. Counter to overconfidence in unknown territory.

For safety:

10. **Tip 33: Audit Approved Commands** — Use `cc-safe` (the author's tool) to detect dangerous patterns (`rm -rf`, `sudo`, `docker --privileged`) in `settings.json` files.
11. **Tip 21: Containerized Risky Tasks** — Run unsupervised autonomous work (git bisect, system prompt patching) in isolated environments using tmux orchestration.

## Bundled resources

- **Working scripts**: context bar (custom status line), clone-conversation, half-clone-conversation, **check-context** (auto-trigger half-clone at 85% context), `setup.sh` for batch configuration.
- **DX Plugin** (Tip 44): Bundles `/dx:gha`, `/dx:handoff`, `/dx:clone`, `/dx:half-clone`, and a `reddit-fetch` skill. Marketplace-installable.
- **Video demo**: YouTube walkthrough of multi-Claude workflow with voice input.
- **SafeClaw**: Docker-based orchestration tool for managing multiple isolated Claude instances via web dashboard.
- **`cc-safe`**: CLI for scanning risky approved commands across all Claude settings.

## Author philosophy

> "Software engineering intuitions — testing, git workflows, decomposition, verification — remain essential when delegating to agents."

ykdojo treats Claude Code as **infrastructure for personalized software**, urging sustained investment in workflow automation and tool customization. The "billion token rule" — volume of experimentation over theoretical study — frames Claude Code mastery as experiential. Resonates with ML-style "scale your usage to scale your understanding."

## License

Not explicitly stated in the README excerpt; the included tools (DX Plugin, SafeClaw, `cc-safe`) appear to be permissively licensed.

## My assessment

This source is the wiki's densest **practical-tactics** primary. Tips 8, 11, 15, and 23 alone justify treating it as a top-tier reference.

The system-prompt patching tip (15) is the most aggressive token-efficiency technique I've seen documented — and the most surprising. ~10k tokens of overhead removed by editing the system prompt is material for any heavy user, and the technique is non-obvious.

The half-clone pattern (Tip 23) is also under-appreciated — *forking without summarizing* preserves the model's actual reasoning rather than a flattened summary. Worth folding into [[Token Efficiency]] as a primary technique.

Caveat: many of the more-aggressive tips (system prompt patching, containerized risky tasks) involve technique not officially supported. They're documented as community practice. Use accordingly.

Pair with [[Claude Code System Prompts (Piebald)]] (so you understand *which* system prompt parts to consider patching) and [[Learn Claude Code (shareAI-lab)]] (so you understand *why* patching works structurally).

Cross-references: [[Token Efficiency]] · [[Context Engineering]] · [[Memory]] · [[Reducing Hallucinations]] · [[Claude Code Ecosystem]]
