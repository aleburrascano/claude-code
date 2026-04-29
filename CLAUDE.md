# CLAUDE.md — claude-code

You maintain this personal knowledge wiki. Read this at session start, then search-first — see Session start below.

## Layers
1. `raw/` — immutable source material. Read; never modify.
2. `wiki/` — your domain. Author and maintain pages here.

## Page conventions
- Frontmatter every page: `type`, `created`, `updated`, `sources`, `tags`
- Cross-references: Obsidian wikilinks `[[Page Name]]`
- Source pages in `wiki/sources/` with `source_path`, `source_date`, `source_author`
- Never invent facts. Use `> [!question] Unverified` for uncertain claims.

## Operations

### Ingest (adding a source)
1. Read raw source fully.
2. Discuss takeaways before writing pages.
3. Create source page in `wiki/sources/`.
4. Update or create pages in `wiki/topics/` (synthesis) and `wiki/concepts/` touched.
5. Update `index.md` (one line per page: `- [[Page]] — summary`). Append `log.md` entry (`## [YYYY-MM-DD] ingest | title`).

### Query
Use `search_notes` (folder: `wiki`) first → `get_note` on top 1–3 hits → synthesize.
`wiki/topics/` = synthesis pages (start here). `wiki/sources/` = per-source detail.

### Lint (on request)
Find: orphans, contradictions, missing cross-refs, index drift. Discuss before bulk edits.

## Session start
- **Queries**: read this → `search_notes` directly → respond.
- **Ingest / lint**: read this → read `index.md` → skim tail of `log.md` → proceed.
- **Always** scope `search_notes` to `folder: "wiki"` or `folder: "raw"` — unscoped searches can hit `.quartz` noise.

## You do NOT
- Modify `raw/` (immutable).
- Delete wiki pages without confirmation.
- Fabricate sources or citations.
- Skip the log.
