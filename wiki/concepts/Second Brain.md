---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [knowledge-management, llm, meta]
---

# Second Brain

A personal, persistent knowledge store that augments human memory and synthesis. In this wiki, the term refers specifically to the LLM-maintained variant described in [[LLM Wiki Idea]]: an interlinked markdown wiki where an LLM does all the bookkeeping and the human does the curation, exploration, and thinking.

## Distinguishing features (per [[LLM Wiki Idea]])

- **Persistent and compounding.** Each new source enriches the wiki; nothing is re-derived per query.
- **Maintained by an LLM, browsed by a human.** The LLM writes, links, updates, lints. The human reads, asks, sources.
- **Three-layer architecture** — raw sources, wiki, schema. See [[LLM Wiki Idea]] for the contract between them.
- **Markdown-native.** Plain files, version-controllable with git, browseable in Obsidian.

## Contrast with [[RAG]]

| | [[RAG]] | Second Brain (this pattern) |
|---|---|---|
| When knowledge is compiled | At query time | At ingest time |
| Cross-references | Re-derived per query | Pre-built and maintained |
| Accumulation | None | Compounds with every source |
| Maintenance burden | None (no artifact) | Real, but absorbed by the LLM |
| Best for | Ad-hoc Q&A over a corpus | Long-running, evolving understanding |

The pattern doesn't reject retrieval — it sits *on top of* the raw sources, which can still be searched directly. It just adds a synthesized layer that's been processed once rather than recomputed.

## Lineage

Spiritually downstream of [[Vannevar Bush]]'s [[Memex]] (1945). Bush envisioned a personal, curated knowledge store with associative trails — closer to this than to what the web became. His unsolved problem was who does the maintenance; LLMs are the answer.

## How this specific wiki implements it

See [[CLAUDE]] for the concrete schema: folder layout, page conventions, ingest/query/lint workflows, index and log formats. The pattern is general; that file is the local instantiation.
