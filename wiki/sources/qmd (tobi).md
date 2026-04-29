---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [search, mcp, markdown, knowledge-base, hybrid-search, local-llm, vault]
source_path: (no raw — discovered via in-text citation in raw/notes/LLM Wiki Idea.md line 51)
source_date: 2026-04-29
source_author: Tobi (Shopify CEO Tobi Lütke; verified handle "tobi")
source_url: https://github.com/tobi/qmd
license: MIT
---

# qmd (tobi)

Local hybrid-search engine for markdown — **the tool the wiki's pattern document explicitly recommends** ([[LLM Wiki Idea]] line 51) for vaults that outgrow the index-as-search approach. 23.6k stars, MIT, actively maintained (v2.1.0, April 2026).

For our wiki, qmd matters as the **search-engine substrate this vault would naturally adopt at scale**. The current 127-page vault works fine with `index.md` + Grep, but with a few hundred more sources, hybrid search becomes load-bearing — and qmd is the canonical option.

## What it is

On-device hybrid-search engine for markdown corpora — meeting transcripts, knowledge bases, vaults, docs.

**Three modes**:
- `search` — BM25 full-text only (fastest, exact-match)
- `vsearch` — vector semantic only (best for "what's *like* this?")
- `query` — **hybrid**: BM25 + Vector + LLM query expansion + LLM reranking (highest recall + precision)

The hybrid mode is what makes qmd novel for personal knowledge bases:
1. LLM expands the query into related variants
2. BM25 + Vector run in parallel
3. RRF fusion combines results (original query weighted 2×)
4. Top 30 candidates → LLM cross-encoder reranker (`qwen3-reranker-0.6b-q8_0`)
5. Position-aware blend of retrieval + reranker scores

All local. node-llama-cpp + GGUF models. No cloud calls.

## Install

```bash
npm install -g @tobilu/qmd
# or
bun install -g @tobilu/qmd
```

Then index a directory: `qmd index ~/notes` and search: `qmd query "how do I X"`.

## CLI vs MCP

qmd has both, and the MCP integration is the interesting one for Claude Code:

- **CLI**: just tell the agent to shell out (`qmd query "..."`). Zero config; works with any agent.
- **MCP stdio**: `qmd mcp` — launched as subprocess by each client. Convenient; no shared state.
- **MCP HTTP**: `qmd mcp --http` — exposes `/mcp` on `localhost:8181`. **Avoids repeated model loading** across clients (the LLM models are non-trivial to load).
- **MCP daemon**: `qmd mcp --daemon` — long-lived background server.

For active development with multiple Claude Code sessions, the HTTP/daemon mode is the right pick — model load happens once.

## Where this fits in the wiki

Three placements:

### 1. As an [[Model Context Protocol|MCP]] reference
qmd is one of the cleanest examples of a *general-purpose* MCP server (search over arbitrary text), distinct from the [[GitNexus (abhigyanpatwari)|code-graph]] / [[graphify (safishamsi)|multimodal-graph]] MCP servers the wiki tracks. Different shape: text-only, but with built-in LLM smartness.

### 2. As infrastructure for vaults at scale
The wiki currently uses `index.md` + Grep as search. Per [[LLM Wiki Idea]]: *"At small scale the index file is enough, but as the wiki grows you want proper search. qmd is a good option."* This vault's threshold is somewhere around 200-300 pages — at which point `qmd index ./wiki && qmd mcp` would be the natural upgrade.

### 3. As a [[Second Brain]] tool
qmd's design target is exactly the [[Second Brain]] / [[Memex]] use case: a personal corpus you keep adding to, queryable years later. The fact that Tobi Lütke (Shopify CEO) maintains it suggests it's tested at scale.

## Comparison to other AST-graph / search options

The wiki tracks four retrieval categories per [[Agentic Search vs RAG]]:

| Category | Best for | Wiki ref |
|---|---|---|
| Pure agentic (grep/glob) | Ad-hoc code exploration | (default Claude Code) |
| **Hybrid markdown search** | **Knowledge bases, notes, docs** | **[[qmd (tobi)]]** |
| AST graph | Code, structural queries, blast-radius | [[code-review-graph (tirth8205)]], [[GitNexus (abhigyanpatwari)]] |
| Multimodal graph | Mixed corpora (code + papers + images) | [[graphify (safishamsi)]] |

qmd fills the wiki's **markdown / knowledge-base** retrieval slot. Different best-fit than AST graphs (which need code structure to extract from). For an Obsidian vault or a `raw/` folder of articles + notes + transcripts, qmd is the right shape.

## Open questions

> [!note] Vault adoption candidate
> Worth running `qmd index .` on this vault and comparing query results to the current `search_notes` MCP tool. If qmd's hybrid mode surfaces relevant pages the existing search misses, it's a candidate replacement / supplement.

## Cross-references

- [[LLM Wiki Idea]] — explicitly recommends qmd as the wiki's search-engine substrate
- [[Second Brain]] · [[Memex]] (the personal-corpus pattern qmd is designed for)
- [[Model Context Protocol]] (qmd ships stdio + HTTP MCP servers)
- [[Agentic Search vs RAG]] (hybrid-markdown-search as a retrieval category)
- [[code-review-graph (tirth8205)]] · [[GitNexus (abhigyanpatwari)]] · [[graphify (safishamsi)]] (sibling retrieval categories)
