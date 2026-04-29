---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, engineering-blog, context-engineering, foundational, just-in-time-retrieval, sub-agents, compaction]
source_path: (no raw — discovered as cross-reference in Tier 1.2 Anthropic Tool Search + Compaction docs)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
---

# Anthropic Effective Context Engineering

The **single most-referenced Anthropic engineering post** for the wiki's focus on [[Context Engineering]]. Both [[Anthropic Tool Search]] and [[Anthropic Compaction]] cite this post as *the* foundational read on long-context degradation. If the wiki had to pick one Anthropic engineering post to anchor [[Context Engineering]] on, this is it.

## The core thesis: context rot is architectural

> "LLMs experience **context rot**—performance degradation as context window size increases. The architecture creates n² pairwise token relationships; as context grows, the model's 'attention budget' stretches thin."

Crucially: this is **not** a problem solved by larger context windows. Models trained on shorter sequences lack specialized parameters for long-range dependencies. Result: a *performance gradient*, not hard failure. You don't crash at 1M tokens — you just get gradually worse output starting much earlier.

This is the architectural justification for everything in [[Token Efficiency|context rot zones]] (300-400k tokens on the 1M model per Thariq) and the entire "context as precious finite resource" framing.

## The 6 named principles

1. **Minimal high-signal tokens** — find the smallest set of tokens that maximize the desired outcome
2. **Right altitude calibration** — balance specificity (guides behavior) with flexibility (enables heuristic reasoning); avoid both brittle hardcoded logic AND vague guidance
3. **Organized structure** — XML tags or Markdown headers to delineate sections
4. **Tool efficiency** — self-contained, minimal-overlap tools with clear inputs (the underlying argument behind [[Action Space Design]])
5. **Canonical examples** — curate diverse few-shot examples; don't try to enumerate all edge cases
6. **Context tightness** — "informative, yet tight"

These translate into concrete operational rules across the wiki: [[Memory|CLAUDE.md ≤200 lines]] is principle 6; [[Skill Building|skill description discipline]] is principle 1; [[Hooks|`<system-reminder>` injection]] is principle 6 plus principle 3.

## The strategic reframe: just-in-time retrieval

> "Just-in-time context strategies" — the post's canonical reframe. **Shift from pre-inference embedding retrieval to runtime retrieval through tools.**

Three runtime patterns:

### Just-in-time context
Maintain lightweight identifiers (file paths, URLs, IDs) and load dynamically via tools. Don't pre-process all data into context.

### Progressive disclosure
Agents incrementally discover context through exploration. Metadata (folder hierarchies, naming conventions, timestamps) guides navigation. The same pattern Thariq names in [[Thariq - Seeing like an Agent]] for skill design.

### Hybrid approach
Some upfront retrieval for speed; autonomous exploration enabled at agent's discretion. Claude Code's actual design: CLAUDE.md upfront, glob/grep for just-in-time.

> "This approach mirrors human cognition: we don't memorize entire corpuses but use external organization systems to retrieve on demand."

## Long-horizon techniques (the wiki's three Anthropic-blessed tools)

For tasks that exceed even disciplined context windows:

### 1. Compaction
Summarize conversation history; preserve architectural decisions and unresolved issues; discard redundant outputs. **Prioritize recall over precision initially.** Productized at [[Anthropic Compaction]].

### 2. Structured note-taking / agentic memory
Agent writes external memory (`NOTES.md`, to-do lists), pulled back into context later. Anthropic's productized form: the **Memory tool** (file-based, lives outside the context window). Worth its own ingest if it gets a dedicated docs page.

> "Claude playing Pokémon demonstrates structured note-taking enabling multi-hour coherence without explicit memory prompting."

### 3. Sub-agent architectures
Specialized agents handle focused tasks with **clean context windows**, returning condensed summaries (**1,000–2,000 tokens**) to the lead agent. Concrete operational threshold from this post — the wiki had subagents framed without this size guideline; now it has one.

For [[Multi-Agent Orchestration]]: sub-agent return-summary size ≈ 1-2k tokens is the right target.

## Cross-references to other Anthropic posts (Tier 3 backlog)

This post links out to:
- *Building effective AI agents* (workflows vs. agents) — **Tier 3 candidate**
- *Writing tools for AI agents – with AI agents* (tool design principles) — **Tier 3 candidate**
- *How we built our multi-agent research system* — **Tier 3 candidate; directly relevant to [[Multi-Agent Orchestration]]**

These three engineering posts plus this one form an Anthropic-official quartet on agent design. Worth fetching all four for completeness.

## What Claude Code itself implements (per this post)

Anthropic's own description of Claude Code's design as an existence proof of these principles:

- **Hybrid retrieval**: CLAUDE.md upfront (just-in-time identifier), glob/grep for runtime
- **Compaction**: summarizing message history (now productized in [[Anthropic Compaction]])
- **Memory tool** (Claude Developer Platform): file-based memory outside the context window
- **Tool result clearing**: a context-editing primitive (sibling to compaction)

## Where this lands in the wiki

- **[[Context Engineering]] anchor** — the primary citation; updates the page to use Anthropic's terminology (just-in-time vs upfront retrieval) and operational thresholds (1-2k token sub-agent summaries)
- **[[Token Efficiency]]** — ratifies the architectural framing of context as precious; the n² attention-budget argument is the *why* behind the layer 0–5 stack
- **[[Action Space Design]]** — principle 4 (tool efficiency) is the underlying argument
- **[[Skill Building]]** — principles 1 + 6 give skill-description discipline
- **[[Multi-Agent Orchestration]]** — 1-2k token return-summary target is the operational anchor
- **[[Memory]]** — agentic memory (NOTES.md pattern) is now an Anthropic-blessed pattern, not just claude-mem-style third-party

## The deeper insight

> "As model capabilities improve, agents require *less* prescriptive engineering and operate with greater autonomy. The principle of treating context as precious and finite remains constant."

The forecast: **context discipline outlasts model improvement**. As models get smarter, less hand-holding is needed at the *prompt* layer; but the *information-theoretic* concerns (what enters context, when, in what form) stay load-bearing because they're a property of the architecture, not the model.

This justifies a wiki-level investment in [[Context Engineering]] and [[Token Efficiency]]: the content stays relevant across model generations.

## Cross-references

- [[Context Engineering]] — primary anchor
- [[Token Efficiency]] · [[Prompt Caching]] (the architectural pair)
- [[Anthropic Compaction]] · [[Anthropic Tool Search]] (sibling productizations referenced from this post)
- [[Action Space Design]] (tool efficiency principle)
- [[Skill Building]] (skill description discipline)
- [[Multi-Agent Orchestration]] (1-2k token sub-agent return-summary target)
- [[Memory]] (agentic memory pattern)
- [[Subagents]] (sub-agent architecture)
