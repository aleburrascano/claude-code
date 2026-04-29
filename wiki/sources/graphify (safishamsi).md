---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 2
tags: [skill, knowledge-graph, multimodal, hooks, token-efficiency, ast-graph, second-brain, cross-platform, calibrated-confidence]
source_path: raw/repos/safishamsi-graphify.md
source_date: 2026-04-27
source_author: Safi Shamsi
source_url: https://github.com/safishamsi/graphify
license: "open source (PyPI: graphifyy)"
---

# graphify (safishamsi)

> "Andrej Karpathy keeps a `/raw` folder where he drops papers, tweets, screenshots, and notes. graphify is the answer to that problem."

graphify is a **single skill** that turns any folder — code, docs, PDFs, images, video, audio — into a queryable knowledge graph. Type `/graphify` in your AI coding assistant, get back a graph in `graphify-out/` plus an interactive HTML visualization.

For our wiki, three things make graphify a load-bearing entry:

1. It **explicitly cites Alessandro's pattern** ([[Karpathy LLM Coding Notes (Dec 2025)|Karpathy's `/raw` folder workflow]]) as the use case it serves. This vault *is* a graphify-style corpus.
2. It is the wiki's clearest example of a **15-platform-portable skill**.
3. It introduces **EXTRACTED / INFERRED / AMBIGUOUS** edge tagging — calibrated honesty about extraction confidence, a structural defense in [[Reducing Hallucinations]].

## What you give it, what you get back

**Input**: any folder. Code (`.py .ts .js .jsx .tsx .go .rs .java .c .cpp .rb .cs .kt .scala .php .swift .lua .zig .ps1 .ex .vue .svelte .dart` — 25 languages via tree-sitter), docs (`.md .mdx .html .txt .rst`), Office (`.docx .xlsx`), papers (`.pdf` with citation mining), images (`.png .jpg .webp .gif` via Claude vision), video/audio (faster-whisper transcription, optional `[video]` extra), YouTube URLs (yt-dlp + Whisper).

**Output** in `graphify-out/`:
- `graph.html` — interactive vis.js graph, click nodes / search / filter by community
- `GRAPH_REPORT.md` — god nodes, surprising connections, suggested questions (the always-on context)
- `graph.json` — persistent graph for programmatic queries
- `cache/` — SHA256 cache, re-runs only re-process changed files

**Token benchmark from the README**: on a 52-file mixed corpus (Karpathy repos + 5 papers + 4 images), **71.5x fewer tokens per query** vs reading raw files. On smaller corpora the gain is structural clarity, not compression — graphify itself notes "6 files fits in a context window anyway."

## The pipeline (from ARCHITECTURE.md)

Seven stages, each a pure function communicating through plain dicts and NetworkX graphs — no shared state, no side effects:

```
detect() → extract() → build_graph() → cluster() → analyze() → report() → export()
```

1. **`detect`** — file-type and corpus shape inspection
2. **`extract`** — three sub-pipelines run in parallel:
   - **AST pass** (deterministic, no LLM): tree-sitter for code → classes, functions, imports, call graphs, docstrings, rationale comments
   - **Whisper pass** (local): video/audio transcribed with faster-whisper using a domain-aware prompt derived from corpus god nodes; transcripts cached
   - **Claude subagent pass** (parallel): docs/papers/images/transcripts → concepts, relationships, design rationale
3. **`build_graph`** — NetworkX merge with collision-safe node IDs
4. **`cluster`** — Leiden community detection on graph topology only — **no embeddings**
5. **`analyze`** — god nodes, surprising connections, suggested questions
6. **`report`** — `GRAPH_REPORT.md` rendering
7. **`export`** — graph.html + graph.json + optional formats (SVG, GraphML, Neo4j cypher, Obsidian vault)

**Why no embeddings?** Per the architecture: clustering operates "exclusively on graph topology." Claude already extracts `semantically_similar_to` edges (marked INFERRED) during the Claude subagent pass — those edges are *in the graph*, so Leiden picks up semantic similarity through edge density without a separate embedding step. The design priority is **interpretability** (you can read why nodes cluster) and **reproducibility** over similarity scores from an opaque external model.

## Calibrated confidence: EXTRACTED / INFERRED / AMBIGUOUS

Every edge is tagged at extraction time:

- **EXTRACTED** — found directly in source (import statement, direct call, explicit citation). Confidence 1.0.
- **INFERRED** — reasonable deduction (call-graph traversal, semantic similarity). Confidence 0.0–1.0 score attached.
- **AMBIGUOUS** — flagged for human review.

This taxonomy flows through the entire pipeline; the `analyze` and `report` stages distinguish high-confidence structural facts from speculative connections. **It's a calibration discipline that resists the LLM's natural tendency to bluff** — see [[Reducing Hallucinations|calibrated-confidence-tagging pattern]].

## The 15-platform install matrix

graphify is the wiki's strongest existence proof that **a skill can be cross-platform-portable**. From the README, the platform-specific install paths cover: Claude Code (Linux/Mac/Windows) · Codex · OpenCode · Cursor · Gemini CLI · GitHub Copilot CLI · VS Code Copilot Chat · Aider · OpenClaw · Factory Droid · Trae (+ Trae CN) · Hermes · Kiro IDE/CLI · Google Antigravity.

Each platform gets the *same skill* with different always-on plumbing:

