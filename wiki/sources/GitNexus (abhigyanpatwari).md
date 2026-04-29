---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 4
tags: [claude-code, mcp, hooks, ast-graph, knowledge-graph, token-efficiency, multi-repo, tree-sitter]
source_path: raw/repos/abhigyanpatwari-gitnexus.md
source_date: 2026-04-27
source_author: Abhigyan Patwari (Akon Labs)
source_url: https://github.com/abhigyanpatwari/GitNexus
license: open source (commercial / enterprise tiers via akonlabs.com)
---

# GitNexus (abhigyanpatwari)

> "Building nervous system for agent context."

GitNexus indexes a codebase into a Tree-sitter AST → graph database, then exposes it through MCP tools so AI agents stop missing dependencies. It is the **second AST-graph project** the wiki has ingested, alongside [[code-review-graph (tirth8205)]] — together they make AST-graphs a *category* in the [[Agentic Search vs RAG]] debate, not just a single example.

The differentiating bets vs code-review-graph: **multi-repo registry**, **fully-browser web UI** (WASM Tree-sitter + WASM LadybugDB), **process tracing** (entry-point execution flows), **community detection** (Leiden), **auto-installed Pre+Post hooks**, **enterprise SaaS layer** (akonlabs.com).

## Architecture (from ARCHITECTURE.md + RUNBOOK.md)

Monorepo: `gitnexus/` (CLI + MCP + HTTP API + ingestion + LadybugDB), `gitnexus-web/` (Vite + React WASM client), `gitnexus-shared/` (TS types).

**Twelve-phase pipeline** orchestrated by `runFullAnalysis()` builds a single `KnowledgeGraph` in memory: scan → structure → markdown/COBOL extraction → tree-sitter parsing (~20 MB chunks via worker pool) → import resolution → call-graph → heritage → constructor inference → community detection (Leiden) → process detection → search index → embeddings (optional). Phases mutate the same accumulator instance — the design rationale is **explicit topological dependency over hidden coupling**.

**Storage**: LadybugDB (the embedded graph DB formerly known as KuzuDB; vector-capable, SQLite-style native binding). 44 node-type tables + a unified `CodeRelation` edge table. Index lives in `.gitnexus/` inside the repo (gitignored, portable). A global registry at `~/.gitnexus/registry.json` lists every indexed repo.

**Multi-repo via "Contract Bridge"**: `repo: "@<groupName>"` on MCP tools fans out across repo boundaries; `query` merges results with **Reciprocal Rank Fusion**; `impact` traces blast radius cross-repo. A `contracts.json` registry documents provider/consumer relationships across services — addresses monorepo-and-microservices coordination explicitly.

## What the AI agent gets via MCP

**16 tools** (11 per-repo + 5 group): `list_repos`, `query` (BM25 + semantic + RRF), `context` (360° symbol view), `impact` (blast radius with confidence), `detect_changes` (git-diff impact mapping), `rename` (graph + text-search coordinated), `cypher` (raw graph queries), plus `group_*` for cross-repo work.

**7 MCP resources**: `gitnexus://repos`, `.../context`, `.../clusters`, `.../cluster/{name}`, `.../processes`, `.../process/{name}`, `.../schema`.

**2 MCP prompts**: `detect_impact` (pre-commit change analysis), `generate_map` (architecture docs with mermaid).

**4 prebuilt skills** auto-installed to `.claude/skills/`: Exploring, Debugging, Impact Analysis, Refactoring.

**Repo-specific generated skills** (`gitnexus analyze --skills`): Leiden community detection identifies functional areas; one `SKILL.md` is generated per area with key files, entry points, execution flows, and cross-area connections. **This is skill auto-generation from graph topology** — a pattern worth promoting in [[Skills]].

## Claude Code hooks (Pre + Post)

This is the wiki-relevant pattern. `gitnexus claude install` registers two hooks:

- **PreToolUse** — fires before every Glob/Grep call. Injects: *"Knowledge graph exists. Read GRAPH_REPORT / use `query` / `context` tools before searching raw files."* The agent navigates by structure instead of grep-scanning.
- **PostToolUse** — fires after commits. Detects stale index by comparing changed files against the indexed snapshot; prompts the agent to reindex if drift exceeds threshold.

