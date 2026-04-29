---
type: person
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [people, practitioner, mcp, ast-graph, knowledge-graph, akon-labs]
---

# Abhigyan Patwari

Founder of **Akon Labs** (`akonlabs.com`); creator of [[GitNexus (abhigyanpatwari)|GitNexus]]. One of the wiki's three foundational AST-graph contributors (alongside [[Tirth|Tirth (code-review-graph)]] and [[Safi Shamsi]] of graphify).

For our wiki, Abhigyan matters because GitNexus is **the most exhaustive single-MCP server reference** the wiki tracks — 16 tools + 7 resources + 2 prompts demonstrating all four MCP primitives in production, plus a multi-repo registry pattern that no other wiki source matches.

## Key contributions

### Multi-repo MCP architecture

Most AST-graph servers are single-repo. GitNexus's architecture (12-phase pipeline + single-graph accumulator + RRF for cross-repo retrieval) lets one MCP server serve any number of indexed codebases. Solves the enterprise reality that "the codebase" is actually 15+ services across 5+ teams. See `ARCHITECTURE.md` deep-dive in [[GitNexus (abhigyanpatwari)]].

### Hooks for freshness (PostToolUse stale-index detection)

A novel hook objective the wiki names: **freshness**. GitNexus's PostToolUse hook fires after commits, compares changed files against the indexed snapshot, and prompts the agent to reindex if drift exceeds threshold. Generalizes: hooks can keep derived state coherent without touching agent logic. See [[Hooks#Freshness as a hook objective]].

### Skill auto-generation from graph topology

Leiden community detection on the call graph produces SKILL.md per functional area. **Skills as derivative of codebase structure, not handwritten.** A new design pattern for how skills can come into being. See [[Skills]].

### LLM-on-its-own-codebase guardrails

`GUARDRAILS.md` codifies the discipline of "what to do when the LLM is editing the same codebase that powers it." Calibrated confidence scores on impact edges (0-1 with `minConfidence` filtering); rename operations split into `graph_edits` (high confidence) vs `text_search_edits` ("review carefully"). Foundational for [[Reducing Hallucinations]] (defense #15).

### Enterprise distribution

`akonlabs.com` runs the SaaS + self-hosted commercial layer. The OSS GitNexus is the primary surface; enterprise is for teams that need managed multi-repo registries.

## Why this matters for our wiki

Abhigyan's contributions span [[Model Context Protocol|MCP]] design, [[Hooks|hooks]] design, [[Skills|skill]] generation, and [[Reducing Hallucinations|hallucination defense]]. GitNexus is the single most cross-cutting source in the wiki — it touches more focus areas than any other single project.

For [[Token Efficiency]]: GitNexus is one of three [[Token Efficiency#11 AST-based structural context via MCP|AST-graph projects]] that deliver order-of-magnitude token reduction by structuring what the agent reads.

## Cross-references

- [[GitNexus (abhigyanpatwari)]] — the canonical source page
- [[Model Context Protocol]] (most-exhaustive MCP reference)
- [[Hooks]] (freshness pattern; LLM-on-own-codebase guardrails)
- [[Skills]] (skill auto-generation from graph topology)
- [[Reducing Hallucinations]] (calibrated-confidence defense layer)
- [[Agentic Search vs RAG]] (AST-graph as third position)
- [[Token Efficiency]] (AST graphs as compression layer 2)
