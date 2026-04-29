---
type: topic
created: 2026-04-29
updated: 2026-04-29
sources: 4
tags: [topic, focus, prompt-caching, token-efficiency, architecture, foundational]
---

# Prompt Caching

Prompt caching is the **architectural foundation of Claude Code**, not an optimization layered on top. Per [[Thariq - Prompt Caching Is Everything|Thariq]] (Anthropic engineer): *"Long running agentic products like Claude Code are made feasible by prompt caching."*

This topic page exists because prompt caching deserves its own deliverable layer. [[Token Efficiency]] treats it as one of five compression layers; that's correct framing operationally, but undersells its centrality. Without prompt caching, the entire agent harness is economically and ergonomically infeasible.

## TL;DR — what to do

If you're building or tuning an agent on the Claude API:

1. **Lay out your prompt static-first, dynamic-last.** Tools + system prompt → CLAUDE.md → session context → conversation. Every layer downstream of a change pays full price; design for prefix stability.
2. **Don't change tools or models mid-session.** Both invalidate the cache for the entire conversation. Use [[Subagents|subagents]] for cache-preserving model handoff; use [[Anthropic Tool Search|Tool Search + `defer_loading`]] to scale tool catalogs without invalidation.
3. **Inject runtime info via messages, not system-prompt edits.** The `<system-reminder>` pattern is Anthropic's canonical mechanism — preserves the cache while updating Claude's context.
4. **Encode state as tools, not config changes.** `EnterPlanMode` / `ExitPlanMode` is the canonical example — state machines designed in tools generalize.
5. **Use [[Anthropic Compaction]] for long sessions.** Productized cache-safe forking; handles the cache math for you.
6. **Monitor cache hit rate like uptime.** Treat dips as incidents.

## Why it's foundational, not optimization

Per Thariq, prompt caching changes the *unit economics* of agents:

- **Without caching**: every turn re-pays for the system prompt + tools + memory + history. Cost scales linearly with conversation length. Long sessions are infeasible.
- **With caching**: the static prefix is paid once and reused. Cost scales with *new tokens per turn*, not total context. Long sessions become viable.

Anthropic's framing of this is unusually strong: "**at Claude Code, we build our entire harness around prompt caching. We run alerts on our prompt cache hit rate and declare SEVs if they're too low.**"

If you're treating caching as something you'll add later, you've inverted the design. Build for it from the start.

## How prompt caching works

**Prefix matching.** The API caches everything from the start of the request up to each `cache_control` breakpoint. On the next request, if the prefix is byte-identical, the cached prefix is reused at a fraction of the cost.

### The operational specifics (per [[Lance Martin - Prompt auto-caching with Claude]])

- **Cost**: cached input tokens are **10% the cost** of non-cached input tokens. Cache hits are an order-of-magnitude cost reduction.
- **20-block backward search**: when Claude hits a `cache_control` breakpoint, it searches backward **up to 20 blocks** for a matching cryptographic hash. Beyond 20 blocks, no hit. Implication: pin frequently-reused prefixes (system prompt, CLAUDE.md, tools) at the *front* to maximize cache lifetime.
- **Workspace-scoped hashes**: cache lookups don't cross workspaces. Multi-team / multi-project deployments get isolated caches by default.
- **Per-character sensitivity**: the hash is byte-exact. One character difference → different hash → cache miss.

> Note: caches are **per model** and **time-limited**. Each Claude model has its own cache; switching models means a fresh cache. Caches expire after a configurable TTL (default in the minutes range).

The implication: **what you put first matters more than how you compress later**. Order is destiny.

### Manual vs auto-caching

| Mode | What you set | When the breakpoint moves |
|---|---|---|
| **Manual** | `cache_control` on a *specific block* in messages | You move it explicitly each turn |
| **Auto-caching** | `cache_control` at the *request level* | API auto-moves to last cacheable block |

For turn-based agents, auto-caching is the default — moves the breakpoint to the latest block as the conversation grows. Composes with manual: explicit breakpoints on system prompt + tools, auto-caching for the conversation tail.

## The four-layer prompt structure (Claude Code's design)

```
1. Static system prompt + Tools         ← globally cached
2. CLAUDE.md                            ← cached within project
3. Session context                       ← cached within session
4. Conversation messages                 ← most dynamic
```

Static-first, dynamic-last. Maximum sessions share the most cache hits. Every shift you can make from "lower layer" to "higher layer" is a cache-share win.

When you find yourself wanting to inject something at layer 1 dynamically (e.g., "current time"), move it to layer 4 (a `<system-reminder>` in the next user message). The cost is one extra message in the conversation; the savings is the cache hit on layers 1-3.

## Cache-breaking mistakes (often invisible)

These look harmless but invalidate the cache for the entire conversation:

| Mistake | Effect |
|---|---|
| Timestamp in static system prompt | Invalidates layer 1 every turn — cache hit rate plummets |
| Non-deterministic tool order | Same — tool definitions are part of layer 1 |
| Adding a tool mid-session | Invalidates layer 1 from that point forward |
| Removing a tool mid-session | Same |
| Changing a tool's parameters mid-session | Same |
| Switching models mid-session | Cache is per-model; new model means fresh cache |
| Editing CLAUDE.md mid-session | Invalidates layer 2 |
| `/plugin install` mid-session | Adds tools → invalidates layer 1 |

> "It seems intuitive — you should only give the model tools you think it needs right now. But because tools are part of the cached prefix, **adding or removing a tool invalidates the cache for the entire conversation**." — Thariq

## The five canonical patterns

### 1. State-as-tools (cache-preserving state transitions)

Wrong: when entering plan mode, swap to a read-only tool set.
Right: keep all tools always; expose `EnterPlanMode` and `ExitPlanMode` as tools the model itself calls. State is encoded in *what the model has done*, not what tools exist.

