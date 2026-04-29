---
type: person
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [people, practitioner, hooks, subagents, quality-gates, claudekit]
---

# Carl Rannaberg

Creator of [[claudekit (Carl Rannaberg)|claudekit]] — one of the wiki's most influential hook-based quality-gate frameworks. His patterns recur across multiple [[Reducing Hallucinations|hallucination defenses]] and [[Token Efficiency|token-efficiency techniques]] in the wiki.

For our wiki, Carl matters because claudekit is **the canonical example of "use hooks for everything you'd want to enforce"** — quality gates as code, deterministic and auditable.

## Key contributions

### 6-aspect parallel review

Six subagents on the same diff simultaneously — architecture, security, performance, testing, quality, documentation. Each is held to its single concern. **Prevents one reviewer from trading off concerns.** Canonical multi-agent pattern for [[Reducing Hallucinations]] and [[Test Time Compute]].

### 20+ specialist subagents

Domain-loaded subagents — `typescript-expert`, `react-expert`, `database-expert`, `kafka-expert`, `nestjs-expert`, etc. Each is a *lens* (same model, different prompting + tool restrictions, producing a different reasoning path). The pattern argues for **same model, different cognitive role** as a primary multi-agent design.

### Hook library (extensive)

Claudekit ships hooks for nearly every quality gate worth automating:

| Event | Hook | What it does |
|---|---|---|
| PreToolUse | `file-guard` | Blocks sensitive file access |
| PostToolUse | `typecheck-changed` | Runs `tsc` on changed files |
| PostToolUse | `lint-changed` | Runs linter |
| PostToolUse | `test-changed` | Runs tests for modified code |
| PostToolUse | `check-any-changed` | Blocks TypeScript `any` |
| Stop | `self-review` | Pre-finish quality check |
| Stop | `project-wide validation` | End-of-session sweep |

Each is "free" once configured — pure deterministic enforcement.

### Auto-checkpointing

Stop / SubagentStop hooks auto-save git state, enabling rewind/restore via [[Checkpoints]]. Pattern: never lose work to a bad turn.

### Contextual reasoning depth (`thinking-level` hook)

`UserPromptSubmit` hook adjusts `thinking_level` based on prompt content — debug/design/plan keywords trigger deeper reasoning; routine queries don't. Token efficiency lever for [[Extended Thinking]].

### codebase-map injection per turn

`UserPromptSubmit` hook injects a project map into the conversation. Per-turn structural context without forcing Claude to re-explore. Predecessor of the AST-graph patterns later popularized by [[GitNexus (abhigyanpatwari)|GitNexus]] and [[graphify (safishamsi)|graphify]].

### The hook performance discipline

claudekit profiles hooks and warns when any exceeds 5s. Rule of thumb: hooks should be sub-second; if they're not, push to background. Worth adopting as a permanent rule when designing new hooks. See [[Hooks#Hook performance discipline]].

## Why this matters for our wiki

Carl's contributions are the spine of the [[Hooks]] page and a substantial portion of [[Reducing Hallucinations]]:

- Hook-based quality gates are claudekit's signature pattern
- 6-aspect parallel review is one of two canonical multi-agent review patterns (with [[Superpowers (obra)|Superpowers SDD's]] two-stage)
- The 20+ specialist subagents demonstrate role-based cognitive diversity
- Auto-checkpointing on Stop is the cleanest recovery pattern in the wiki

For Alessandro's focus areas: claudekit is one of the highest-leverage installs available — most of the discipline is automatic once configured.

## Cross-references

- [[claudekit (Carl Rannaberg)]] — the canonical source page
- [[Hooks]] (extensive hook library; performance discipline)
- [[Subagents]] (20+ specialist subagents)
- [[Test Time Compute]] (6-aspect parallel review)
- [[Reducing Hallucinations]] (hook-enforced quality gates)
- [[Checkpoints]] (auto-checkpointing pattern)
- [[Extended Thinking]] (thinking-level hook pattern)
- [[Multi-Agent Orchestration]] (parallel review archetype)
