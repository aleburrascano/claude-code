---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [meta, knowledge-management, llm, second-brain]
source_path: raw/notes/LLM Wiki Idea.md
source_date: 2026-04-26
source_author: unknown (shared with Alessandro as a pattern doc)
---

# LLM Wiki Idea

The pattern document this entire wiki implements. Describes a way of building personal knowledge bases where an LLM incrementally maintains a persistent, interlinked markdown wiki rather than re-deriving knowledge from raw sources at every query (the [[RAG]] approach).

## Core thesis

A wiki is a **persistent, compounding artifact**. RAG re-derives knowledge on every query and accumulates nothing. The LLM Wiki pattern flips this: the LLM compiles knowledge once into structured wiki pages and then keeps them current as new sources arrive. Cross-references are pre-built, contradictions pre-flagged, syntheses already reflect everything read.

This is the central idea behind a [[Second Brain]] as implemented here.

## Architecture (three layers)

1. **Raw sources** — immutable curated documents (articles, papers, notes, transcripts, images). Source of truth. LLM reads but never writes here.
2. **The wiki** — LLM-generated markdown files. Summaries, entity pages, concept pages, syntheses. LLM owns this layer entirely.
3. **The schema** — a config file (`CLAUDE.md` for Claude Code, `AGENTS.md` for Codex) defining structure, conventions, workflows. Co-evolved between human and LLM.

## Operations

- **Ingest** — drop a source, the LLM reads it, discusses takeaways, writes a source page, updates entity/concept pages, updates the index, appends to the log. Single source typically touches 10–15 wiki pages.
- **Query** — ask questions; LLM reads the index, finds relevant pages, synthesizes with citations. Good answers get filed back into the wiki so explorations compound.
- **Lint** — periodic health check for contradictions, stale claims, orphan pages, missing cross-references, ungrouped concepts, data gaps.

## Bookkeeping primitives

- **`index.md`** — content-oriented catalog, organized by type, read at the start of every query. Scales to ~100 sources / hundreds of pages without needing embedding-based search.
- **`log.md`** — chronological append-only record. Grep-able if entries use a consistent header prefix.

## Why it works

The tedious part of a knowledge base is not reading or thinking — it's the bookkeeping (cross-references, updates, consistency). Humans abandon wikis because maintenance grows faster than value. LLMs don't get bored, don't forget cross-references, and can touch 15 files in one pass. Maintenance cost approaches zero, so the wiki stays alive.

Division of labor:
- **Human** — curate sources, direct analysis, ask good questions, think.
- **LLM** — everything else.

## Lineage

Spiritually descended from [[Vannevar Bush]]'s [[Memex]] (1945) — a personal, curated knowledge store with associative trails between documents. Bush's blocker was *who maintains it*. LLMs answer that.

## Recommended tooling (optional)

- **Obsidian** as the read-side IDE; LLM agent in a side panel.
- **Obsidian Web Clipper** — browser extension that converts web articles to markdown for the `raw/` collection.
- **Marp** — markdown-based slide decks for presenting from wiki content.
- **Dataview** — Obsidian plugin querying page frontmatter for dynamic tables.
- **Graph view** — visualizes wiki shape; spots hubs and orphans.
- **`qmd`** — local hybrid BM25/vector search engine over markdown, available as CLI and MCP server. Useful once the wiki outgrows index-based discovery.
- **Git** — the wiki is just a markdown repo, so version history is free.

## Notable framings

> [!quote] Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

> [!quote] The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

## Open / deliberately unspecified

The document is intentionally abstract — it does not prescribe directory structure, page formats, schema details, or required tools. Each implementation should fit the user's domain. The schema for *this* wiki lives in [[CLAUDE]] and is the concrete instantiation for Alessandro's `claude-code/` vault.

## My assessment

The pattern's strongest claim is the maintenance-cost argument. It's plausible *if* the LLM is disciplined enough to actually update cross-references on every ingest. The schema document (`CLAUDE.md`) is therefore load-bearing: drift in the schema or in the LLM's discipline will silently degrade the wiki. The lint operation is the safety net — it should be run regularly, not just when things feel off.

Tooling claim worth verifying as the wiki grows: "index file is enough up to ~100 sources." Watch for the breakpoint where reading the index plus a handful of candidate pages stops fitting in context comfortably. That's when something like `qmd` becomes worth setting up.