Bonus: state transitions become agent-controllable. The model can autonomously enter plan mode when it detects difficulty.

See [[Action Space Design#State should be tools, not config changes]].

### 2. Stub-and-discover (cache-preserving tool sprawl)

Wrong: load all 200 MCP tools upfront. (~55k tokens of definitions in cached prefix.)
Right: mark them `defer_loading: true`. Lightweight stubs in the prefix; full schemas materialize as `tool_reference` blocks when discovered via [[Anthropic Tool Search|tool search]]. Cached prefix stays lean.

Productized as [[Anthropic Tool Search]] (`tool_search_tool_regex_20251119` / `_bm25_20251119`). Up to 10k tools in a catalog; 3-5 surfaced per request.

### 3. Cache-safe forking (cache-preserving compaction)

Wrong: separate API call with a different system prompt + no tools to summarize the conversation. Catastrophic — cached prefix doesn't match; pay full price for all input tokens.
Right: use the *exact* same system prompt, user context, system context, and tool definitions as the parent. Prepend the parent's conversation messages, append the compaction prompt as a new user message. The API sees a near-identical prefix; cache reused.

Productized as [[Anthropic Compaction]] (`compact-2026-01-12` beta). Default trigger 150k tokens; add `cache_control: ephemeral` to the `compaction` block to cache the summary itself.

### 4. Subagent handoff (cache-preserving model switching)

Wrong: switch from Opus to Haiku mid-conversation to save on an easy turn. The cache for Opus doesn't transfer; you pay full Haiku price to rebuild context.
Right: spawn a Haiku [[Subagents|subagent]] with a brief from Opus. Opus's cache is untouched. Haiku starts fresh in its own context. Both keep their own caches.

This is how Claude Code's Explore agents work (Haiku) while the main agent stays Opus.

### 5. Message injection (cache-preserving runtime info)

Wrong: edit the system prompt to inject "the current date is..." or "the user's todo list is...". Layer 1 invalidated.
Right: inject via the next user message or tool result, ideally in a `<system-reminder>` tag. Layer 4; cache layers 1-3 preserved.

This is the load-bearing pattern for [[Hooks|hooks]] design — `UserPromptSubmit` hooks that return `additionalContext` use this mechanism automatically.

## Cache hit rate as the leading indicator

> "We alert on cache breaks and treat them as incidents." — Thariq

Cache hit rate is the right primary metric for token efficiency at scale. A few percentage points of cache miss can dramatically affect cost and latency. Over time, prompt drift erodes hit rate; without monitoring, you discover it via the bill.

What to monitor:
- **Cache hit rate** (input cache hit / total input)
- **Cache write rate** (cache writes / total input — high writes indicate prefix instability)
- **Cache hit rate by session age** — if older sessions have lower hit rate, your conversation history is invalidating somehow

Tools for measurement (see [[Cost Observability Playbook]]):
- [[ccusage (ryoppippi)]] — per-session cost breakdown including cache fields
- [[CodeBurn (AgentSeal)]] — `optimize` flags low cache hit rates as a "patterns to look for" signal
- Anthropic's API response includes `usage.cache_creation_input_tokens` and `usage.cache_read_input_tokens`

## When prompt caching is *not* enough

Prompt caching reduces cost on **what you re-send**. It doesn't reduce *what you have to send in the first place*. Pair with the other compression layers ([[Token Efficiency]]) for full coverage:

- [[Token Efficiency#11 AST-based structural context via MCP|AST graphs]] — what to send (smaller starting context)
- [[Sandboxing]] — system-prompt itself shrinks 84% under sandbox
- [[rtk (rtk-ai)]] — Bash output filtered before it enters the conversation
- [[claude-mem (thedotmack)]] — cross-session compression

All five layers are multiplicative. Prompt caching is the *first* layer because it's foundational; the others build on a cache-stable base.

## Anti-patterns

- **Adding a timestamp to your CLAUDE.md** so Claude knows the date. Layer 2 invalidated every session boundary that crosses midnight.
- **Plugin install/uninstall mid-conversation.** Tool set changes → layer 1 invalidated. Pre-install everything you might need; let activation be contextual.
- **Switching to a "cheaper model for this turn"** mid-session. The math doesn't work above ~10-30k tokens of context — cache rebuild dominates.
- **Custom output styles edited per turn.** Layer 1 lives. Use [[Output Styles]] as static modes, not dynamic injections.
- **Separate API calls for "background" work** (summarization, classification) without cache-safe parameters. Each one pays full input price.
- **Treating cache hit rate as a vanity metric.** It's load-bearing — alert on it, treat dips as incidents.

## Cross-references

- [[Token Efficiency]] (prompt caching is layer 1 of the 5-layer compression stack)
- [[Action Space Design]] (state-as-tools pattern; tool-stability requirement)
- [[Subagents]] (cache-preserving model handoff)
- [[Hooks]] (`<system-reminder>` injection pattern)
- [[Memory]] (CLAUDE.md = layer 2; stability matters)
- [[Planning Mode]] (canonical state-as-tools example)
- [[Cost Observability Playbook]] (measuring cache hit rate)
- [[Multi-Agent Orchestration]] (subagent handoff at scale)
- Sources: [[Thariq - Prompt Caching Is Everything]] (the foundational source) · [[Anthropic Compaction]] (productized cache-safe forking) · [[Anthropic Tool Search]] (productized stub-and-discover) · [[Thariq - Seeing like an Agent]] (action-space + caching interaction) · [[Lance Martin - Prompt auto-caching with Claude]] (the 10% cost number + 20-block search rule + auto-caching mechanism) · [[Anthropic Tool Use with Prompt Caching]] (the cache-invalidation matrix)