| Platform | Always-on mechanism |
|---|---|
| Claude Code | `CLAUDE.md` + **PreToolUse hook** before Glob/Grep |
| Codex | `AGENTS.md` + **PreToolUse hook** in `.codex/hooks.json` |
| OpenCode | `AGENTS.md` + **`tool.execute.before` plugin** |
| Cursor | `.cursor/rules/graphify.mdc` (`alwaysApply: true`) — included automatically, no hook needed |
| Gemini CLI | `GEMINI.md` + **BeforeTool hook** |
| Kiro | `.kiro/skills/` + `.kiro/steering/graphify.md` (`inclusion: always`) |
| Antigravity | `.agents/rules/` + `.agents/workflows/` |
| VS Code Copilot Chat | `.github/copilot-instructions.md` (auto-loaded) |
| Aider, OpenClaw, Droid, Trae, Hermes, Copilot CLI | `AGENTS.md` (no hook support) |

The pattern: **always-on rule injection ≠ hook-based context injection** — but both achieve the same goal of "agent reads `GRAPH_REPORT.md` before grep-ing." Where hooks aren't supported, project-level rules files take over. graphify maps the actual portability surface of skills across the 2026 AI-coding landscape.

## Always-on hook vs explicit `/graphify` commands

> [!note] Important conceptual distinction from the README
> The always-on hook surfaces `GRAPH_REPORT.md` — a one-page summary of god nodes, communities, and surprising connections. Your assistant reads this before searching files, so it navigates by structure instead of keyword matching.
>
> `/graphify query`, `/graphify path`, and `/graphify explain` go *deeper*: they traverse the raw `graph.json` hop-by-hop, trace exact paths between nodes, and surface edge-level detail (relation type, confidence score, source location).
>
> **Hook = map. `/graphify` commands = navigate the map precisely.**

This is the cleanest articulation of the **always-on context vs explicit-trigger tool** distinction in the entire wiki. Generalize: any agent capability that combines *a one-page summary in always-on context* with *deep tools in explicit-trigger commands* will out-perform either alone.

## MCP mode

```
python -m graphify.serve graphify-out/graph.json
```

Exposes the graph as an MCP server: `query_graph`, `get_node`, `get_neighbors`, `shortest_path`. Sits alongside [[GitNexus (abhigyanpatwari)|GitNexus]] and [[code-review-graph (tirth8205)|code-review-graph]] in the AST-graph-via-MCP category, but **graphify is the only one that ingests non-code multimodal content** (papers, images, video) — making it the natural tool for second-brain corpora rather than codebases-only.

## Multi-modal extras

- **`graphify clone <github-url>`** — clones any public repo, runs the full pipeline. Reuses existing clones via `git pull`.
- **`graphify merge-graphs g1.json g2.json ...`** — combine cross-repo graphs; nodes tagged with source repo.
- **`graphify add <url>`** — fetch a paper / tweet / video, save to corpus, update graph.
- **`graphify hook install`** — post-commit + post-checkout git hooks: graph rebuilds automatically after every commit and branch switch. Code-only updates need no LLM (AST pass only).
- **Hyperedges** — group relationships connecting 3+ nodes (e.g. all classes implementing a shared protocol). Pairwise edges can't express these.

## Worked examples (from the repo)

| Corpus | Files | Reduction |
|---|---|---|
| Karpathy repos + 5 papers + 4 images | 52 | **71.5x** |
| graphify source + Transformer paper | 4 | **5.4x** |
| httpx (synthetic Python library) | 6 | ~1x |

The README is **honest** about token-reduction not scaling below ~10 files. That kind of disclosure should be the bar for ecosystem repos.

## Privacy

Code: AST-only locally, never leaves machine. Audio/video: Whisper local, never leaves machine. Docs / papers / images: sent to your model API (Anthropic / OpenAI / your platform's provider) for semantic extraction, using your own API key. No telemetry, no usage tracking.

## Penpax — the always-on commercial layer

graphify cites **Penpax** (graphifylabs.ai) as the enterprise / always-on extension: "the same graph applied to your entire working life — continuously." On-device digital twin connecting browsers, meetings, emails, files, code. Currently waitlist-only, free trial pending. Out-of-scope for the wiki, but worth knowing the path graphify is heading.

## Cross-references

- [[Karpathy LLM Coding Notes (Dec 2025)]] / [[Andrej Karpathy]] — graphify cites his `/raw` workflow as motivation
- [[Skills]] — the canonical example of a 15-platform-portable skill; always-on rule + explicit-trigger duality
- [[Hooks]] — PreToolUse rule injection (vs RTK's compression, vs claude-mem's PostToolUse compression)
- [[Agentic Search vs RAG]] — multimodal AST-graph (papers + images + video, not just code)
- [[Token Efficiency]] — 71.5x reduction worked example for cross-corpus knowledge graphs
- [[Reducing Hallucinations]] — EXTRACTED / INFERRED / AMBIGUOUS as a calibrated-confidence pattern
- [[Second Brain]] / [[Memex]] — graphify operationalizes the second-brain pattern with confidence-tagged extraction
- [[GitNexus (abhigyanpatwari)]] / [[code-review-graph (tirth8205)]] — kindred AST-graph projects (code-only); graphify is the multimodal cousin
- [[Model Context Protocol]] — `python -m graphify.serve` MCP mode

## Open questions

> [!question] Wiki self-reference
> graphify could be run on this very vault. Worth a try — would it surface the wikilink-graph topology that Obsidian already visualizes, or add semantic similarity edges that wikilinks miss?
