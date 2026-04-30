# claude-code-wiki

Alessandro's personal Claude Code mastery wiki. Built so that any future session — opened from any project — can hit this vault and get a direct, primary-source-grounded answer to questions like "how do I build better prompts here?", "how do I reduce hallucinations on this refactor?", or "how do I save tokens?".

## What this is

A queryable, LLM-maintained knowledge base. The compounding artifact: each ingested source enriches the synthesis layer; the synthesis layer answers future queries. You don't re-derive answers from raw sources every time — the synthesis already happened.

The pattern is described in `wiki/sources/LLM Wiki Idea.md` and instantiated by [CLAUDE.md](./CLAUDE.md) (the operating manual) and the structure below.

## Topics covered

- **Skills** — auto-invoked capabilities; design principles; community-scale catalogs
- **Context engineering** — what enters Claude's context, when, in what form
- **Token efficiency** — prompt caching architecture, the 5-layer compression stack, observability
- **Reasoning quality** — extended thinking, planning mode, structured prompts
- **Reducing hallucinations** — 18 structural defenses (Karpathy discipline, TDD, hooks, classifiers, sandboxing)
- **Subagents, hooks, MCP** — delegation, guardrails, capability extension
- **Multi-agent orchestration** — when to delegate, 5 archetype patterns, coordination mechanisms
- **Cost observability** — measure → diagnose → optimize

## Discipline (what makes this wiki different)

Two non-negotiable expectations baked into the schema:

1. **No unfilled gaps.** When a source is ingested, every hyperlink it contains gets followed. Orphaned pages get cross-linked. `> [!question]` callouts get resolved when verification is cheap. Stale README counts get verified before they propagate. The wiki doesn't accumulate technical debt.
2. **Queryable within 1 hop.** Every focus-area question — "how do I X?" for any X in the topic list above — should land on a `wiki/topics/` synthesis page within one navigation step. The synthesis layer is the deliverable; everything else (sources, concepts, people) is input. A periodic **query-readiness pass** validates this.

These aren't aspirations. They're operational rules in [CLAUDE.md](./CLAUDE.md) that drive every ingest.

## Structure

```
claude-code/
├── raw/                ← source material (immutable; never modified)
│   └── {articles, books, papers, notes, transcripts, repos, assets}/
├── wiki/               ← authored pages
│   ├── sources/        ← one page per ingested source (assessments + cross-refs)
│   ├── concepts/       ← Claude Code primitives + patterns
│   ├── topics/         ← synthesis pages (the deliverable layer)
│   ├── people/         ← creators and key voices
│   └── overviews/
├── index.md            ← page catalog by type
├── log.md              ← append-only operation log (ingest/query/lint/query-readiness/schema-change/manual)
├── CLAUDE.md           ← wiki operating manual (loaded every session)
└── README.md           ← this file
```

## How to use it

For queries, the agent (Claude Code) reads `CLAUDE.md`, runs `search_notes` scoped to `wiki/`, drills into the top hits, follows wikilinks, and synthesizes with citations. Topic pages are preferred — they're already synthesized.

For ingests, drop a source into `raw/` and ask the agent to ingest it. Expect 5–15 page touches per ingest (one source page + cross-references into existing concepts and topics). Process is logged in `log.md`.

## Contributing

1. Fork this repo
2. Add your source file to `raw/` (or web-clip into Obsidian directly)
3. Ask Claude to ingest; review the page touches
4. Open a pull request — CI checks for duplicate source filenames

## Setting up your own wiki

Use [vault-init](https://github.com/aleburrascano/vault-init):

```bash
npm install -g @aleburrascano/vault-init
vault-init my-wiki-name
```

The pattern is domain-agnostic — same architecture, different focus area.
