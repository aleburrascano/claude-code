---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, mcp, knowledge-graph, token-efficiency, tree-sitter, code-search]
source_path: raw/repos/tirth8205-code-review-graph.md
source_date: 2026-04-26
source_author: tirth8205
source_url: https://github.com/tirth8205/code-review-graph
license: MIT
---

# code-review-graph (tirth8205)

A **local knowledge graph for codebases** that gives Claude Code precise context via [[Model Context Protocol|MCP]]. Built with Tree-sitter for AST parsing; SQLite for storage; 28 MCP tools exposed. Cross-platform (Codex, Claude Code, Cursor, Windsurf, Zed, Continue, OpenCode, Antigravity, Qwen, Qoder, Kiro).

For our wiki, this source is **directly on-point for [[Token Efficiency]]** with concrete benchmark numbers, and offers a **third position** in the [[Agentic Search vs RAG]] debate: structured AST-based search.

## Headline claim — token efficiency at scale

| Repo | Avg Naive Tokens | Avg Graph Tokens | Reduction |
|---|---|---|---|
| express | 693 | 983 | 0.7× |
| fastapi | 4,944 | 614 | **8.1×** |
| flask | 44,751 | 4,252 | **9.1×** |
| gin | 21,972 | 1,153 | **16.4×** |
| httpx | 12,044 | 1,728 | **6.9×** |
| nextjs | 9,882 | 1,249 | **8.0×** |
| **Average** | | | **8.2×** |

Plus a Next.js monorepo example: **27,732 files funnelled down to ~15 actually read** = 49× reduction.

The express anomaly (<1×) is honestly disclosed: for trivial single-file changes in small packages, graph context (metadata, edges, review guidance) can exceed raw file size. **Pays off on multi-file changes in larger codebases.**

## Architecture

```
Repository → Tree-sitter Parser → SQLite Graph → Blast Radius → Minimal Review Set
```

- **Tree-sitter AST parsing** — functions, classes, imports, call sites, inheritance, test detection
- **Graph storage** — nodes (functions/classes/imports) + edges (calls/inheritance/test coverage)
- **SQLite** — local; no cloud dependency
- **Incremental updates** — file-edit and git-commit hooks; SHA-256 diffs find only changed files; **2,900-file project re-indexes in <2 seconds**

## Blast-radius analysis (the central technique)

When a file changes, the graph traces every caller, dependent, and test that could be affected. Claude reads only those files — not the whole project.

**Impact accuracy: 100% recall, 0.54 average F1.** Conservative trade-off: flags too many files rather than miss a broken dependency. **Never misses an actually impacted file.**

