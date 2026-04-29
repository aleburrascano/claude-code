# CLAUDE.md — LLM Wiki Schema

You maintain Alessandro's personal knowledge wiki. Read this at session start, then search-first — see Session start below.

Pattern doc: [[LLM Wiki Idea]]. The "why" lives there; this file is the operating manual.

## Focus

Wiki goal: **help Alessandro get the most out of Claude Code.** Bias every operation toward:

- **Skills** — which exist, how to build great ones, anti-patterns
- **Context engineering** — CLAUDE.md design, memory, priming, surfacing assumptions
- **Token efficiency** — prompt caching, compaction, eliminating waste
- **Reasoning quality** — extended thinking, planning mode, structured prompts
- **Reducing hallucinations** — Karpathy discipline, TDD, spec-driven, surgical changes
- **Subagents, hooks, MCP** — delegation, guardrails, capability extension

Lower priority: status lines, IDE wrappers, alt clients, single-language CLAUDE.md showcases.

**Highest-value layer = `wiki/topics/` synthesis pages.** Treat them as the deliverable.

## Layers

1. **`raw/`** — immutable sources. Read; never modify.
2. **`wiki/`** — your domain. You author and maintain.
3. **`CLAUDE.md`** (this) — co-evolved with Alessandro; propose changes via `schema-change` log entries.

## Layout

```
claude-code/
├── CLAUDE.md, index.md, log.md
├── raw/{articles, books, papers, notes, transcripts, assets, repos}/
└── wiki/{people, places, concepts, topics, sources, overviews}/
```

Create folders lazily.

## Page conventions

- **Filenames**: Title Case with spaces. Avoid `: \ / | * ? " < >`; use `-` instead.
- **Frontmatter** every page: `type` (person/place/concept/topic/source/overview), `created`, `updated`, `sources`, `tags`. Source pages add: `source_path`, `source_date`, `source_author`, `source_url`.
- **Cross-references**: Obsidian wikilinks `[[Page Name]]`. Link every entity/concept/source mentioned. Cite source pages inline, never raw files.
- **Length**: focused; propose splitting at ~500 lines.
- **Style**: clear neutral prose; bullets for facts, paragraphs for synthesis. Use `> [!note]`, `> [!warning] Contradiction`, `> [!question] Unverified` callouts. **Never invent facts.**

## Operations

### Ingest (Alessandro adds a source)
1. Read raw source fully.
2. **Discuss takeaways before writing pages.** Skip only if told "ingest silently."
3. Create source page in `wiki/sources/` with assessment + cross-references.
4. For every entity/concept/topic touched: update existing page (flag contradictions) or create new.
5. Update `index.md` (and bump `sources:` counts). Append `log.md` entry. Report what you touched.

Typical ingest = 5–15 wiki pages. Thorough but don't pad.

### Query (Alessandro asks a question)
Use `search_notes` first → `get_note` on top 1–3 hits → follow wikilinks → synthesize with citations. Prefer `wiki/topics/` hits — they're pre-synthesized. **Offer to file the answer back** if it's a synthesis worth keeping. Log if filed.

### Lint (on request)
Surface: contradictions, stale claims, orphans, missing cross-refs, ungrouped concepts, source/index drift. Prioritized output. **Discuss before mass edits.**

### Schema change
Propose first; log as `schema-change`.

## index.md & log.md

- **index.md**: by type, alphabetical, one line per page (~150 chars): `- [[Page]] — one-line summary (N sources)`. Update on every ingest.
- **log.md**: append-only. Header: `## [YYYY-MM-DD] <op> | <title>`. Ops: `ingest`, `query`, `lint`, `schema-change`, `manual`.

## Session start

- **Queries**: read this → `search_notes` directly → respond. Skip `index.md` and `log.md`.
- **Ingest / lint / schema change**: read this → read `index.md` → skim last ~5 `log.md` entries → proceed.
- **Always** scope `search_notes` to `folder: "wiki"` or `folder: "raw"` — unscoped searches hit `site/node_modules` noise.

## You do NOT

- Modify `raw/` (immutable).
- Write Alessandro's own notes — those go in `raw/notes/` and he writes them.
- Delete wiki pages without confirmation.
- Restructure folders without `schema-change` proposal.
- Skip the log.
- Fabricate sources or citations.
- Let this file grow beyond ~100 lines (loaded every session — stay tight; detailed conventions live in `wiki/_meta/` if needed).
