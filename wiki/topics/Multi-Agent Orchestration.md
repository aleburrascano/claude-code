---
type: topic
created: 2026-04-29
updated: 2026-04-29
sources: 8
tags: [topic, focus, multi-agent, subagents, orchestration, parallelism, coordination]
---

# Multi-Agent Orchestration

The discipline of running **multiple agents working together** — when to do it, how to coordinate them, what infrastructure to build, and what to avoid. Distinct from [[When to Delegate to Subagents]] (which answers "should I use a subagent?") — this page answers "given that I'm using multiple agents, how do I make them effective?"

The wiki has 10+ frameworks that converge on multi-agent patterns ([[BMAD-METHOD|BMAD]], [[gstack (Garry Tan)|gstack]], [[oh-my-claudecode]], [[Get Shit Done (gsd-build)|GSD]], [[Superpowers (obra)|Superpowers]], [[claudekit (Carl Rannaberg)|claudekit]], [[ContextKit (Cihat Gunduz)|ContextKit]], [[The Agentic Startup (Rudolf Schmidt)|Agentic Startup]], [[Compound Engineering Plugin|Compound Engineering]], [[HCOM (Claude Hook Comms)|HCOM]]). The convergence is meaningful: these are 10 independent groups arriving at variants of "multiple uncorrelated agents beat one good one." This page synthesizes their patterns.

---

## TL;DR — what to do

