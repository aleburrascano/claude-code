---
type: topic
created: 2026-04-26
updated: 2026-04-27
sources: 9
tags: [topic, focus, token-efficiency, cost, context, observability]
---

# Token Efficiency

Tokens are the unit of cost and the unit of context. Inefficient token use wastes money, hits context limits sooner, and slows turns. This topic page collects techniques across the wiki for using tokens well.

The framing: tokens are a **renewable but expensive resource**. Don't be miserly (under-context is also a failure mode), but don't be sloppy.

---

## The framing: layer 0 + five compression layers

The wiki names a **measurement layer** that precedes — and enables — five compression layers. You can't optimize what you don't measure. All six are multiplicative; their combined effect compounds.

| # | Layer | What it does | Canonical reference |
|---|---|---|---|
| **0** | **Observability / measurement** | Surfaces *where* tokens go (per-task, per-tool, per-MCP, re-reads, ghost skills, bloated CLAUDE.md) so you know what to compress | [[CodeBurn (AgentSeal)]], [[ccusage (ryoppippi)]] |
| **1** | **Prompt caching** | Cached prompt prefix (system + tools + memory + early conversation) | [[Thariq - Prompt Caching Is Everything]] |
| **2** | **AST graphs / structural context** | Codebase structural context (what to read, not the read itself); precomputed clustering, tracing, blast radius | [[code-review-graph (tirth8205)]], [[GitNexus (abhigyanpatwari)]], [[graphify (safishamsi)]] |
| **3** | **Sandboxing** | The system prompt itself (84% reduction when sandbox active) | [[Sandboxing]] |
| **4** | **Tool-output filtering** | Bash command stdout/stderr before they hit context | [[rtk (rtk-ai)]] |
| **5** | **Memory compression** | Cross-session history | [[claude-mem (thedotmack)]] |

The full cost map below maps individual techniques to these layers.

### Why measurement is layer 0

Without measurement, the other five layers are guesswork. CodeBurn's `optimize` makes the bloat visible: re-reads across sessions, low Read:Edit ratios, uncapped `BASH_MAX_OUTPUT_LENGTH`, unused MCP servers paying tool-schema overhead every session, **ghost agents/skills/commands** defined in `~/.claude/` but never invoked, bloated `CLAUDE.md` (with `@-import` expansion counted), cache creation overhead.

CodeBurn ships a "patterns to look for" diagnostic table that maps observed signals to which compression layer to engage:

| Signal | Likely layer to engage |
|---|---|
| Cache hit < 80% | Layer 1 (prompt caching) — see [[Thariq - Prompt Caching Is Everything]] |
| Many `Read` calls re-reading same files | Layer 5 (memory compression / claude-mem) |
| Low one-shot rate on edits | Hallucination defenses — see [[Verification Loops]] |
| Bash dominated by `git status`, `ls` | Layer 4 (rtk filtering) |
| No MCP usage shown | Audit MCP config; consider AST-graph servers |
| Bloated CLAUDE.md | [[Memory|200-line target]]; move conditional content to skills/hooks |

---

## The architectural foundation: prompt caching

