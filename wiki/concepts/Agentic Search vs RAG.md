---
type: concept
created: 2026-04-26
updated: 2026-04-27
sources: 6
tags: [pattern, retrieval, context-engineering, anti-pattern, claude-code, ast-graph]
---

# Agentic Search vs RAG

A consequential design choice: when an agent needs information from a corpus, does it use **retrieval-augmented generation** (RAG — fetch relevant chunks via embeddings, then generate) or **agentic search** (Claude actively explores via `glob` + `grep` + `read`, deciding what to look at next based on what it found)?

[[Boris Cherny]] is unambiguous on this for code:

> "Agentic search (glob + grep) beats RAG. Claude Code tried and discarded vector databases because code drifts out of sync and permissions are complex."

[[Thariq]] (the engineer who built parts of Claude Code) gives the engineering account in [[Thariq - Seeing like an Agent]]:

> "When Claude Code first came out, we used a RAG vector database to find context for Claude. While RAG was powerful and fast it required indexing and setup and could be fragile across a host of different environments. **More importantly, Claude was given this context instead of finding the context itself.**"
>
> "But if Claude could search on the web, why not search your codebase? By giving Claude a Grep tool, we could let it search for files and build context itself."
>
> "**As Claude gets smarter, it becomes increasingly good at building its context if it's given the right tools.**"

For our wiki this is a **load-bearing claim** — it shapes how to think about [[Skills|skill]] design, [[Memory|memory]] design, and any tool that wraps a corpus.

## What RAG does

The classical pipeline:
1. Pre-process corpus into embeddings stored in a vector database
2. At query time: embed the user's query, find nearest-neighbor documents
3. Concatenate retrieved documents with the query
4. Generate response

Strengths:
- Single retrieval pass
- Fast (one embedding lookup)
- Works well for stable corpora and well-formed queries

## What agentic search does

The agent loop pattern:
1. Agent forms a hypothesis about where information lives
2. Issues a `glob`/`grep`/`read`/`find` operation
3. Inspects results
4. Reformulates the search based on what it found
5. Loops until done

Strengths:
- **Iterative refinement** — wrong initial hypothesis is correctable
- **Always current** — searches the live filesystem, not a stale index
- **Permission-aware** — respects file-system permissions
- **Reasoning-grounded** — search choices reflect understanding of what's needed
- **Tool-integrated** — same tools used for code execution, no separate retrieval system

## Why RAG fails for code (Boris's reasoning)

### 1. Code drifts out of sync
Vector indexes are rebuilt periodically. Code changes constantly. The index lags. The agent retrieves stale context, makes wrong recommendations.

Counter-argument: rebuild the index more often. Counter-counter: indexing has overhead; rebuilding on every commit doesn't scale; rebuilding less often = drift.

### 2. Permissions are complex
File-system permissions, repo-level access, branch-specific visibility. Vector indexes typically don't model permissions; they expose what's been indexed regardless. Agentic search inherits the user's permissions naturally.

### 3. Code's structure beats vector similarity
A function that calls `parseConfig()` is *more* structurally related to `parseConfig`'s definition than vector embedding distance can capture. `grep -r 'parseConfig' .` is more useful than nearest-neighbor lookup on `parseConfig`'s embedding.

### 4. Iterative refinement matters
"Where is auth handled?" → grep `auth` → too many hits → grep `function.*auth` → narrow → read top 3 → understand. Each step uses the previous. RAG's single pass can't replicate.

## When RAG is still right

Despite Boris's claim about code, RAG is right for:

- **Large stable knowledge bases** — public documentation, Wikipedia, indexed manuals
- **Well-structured queries** — fact-finding that one retrieval pass can answer
- **Latency-critical applications** — sub-second response needs (agentic search has latency from multiple tool calls)
- **Cross-modal corpora** — embeddings can do text-image-audio in one space; agentic search struggles
- **Permission-irrelevant corpora** — public manuals, where everyone sees everything

## When agentic search is right

For our wiki's domain (Claude Code mastery, code-adjacent work):

- **Code exploration** (per Boris)
- **Codebase navigation** (per [[Learn Claude Code (shareAI-lab)|Learn Claude Code]] — tools as handlers, not orchestration)
- **Investigation** ("where does X happen and why")
- **Iterative debugging** (each finding narrows the search)
- **Permission-respecting work** (private repos, sensitive files)
- **Anything where the corpus changes during the session**

## Implications for skill design ([[Skill Building]])

If the answer to "should this skill use RAG or agentic search?" is "agentic search," then:
- Don't pre-build vector indexes for skill content
- Use [[Skills|progressive disclosure]] — skill index file references resource files Claude reads on demand
- Use `grep`-friendly file structures (markdown headers, named sections, predictable filenames)
- Avoid embedding-only skills

If the answer is "RAG," then a [[Model Context Protocol|MCP]] server wrapping a vector database is the right shape. But for code: probably no.

## Implications for memory design ([[Memory]])

