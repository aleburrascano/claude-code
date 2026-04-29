---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 8
tags: [claude-code, subagents, primitive, delegation, context-isolation]
---

# Subagents

Specialized AI assistants invoked by the main Claude Code agent to handle delimited tasks in **isolated contexts**. Each subagent gets a fresh `messages[]` array, its own system prompt, and (optionally) restricted tool access. Results return to the main agent.

The defining benefit: **context isolation**. The subagent's exploration, errors, and verbose tool output never enter the main conversation. Per [[Learn Claude Code (shareAI-lab)]] session 4, this is *why* subagents pay off — they prevent reasoning clutter in the orchestrator.

For practical guidance on when to delegate, see [[When to Delegate to Subagents]].

## Where subagents live

- **Project**: `.claude/agents/<name>.md`
- **User**: `~/.claude/agents/<name>.md`
- **Plugin**: `<plugin>/agents/<name>.md` (namespaced: `plugin-name:agent-name`)

Each `.md` file has YAML frontmatter and a system prompt body. Frontmatter fields per Anthropic docs:

| Field | Purpose |
|---|---|
| `name` | Display name; usually file name |
| `description` | What it does AND when to use (trigger spec for auto-delegation) |
| `tools` | Restrict tool access (e.g. `[Read, Grep, Glob]` for read-only) |
| `model` | Model override (e.g. `haiku` for cheap agents, `opus` for hard problems) |
| `permission_mode` | Permission mode for this subagent (overridden under [[Auto Mode]]; classifier ignores subagent's permission_mode) |
| `hooks` | Subagent-scoped hooks |
| `isolation` | `"worktree"` → spawns subagent in a temporary git worktree (v2.1.106+); auto-cleaned if no changes |

## Skills preloaded into subagents

Per Anthropic docs (notable difference from regular sessions):
- **Regular session**: skill descriptions in context; full skill content loads only when invoked
- **Subagent with `skills:` frontmatter**: **full skill content injected at startup**

This makes subagents heavier per spawn but predictable. Useful when you want a subagent's behavior baked in (the skill is *guaranteed* there) rather than activation-dependent.

`disable-model-invocation: true` skills are NOT preloaded into subagents.

## Subagent persistent memory

Per Anthropic docs: subagents can opt into their own auto memory (separate from main session's). Configured per subagent. Independent learning per specialist. See [[Memory]].

## Subagents vs Agent Teams

Per Anthropic docs: **subagents work within a single session**; **[[Claude Code|agent teams]] coordinate across separate sessions**. Different surfaces:
- Need parallel work in current session, conclusion-only return → **subagent**
- Need multiple agents working on the same codebase across sessions with shared task coordination → **agent teams**

For most uses: subagents. Agent teams are heavier infrastructure for genuine team-scale parallelism.

## Invocation

Two patterns:

### Auto-delegation (default)
The main agent reads the subagent registry. When a task matches a subagent's `description`, it delegates. Same triggering logic as [[Skills]] — the description is load-bearing.

### Explicit delegation
The user can name a subagent: "use the code-reviewer subagent to look at this diff." Useful when auto-delegation isn't reliable for a given subagent.

## Cache-preserving model switching

Per [[Thariq - Prompt Caching Is Everything|Thariq]]: **prompt caches are unique to models**. Switching models mid-session breaks cache.

The cache-safe way to mix models: **subagent handoff**. Opus prepares a handoff message; subagent (e.g., Haiku) handles the task in fresh context.

Claude Code uses this for Explore agents (Haiku). It's not just "different model for different work" — it's the *only* cache-preserving way to use multiple models in one session.

For [[Token Efficiency]]: counterintuitive consequence — switching from Opus to Haiku to "save cost" mid-session can be **more expensive** than letting Opus continue, because of the full cache rebuild for Haiku. Use subagents instead.

## Test Time Compute framing

Per [[Boris Cherny Tips Compendium|Boris's Mar 10 tip]] — **subagents are cognitive diversity engines, not just cost optimizers.**

> "Separate context windows beat single agents even with the same model... different cognitive roles produces better collective results."

The strategic value: errors decorrelate across independent contexts. This is the structural reason multi-agent verification reduces hallucination. See [[Test Time Compute]] for full treatment.

Reframe the calculus: you're not paying for "an extra agent that does the same thing"; you're paying for "an uncorrelated reasoning path that catches what the first one missed."

## The delegation calculus

Subagents are **not free**. Each one:
- Spawns a new model context (cost)
- Cannot see the main conversation history (relevant context must be passed)
- Returns a single text result (not a structured artifact, unless the subagent writes to disk)

Worth it when:
- The task is **token-heavy** and would bloat the main context (long file reads, repository scans, web research)
- The task needs a **different system prompt** (specialized review lens, different model)
- You need **parallelism** — multiple subagents running concurrently
- The task might **fail or get stuck** and you don't want that contamination in the main thread

Not worth it when:
- The task is a few lines of work that the main agent can do directly
- The result requires the full conversation context to interpret
- The subagent and main agent need to interact iteratively

## Patterns from the deep-dives

### 6-aspect parallel review ([[claudekit (Carl Rannaberg)]])
On a code review, spawn six subagents simultaneously, each with a single concern:
1. Architecture
2. Security
3. Performance
4. Testing
5. Code quality
6. Documentation

The split prevents one agent from trading off concerns. Each is held responsible for its single dimension. Results merge into one review.

### Two-stage subagent review ([[Superpowers (obra)|Superpowers SDD]])
For implementation: spawn one subagent for **spec compliance** review, then a second for **code quality**. Spec-then-quality ordering prevents cleanly-implemented-wrong-thing.

### Subagent-Driven Development ([[Context Engineering Kit (NeoLabHQ)|SADD]])
Orchestrate parallel/sequential subagents with **independent judge verification** and automatic retry loops. Each task gets verified before moving on; failures retry with feedback.

### Mandatory delegation ([[claudekit (Carl Rannaberg)]])
Every "technical issue" must be routed to a specialist subagent — main agent acts as a triage layer, not a jack-of-all-trades. Opinionated but it forces the *which subagent owns this?* question early.

### Research-to-disk ([[claudekit (Carl Rannaberg)]] research-expert)
Long research outputs written to `/tmp/` for the main agent to summarize, rather than returned in-context. Generalizable token-efficiency pattern.

## Specialization examples

[[claudekit (Carl Rannaberg)]] ships 20+ specialist subagents — `typescript-expert`, `react-expert`, `database-expert`, `kafka-expert`, `nestjs-expert`, etc. Each is a domain-loaded prompt that lifts the main agent above generalist territory.

The framework: a domain specialist subagent is essentially a *lens* — same model, different prompting + tool restrictions, producing a different (better-informed) reasoning path.

## Anti-patterns

- **Subagent for trivial work** — overhead exceeds benefit. Use directly.
- **No tool restrictions** — a subagent with full tool access can drift into territory unrelated to its task. Restrict tools in the agent's frontmatter.
- **Subagent stack-up** — subagents calling subagents calling subagents. Tracking state becomes impossible. Limit nesting.
- **Vague descriptions** — same problem as skills; the description must signal when to delegate.

## What subagents are *not*

- Not [[Skills]] — those are *capabilities* invoked in-context, not separate contexts.
- Not [[Slash Commands]] — those don't isolate context.
- Not [[Plugins]] — plugins may *include* subagents, but the primitive is the agent definition.
- Not multi-process orchestration — they're sequential or parallel within one Claude Code session.

## Cross-agent handoff (Claude Code ↔ Codex / external agents)

Subagents are the canonical *intra-session* delegation primitive, but some workflows need handoff *across* agents and even across products (Claude Code → Codex → back to Claude Code on the same task). [[claude-code-tools (Prasad Chalasani)]] solves this: session continuity + cross-agent message passing + Rust/Tantivy search across session histories. The subagent abstraction generalizes — same brief-driven hand-off, different runtime.

For [[Token Efficiency]]: cross-agent handoff is also a session-continuity strategy. Instead of recompacting at 150k tokens (per [[Anthropic Compaction]]) or starting fresh, hand off the work + context summary to a sibling agent that picks up cleanly.

## Cross-subagent task coordination via Tasks (file-system store)

For coordinating work *between* multiple subagents on a long project, [[Thariq - Tasks Tool (Todos to Tasks)|the Tasks primitive]] (Jan 2026, replacing TodoWrite) is the canonical mechanism:

- **File-system store** at `~/.claude/tasks/` — tasks live on disk, not in any single conversation
- **Dependencies + blockers** as first-class metadata
- **Cross-session broadcast**: when one session updates a Task, all other sessions on the same Task List are notified
- **Shared task lists** via `CLAUDE_CODE_TASK_LIST_ID=<id> claude` — works with `claude -p` headless mode and Agent SDK

Pattern: spawn N parallel subagents, all sharing a Task List. As one finishes a task, dependents unblock. No central coordinator needed; the file-system store + broadcast is the coordinator.

## Cross-references

- [[When to Delegate to Subagents]] — synthesis page with the decision framework
- [[Skills]] · [[Hooks]] · [[Plugins]] · [[Slash Commands]]
- Sources: [[claudekit (Carl Rannaberg)]] (20+ subagents) · [[Superpowers (obra)]] (subagent-driven-development) · [[Context Engineering Kit (NeoLabHQ)]] (SADD) · [[Learn Claude Code (shareAI-lab)]] (architectural rationale) · [[Claude Code System Prompts (Piebald)]] (delegation prompt) · [[claude-code-tools (Prasad Chalasani)]] (cross-agent handoff CC↔Codex + session continuity)