Per [[Thariq - Prompt Caching Is Everything|Thariq's "Prompt Caching Is Everything"]]:

> "Long running agentic products like Claude Code are made feasible by prompt caching... at Claude Code, we build our entire harness around prompt caching."

**Token efficiency is not primarily "use fewer tokens." It's "design for cache hits."**

### How caching works
**Prefix matching.** API caches everything from start of request up to each `cache_control` breakpoint. Order matters enormously.

### The Claude Code prompt layout
```
Static system prompt + Tools         (globally cached)
CLAUDE.md                            (cached within project)
Session context                      (cached within session)
Conversation messages                (most dynamic)
```

Static content first, dynamic content last. Maximum sessions share cache hits.

### Cache-breaking mistakes (often invisible)
- Timestamps in static system prompt
- Non-deterministic tool ordering
- Mid-session tool additions/removals
- Mid-session model switches
- System prompt edits to inject runtime info

### The cache-preserving pattern: messages over system-prompt-edits
Need to inject "it's now Wednesday" or other runtime info? **Use a `<system-reminder>` tag in the next user message or tool result**, not a system-prompt edit. Per [[Thariq - Prompt Caching Is Everything|Thariq]]: this is exactly why the `<system-reminder>` pattern exists.

### Cache-safe state transitions
For state changes (plan mode toggling, etc.): make them **tools** that the model calls. NOT config changes that modify the tool set. See [[Planning Mode]] for the canonical implementation.

### Cache-preserving compaction (cache-safe forking)
When compacting, send the EXACT same system prompt + user context + system context + tool definitions as parent. Append compaction prompt as new user message. **Cached prefix reused; only new tokens are the compaction prompt.**

This is now built into the Anthropic API: see [[Anthropic Compaction]] (beta header `compact-2026-01-12`, edit type `compact_20260112`). Default trigger 150k input tokens; add `cache_control: ephemeral` to the `compaction` block to cache the *summary* itself.

### The productizations of Claude Code's caching architecture

Two of Claude Code's internal cache-preservation patterns are now first-class Anthropic API features:

| Internal pattern (Thariq) | Productization | What it gives you |
|---|---|---|
| Cache-safe forking on compaction | [[Anthropic Compaction]] | Server-side context truncation that keeps the cached prefix intact. Default 150k trigger; configurable down to 50k. |
| `defer_loading: true` stub-and-discover | [[Anthropic Tool Search]] | Up to 10k tools in a catalog; 3-5 surfaced per request via regex or BM25 search; deferred tools never enter the system-prompt prefix. |

**Implication**: you no longer need to roll either pattern by hand. Both are documented, supported, ZDR-eligible API features. The `<80 MCP tools` rule below still matters operationally, but Tool Search is the structural fix when you do need to scale past it.

### Implication: cache hit rate is the leading indicator
Per [[Thariq - Prompt Caching Is Everything|Thariq]]: at Claude Code, they **alert on cache hit rate; declare SEVs if it drops**. Cache hits cost orders of magnitude less than cache misses. Monitoring cache hit rate is the right primary metric for token efficiency at scale.

---

---

## Where tokens go (the cost map)

In a typical Claude Code turn, tokens accumulate from:

| Source | Typical scale | Controllable how? |
|---|---|---|
| **Internal system prompt** + tool descriptions | ~10–20k tokens | Aggressive: [[Claude Code Tips (ykdojo)|ykdojo Tip 15]] system-prompt patching (~50% reduction) |
| **Loaded [[Memory\|CLAUDE.md]] files** | varies; can be 5–10k+ per session | Audit and tighten regularly |
| **MCP server tool descriptions** | scales with connected servers | Lazy-load MCP; don't enable all globally |
| **Skill registry descriptions** | scales with installed [[Skills]] | Granular plugin install; uninstall unused |
| **Conversation history** | grows every turn | [[Checkpoints\|rewind+summarize]], handoff documents, half-cloning |
| **Tool call inputs/outputs** | varies wildly | Read with `offset`/`limit`; write to `/tmp/` and summarize |
| **Reasoning tokens** ([[Extended Thinking]]) | substantial when on | Use only when warranted; hook-control |

The first four bullets are **per-turn fixed overhead**. They consume tokens *every turn* until the session ends. That's why slimming them is the highest-leverage move.

---

## Context rot zones (Thariq's framework)

Per [[Thariq Anthropic Skills + Sessions|Thariq]] (Anthropic engineer), performance degrades as context fills. **Operational thresholds**:

- **300-400k tokens** on the 1M model — performance degradation typically emerges
- **~40% context** = "dumb zone"
- **Newcomers**: keep below 40%; if at 60%, wrap up
- **Experienced users**: aggressively keep below 30%; push to 60% only on simple tasks

> "The model is at its **least intelligent point** when auto-compacting due to context rot." — Thariq

Implication: don't let autocompact fire. **Proactive `/compact` with directional hint** beats it:
```text
/compact focus on the auth refactor, drop the test debugging
```

## MCP server discipline

Per [[Boris Cherny Tips Compendium|Boris]] + [[Everything Claude Code (affaan-m)|ECC]]:

> "Too many MCP servers eat your context. Each MCP tool description consumes tokens from your 200k window, potentially reducing it to ~70k."

Rules of thumb:
- **Keep under 10 MCPs enabled and under 80 tools active.**
- **Lazy-load MCP tools** (per [[Claude Code Tips (ykdojo)|ykdojo]]) — only enable what you currently need.
- Use `disabledMcpServers` in project `.claude/settings.json` to disable per-project.

## The 5 decision points after each turn (Thariq)

| # | Action | When |
|---|---|---|
| 1 | **Continue** | Context still load-bearing |
| 2 | **Rewind** (double-Esc) | Wrong path; preserve learnings |
| 3 | **Compact** | Mid-task; bloat from debugging |
| 4 | **Fresh session** (`/clear`) | High-stakes next step; new task |
| 5 | **Subagent** | Conclusion-only needed; isolate noise |

The strongest signal of effective context management: **rewind > correct**. Replace "reads + 2 fails + 2 corrections" with "reads + 1 informed prompt + the fix." See [[Checkpoints]].

## Top techniques (by impact)

### 1. Slim the system prompt ([[Claude Code Tips (ykdojo)]] Tip 15)
Patches the system prompt to remove ~10k tokens (~50% overhead reduction) while preserving essentials. Per-turn savings — pays out for the entire session.

Best understood after reading [[Claude Code System Prompts (Piebald)]] so you know what you're cutting.

### 2. Audit and tighten CLAUDE.md
Every line of [[Memory|CLAUDE.md]] is loaded every turn. Discipline:
- Personal `~/.claude/CLAUDE.md` ≤200 lines
- Project `CLAUDE.md` ≤500 lines
- Subdirectory `CLAUDE.md` ≤1000 lines (only loads in that subdir)

If you're over budget, the question isn't "what should I cut?" — it's "what should be a [[Skills|skill]] or a [[Hooks|hook]] instead?" Move conditionally-relevant content out of always-loaded memory.

### 3. Half-cloning ([[Claude Code Tips (ykdojo)]] Tip 23)
Fork the conversation, *keeping only recent messages and dropping summaries*. Preserves actual reasoning rather than a flattened summary. Lighter than starting a fresh session, less lossy than [[Checkpoints|rewind-and-summarize]].

### 4. On-demand knowledge loading ([[Learn Claude Code (shareAI-lab)]] insight)
> "Knowledge arrives on-demand. Load skill files (product docs, API specs) via tool results, not upfront in the system prompt."

Operationalized in [[Claude Code Infrastructure Showcase (diet103)|diet103's 500-line rule]] and [[Skill Building|progressive disclosure]] generally.

### 5. Subagents for token-heavy work ([[Subagents]])
Long file reads, repository scans, web research — push to a subagent. The verbose tool output stays in the subagent's context; only the synthesis returns to the main agent. This is a *huge* token-efficiency win for research-heavy turns.

### 6. Research-to-disk ([[claudekit (Carl Rannaberg)|research-expert]])
Research subagents write findings to `/tmp/`. Main agent reads the summary or specific sections, not the full research dump. Pattern generalizes to any verbose intermediate output.

### 7. Lazy-load MCP servers ([[Claude Code Tips (ykdojo)]])
Each connected MCP server's tool descriptions are part of the system prompt. Many connected = many tokens. Connect only what you currently need.

### 8. Granular plugin install
Plugins like [[Context Engineering Kit (NeoLabHQ)]] are designed for installing only the sub-plugins you need. Don't install whole frameworks if you'll only use one piece.

### 9. Contextual reasoning depth
Don't run [[Extended Thinking]] on trivial turns. Use [[claudekit (Carl Rannaberg)|claudekit's thinking-level hook]] pattern: a `UserPromptSubmit` hook adjusts reasoning depth based on prompt content.

### 10. Compaction discipline
Use [[Checkpoints]] option 4 ("summarize from here") to compress exploratory tangents. Better than starting fresh because intent is preserved.

### 11. AST-based structural context via MCP (the AST-graph category)

The wiki tracks **three projects** in this category — they share the structural-context idea but vary on scope and inputs:

- [[code-review-graph (tirth8205)]] — single-repo, SQLite, **8.2× avg / 49× Next.js** token reduction
- [[GitNexus (abhigyanpatwari)]] — multi-repo registry + group contracts + Pre+Post hooks + auto-generated repo-specific skills via Leiden community detection
- [[graphify (safishamsi)]] — multimodal corpora (code + papers + images + video/audio); **71.5× on a 52-file mixed corpus**

Operates at a different layer than other techniques:
- Prompt caching reduces what you re-send (same context, cached prefix)
- This reduces what you ask Claude to read (smaller context to begin with) via **Precomputed Relational Intelligence** (clustering, tracing, scoring done at index time so MCP tools return complete context in one call)
- **Multiplicative with caching**

For planned code reviews on large codebases, this is the strongest single token-reduction lever in our wiki's coverage. For trivial edits in small projects, overhead can exceed savings (code-review-graph express benchmark: 0.7×; graphify is honest that gains disappear below ~10 files). Use selectively. Pair with `--tools` filtering to stay under the <80-tools rule when adopting.

### 12. Tool-output filtering via PreToolUse hook ([[rtk (rtk-ai)]])
A `PreToolUse` hook transparently rewrites Bash calls (`git status` → `rtk git status`); RTK runs the real command, applies command-specific filters (smart filtering, grouping, truncation, deduplication), and returns 60-90% smaller output. **Claude never sees the rewrite or the raw output.** Worked example: 30-min Claude Code session goes ~118k tokens → ~24k tokens (-80%) on common commands.

Highest-savings categories:
- Test runners (`cargo test`, `pytest`, `go test`) — **-90%**
- Git plumbing (`git push`, `git commit`) — **-92%**
- Build/lint (cargo build, golangci-lint, ruff, tsc) — **-80% to -85%**
- Fail-open via tee: full unfiltered output saved to disk on command failure, so Claude can `cat` the saved log without re-running.

Limitation: only intercepts Bash. Claude's built-in `Read`/`Grep`/`Glob` bypass the hook — for those workflows, shell out (`cat`/`rg`/`find`) or call `rtk read`/`rtk grep`/`rtk find` explicitly. Native Windows degrades to CLAUDE.md-injection mode (no auto-rewrite); use WSL for full functionality.

Operates at the **tool-output layer** — different from prompt caching (cached prefix), AST graphs (what to read), and memory compression (cross-session). Multiplicative with all of them.

### 13. Hooks-as-token-efficiency-lever (the pattern)
RTK + claude-mem are two faces of the same architectural pattern: insert deterministic compression into the agentic loop via [[Hooks]]. **PreToolUse rewrites the call** (RTK); **PostToolUse compresses the result** (claude-mem). Both transparent to Claude, both pay latency outside the LLM's perception, both turn what would otherwise be lost context into structured savings. Anywhere there's a verbose deterministic transform between agent and world, a hook can perform it without touching the agent's logic.

### 14. Cross-agent session continuity ([[claude-code-tools (Prasad Chalasani)]])
Instead of recompacting at 150k tokens or starting fresh, **hand off to a sibling agent**. claude-code-tools provides session continuity (Rust/Tantivy search across past sessions; cross-agent message passing CC↔Codex). The new agent picks up with a context summary, full historical search, and zero accumulated dumb-zone tokens. Pairs with [[Anthropic Compaction]] as a complement: compaction shrinks the same session; cross-agent handoff starts a fresh one with the necessary context loaded as needed.

---

## Anti-patterns

- **Connecting all MCP servers globally** — you pay tokens for every tool description, every turn, even when you don't use the tool.
- **Multi-thousand-line CLAUDE.md** — burns tokens every turn, and Claude can't reliably use what it can't easily reference.
- **Asking Claude to read large files** when you only need a section — use Read with `offset` and `limit`.
- **Massive skill registries with no auto-activation rules** — descriptions consume context-decision tokens; skills sit dormant.
- **Always-on extended thinking** — most turns don't warrant it. Pay only when the problem warrants.

---

## Measurement (layer 0 in detail)

If you're serious about token efficiency, you need feedback. The category has matured significantly — this is no longer a long-tail of half-finished tools. Two canonical entries now:

- [[ccusage (ryoppippi)]] — the originator (13.5k stars, MIT). Lightweight CLI + statusline. Daily/monthly/session/blocks reports, multi-provider sibling packages (`@ccusage/codex`, `@ccusage/opencode`, `@ccusage/pi`, `@ccusage/amp`, `@ccusage/mcp`). Best for "what did today cost?" at a glance.
- [[CodeBurn (AgentSeal)]] — TUI dashboard + native macOS menubar app + CLI. Multi-provider with `--provider`. Reads from disk (no API keys, no proxy). Adds **`codeburn optimize`** with copy-paste fixes for the bloat patterns above; **Compare** mode (model A/B from your real session data); **Yield** (productive vs reverted/abandoned spend, correlated with git commits); **one-shot rate per task category** as a measurable quality metric. Best for "where am I wasting tokens, fix it."

Other tools in adjacent territory:
- **ccflare / better-ccflare** — web dashboard, comprehensive metrics
- **ccxray** (lis186) — HTTP proxy + real-time dashboard; captures every request/response (best for serious profiling)
- **Claude Code Usage Monitor** — real-time terminal monitor with burn rate
- **Claudex** (Kunwar Shah) — web-based session browser with full-text search
- **`rtk gain` / `rtk discover`** ([[rtk (rtk-ai)]]) — built-in per-command savings analytics. `rtk discover` flags commands you ran without `rtk` that *could have been* compressed. Scoped to RTK's own filtering, not full-session.
- **Claude Code Templates** `--analytics` / `--health-check` — shipped as part of [[Claude Code Templates (Daniel Avila)]]

Use these to baseline current consumption, then measure improvements after each technique.

---

## The wiki's own discipline

The wiki itself uses several of these techniques: source pages compress raw documents into focused summaries (saves re-reading raw); concept pages cross-reference rather than repeat; [[index]] is read first to find candidates rather than reading all pages.

---

## Cross-references

- [[Memory]] · [[Skills]] · [[Subagents]] · [[Extended Thinking]] · [[Hooks]] · [[Checkpoints]]
- [[Context Engineering]] · [[Skill Building]]
- Sources: [[Claude Code Tips (ykdojo)]] · [[Claude Code System Prompts (Piebald)]] · [[Learn Claude Code (shareAI-lab)]] · [[claudekit (Carl Rannaberg)]] · [[Claude Code Infrastructure Showcase (diet103)]] · [[Context Engineering Kit (NeoLabHQ)]] · [[Thariq - Prompt Caching Is Everything]] · [[code-review-graph (tirth8205)]] · [[GitNexus (abhigyanpatwari)]] · [[graphify (safishamsi)]] · [[rtk (rtk-ai)]] · [[claude-mem (thedotmack)]] · [[CodeBurn (AgentSeal)]] · [[ccusage (ryoppippi)]] · [[Sandboxing]] · [[Anthropic Compaction]] · [[Anthropic Tool Search]] · [[claude-code-tools (Prasad Chalasani)]] (cross-agent session continuity)