This is the same shape as [[claudekit (Carl Rannaberg)|claudekit's `codebase-map`]] hook, but at a much higher fidelity — call-graph-aware rather than file-list aware.

## 28 MCP tools

A few of the highest-leverage:

- `get_minimal_context_tool` — ultra-compact context (~100 tokens) — **call this first**
- `get_impact_radius_tool` — blast radius of changed files
- `get_review_context_tool` — token-optimized review context with structural summary
- `query_graph_tool` — callers, callees, tests, imports, inheritance queries
- `traverse_graph_tool` — BFS/DFS from any node with **token budget** parameter
- `semantic_search_nodes_tool` — vector embeddings (optional)
- `detect_changes_tool` — risk-scored change impact for code review
- `get_hub_nodes_tool` — most-connected nodes (architectural hotspots)
- `get_bridge_nodes_tool` — chokepoints via betweenness centrality
- `get_knowledge_gaps_tool` — untested hotspots, structural weaknesses
- `get_surprising_connections_tool` — unexpected cross-community coupling
- `get_suggested_questions_tool` — auto-generated review questions

Plus 5 MCP **workflow prompts**: `review_changes`, `architecture_map`, `debug_issue`, `onboard_developer`, `pre_merge_check`.

### Tool filtering (relevant to [[Token Efficiency|the <80 tools rule]])

Per [[Boris Cherny Tips Compendium|Boris]] / [[Everything Claude Code (affaan-m)|ECC]]: keep MCP tools under 80. With 28 tools by default, code-review-graph approaches half that budget alone. The author addresses this:

```bash
code-review-graph serve --tools query_graph_tool,semantic_search_nodes_tool,detect_changes_tool
# or via env var
CRG_TOOLS=query_graph_tool,semantic_search_nodes_tool code-review-graph serve
```

This `--tools` filtering pattern is a **good MCP server design choice** worth lifting. Most MCP servers force you to enable all-or-nothing.

## Where this sits in [[Agentic Search vs RAG|the agentic-search vs RAG debate]]

A **third position**, not a binary:

| Approach | What it indexes | Latency | Fragility | Cache impact |
|---|---|---|---|---|
| **Pure agentic** (`grep` + `glob`) | Nothing pre-built | Per-query | Low | Cache-friendly |
| **Vector RAG** | Embedding index | Pre-built | High (drifts) | Heavy upfront |
| **AST graph** (this) | Structural (calls/imports/inheritance) | Pre-built (incremental) | Medium (auto-updates) | TBD |

Boris Cherny rejected RAG for code because vector indexes drift and permissions are complex. **AST graphs address both objections**:
- **Drift** — incremental updates on every git commit; <2-second re-index
- **Permissions** — local SQLite respects file-system access; no separate index

The remaining objection: **structural similarity isn't the same as semantic relevance**. Function call edges tell you what's connected, not what's *meaningful* to read. The headline 8.2× number suggests this matters less than you might think for code review tasks.

For our wiki: AST graph is **complementary, not replacement**. Use grep + glob for ad-hoc exploration; use code-review-graph (or similar) for planned reviews where blast-radius matters.

## Directly relevant to other wiki areas

### [[Memory]] / [[Skills]]
- **Knowledge gap analysis** — identifies isolated nodes, untested hotspots, thin communities
- **Wiki generation** — auto-generates markdown wiki from community structure (interesting parallel to this very wiki)
- **Memory loop** — persists Q&A results as markdown for re-ingestion; **the graph grows from queries**

The "memory loop" is conceptually adjacent to [[Continuous Learning]] — except instead of learning skills from sessions, it learns *graph-relevant context* from queries.

### [[Subagents]]
- 5 MCP prompt templates designed for specific workflows
- Auto-generated suggested questions from graph analysis (bridges, hubs, surprises)
- Could feed into [[claudekit (Carl Rannaberg)|claudekit's 6-aspect parallel review]] as the "what to read" filter

### [[Hooks]]
- Auto-update hooks on file edit + git commit
- Multi-repo daemon (`crg-daemon`) for editors without hook support

### [[Plugins]]
- Slash commands: `/code-review-graph:build-graph`, `/review-delta`, `/review-pr`
- Note the namespacing — follows [[Plugins|Anthropic's plugin namespacing convention]]

## Compatibility with this wiki

Three notable connections to **the wiki itself**:

1. **Obsidian export format** — `code-review-graph visualize --format obsidian` exports as Obsidian vault with wikilinks. Could literally generate cross-references compatible with this wiki's wikilink format.

2. **Wiki generation from communities** — `code-review-graph wiki` auto-generates a markdown wiki from detected code communities. Conceptually the same shape as this wiki's source/concept/topic structure but for code.

3. **D3.js force-directed graph view** — analogous to Obsidian's graph view. The "see the shape of your codebase" framing parallels "see the shape of your knowledge."

For Alessandro: if you ever want a code-side knowledge graph that matches the substrate of this knowledge wiki, code-review-graph's Obsidian export is a natural integration point.

## Honest limitations (from the README)

The author flags these explicitly — worth respecting:

- **Small single-file changes** — graph context can exceed naive file reads for trivial edits
- **Search quality (MRR 0.35)** — keyword search finds right result in top-4 most queries, but ranking needs work
- **Flow detection (33% recall)** — only reliable for Python entry points (fastapi, httpx); JavaScript and Go need work
- **Precision vs recall trade-off** — deliberately conservative; some false positives in large dependency graphs

## Installation

```bash
pip install code-review-graph     # or: pipx install code-review-graph
code-review-graph install          # auto-detects platform, configures MCP
code-review-graph build            # initial parse (~10s for 500 files)
```

Requires Python 3.10+. Recommends `uv` for best experience.

## My assessment

For Alessandro's focus areas, code-review-graph is uniquely well-positioned:

1. **Token efficiency with measurable numbers.** 8.2× average reduction is concrete. Pair with [[Thariq - Prompt Caching Is Everything|Thariq's prompt-caching framing]] — code-review-graph reduces *what you ask Claude to read*; prompt caching reduces *what you re-send*. Different layers; multiplicative.

2. **MCP design done well.** 28 tools is a lot, but `--tools` filtering respects the <80-tools discipline. The 5 workflow prompts are genuinely useful templates. Worth studying as MCP server design.

3. **Third position in the agentic search debate.** AST graphs sit between grep and vector RAG. Boris's "agentic search > RAG" is true for ad-hoc exploration; code-review-graph's blast-radius is true for planned reviews. **Both, not either.**

4. **Cross-platform with explicit Claude Code support.** First-class plugin install (`code-review-graph install --platform claude-code`) means low setup friction.

Caveats:
- The 28-tool default is heavy. Use `--tools` filtering even for trial setups.
- Express benchmark <1× is honestly disclosed but a real weakness for trivial edits.
- Flow detection is Python-strong, JavaScript/Go-weak. Calibrate expectations by language.

For Alessandro: this is the **strongest "structural-context-as-MCP-tool" reference** in the wiki. If your work is heavy on code review or large-codebase navigation, worth installing. If it's mostly small edits, the overhead may not pay off.

Cross-references: [[Token Efficiency]] · [[Agentic Search vs RAG]] · [[Model Context Protocol]] · [[Hooks]] · [[Plugins]] · [[Subagents]] · [[Memory]] · [[Continuous Learning]] · [[Claude Code Ecosystem]]