This generalizes the [[Hooks|hooks-as-token-efficiency-lever]] pattern beyond compression. RTK and claude-mem use hooks for **compression** (Pre rewrites, Post compresses). GitNexus uses hooks for **context injection** (Pre injects graph awareness) and **freshness/maintenance** (Post detects stale state). Same primitive (turn-boundary deterministic transform), different objectives.

## Languages

Tree-sitter coverage across **14 languages** with capability matrix per language: TypeScript / JavaScript / Python / Java / Kotlin / C# / Go / Rust / PHP / Ruby / Swift / C / C++ / Dart. Capabilities tracked per language: imports, named bindings, exports, heritage, type annotations, constructor inference (with `self`/`this` resolution), config files, framework detection, entry point scoring.

## Web UI (browser-only)

`gitnexus.vercel.app` — drag-and-drop a ZIP, get a graph in-browser. WASM Tree-sitter + WASM LadybugDB + transformers.js (WebGPU/WASM) + Sigma.js + Graphology. No code uploaded. **Bridge mode**: `gitnexus serve` makes a local HTTP server that the web UI auto-detects, exposing all CLI-indexed repos to the browser without re-upload.

## Operational guardrails (from GUARDRAILS.md)

The repo ships explicit safety rules for AI agents working *on* GitNexus itself, but they generalize:

1. Never commit secrets (API keys, tokens, real `.env`).
2. Use `dry_run: true` on rename / find-replace — review before commit.
3. Run impact analysis before editing shared symbols (HIGH/CRITICAL warnings escalate to humans).
4. Run `detect_changes` pre-commit to verify diffs align with indexed code.
5. Preserve embeddings: `--drop-embeddings` is intentional, never silent.

These are a clean **LLM-on-its-own-codebase guardrail template** worth referencing in [[Reducing Hallucinations]] alongside [[Karpathy Coding Principles]].

## Recovery patterns (from RUNBOOK.md)

Stale index → `gitnexus analyze` (or `--force` for full rebuild). Embedding loss → check `stats.embeddings` in `.gitnexus/meta.json`; re-pass `--embeddings` (skipping the flag silently drops vectors). Database lock → only one process should open `.gitnexus/lbug` at a time; stop the contender. Memory exhaustion on huge repos → skip embeddings or analyze sub-paths.

## Supply chain

Docker images dual-published to GHCR + Docker Hub from the same build (identical digest, identical Cosign signature). Cosign keyless signing tied to the GitHub OIDC identity of the repo's `docker.yml` workflow on `v*` tags. Build provenance + SBOM attestations. A bundled `ClusterImagePolicy` enforces signature verification at Kubernetes admission via the Sigstore policy-controller. **This is the most rigorous supply-chain posture seen in the wiki** — worth flagging when comparing CC ecosystem tooling.

## Cross-references

- [[code-review-graph (tirth8205)]] — kindred AST-graph project; differs on UI (CLI-only), DB (SQLite), scope (single-repo)
- [[Agentic Search vs RAG]] — third position in the binary debate, now with two representatives → category
- [[Token Efficiency]] — "Precomputed Relational Intelligence": tools precompute clustering / tracing / scoring at index time; agent gets complete context in one MCP call instead of 4+ Cypher queries
- [[Hooks]] — Pre+Post pattern for context injection and freshness (vs compression)
- [[Skills]] — auto-generation of repo-specific skills from Leiden communities
- [[Model Context Protocol]] — deep-dive example with 16 tools + 7 resources + 2 prompts
- [[Claude Code Ecosystem]] — codebase-context / structural-search subsection
- [[Reducing Hallucinations]] — calibrated confidence on impact edges; GUARDRAILS.md template

## Open questions

> [!question] Cost of LadybugDB transition
> LadybugDB was formerly KuzuDB. Vector support inside the embedded DB is the bet — but it requires explicit `--embeddings` flag and silent loss on subsequent runs without it (RUNBOOK.md flags this). Operational sharp edge.

> [!question] Process detection across languages
> Process detection works "from entry points through call chains" but the entry-point heuristics differ per language (the matrix shows ✓ for all 14, but the heuristic quality probably varies). Worth checking on a real polyglot repo.
