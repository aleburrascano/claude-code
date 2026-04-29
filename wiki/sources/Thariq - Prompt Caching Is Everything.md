---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, anthropic, prompt-caching, token-efficiency, foundational]
source_path: raw/articles/Thariq - Prompt Caching Is Everything.md
source_date: 2026-02-20 (approx)
source_author: Thariq (Anthropic engineer)
source_url: https://x.com/trq212/status/2024574133011673516
---

# Thariq — Prompt Caching Is Everything

[[Thariq|Thariq's]] foundational article on **how Claude Code is built around prompt caching**. Captured via Obsidian Web Clipper. Closes the second of the deferred Thariq articles from previous rounds.

For our wiki, this is the **canonical primary source for [[Token Efficiency|token-efficiency engineering]]** at Claude Code. The wiki had operational tips before; this is the architectural rationale.

## The framing

> "It is often said in engineering that 'Cache Rules Everything Around Me', and the same rule holds for agents."
>
> "Long running agentic products like Claude Code are made feasible by prompt caching."

At Claude Code:
- Entire harness built around prompt caching
- Cache hit rate decreases costs + enables more generous rate limits
- **Alerts on cache hit rate; declare SEVs if too low**

This is the load-bearing engineering claim: long-running agent products **only work** because of caching. Without caching, costs scale with conversation length and become prohibitive.

## How prompt caching works

**Prefix matching.** The API caches everything from the start of the request up to each `cache_control` breakpoint.

**Order matters enormously**: more requests sharing a prefix = more cache hits.

## The Claude Code prompt layout (for cache optimization)

Static content first, dynamic content last:

```
Static system prompt & Tools         (globally cached)
CLAUDE.md                            (cached within a project)
Session context                      (cached within a session)
Conversation messages                (the most dynamic)
```

This way, **maximum sessions share cache hits**.

## Common cache-breaking mistakes

Surprisingly fragile. Examples that break the ordering:
- Putting an in-depth timestamp in the static system prompt
- Shuffling tool order definitions non-deterministically
- Updating parameters of tools (e.g., what agents the AgentTool can call)

## Use messages for updates (not system prompt changes)

> "There may be times when the information you put in your prompt becomes out of date. It may be tempting to update the prompt, but that would result in a cache miss and could end up being quite expensive for the user."
>
> "Consider if you can pass in this information via messages in the next turn instead. In Claude Code, we add a `<system-reminder>` tag in the next user message or tool result with the updated information for the model (e.g. it is now Wednesday), which helps preserve the cache."

This explains the `<system-reminder>` pattern that appears in conversations. **It's a cache-preservation mechanism**, not a cosmetic feature.

For our wiki: the `<system-reminder>` is the canonical pattern for "I need to inject context but preserve cache." Worth lifting into hook design — `UserPromptSubmit` hooks should inject via message content, not via prompt modification.

## Don't change models mid-session

> "Prompt caches are unique to models."

Counterintuitive consequence:
- 100k tokens into a conversation with Opus
- Want to ask an easy question
- **Switching to Haiku is more expensive** than letting Opus answer (cache rebuild)

If you must switch: **use subagents**. Opus prepares a "handoff" message; subagent (Haiku) handles the task in fresh context. Claude Code uses this for Explore agents (Haiku).

For our wiki: this is the architectural justification for [[Subagents|subagent-based model switching]]. Not just "different model for different work" — also "switching mid-session is expensive without subagent abstraction."

## Never add or remove tools mid-session

> "Changing the tool set in the middle of a conversation is one of the most common ways people break prompt caching. It seems intuitive — you should only give the model tools you think it needs right now. But because tools are part of the cached prefix, **adding or removing a tool invalidates the cache for the entire conversation.**"

This is significant for [[Plugins]] design and skill architecture: **tool stability is a hard requirement**.

## Plan mode — designing around the cache

The intuitive (wrong) approach: when user enters plan mode, swap out tool set to read-only.

**Wrong because**: would break the cache.

The actual design:
- **Keep all tools in the request at all times**
- Use `EnterPlanMode` and `ExitPlanMode` as tools themselves
- When user toggles plan mode, agent gets system message ("you are in plan mode; explore but don't edit; call ExitPlanMode when done")
- **Tool definitions never change**

Bonus: because EnterPlanMode is a callable tool, the model can autonomously enter plan mode when it detects a hard problem — without breaking cache.

For our wiki: this is the **canonical example of state-as-tools** rather than state-as-config-changes. Pattern generalizes: model state transitions should be tools, not tool-set modifications.

## Tool search — defer instead of remove

Same principle for MCP tools. Many MCP tools loaded = expensive system prompt; but removing them mid-conversation breaks cache.

Solution: **`defer_loading`** — send lightweight stubs (just tool name, `defer_loading: true`). Model "discovers" via `ToolSearch` tool when needed. Full tool schemas only loaded when model selects them.

Cached prefix stays stable: same stubs always present, same order.

> "You can use the tool search tool through our API to simplify this."

For our wiki: this is the architectural answer to "MCP server proliferation" ([[Token Efficiency|the <80 tools rule]]). With `defer_loading`, you can have many MCP tools without paying for full schemas every turn.

## Forking context — compaction

When you run out of context window, summarize and continue with the summary.

The naive implementation: separate API call with different system prompt and no tools, generate summary. **Catastrophic for caching** — cached prefix from main conversation doesn't match. Pay full price for input tokens.

### Cache-safe forking (the actual implementation)

> "When we run compaction, we use the **exact same system prompt, user context, system context, and tool definitions** as the parent conversation. We prepend the parent's conversation messages, then append the compaction prompt as a new user message at the end."

> "From the API's perspective, this request looks nearly identical to the parent's last request — same prefix, same tools, same history — so the cached prefix is reused. The only new tokens are the compaction prompt itself."

Tradeoff: must save a "compaction buffer" so there's room in the context window for the compact message + summary output.

> "You don't need to learn these lessons yourself — based on our learnings from Claude Code we built compaction directly into the API."

## The 5 lessons (Thariq's distillation)

1. **Prompt caching is a prefix match.** Any change anywhere in the prefix invalidates everything after it. Design your entire system around this constraint.
2. **Use messages instead of system prompt changes.** Editing system prompt to enter plan mode / change date breaks cache. Insert into messages instead.
3. **Don't change tools or models mid-conversation.** Use tools to model state transitions (plan mode). Defer tool loading instead of removing tools.
4. **Monitor your cache hit rate like you monitor uptime.** Treat cache breaks as incidents.
5. **Fork operations need to share the parent's prefix.** Compaction, summarization, skill execution — use identical cache-safe parameters.

## Implications for our wiki

Multiple existing pages need updates:

- [[Token Efficiency]] — this is the architectural foundation. Add prompt-caching as the FIRST principle, with the layered cache structure (static system prompt → CLAUDE.md → session → messages).
- [[Hooks]] — `UserPromptSubmit` hooks should inject via *messages* not prompt edits (the `<system-reminder>` pattern).
- [[Subagents]] — model switching as cache-safe handoff is canonical use case.
- [[Memory]] — CLAUDE.md is the project-cache layer. Stable CLAUDE.md = better cache hit rate.
- [[Skills]] — skill content stays stable in conversation; volatile updates should come via messages, not skill modification.
- [[Plugins]] — tool stability is a cache requirement. Plugin install/uninstall mid-session is expensive.
- [[Planning Mode]] — the EnterPlanMode/ExitPlanMode-as-tools design is the canonical primary; folding into the page.
- [[Model Context Protocol]] — `defer_loading` pattern is the answer to MCP tool sprawl.

## My assessment

Along with [[Thariq - Seeing like an Agent]], this is the **most important article in the wiki for understanding Claude Code's actual engineering**. The two together:

- *Seeing like an Agent* tells you how to **think about tools**
- *Prompt Caching Is Everything* tells you how to **think about cost / latency**

Both are from an engineer who built it. Both reveal design choices not visible from outside.

For Alessandro's focus areas, this article reframes [[Token Efficiency]]:

> Token efficiency is not "use fewer tokens." It's "design your prompt for cache hits."

Most user-facing tips (system prompt slimming, half-cloning) are downstream of this architectural insight. The biggest wins come from designing skills/hooks/configurations that **preserve cache**, not from minimizing tokens per turn.

Three immediately-actionable takeaways:

1. **Stop modifying CLAUDE.md mid-session for "now-it's-Tuesday" updates.** Inject via messages.
2. **Never `/plugin install` or `/plugin uninstall` mid-conversation** unless you're prepared to eat the full cache rebuild cost.
3. **For model switching, prefer subagents.** "Use Haiku for this part" mid-session may cost more than letting Opus continue.

Cross-references: [[Thariq]] · [[Thariq - Seeing like an Agent]] · [[Token Efficiency]] · [[Hooks]] · [[Subagents]] · [[Memory]] · [[Plugins]] · [[Planning Mode]] · [[Model Context Protocol]]
