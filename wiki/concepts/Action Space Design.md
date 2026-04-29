---
type: concept
created: 2026-04-29
updated: 2026-04-29
sources: 4
tags: [pattern, tool-design, action-space, progressive-disclosure, philosophy]
aliases: [Tool Design, Action Space]
---

# Action Space Design

The discipline of deciding **what an agent can do, and how that set is structured**. Foundational philosophy from [[Thariq - Seeing like an Agent|Thariq's "Seeing like an Agent"]] essay: tool design is *as much an art as it is a science*, and the action space — not the model alone — determines what the agent can accomplish.

> "Designing the tools for your models is as much an art as it is a science. It depends heavily on the model you're using, the goal of the agent and the environment it's operating in." — Thariq, Anthropic engineer

The framing matters because **the action space defines the agent**. Two systems with the same model but different action spaces behave like different products. Most "Claude Code is good at X" claims are really claims about Claude Code's action-space design.

## What's in the action space

Five primitives, in roughly increasing weight:

| Primitive | What it adds | Cost to add |
|---|---|---|
| **Bash command** | Anything the shell can do | Effectively zero (already there) |
| **[[Skills]]** | Procedural knowledge + activation discipline | Low (skill markdown + frontmatter) |
| **[[Subagents]]** | Isolated cognitive context with its own tools | Medium (agent definition + brief discipline) |
| **[[Hooks]]** | Deterministic transforms at lifecycle events | Medium (script + matcher + JSON contract) |
| **Tools** (built-in or via [[Model Context Protocol\|MCP]]) | Structured action with schema and permission flow | High (cache invalidation, selection accuracy cost) |

**The bar to add a new tool is the highest.** Per Thariq: "Claude Code currently has ~20 tools, and we are constantly asking ourselves if we need all of them. The bar to add a new tool is high, because this gives the model one more option to think about."

## The math of why tools are expensive

Three compounding costs:

1. **Cache invalidation** ([[Thariq - Prompt Caching Is Everything]]) — adding/removing a tool mid-session breaks the cache for the *entire* conversation. Tools must be stable across the session.
2. **Selection accuracy degradation** ([[Anthropic Tool Search]]) — selection accuracy degrades past **30-50 tools**. Each tool you add eats into that budget.
3. **Definition tokens** — a typical multi-server setup consumes **~55k tokens** in tool definitions before any work. Permanent overhead until session ends.

So: adding a tool isn't free. It's a permanent drag on every turn until session end. Treat new tools the way you'd treat new public API endpoints: high bar, careful design, slow deprecation.

## Adding to action space ≠ adding tools

The single most important reframe. Per Thariq: "We were able to add things to Claude's action space without adding a tool."

Four mechanisms to expand capability *without* incurring the tool tax:

### 1. Skills (procedural knowledge with progressive disclosure)
A [[Skills|skill]] adds a *capability* — not a tool. The skill activates contextually, contains reference material, and references additional files Claude can load on-demand. The action-space surface grows; the cached prefix doesn't.

Canonical example: instead of building a `query_my_database` tool, ship a skill that documents how to use `Bash` + `psql` for that database.

### 2. Subagents (specialized contexts)
A [[Subagents|subagent]] is a fresh context with its own brief and (optionally) restricted tools. Same underlying tool set; different cognitive role. Adds capability via *role-based reasoning*, not new actions.

Canonical example (per Thariq): the **Claude Code Guide subagent** answers "how does Claude Code work?" questions. Without it, the main agent would either (a) load the docs into its context (token bloat) or (b) lack the knowledge. The subagent encapsulates both the knowledge and the search behavior.

### 3. Progressive disclosure (load-on-demand)
Skills can reference files; those files can reference more files. Claude follows the trail when needed. The action-space breadth is large; the active-context cost is small.

Canonical example: a skill says "to migrate the database, read `migration-guide.md`." The guide is one file in the repo. It's not in the system prompt. Claude reads it only when migrating. Capability without cost.

### 4. Tool stubs (defer_loading)
[[Anthropic Tool Search]] productized the pattern: tools marked `defer_loading: true` live in the catalog (up to 10k) but never enter the system-prompt prefix. Claude searches via `tool_search_tool_*`; deferred tools materialize as `tool_reference` blocks when discovered. Catalog can be huge; cached prefix stays lean.

## State should be tools, not config changes

The other foundational pattern from Thariq: **model state transitions belong in tools, not configuration changes**.

Wrong: when user enters plan mode, swap out the tool set to read-only. (Breaks cache. Tools changed.)

Right: keep all tools always; expose `EnterPlanMode` and `ExitPlanMode` as tools the model itself calls. State is encoded in *what the model has done*, not *what tools are available*.

Bonus: because state transitions are tools, the model can autonomously enter/exit plan mode when it judges the situation requires it. State machines designed-in-tools generalize to any agent-controlled mode.

This pattern applies anywhere you'd be tempted to "swap toolsets" — domain modes, security postures, persona switches. Make them tools.

## Tools designed for past models can constrain current models

Per Thariq, Anthropic periodically re-audits their tool design:

> "As model capabilities increase, the tools that your models once needed might now be constraining them. It's important to constantly revisit previous assumptions on what tools are needed."

The canonical case: **TodoWrite → Task Tool transition**. Early Claude Code needed TodoWrite + system reminders every 5 turns to keep on track. As models improved, Todos became *constraining* (Claude treated the list as fixed instead of malleable). Replaced with Task Tool: dependency-aware, multi-agent-shareable, alterable.

**Rule**: re-audit your action space when a new model generation ships. What was scaffolding for v1 may be a ceiling for v3.

## See like an agent

The discipline Thariq names: **pay attention, read outputs, experiment.**

> "To put myself in the mind of the model I like to imagine being given a difficult math problem. What tools would you want in order to solve it? It would depend on your own skills! Paper would be the minimum, but you'd be limited by manual calculations. A calculator would be better, but you would need to know how to operate the more advanced options. The fastest and most powerful option would be a computer, but you would have to know how to use it to write and execute code. This is a useful framework for designing your agent. You want to give it tools that are shaped to its own abilities."

The implication: tool design isn't a fixed-point problem you solve once. It's an iterative loop of (a) putting yourself in the model's shoes, (b) reading what it actually does with the tools you give it, and (c) adjusting. The same tool that helps Sonnet 4.5 may constrain Opus 4.7.

## Where this lands in the wiki

Action Space Design is the unifying philosophy beneath several existing pages:

- [[Skills]] — designing in *skill* form keeps tools lean
- [[Subagents]] — adding a cognitive role without adding a tool
- [[Hooks]] — deterministic transforms outside the action space proper, but shaping what enters/exits it
- [[Model Context Protocol]] — MCP is *the* way most teams add to their action space; the bar should be high
- [[Token Efficiency]] — tools are part of the cached prefix; tool stability is a token-efficiency principle
- [[Reducing Hallucinations]] — well-designed action spaces reduce wrong-tool-for-the-job errors (a hallucination class)
- [[Planning Mode]] — the canonical example of state-as-tools
- [[Permission Modes]] — sibling concept; permissions and action space define together what the agent *can* do

## The 5 reasons to promote an action to a tool (Lance Martin)

Per [[Lance Martin - Give Claude a computer|Lance Martin]] (Feb 2026), there are **5 reasons** to take an action that *could* run via Bash and instead expose it as a first-class tool. Each justifies a tool only when the corresponding need exists:

| # | Reason | Concrete example |
|---|---|---|
| 1 | **UX** | Specific actions need to be caught and rendered to the user in a particular way. AskUserQuestion → modal dialog. |
| 2 | **Guardrails** | A file edit tool runs a staleness check (verify file hasn't changed since last read). |
| 3 | **Concurrency control** | Group actions by concurrency safety (read-only tools can run in parallel; write tools must serialize). |
| 4 | **Observability** | Isolate specific actions for logging — measuring per-tool latency, token usage, error rates. |
| 5 | **Autonomy** | Group actions by autonomy-level — if the harness can undo an action, it can approve it more freely. |

This is **the explicit decision framework** for the high-bar checklist below. Each new tool should justify itself against at least one of these reasons. *Otherwise it's scaffolding the model can do without.*

## "Tools trade-off control with composability"

Lance Martin's most memorable framing of the underlying tension. Each tool round-trip costs:

1. **Latency** — model + network
2. **Context bloat** — tool result serializes into context (often more than needed)
3. **Reasoning step** — model has to decide what to do next

> "**The composition tax grows with the number of actions.**"

Three independent costs, all scaling linearly. **Programmatic Tool Calling** ([[Anthropic Advanced Tool Use|PTC]]) is the architectural resolution: composability of code + control surface of tools. Tool implementations stay outside the sandbox (handlers / MCP servers); the *orchestration* moves inside the code execution container. Tool handlers remain "in the middle of every call as a control surface, able to inspect, reject, log, or queue for human approval" — all 5 reasons-to-promote benefits preserved; composition tax disappears.

## The high-bar checklist for adding a tool

Before adding a new tool, ask:

1. Can a [[Skills|skill]] cover this with a reference to existing tools (Bash + Read + Grep)?
2. Can a [[Subagents|subagent]] with a focused brief substitute?
3. Can [[Skills|progressive disclosure]] surface the capability on-demand?
4. If the candidate is an MCP tool: would [[Anthropic Tool Search|`defer_loading: true`]] be appropriate?
5. **Does it justify itself against at least one of Lance's 5 reasons** (UX, guardrails, concurrency, observability, autonomy)?
6. If we need this tool, will it be **stable for the session lifetime**? (Tools that come and go break caching.)
7. Does it fit with the existing action space's idiom and naming, or does it stand alone in a confusing way?
8. Will it still be needed when the next model ships, or is it scaffolding for the current one?

If you can't justify a *no* on at least the first four, build the lighter alternative.

## Anti-patterns

- **Many narrow tools instead of one general tool with a richer schema.** A tool that does one specific thing has high overhead per use; a Bash-like general tool with a good prompt has low overhead and broad reach.
- **Tools designed for the prompt rather than the model.** "Claude will need this tool to follow my instructions" is the wrong framing — the model and tool together implement the behavior.
- **Tools without removal plans.** When a tool is added, decide *now* what would justify removing it. Without a removal trigger, the tool stays forever.
- **Adding tools to substitute for missing skills/subagents/hooks.** Each is the right primitive for different work; tools are not the universal answer.
- **Tools whose schema requires Claude to remember 20+ optional parameters.** Selection accuracy degrades inside a single tool's invocation, not just across the catalog.
- **Configuration-as-toolset.** Toggling tools on/off as a user-facing feature breaks caching (per [[Thariq - Prompt Caching Is Everything]]). Toggle behavior via tools the agent calls instead.

## Cross-references

- [[Skills]] · [[Subagents]] · [[Hooks]] · [[Model Context Protocol]]
- [[Planning Mode]] (canonical state-as-tools example)
- [[Token Efficiency]] · [[Anthropic Tool Search]] · [[Anthropic Compaction]]
- [[Permission Modes]] (sibling concept)
- [[Skill Building]] (action-space design at the skill level)
- Sources: [[Thariq - Seeing like an Agent]] (the foundational source) · [[Thariq - Prompt Caching Is Everything]] (cache cost of tool changes) · [[Thariq Anthropic Skills + Sessions]] (action-space + skills) · [[Anthropic Tool Search]] (productized stub-and-discover) · [[Lance Martin - Give Claude a computer]] (the 5 reasons + "composition tax" framing) · [[Thariq - Tasks Tool (Todos to Tasks)]] (canonical "unhobble on each model bump" example) · [[Anthropic Advanced Tool Use]] (PTC + Tool Use Examples)