CLAUDE.md is **not** RAG-style retrieval. It's whole-file inclusion. This is closer to agentic search's spirit (Claude reads what's relevant) than RAG (chunks fetched by similarity).

Auto Memory's `MEMORY.md` index is a good middle ground — index file lists topics, full content loaded on demand by Claude. Topic files are file-scoped, not chunk-embedded. This is **agentic search applied to memory**.

## Implications for MCP design ([[Model Context Protocol]])

MCP servers wrapping data sources have a choice:
- Expose a search/query API → Claude uses it agentically
- Expose a vector-similarity endpoint → RAG-style

Boris's logic suggests prefer the former for code-adjacent data. Latter is fine for stable reference corpora.

## The hybrid case

[[claude-mem (thedotmack)|claude-mem]] uses a **hybrid**: 3-layer workflow with `search` (compact index) → `timeline` (chronological context) → `get_observations` (full details). The `search` layer is similar to RAG (fast index lookup); the latter layers are agentic (iterative refinement based on what `search` returned).

This is probably the right answer for many cases: cheap initial retrieval to narrow the space, then agentic exploration of the narrow space.

## A third position (now a category): AST-based structural graphs

Beyond grep-vs-RAG, there's a third design point: **AST-based structural graphs**. Tree-sitter parses code into a graph of nodes (functions, classes, imports) and edges (calls, inheritance, test coverage). Queries return blast-radius (every caller, dependent, test affected by a change).

The wiki now tracks **two AST-graph projects**, so this is a *category*, not a single example:

| Project | DB | UI | Scope | Distinctive |
|---|---|---|---|---|
| [[code-review-graph (tirth8205)]] | SQLite | CLI / MCP | Single repo | 8.2× avg / 49× Next.js token reduction; permissions via local DB |
| [[GitNexus (abhigyanpatwari)]] | LadybugDB (graph DB w/ vectors) | CLI + browser WASM web UI | Multi-repo registry + group contracts | Process tracing, Leiden community detection, Pre+Post hooks, **auto-generated repo-specific skills**, signed Docker images |

| | Pure agentic (`grep` + `glob`) | Vector RAG | **AST graph** |
|---|---|---|---|
| Indexes | Nothing pre-built | Embeddings | Structural (calls/imports) + optional embeddings |
| Latency per query | Per-query | Pre-built | Pre-built (incremental) |
| Drift | None | High | Low (auto-update on commit; PostToolUse hook detects staleness in GitNexus) |
| Permissions | Inherited | Separate index issue | Local DB respects FS |
| Best for | Ad-hoc exploration | Stable reference corpora | Planned reviews; blast-radius; multi-repo monorepo navigation |

The structural approach addresses both Boris's RAG objections:
- **Drift**: incremental updates on every git commit; staleness detection at the hook layer
- **Permissions**: local DB respects file-system access; no separate cross-org index

The tradeoff: **structural similarity isn't semantic relevance.** Function call edges tell you *what's connected*, not what's *meaningful* to read. Conservative approach: high recall (never miss an impacted file) at the cost of precision (over-predicts).

GitNexus pushes the category further with **"Precomputed Relational Intelligence"** — clustering, tracing, and confidence scoring done at index time so MCP tools return complete context in one call (vs 4+ Cypher queries on traditional Graph RAG). Also adds **process detection** (entry-point execution flow tracing) which neither code-review-graph nor pure agentic search expose.

## A fourth position: multimodal knowledge graphs ([[graphify (safishamsi)]])

graphify extends the AST-graph idea to non-code corpora — papers (with citation mining), images (Claude vision), video / audio (local Whisper transcription). Same Leiden clustering on graph topology only — no embeddings — but the inputs span beyond code.

This sits in a different niche: **second-brain corpora**, not codebases. graphify is the natural tool for an [[LLM Wiki Idea|LLM wiki]] / [[Karpathy LLM Coding Notes (Dec 2025)|Karpathy `/raw` folder]]; GitNexus and code-review-graph are the natural tools for production repos.

Token reduction at scale: **71.5× on a 52-file mixed corpus** (Karpathy repos + papers + images). graphify is honest that the gain disappears below ~10 files — fits-in-context corpora don't need the graph.

## Synthesis

| Question shape | Best tool |
|---|---|
| "Where is auth handled?" (single-repo, ad-hoc) | Pure agentic (`grep`/`glob`) |
| "What breaks if I change `UserService`?" (planned review, blast-radius) | AST graph (code-review-graph for single repo; GitNexus for multi-repo / monorepo / contracts across services) |
| "What does the Karpathy `nanoGPT` repo + 5 attention papers + 4 architecture diagrams say collectively?" | Multimodal knowledge graph (graphify) |
| "What's the Pandas API for a groupby?" (stable reference corpus) | Vector RAG |

**The right answer is "use the appropriate tool for the question," not a single retrieval philosophy.** Boris's "agentic search > RAG for code" was correct *given the binary framing* of his moment. With AST graphs and multimodal knowledge graphs as additional positions, the framing is now four-way.

## Encyclopedia framing

[[Encyclopedia of Agentic Coding Patterns]] lists **RAG Poisoning** as an antipattern — adversarial content injected into the retrieval source can manipulate the agent. Agentic search is also vulnerable (any file the agent reads can carry injection), but the attack surface differs.

## Anti-patterns

- **Pure RAG over a code corpus** — Boris explicitly warns. Vector DBs over code drift out of sync.
- **Pure agentic search over a 10M-file corpus** — too many `grep` calls, too slow. Some pre-indexing is needed at scale.
- **Embeddings without grep fallback** — vector lookup misses literal-string matches grep would catch instantly.
- **No agent control over retrieval** — even with RAG, let the agent reformulate queries.

## Cross-references

- [[Skills]] · [[Skill Building]] (skill design implications)
- [[Memory]] (CLAUDE.md is agentic-search-shaped, not RAG-shaped)
- [[Model Context Protocol]] (MCP server design implications)
- [[Encyclopedia of Agentic Coding Patterns]] (RAG Poisoning antipattern)
- [[Token Efficiency]] (agentic search can be more token-efficient than always-loading vector results)
- Sources: [[Boris Cherny Tips Compendium]] (debugging tip) · [[shanraisshan Claude Code Best Practice]] (cited in tips) · [[Prompt Engineering Guide (dair-ai)|RAG technique page]] · [[Learn Claude Code (shareAI-lab)|architectural justification]] · [[code-review-graph (tirth8205)]] · [[GitNexus (abhigyanpatwari)]] · [[graphify (safishamsi)]]
