---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, subagents, hooks, quality-gates, checkpoints]
source_url: https://github.com/carlrannaberg/claudekit
source_author: Carl Rannaberg
license: MIT
---

# claudekit (Carl Rannaberg)

A toolkit positioned as "your safety net while coding with Claude" — automating quality checks, preventing errors in real-time via [[Hooks]], managing git checkpoints, and orchestrating 20+ specialized [[Subagents]]. 696 stars, 56 releases at clip; latest v0.9.5. Requires Claude Code Max plan + Node.js 20+.

## The 20+ specialized subagents

Domain experts:
- **typescript-expert**, **react-expert**, **nestjs-expert**, **kafka-expert**, **loopback-expert** — language/framework specialists.
- **database-expert** — query optimization, schema design.
- **ai-sdk-expert** — Vercel AI SDK v5 integration.
- **testing-expert** — strategy and coverage.
- **infrastructure** and **build-tool** specialists.

Cross-cutting:
- **code-review-expert** — parallel 6-agent analysis (architecture, security, performance, testing, quality, documentation). The "6-aspect deep analysis" is the headline pattern.
- **oracle (gpt-5)** — deep debugging and complex problem analysis (separate setup; uses GPT-5 as a different perspective).
- **triage-expert** — initial diagnosis and routing to other specialists.
- **refactoring-expert** — code-smell detection.
- **documentation-expert** — information architecture.
- **research-expert** — parallel research with reported ~90% time reduction.

## Hooks (automated quality gates)

| Event | Hook | Purpose |
|---|---|---|
| **PreToolUse** | file-guard | Blocks sensitive file access |
| **PostToolUse** | typecheck-changed | Runs `tsc` on changed files |
| **PostToolUse** | lint-changed | Runs linter on changed files |
| **PostToolUse** | test-changed | Runs tests for modified code |
| **PostToolUse** | check-any-changed | Blocks TypeScript `any` introductions |
| **PostToolUse** | check-comment-replacement | Catches accidental comment churn |
| **UserPromptSubmit** | codebase-map | Injects a project map per turn |
| **UserPromptSubmit** | thinking-level | Adjusts reasoning depth contextually |
| **Stop / SubagentStop** | create-checkpoint | Auto-saves git state |
| **Stop / SubagentStop** | self-review | Pre-finish quality check |
| **Stop / SubagentStop** | project-wide validation | End-of-session sweep |

## Notable techniques

### Real-time error prevention
- **TypeScript `any` blocking** with instant alternative suggestions — the cheapest way to enforce type discipline.
- **Advanced bash security analysis** — detects sensitive file patterns in pipes, xargs, and uploads (catches things like `cat .env | curl …`).
- **Linting + testing on change** — feedback loop tightened to every file write.

### Code review architecture (6-aspect parallel)
Spawns six parallel subagents on the same diff, each with a single concern:
1. Architecture decisions
2. Security vulnerabilities
3. Performance bottlenecks
4. Test adequacy
5. Code quality
6. Documentation completeness

The split prevents one agent from trading off concerns — each is held responsible for its single dimension. Results merge into a single review.

### Iterative spec execution (6-phase)
Atomic 6-phase workflow with quality gates: code → tests → review → improvement → commit → tracking. Quality gates between phases prevent advancing on incomplete work.

### Session-based hook control
Developers can **temporarily disable hooks within specific sessions** (e.g., for token profiling) without modifying config permanently. Important for the "this session is special" cases.

### Token efficiency tactic
**Structured research reports written to `/tmp/`** — research-expert writes findings to disk for synthesis without bloating the main agent's context. Useful pattern for any long-running session: serialize the bulky outputs, summarize in main context.

## Design philosophy

"Smart guardrails" — invisible automation catches problems as they occur rather than after. Architecture priorities:
- **Mandatory delegation** — all technical issues route to specialized subagents.
- **Hook performance profiling** — statistical analysis prevents slow hooks (>5s) from degrading workflow.
- **Multi-tool compatibility** — respects `.agentignore`, `.aiignore`, `.cursorignore`, `.geminiignore`.
- **Token efficiency** — research reports to disk to avoid context bloat.

## Installation

```
npm install -g claudekit
claudekit setup              # Interactive
claudekit setup --yes --all  # All agents, no prompts
```

## My assessment

claudekit is the most complete *operational* implementation of guardrails-driven Claude Code use I've seen. The 6-aspect parallel review pattern is worth lifting wholesale — it's a clean instance of "use subagent isolation to prevent concern-trading." The session-based hook disable is a small but high-leverage feature; most hook frameworks force you to commit changes that affect future sessions.

For [[Token Efficiency]]: the **`/tmp/` research-output pattern** is a generalizable technique. Any long workflow that produces verbose intermediate artifacts can serialize-and-summarize rather than stuffing them into context.

For [[When to Delegate to Subagents]]: claudekit's mandatory-delegation rule is opinionated but illuminating — it forces the question "should this be its own subagent?" early in the design.

Pair with [[Superpowers (obra)]] (workflow scaffolding), [[Compound Engineering Plugin]] (institutional learning), and [[Context Engineering Kit (NeoLabHQ)]] (orchestration patterns). The four are compatible — claudekit covers the *runtime guardrail* layer that the others assume.

Cross-references: [[Subagents]] · [[Hooks]] · [[Checkpoints]] · [[When to Delegate to Subagents]] · [[Token Efficiency]] · [[Claude Code Ecosystem]]