- For **review and validation**: spawn parallel subagents on the same artifact with different concerns ([[claudekit (Carl Rannaberg)|claudekit's 6-aspect]] is the canonical example).
- For **exploration**: spawn parallel subagents with different *prompts* on the same problem, take the best ([[Matt Pocock Skills|design-an-interface]]).
- For **role specialization**: spawn agents whose contexts encode distinct roles (architect, implementer, reviewer) — same model, different cognitive lenses.
- For **scale**: hand off across sessions/agents ([[claude-code-tools (Prasad Chalasani)]] for cross-product handoff CC↔Codex).
- For **communication**: use [[Hooks]] as a message bus when agents need to coordinate mid-task ([[HCOM (Claude Hook Comms)]]).
- For **cost**: cache-preserving model switching via subagents ([[Subagents]] + [[Prompt Caching]]). Don't switch the main agent's model.

---

## Why multi-agent works (the [[Test Time Compute]] argument)

The structural argument from [[Boris Cherny Tips Compendium|Boris]]:

> "Agents will probably write perfect bug-free code — until then, multiple uncorrelated context windows tends to be a good approach."

> "The same underlying model performing different cognitive roles produces better collective results."

The key insight: errors **decorrelate** across independent contexts. One agent introduces a bug; another agent (same model, fresh context) catches it. This works because:

- Different contexts approach problems with different logical pathways
- Independent reasoning catches what single-agent self-review misses
- Mirrors human team dynamics — code review by colleagues catches what authors miss

So multi-agent isn't primarily a parallelism story (though parallelism is a bonus). It's a **cognitive diversity** story. Same model → different contexts → uncorrelated failures.

---

## The five archetype patterns

### 1. Parallel review (multi-aspect, same artifact)

Spawn N subagents on the same diff, each with a single concern.

**Canonical example**: [[claudekit (Carl Rannaberg)]]'s **6-aspect parallel review** — architecture, security, performance, testing, quality, documentation. Each subagent is *structurally incapable* of trading off concerns ("the security issue is fine because the tests cover most cases…") because each only sees its own concern.

**When**: code review, design review, architecture review, anywhere multiple orthogonal concerns must each get focused attention.

**Result merging**: main agent synthesizes findings. Conflicts surface naturally because each subagent reports independently.

### 2. Parallel exploration (same artifact, different prompts)

Spawn N subagents on the same problem with *different prompts* (different design philosophies, different starting points, different optimization criteria). Take the best, or merge insights from each.

**Canonical example**: [[Matt Pocock Skills|`mattpocock/skills/design-an-interface`]] — three subagents each tasked to design an interface with a different philosophy. Main agent picks or merges.

**When**: design space is wide and unknown; sequential thinking would prematurely commit; the cost of a bad first commit is high.

**Anti-pattern**: parallel exploration without aggregation. Many opinions without synthesis is just noise.

### 3. Role specialization (different roles, sequential)

Different agents handle different roles in a pipeline. Architect designs → Implementer codes → Reviewer reviews → QA validates.

**Canonical examples**:
- [[BMAD-METHOD]] — 12+ agent personas (PM, Architect, Dev, QA, etc.)
- [[The Agentic Startup (Rudolf Schmidt)]] — team-based roles using [[Output Styles]] for consistent role behavior
- [[gstack (Garry Tan)]] — role-based with `/pair-agent` for multi-vendor coordination

**When**: workflows where each phase needs distinct expertise/lens. Clear handoff points where one role's output is another role's input.

**Risks**: handoff loss (the Implementer didn't get all the Architect's intent), role drift (Implementer makes Architect-level decisions), and over-specialization (small tasks don't justify the role overhead).

### 4. Two-stage validation (compliance, then quality)

Stage 1: a subagent validates **conformance to spec**. Stage 2: a subagent validates **code quality**. Then merge.

**Canonical example**: [[Superpowers (obra)|Superpowers SDD]] — spec-compliance subagent before code-quality subagent. Catches the most insidious failure: clean implementation of the wrong thing.

**When**: spec exists; misalignment cost > polish cost. Production deploys, contractual deliverables, anywhere "wrong but pretty" loses money.

### 5. Wave-based parallelization (independent units, sequential dependencies)

Decompose work into independent units that can run simultaneously, then sequence the units that depend on prior waves.

**Canonical example**: [[Get Shit Done (gsd-build)]] — wave-based parallelization with XML-structured tasks. Wave 1: independent setup tasks. Wave 2: tasks that depend on wave 1 outputs. Etc.

**When**: large project with mixed dependency structure; you want maximum parallelism subject to ordering constraints.

**Risks**: dependency mis-modeling (task you thought was independent actually wasn't), accumulation of waves that have to wait on a slow tail in the previous wave.

---

## Coordination mechanisms

How do multiple agents *talk* to each other? Five mechanisms, in increasing complexity:

### Briefs and results (the default)
Caller writes a brief; subagent runs in isolation; subagent returns a single result. The cleanest, lowest-overhead pattern. **Sufficient for ~80% of multi-agent work.** Don't add coordination machinery speculatively.

### Disk handoff
Subagents write to `/tmp/` or named artifact paths; subsequent agents read those paths. Per [[claudekit (Carl Rannaberg)|claudekit's research-expert pattern]]: research subagents write findings to disk; main agent reads only the summary. **Pattern**: `research-on-X.md` written by research agent, read by implementer.

### Cross-agent session continuity
[[claude-code-tools (Prasad Chalasani)]]: persistent session context + Rust/Tantivy search across past sessions + cross-agent message passing CC↔Codex. **Use case**: long-running work that spans multiple agents and even multiple AI products on the same task.

### Hooks-as-message-bus
[[HCOM (Claude Hook Comms)]]: subagents emit messages on tool events; sibling agents subscribe via [[Hooks|`PreToolUse` / `PostToolUse`]] matchers. Same plumbing primitive as compression/guardrails/context-injection, applied to inter-agent communication. **Use case**: coordinating large parallel work where agents need to know each other's progress.

### MCP-mediated state
A shared [[Model Context Protocol|MCP server]] (database, knowledge graph, scratchpad) that all agents read/write to. **Use case**: many agents on the same project where shared context > brief-based handoff.

### File-system-mediated state (Tasks)
[[Thariq - Tasks Tool (Todos to Tasks)|Tasks]] (Jan 2026, replacing TodoWrite) ships a **file-system task store** at `~/.claude/tasks/` with cross-session broadcast. Multiple sessions/subagents started with `CLAUDE_CODE_TASK_LIST_ID=<id> claude` collaborate on the same Task List; updates broadcast. Dependencies + blockers are first-class metadata. **Use case**: long projects where the work is naturally a DAG with handoffs — Anthropic's productized form of [[Steve Yegge|Steve Yegge's Beads]] pattern. Distinct from the others above by being **persistent + Anthropic-shipped + no extra infrastructure**.

---

## Cache-preservation in multi-agent setups

Per [[Prompt Caching]]: each agent has its own cache. **Don't switch the main agent's model** — instead, hand off to a subagent on the cheaper model. The main agent's cache stays warm; the subagent runs in a fresh (Haiku-class) context.

The pattern Claude Code uses internally: **Explore agents are Haiku**; main agent is Opus. When the main agent needs research-heavy lookups, it spawns an Explore subagent (Haiku, fresh cache). The main Opus session never invalidates its cache for the cheaper work.

Generalize: any multi-agent design with mixed-model needs should use subagents to keep each model's cache warm, not switch the main agent's model mid-stream.

---

## Frameworks at a glance

The wiki tracks 10+ multi-agent frameworks. Pick by your dominant pattern:

| Pattern | Framework |
|---|---|
| **6-aspect parallel review** | [[claudekit (Carl Rannaberg)]] |
| **Two-stage spec-then-quality** | [[Superpowers (obra)]] |
| **12+ agent personas + Party Mode** | [[BMAD-METHOD]] |
| **Wave-based parallelization** | [[Get Shit Done (gsd-build)]] |
| **Multi-vendor `/pair-agent`** | [[gstack (Garry Tan)]] |
| **4-phase planning + named quality agents** | [[ContextKit (Cihat Gunduz)]] |
| **Smart model routing** | [[oh-my-claudecode]] |
| **Mistake-into-lesson cycles** | [[Compound Engineering Plugin]] |
| **Output-Styles team roles** | [[The Agentic Startup (Rudolf Schmidt)]] |
| **Hooks-as-message-bus** | [[HCOM (Claude Hook Comms)]] |
| **Cross-product CC↔Codex handoff** | [[claude-code-tools (Prasad Chalasani)]] |

Each is documented on its source page. Read the [[Claude Code Ecosystem]] table for star counts + scope.

---

## When multi-agent is overhead, not leverage

The cost calculus per [[When to Delegate to Subagents]]: each subagent costs (a) brief-writing time, (b) fresh-context spin-up, (c) result-interpretation, (d) parallel-tracking complexity. For trivial work, those costs exceed any cognitive-diversity benefit.

**Don't multi-agent**:
- Trivial single-file edits — direct work, no subagents
- Tightly iterative work where main-agent context is the right tool
- Anything where briefs can't carry enough context (handoff loss > diversity gain)
- Pure-deterministic operations (use scripts, not agents)
- Time-critical work where coordination latency dominates

**Do multi-agent**:
- Code review (orthogonal concerns benefit from focused attention)
- Spec-compliance validation (cleanest catch of "wrong thing built well")
- Long autonomous runs (verbose work isolated in subagent contexts)
- Parallel exploration of design alternatives
- Mixed-model needs (cache preservation via subagent handoff)

---

## Anti-patterns

- **Multiple agents on the same context** — defeats the purpose. Cognitive diversity requires fresh contexts.
- **No tool restrictions** on subagents — drift outside the scoped task. Restrict in agent frontmatter (`tools: [Read, Grep]` for read-only research; etc.).
- **Subagent stack-up** — subagents calling subagents calling subagents. Tracking state becomes impossible. Limit nesting to 1-2 levels.
- **Vague briefs** — subagents can't see the calling conversation. The brief is *everything*. If the brief is "research X," not "research X for the auth refactor we're doing in `src/auth/`, focused on token expiration," the subagent will produce something vaguely relevant.
- **Mandatory delegation everywhere** — [[claudekit (Carl Rannaberg)|claudekit]]'s mandatory-delegation rule is opinionated and can be friction for trivial work. Use judgment.
- **Trusting subagent output as verified** — the subagent might be wrong. Verify, especially for code-producing subagents.
- **Switching the main agent's model** instead of using a subagent. Cache cost dominates above ~10-30k context tokens.
- **Adding HCOM-style message bus speculatively.** Briefs + results work for most cases. Don't introduce inter-agent comms before sequential brief-driven handoff has failed.

---

## Reading paths

For *practical* multi-agent today:
1. Read [[When to Delegate to Subagents]] for the decision framework
2. Read [[Test Time Compute]] for the structural argument
3. Pick one framework above that matches your dominant pattern; install it; use it on a real project
4. Add the others contextually as patterns emerge

For *deeper grounding*:
- [[Subagents]] (the primitive)
- [[Prompt Caching]] (cache-preservation in multi-agent setups)
- [[Hooks]] (message-bus and freshness patterns)

---

## Cross-references

- [[Subagents]] · [[When to Delegate to Subagents]] · [[Test Time Compute]]
- [[Hooks]] · [[Model Context Protocol]] · [[Prompt Caching]]
- [[Action Space Design]] · [[Reducing Hallucinations]] · [[Token Efficiency]]
- Sources: [[Boris Cherny Tips Compendium]] (Test Time Compute) · [[claudekit (Carl Rannaberg)]] (6-aspect review) · [[Superpowers (obra)]] (two-stage validation) · [[BMAD-METHOD]] (Party Mode) · [[Get Shit Done (gsd-build)]] (wave-based) · [[gstack (Garry Tan)]] (multi-vendor) · [[ContextKit (Cihat Gunduz)]] (4-phase planning) · [[oh-my-claudecode]] (smart routing) · [[The Agentic Startup (Rudolf Schmidt)]] (team roles) · [[HCOM (Claude Hook Comms)]] (hooks-as-message-bus) · [[claude-code-tools (Prasad Chalasani)]] (cross-product handoff) · [[Compound Engineering Plugin]] (mistake-into-lesson) · [[Thariq - Tasks Tool (Todos to Tasks)]] (file-system-mediated state via the Tasks primitive)
