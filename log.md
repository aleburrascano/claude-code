# Log

Append-only chronological record of wiki operations. Each entry header is `## [YYYY-MM-DD] <op> | <title>` so entries are grep-able.

Operations: `ingest`, `query`, `lint`, `schema-change`, `manual`.

---

## [2026-04-26] schema-change | Wiki bootstrapped
- Created: `CLAUDE.md`, `index.md`, `log.md`
- Created folders: `raw/{notes,articles,assets}/`, `wiki/{sources,concepts,people}/`
- Notes: Initial instantiation of the [[LLM Wiki Idea]] pattern in this vault. Schema defines three layers (raw/wiki/schema), folder layout, page/frontmatter/wikilink conventions, and ingest/query/lint workflows.

## [2026-04-26] ingest | LLM Wiki Idea
- Source: `raw/notes/LLM Wiki Idea.md` (placed there as the inaugural source — the pattern document for this entire wiki)
- Created: [[LLM Wiki Idea]] (source page), [[Second Brain]], [[Memex]], [[Vannevar Bush]]
- Updated: [[index]]
- Notes: Demonstration ingest. Ran end-to-end without the usual "discuss takeaways first" pause, since Alessandro asked to see the full flow. Future ingests should pause for discussion before page-writing per the schema. Bush's page is intentionally narrow — only the Memex thread is sourced; flagged for expansion when a broader source arrives.

## [2026-04-26] schema-change | Focus section + raw/repos/ subfolder
- Updated: [[CLAUDE]] — added a Focus section declaring the wiki's purpose (mastering Claude Code) and the priority topics (skills, context engineering, token efficiency, reasoning, hallucination reduction, subagents, hooks, MCP). Lower-priority topics (status lines, IDE integrations, alt clients, single-language CLAUDE.md showcases, generic usage monitors) explicitly down-weighted.
- Updated: [[CLAUDE]] folder layout — added `raw/repos/` subfolder for GitHub repository README clippings.
- Created folders: `raw/repos/`, `wiki/topics/`
- Notes: Schema change captures Alessandro's stated goal so future sessions inherit the lens. Topic / synthesis pages in `wiki/topics/` are now identified as the wiki's primary deliverable layer.

## [2026-04-26] ingest | 4 Claude Code repos (web-clipped) + 10 deep-dive READMEs
- Sources (raw, in `raw/repos/`):
  - `forrestchang-andrej-karpathy-skills.md`
  - `mattpocock-skills.md`
  - `luongnv89-claude-howto.md`
  - `hesreallyhim-awesome-claude-code.md`
- Sources (deep-dives via WebFetch, no raw file — captured in source pages directly):
  - NeoLabHQ/context-engineering-kit
  - aipatternbook.com (Wolf McNally)
  - Piebald-AI/claude-code-system-prompts
  - obra/superpowers
  - carlrannaberg/claudekit
  - EveryInc/compound-engineering-plugin
  - diet103/claude-code-infrastructure-showcase
  - glittercowboy/taches-cc-resources
  - shareAI-lab/learn-claude-code
  - ykdojo/claude-code-tips
- Created — 14 source pages: [[Andrej Karpathy Skills (forrestchang)]], [[Matt Pocock Skills]], [[Claude HowTo (luongnv89)]], [[Awesome Claude Code (hesreallyhim)]], [[Context Engineering Kit (NeoLabHQ)]], [[Encyclopedia of Agentic Coding Patterns]], [[Claude Code System Prompts (Piebald)]], [[Superpowers (obra)]], [[claudekit (Carl Rannaberg)]], [[Compound Engineering Plugin]], [[Claude Code Infrastructure Showcase (diet103)]], [[TACHES Claude Code Resources]], [[Learn Claude Code (shareAI-lab)]], [[Claude Code Tips (ykdojo)]]
- Created — 12 primitive concept pages: [[Claude Code]], [[Skills]], [[Subagents]], [[Slash Commands]], [[Hooks]], [[Model Context Protocol]], [[Plugins]], [[Memory]], [[Checkpoints]], [[Planning Mode]], [[Extended Thinking]], [[Output Styles]]
- Created — 6 pattern concept pages: [[Karpathy Coding Principles]], [[Ralph Wiggum Technique]], [[Spec-Driven Development]], [[Vertical Slice]], [[Compound Engineering]], [[Test-Driven Development with Claude]]
- Created — 7 topic / synthesis pages: [[Getting the Most from Claude Code]], [[Token Efficiency]], [[Context Engineering]], [[Reducing Hallucinations]], [[Skill Building]], [[When to Delegate to Subagents]], [[Claude Code Ecosystem]]
- Created — 5 people pages: [[Andrej Karpathy]], [[Matt Pocock]], [[Boris Cherny]], [[Jesse Vincent]], [[Wolf McNally]]
- Updated: [[index]] (full rebuild)
- Notes: Phase 1 + Phase 2 executed in one pass per Alessandro's green-light. Two minor process bugs caught during execution: topic pages and one people page were initially written to `topics/` and `people/` at root instead of `wiki/topics/` and `wiki/people/` — caught and `mv`'d before the index rebuild. Process improvement for next ingest: be explicit about the `wiki/` prefix in Write paths.
- Cross-cutting threads surfaced for future deep-dive: `/common-ground` command (Fullstack Dev Skills), Boris Cherny's X-thread workflow (worth fetching), Output Styles mechanism (under-documented in current sources — flagged in [[Output Styles]] for future research).
- Lower-priority: ContextKit, Claude Code PM, Claude Code Templates, Trail of Bits Security Skills — noted in [[Claude Code Ecosystem]] but not deep-dived this round.

## [2026-04-26] ingest | Round 3: 4 new repos + 25 deep-dive fetches + closed deferred work
- Sources (raw, in `raw/repos/`):
  - `shanraisshan-claude-code-best-practice.md` — comprehensive hub repo
  - `affaan-m-everything-claude-code.md` — performance optimization framework, 140k stars
  - `dair-ai-Prompt-Engineering-Guide.md` — meta prompt-engineering reference
  - `thedotmack-claude-mem.md` — persistent memory plugin
- Sources (deep-dive WebFetches): 25 in two waves
  - Boris Cherny tip docs: 13 tips (Jan), 10 tips (Feb), 12 tips (Feb), 2 tips Code Review (Mar), 2 tips Squash Merging (Mar), 15 tips (Mar), 6 tips Opus 4.7 (Apr) — closed the deferred Boris work
  - Thariq tip docs: Skills (Mar), Session/1M (Apr) — closed the deferred Anthropic-engineer work
  - Workflow repos: BMAD-METHOD, Get Shit Done (gsd-build), OpenSpec, oh-my-claudecode, gstack, Claude Code PM (ccpm)
  - HumanLayer 12 Factor Agents
  - Daniel Rosehill repos index
  - shanraisshan claude-code-hooks (covered in shanraisshan source page; no separate page)
  - jeffallan claude-skills (with /common-ground) — closed deferred work
  - Spec Kit (github) — closed deferred work
  - ContextKit (Cihat Gündüz) — closed deferred work
  - Claude Code Templates (Daniel Avila) — closed deferred work
  - Trail of Bits Security Skills — closed deferred work
  - Anthropic official docs: Skills, Memory, Permission Modes (Auto Mode), Sandboxing, Best Practices, Agent SDK, Output Styles — closed deferred Output Styles work
  - promptingguide.ai sub-pages: Chain-of-Thought, Tree of Thoughts, ReAct, Self-Consistency, Adversarial Prompting, RAG
- Created — 16 new source pages: [[shanraisshan Claude Code Best Practice]], [[Everything Claude Code (affaan-m)]], [[Prompt Engineering Guide (dair-ai)]], [[claude-mem (thedotmack)]], [[Boris Cherny Tips Compendium]], [[Thariq Anthropic Skills + Sessions]], [[jeffallan claude-skills]], [[Spec Kit (github)]], [[ContextKit (Cihat Gunduz)]], [[Claude Code Templates (Daniel Avila)]], [[Trail of Bits Security Skills]], [[HumanLayer]], [[BMAD-METHOD]], [[Get Shit Done (gsd-build)]], [[OpenSpec (Fission-AI)]], [[oh-my-claudecode]], [[gstack (Garry Tan)]], [[Claude Code PM (ccpm)]], [[12 Factor Agents (HumanLayer)]], [[Claude Code Repos Index (Daniel Rosehill)]]
- Created — 8 new concept pages: [[Auto Mode]], [[Sandboxing]], [[Test Time Compute]], [[Continuous Learning]], [[Agentic Search vs RAG]], [[Verification Loops]], [[Routines]], [[Iterative Retrieval]], [[Prompt Engineering Techniques]]
- Major rewrites: [[Output Styles]] (now full Anthropic-docs coverage; removed "Unverified" callouts), [[Skills]] (Thariq's 9 categories + 9 principles + full Anthropic docs), [[Memory]] (full Anthropic docs including .claude/rules/, Auto Memory, AGENTS.md handling)
- Created — 5 new people pages: [[Affaan Mustafa]], [[Thariq]], [[shanraisshan]], [[Daniel Rosehill]], [[Garry Tan]]
- Major expansion: [[Boris Cherny]] (7 compiled tip docs, full opinions catalog)
- Major updates: [[Claude Code]] (15+ new "Hot" features added), [[Claude Code Ecosystem]] (10-workflow comparison table, 8+ new entries), [[Token Efficiency]] (context rot zones, MCP <80 rule, 6 new techniques), [[Reducing Hallucinations]] (Test Time Compute, 12 Factor principles, Auto Mode + Sandboxing), [[Subagents]] (Test Time Compute reframing)
- Notes: Per Alessandro's directive ("don't defer anything; visit every link possible; make the best knowledge base possible"), this round closed all deferred work from Round 2 PLUS deep-dived all major workflow alternatives + Anthropic official docs + canonical prompt engineering techniques. Wiki now at **82 pages** total.
- Process notes: Used Edit tool extensively for in-place updates. Re-read existing files before editing (caught initial Edit-without-Read errors and corrected). Total this round: ~30 new pages + ~10 major page updates + ~25 WebFetch operations.
- Cross-cutting threads surfaced: **all 10 major workflow frameworks converge on Research → Plan → Execute → Review → Ship** (load-bearing pattern). **Test Time Compute** (Boris's Mar 10 insight) reframes subagents as cognitive diversity engines, not just cost optimizers. **Verification loops** named by both Boris (2-3x quality multiplier) and Anthropic best-practices ("single highest-leverage thing"). **MCP <80 tools, <10 servers** discipline confirmed by Boris + ECC. **Context rot at 300-400k tokens on 1M model** (Thariq) gives operational thresholds.
- Still deferred (low priority): some minor concept-page updates (Hooks event-type expansion, SDD with Spec Kit constitution detail, Skill Building with Thariq's 9 categories cross-link), AB Method, Claude CodePro, RIPER, Simone, The Agentic Startup. Worth a future lint pass.

## [2026-04-26] ingest+lint | Round 4: close-out — deferred work + research papers + X attempts + structural lint
- **Goal**: close session with no unchecked tasks per Alessandro's directive ("just want to close it off, so coming days when I find more articles or repos I just go at it without worrying about anything left unfinished").
- Wave D-1 fetches (12, all succeeded): Anthropic official docs (Subagents, Hooks, Plugins, Checkpointing) + Auto Mode blog/engineering deep-dive + workflow repos (AB Method, Claude CodePro/Pilot Shell, RIPER, Simone, The Agentic Startup, HCOM).
- Wave D-2 fetches (12 attempted, 9 succeeded, 3 X auth failures): TDD Guard, claude-code-tools, parry-guard, Dippy, Diwank Field Notes, Anthropic Quickstarts, Anthropic GitHub Action, Prompt Engineering Papers Reference. **X URLs returned 402 (auth required)**: Karpathy autonomous research, Thariq "Seeing like an Agent", Thariq "Prompt Caching Is Everything".
- **Karpathy tweet closed by user paste**: Alessandro pasted full Karpathy Dec 2025 tweet content. Saved to `raw/notes/Karpathy LLM Coding Notes.md`; written up as [[Karpathy LLM Coding Notes (Dec 2025)]] source page; [[Andrej Karpathy]] page significantly expanded with full context.
- **Thariq auth deferred**: 2 Thariq guides (Seeing like an Agent + Prompt Caching) need authentication AND contain images. Surfaced to Alessandro at session end — see "Open question for next session" below.
- Created — 16 source pages: [[AB Method]], [[Pilot Shell (formerly Claude CodePro)]], [[RIPER Workflow (Tony Narlock)]], [[Simone (Helmi)]], [[The Agentic Startup (Rudolf Schmidt)]], [[HCOM (Claude Hook Comms)]], [[TDD Guard (Nizar Selander)]], [[claude-code-tools (Prasad Chalasani)]], [[parry-guard (Dmytro Onypko)]], [[Dippy (Lily Dayton)]], [[Karpathy LLM Coding Notes (Dec 2025)]], [[Diwank Field Notes]], [[Anthropic Claude Quickstarts]], [[Anthropic Claude Code GitHub Action]], [[Prompt Engineering Papers Reference]]
- Major concept-page updates (richer content from Anthropic docs):
  - [[Subagents]] — added persistent memory, isolation: "worktree", skills preloaded into subagents, agent teams distinction
  - [[Hooks]] — full 27+ event taxonomy, 5 handler types (command/http/mcp_tool/prompt/agent), JSON input/output contract, exit code semantics (exit 2 blocks not 1), claude-mem 5-hook reference pattern
  - [[Plugins]] — full plugin.json schema, marketplace.json, namespacing, standalone vs plugin, --plugin-dir for development, "what plugins cannot distribute" (rules)
  - [[Checkpoints]] — 30-day cleanup, bash changes NOT tracked, external changes NOT tracked, restore vs summarize distinction
  - [[Auto Mode]] — engineering deep-dive: two-layer defense (transcript classifier + prompt-injection probe), two-stage pipeline, 8.5%/0.4%/6.6%/17% metrics, stripping decision (classifier never sees agent reasoning), 93% prompt-approval-rate problem, configurable trusted infrastructure
- Lint deferred items (now done):
  - [[Skill Building]] — added Thariq's 9 categories as design-time check, mapped to two-archetype framing
  - [[Spec-Driven Development]] — added Spec Kit constitution-first detail; added 9 more workflow framework references (BMAD, GSD, OpenSpec, oh-my-claudecode, ContextKit, AB Method, Agentic Startup, RIPER, Pilot Shell); added clarify-as-gate detail
  - [[Andrej Karpathy]] — significantly expanded with full Dec 2025 notes context
- Final: index.md rebuilt to **97-page state** (49 sources, 29 concepts, 7 topics, 11 people).
- **Wiki at 97 pages.**
- Session summary: 4 ingest rounds total. Round 1: schema + 4 source pages. Round 2: 14 source pages + 12 primitive concepts + 6 patterns + 7 topics + 5 people. Round 3: 16 sources + 9 concepts + Output Styles/Skills/Memory rewrites + 5 people + Boris expansion. Round 4 (this): 16 sources + 5 major concept updates + Skill Building + SDD + 4 page updates + index/log close-out.

## Open question for next session

**Authentication for Thariq guides on X.com**:
- "Lessons from Building Claude Code: How We Use Skills" (17 Mar 2026) — covered in summarized form via [[Thariq Anthropic Skills + Sessions]] but the original article has additional context + images
- "Seeing like an Agent — lessons from building Claude Code" (28 Feb 2026) — referenced but not yet ingested
- "Lessons from Building Claude Code: Prompt Caching Is Everything" (20 Feb 2026) — referenced but not yet ingested

These require X authentication (WebFetch returned 402). Strategy options for next session:
1. **User pastes** (as done with Karpathy) — fastest path. Alessandro can copy-paste the article text; this Claude session writes up source pages.
2. **Authenticated fetch** — would require setting up auth (X Premium API access, or browser extension to copy auth cookies). Higher friction.
3. **Skip / use what's already in [[Thariq Anthropic Skills + Sessions]]** — the consolidated source page captures the substance via shanraisshan's compilation.

Recommended: **Option 1 (paste)** when Alessandro has 5 minutes. Karpathy pattern worked well.

## [2026-04-26] ingest | Thariq articles closed (web-clipper paste)
- **Closed the open Thariq question.** Alessandro used Obsidian Web Clipper for 2 of the 3 articles:
  - "Seeing like an Agent" (28 Feb 2026)
  - "Prompt Caching Is Everything" (20 Feb 2026)
- (The third Thariq article — "Lessons from Building Claude Code: How We Use Skills" — was already covered in summarized form via [[Thariq Anthropic Skills + Sessions]].)
- Raw files moved: `raw/articles/Thariq - Seeing like an Agent.md`, `raw/articles/Thariq - Prompt Caching Is Everything.md`
- Created — 2 source pages: [[Thariq - Seeing like an Agent]] (action space + tool design philosophy), [[Thariq - Prompt Caching Is Everything]] (architectural foundation)
- Major updates to existing pages:
  - [[Token Efficiency]] — added prompt caching as architectural foundation (the FIRST principle now); cache-breaking mistakes; messages-over-system-prompt-edits; cache-safe state transitions; cache hit rate as leading indicator
  - [[Planning Mode]] — added the EnterPlanMode/ExitPlanMode-as-tools design (state-as-tools, not state-as-config)
  - [[Agentic Search vs RAG]] — added Thariq's full engineering account of why CC abandoned vector DB
  - [[Hooks]] — added the `<system-reminder>` cache-preserving pattern; warning against system-prompt-edit hooks
  - [[Subagents]] — added cache-preserving model switching pattern (Opus → Haiku via subagent handoff)
  - [[Thariq]] — significantly expanded with both new articles' contributions
- Final: index.md updated to **99-page state** (51 sources, 29 concepts, 7 topics, 11 people).
- **All deferred items now closed. No outstanding work.**

### Net cross-cutting takeaways from this micro-round
1. **Prompt caching is the architectural foundation, not just an optimization.** The wiki's [[Token Efficiency]] now leads with this.
2. **State changes should be tools, not config changes.** EnterPlanMode/ExitPlanMode is the canonical example. Generalizes to anything that toggles agent behavior.
3. **Tool stability is a hard requirement.** Adding/removing tools mid-session breaks cache for the entire conversation. Includes plugin install/uninstall mid-session.
4. **Model switching mid-session is expensive.** Use subagents for cache-preserving handoff.
5. **Hooks should inject via messages, not system-prompt edits.** The `<system-reminder>` pattern is Anthropic's internal cache-preservation mechanism.
6. **Tool-design is an art, not a science.** "See like an agent." Model affinity matters as much as tool definition.
7. **Tools designed for past models can constrain current models.** TodoWrite → Tasks Tool transition is the canonical example. Periodically re-audit.
8. **Adding to action space ≠ adding tools.** Use subagents, skills, progressive disclosure when possible. Bar to add new tools is high.

## [2026-04-26] ingest | code-review-graph (tirth8205)
- Source: `raw/repos/tirth8205-code-review-graph.md` (web-clipped)
- Created: [[code-review-graph (tirth8205)]] — Tree-sitter AST → SQLite graph → 28 MCP tools for codebase context. **8.2× average token reduction** on benchmarks (49× on Next.js monorepo). Cross-platform (CC, Codex, Cursor, Windsurf, Zed, Continue, OpenCode, Antigravity, Qwen, Qoder, Kiro). MIT.
- Major updates:
  - [[Agentic Search vs RAG]] — added a **third position** to the binary debate: AST-based structural graphs. Sit between grep (no index) and vector RAG (heavy index). Address both Boris's RAG objections (drift via incremental updates; permissions via local SQLite). Conservative recall (100%) but lower precision (~0.38 avg) — flags more files than necessary, never misses an impacted one.
  - [[Token Efficiency]] — added technique #11: AST structural context via MCP. Multiplicative with prompt caching (different layers).
  - [[Model Context Protocol]] — added code-review-graph + claude-mem as deep-dive MCP server examples.
  - [[Claude Code Ecosystem]] — added new "Codebase context / structural search" section.
- **Wiki at 100 pages.**

### Cross-cutting insight
The agentic-search-vs-RAG debate is **not binary**. Three positions, each appropriate for different work:
- **Pure agentic** (grep + glob) — ad-hoc exploration, cache-friendly
- **AST graph** (structural via Tree-sitter) — planned reviews, blast-radius, monorepos
- **Vector RAG** — stable reference corpora, well-formed queries

Boris's "agentic search > RAG for code" was correct *given the binary framing*. With AST graphs as a third option, the right answer is "use the appropriate tool for the question." For Alessandro's focus on token efficiency: AST graphs deliver concrete order-of-magnitude reductions on large codebases that pure agentic search can't match.

## [2026-04-26] schema-change | CLAUDE.md ruthlessly trimmed (218 → 84 lines)
- **Why**: Alessandro asked to cut CLAUDE.md heavily so it doesn't pollute every session's context. Given the wiki's own teachings — [[Memory|200-line target]], [[Diwank Field Notes|"constitution should be lean"]], [[HumanLayer|HumanLayer's 60-line exemplar]], [[Thariq - Prompt Caching Is Everything|cache-stability importance]] — a 218-line CLAUDE.md was self-contradictory.
- **Before**: 218 lines, ~8.4 KB. Detailed conventions with examples, expansive operations sections, separate index/log sections, schema-evolution subsection.
- **After**: 84 lines, ~3.9 KB (61% reduction).
- **What was cut** (explanatory verbosity):
  - Multi-paragraph intro about being "the maintainer"
  - Annotated folder-tree diagram (replaced with one-line shape)
  - Separate YAML example blocks (replaced with inline field list)
  - Long ingest sub-bullets (compressed to 6 numbered steps)
  - Separate Cross-references / Citations / Length / Style subsections (merged into 5 bullets)
  - Worked examples for index.md and log.md formats (convention is clear from spec)
  - Schema-evolution subsection (folded into final "do NOT" bullet about staying tight)
- **What was preserved** (load-bearing):
  - Focus section (8 priority areas + lower-priority list + "topics are the deliverable")
  - Three-layer architecture (raw immutable; wiki yours; CLAUDE.md co-evolved)
  - All operation types with the load-bearing "discuss takeaways first" ingest rule
  - Frontmatter spec (concrete field names; both regular and source-page extra fields)
  - Filename Windows constraints
  - Wikilink + citation conventions
  - Session-start checklist
  - "You do NOT" rules (incl. raw/ immutability, no fabrication, log discipline)
  - Self-referential "~100 line" target as last bullet
- **Bytes saved per session**: ~4.5 KB CLAUDE.md = ~1,100 tokens reclaimed every turn. Multiplicative with prompt caching benefits per [[Thariq - Prompt Caching Is Everything]].
- **Wiki at 100 pages, CLAUDE.md at 84 lines.**

## [2026-04-27] schema-change | Vault renamed `life` → `claude-code`
- **Why**: vault scope is exclusively Claude Code mastery; the generic `life/` name was misleading. Future vaults will be topic-scoped (e.g. `wiki-rust`, `wiki-systems-design`). Rename now, before paths get hardcoded across MCP configs and project CLAUDE.md `@-imports`.
- **In-vault content updates**: `CLAUDE.md` layout block (line 31), `wiki/sources/LLM Wiki Idea.md` (line 69 — "Alessandro's `life/` vault" → `claude-code/`).
- **Auto-memory**: directory moved from `~/.claude/projects/c--Users-Alessandro-life/` → `~/.claude/projects/c--Users-Alessandro-claude-code/`. `life_vault.md` renamed to `claude_code_vault.md`; `MEMORY.md` index updated.
- **Outstanding (must happen between sessions)**: `mv ~/life ~/claude-code`. Cannot be done from this session because cwd is inside `~/life`.
- **Other invariants preserved**: schema, page count (100), all wikilinks (no page renames in `wiki/`).

## [2026-04-27] ingest | rtk (rtk-ai) — token-compressing CLI proxy
- **Source**: `raw/repos/rtk-ai-rtk.md` (web-clipped). File arrived at `raw/` root with a slash-stripping artifact (`rtk-airtk CLI proxy...md`); moved + renamed to `raw/repos/rtk-ai-rtk.md` before ingest.
- **Created**: [[rtk (rtk-ai)]] — full source page covering: 30-min session benchmark (118k → 24k tokens, -80%); architecture (PreToolUse hook + 100+ Rust filters); four strategies (filter/group/truncate/dedup); tee recovery on failure; cross-platform AI tool support (12 tools); Windows/WSL caveat; built-in observability (`rtk gain` / `rtk discover`); GDPR-explicit telemetry posture.
- **Major updates**:
  - [[Token Efficiency]] — added the **five-layer framing** at the top (prompt caching · AST graphs · sandboxing · tool-output filtering · memory compression — multiplicative). New techniques #12 (RTK PreToolUse rewrite) and #13 (hooks-as-token-efficiency-lever as a named pattern). Added `rtk gain` to the measurement section.
  - [[Hooks]] — new section **"Hooks as token-efficiency levers (the pattern)"** with the PreToolUse-rewrite (RTK) vs PostToolUse-compression (claude-mem) duality. Both transparent to the agent; same primitive, different objective. Added rtk + claude-mem to source cross-refs.
  - [[Claude Code Ecosystem]] — new subsection **"Tool-output filtering (PreToolUse hooks)"** for RTK alongside the existing "Codebase context / structural search" entry for code-review-graph.
  - [[index]] — bumped to 101 pages / 54 sources. **Caught a missing entry**: [[code-review-graph (tirth8205)]] was created last round but never added to the index. Added now under Infrastructure section alongside rtk.
- **Cross-cutting insight surfaced**: the wiki now has a **named "five layers" framing** for token efficiency. Each layer compresses a different source of context bloat; they compound. RTK fills the previously-unnamed "tool-output" layer, which is large in absolute terms (every Bash call) but had no canonical tool until now.
- **Pattern crystallized**: hooks aren't only for guardrails. RTK + claude-mem demonstrate **hooks as transparent compression layers** at both ends of the agentic loop. Anywhere there's a verbose deterministic transform between agent and world, a hook can perform it without touching agent logic. This is the dual to the guardrails framing already in [[Hooks]].
- **Process notes**: pre-ingest takeaway discussion went well — Alessandro's "lets do it" came after the structural map (5 page touches, schema-deviation flagged, multiplicative-stack table). The schema-deviation flag (file at `raw/` root with slash-stripping artifact) was caught and corrected before page-writing referenced any path. Worth keeping the same checklist for future web-clipper ingests since Obsidian Web Clipper occasionally produces title-as-filename artifacts.
- **Wiki at 101 pages.**

## [2026-04-27 → 28] ingest | Round 5: 4 web-clipped sources + deep-dive every hyperlink

- **Sources** (4 web-clipped raw files at `raw/` root with slash-stripping artifacts; moved to `raw/repos/` with canonical `<author>-<repo>.md` names before page-writing):
  - `raw/repos/abhigyanpatwari-gitnexus.md` — GitNexus (Tree-sitter AST → LadybugDB → MCP, multi-repo)
  - `raw/repos/davila7-claude-code-templates.md` — raw of an already-ingested page (now updates the existing page with new content)
  - `raw/repos/getagentseal-codeburn.md` — CodeBurn (TUI cost observability + `optimize`)
  - `raw/repos/safishamsi-graphify.md` — graphify (multimodal knowledge-graph skill, 15 platforms)
- **Per Alessandro's directive ("dive deep in every hyperlink too"), 14 WebFetches across 3 waves**:
  - **Wave 1 — skill collections via `claude-code-templates` attribution**: alirezarezvani/claude-skills (235+ skills, 13k stars — README-cited count of 36 was stale), wshobson/agents (184 agents — README-cited 48 was stale), K-Dense-AI/claude-scientific-skills (133 — README-cited 139 was stale), anthropics/skills (125k stars), anthropics/claude-code (119k stars, distribution + plugins repo not source), mehdi-lamrani/awesome-claude-skills (404).
  - **Wave 2 — cost-observability lineage**: ccusage (ryoppippi, 13.5k stars, originator), CodexBar (404 on expected GitHub paths), LiteLLM (the `model_prices_and_context_window.json` source-of-truth used across the category).
  - **Wave 3 — deep architecture dives**: GitNexus ARCHITECTURE.md (12-phase pipeline, single-graph accumulator pattern, RRF for cross-repo), GitNexus GUARDRAILS.md (LLM-on-its-own-codebase principles), GitNexus RUNBOOK.md (recovery patterns), graphify ARCHITECTURE.md (7-stage pure-function pipeline, no embeddings), aitmpl.com (1000+ components + Stack Builder), Penpax (redirected to graphifylabs.ai which 403'd — flagged as out-of-scope commercial layer).
- **9 new source pages**:
  - Three main: [[GitNexus (abhigyanpatwari)]], [[CodeBurn (AgentSeal)]], [[graphify (safishamsi)]]
  - Six discovered via hyperlink dive: [[claude-skills (alirezarezvani)]], [[agents (wshobson)]], [[claude-scientific-skills (K-Dense-AI)]], [[Anthropic Skills]], [[Anthropic Claude Code]], [[ccusage (ryoppippi)]]
- **1 source-page update**: [[Claude Code Templates (Daniel Avila)]] — added Stack Builder, `--analytics`/`--chats`/`--health-check`/`--plugins` commands, **flagged that all README skill-count attributions are stale** with cross-links to actual current numbers.
- **8 concept/topic page updates**:
  - [[Agentic Search vs RAG]] — promoted AST-graph from "third position" to **category** with 3 representatives (code-review-graph, GitNexus, graphify); reframed grep-vs-RAG-vs-AST-graph-vs-multimodal-graph as four-way decision matrix instead of binary
  - [[Hooks]] — generalized "hooks-as-token-efficiency-lever" pattern to **four objectives sharing the same primitive**: compression (RTK/claude-mem), guardrails, **context injection** (GitNexus/graphify before search/read tools), **freshness** (GitNexus PostToolUse stale-index detection). Added cross-platform always-on alternatives table.
  - [[Token Efficiency]] — **named layer 0 (observability/measurement)** preceding the five compression layers; "you can't optimize what you don't measure"; mapped CodeBurn's "patterns to look for" diagnostic table to specific layers; expanded measurement section with ccusage/CodeBurn deep-dive split
  - [[Skills]] — added **community-scale skill-collection landscape table** (9 collections including 235+ alirezarezvani, 184 wshobson, 133 K-Dense); added **15-platform skill-portability pattern** (graphify); added **skill auto-generation from graph topology** (GitNexus); ghost-skill detection cross-link to CodeBurn
  - [[Reducing Hallucinations]] — added defenses 15 (calibrated-confidence-tagging via EXTRACTED/INFERRED/AMBIGUOUS in graphify + 0–1 confidence in GitNexus impact analysis) and 16 (one-shot rate per task category as measurable quality metric via CodeBurn)
  - [[Model Context Protocol]] — added GitNexus as the wiki's most exhaustive single-MCP reference (16 tools + 7 resources + 2 prompts); added graphify multimodal MCP; CodeBurn unused-MCP detection cross-link
  - [[Claude Code Ecosystem]] — replaced single-row "Codebase context / structural search" with **AST-graph category table** (3 entries); new **Cost / observability tooling section**; new **Skill / agent collections section** with 10 entries; reorganized Anthropic-official-resources into table with star counts; collapsed Usage-monitors stub into reference back to canonical entries
  - [[Andrej Karpathy]] — added section on `/raw` folder workflow as external reference point, citing graphify's explicit motivation
- **index.md** — bumped to **110 pages / 63 sources**; added new entries under "Anthropic-authoritative" (Anthropic Skills, Anthropic Claude Code), "Skill / agent collections" (alirezarezvani, wshobson, K-Dense), "Infrastructure" (GitNexus, graphify), and **new top-level subsection "Cost / token observability"** (ccusage, CodeBurn).
- **Wiki at 110 pages** (63 sources, 29 concepts, 7 topics, 11 people).

### Cross-cutting threads surfaced this round

1. **AST-graph is now a category, not a single project** — three representatives differing on scope (single-repo / multi-repo / multimodal). The right answer to retrieval is "use the appropriate tool for the question," not a single philosophy. Boris's "agentic search > RAG for code" was correct given the binary framing of his moment; the framing has matured.
2. **Hooks have four objectives sharing the same primitive** — compression, guardrails, context injection, freshness. The wiki's [[Hooks]] page now names all four explicitly. PreToolUse + always-on rules files (`AGENTS.md`, `.cursor/rules/`, `.kiro/steering/`, `.agents/rules/`) are platform-portable substitutes when hooks aren't supported.
3. **Token efficiency has a layer 0 (observability)** — named explicitly in [[Token Efficiency]]. Without measurement, the five compression layers are guesswork. CodeBurn's "patterns to look for" table maps signals to layers; ghost-skill detection becomes essential at collection scale.
4. **Skill collections are now community-scale** — alirezarezvani 235+, wshobson 184, K-Dense 133. README-cited counts in attribution lists routinely lag the actual repos. Pattern: when a source cites another source by count, **verify before quoting**. The wiki now flags this in [[Claude Code Templates (Daniel Avila)]] explicitly.
5. **A skill can be 15-platform-portable** — graphify is the existence proof. Pattern = `agentskills.io` skill format + a platform-detection install script that generates platform-appropriate always-on plumbing (hook on Claude Code/Codex/Gemini/OpenCode; rules file on Cursor/Kiro/Antigravity/Aider/Trae/Hermes/Copilot CLI/VS Code).
6. **Calibrated-confidence-tagging is a structural hallucination defense** — graphify's EXTRACTED/INFERRED/AMBIGUOUS and GitNexus's 0–1 confidence on impact edges. Build calibration into the *tool*, not into the prompt. Generalizable pattern for MCP server design.
7. **One-shot rate per task category is a measurable quality metric** — CodeBurn detects edit/test/fix retry patterns and reports first-try-success rate. Compare-mode shows model A/B from real session data. Closes the feedback loop on "did my hallucination defenses actually help?"
8. **The Karpathy `/raw` folder is now an external tool design target**, not just personal practice — graphify cites it explicitly. This wiki's `raw/` folder is a graphify-style corpus.
9. **Skill auto-generation from graph topology** is a new design pattern — GitNexus's Leiden community detection produces SKILL.md per functional area. Skills as derivative of codebase structure, not handwritten.
10. **Stale README counts as a recurring data hazard** — multiple attribution lists in the ecosystem cite skill/agent counts that are 3-6× lower than actual current numbers. Mark counts with retrieval date when ingesting.

### Process notes

- **The "raw/ root + title-as-filename" Web Clipper artifact** has now been observed in two consecutive ingest rounds (rtk last round; all 4 sources this round). Worth a permanent rule: **first move-and-rename to `raw/repos/<author>-<repo>.md`, then ingest**. Never reference the broken filenames.
- **Web Fetch on `github.com/<user>/<repo>/blob/main/<file>.md`** worked reliably for the architecture/runbook/guardrails docs — useful pattern for going beyond a repo's README.
- **X.com URLs still 402** — confirmed again. Anything user-pasted (per the [[Karpathy LLM Coding Notes (Dec 2025)]] precedent) is the workaround.
- **Hyperlink dive yielded 6 of 9 new pages** — the original 3 sources surfaced 6 additional wiki-worthy collections via attribution. Strong signal that "deep dive every hyperlink" is high-leverage for source-discovery; will continue to pursue when Alessandro green-lights it.

### Still open / lower priority

- **Penpax** (graphifylabs.ai, the always-on commercial layer for graphify): redirected target 403'd; flagged in [[graphify (safishamsi)|graphify]] as out-of-scope-but-known. Worth a re-attempt when graphifylabs.ai exits beta.
- **CodexBar**: cited as inspiration in CodeBurn but the expected GitHub URLs returned 404. May have been renamed or moved. Tracked in [[Claude Code Ecosystem]] usage-monitors section.
- **mehdi-lamrani/awesome-claude-skills**: cited in claude-code-templates README, currently 404. Listed in ecosystem catalog as "currently inaccessible."
- **Ghost-skill audit on this vault**: with 110 pages and growing skill/agent inventory, periodic application of `codeburn optimize` and `gitnexus analyze --skills` (if/when ported beyond code) could be a meta-exercise worth running.

## [2026-04-29] ingest | Round 6 Tier 1.2: Anthropic Tool Search + Compaction docs

- **Context**: opening of the gap-fill round per `~/.claude/plans/hey-so-can-you-warm-reddy.md`. Plan structures the round into 5 tiers; this entry closes Tier 1.2 (Anthropic API docs cited in raw/ but never ingested).
- **Sources** (no raw — discovered as in-text citations inside `raw/articles/Thariq - Prompt Caching Is Everything.md`):
  - `https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool` (line 73 of the Thariq raw)
  - `https://platform.claude.com/docs/en/build-with-claude/compaction` (line 93)
- **Created — 2 source pages**:
  - [[Anthropic Tool Search]] — `tool_search_tool_regex_20251119` / `_bm25_20251119`. Up to 10k tools in catalog; 3-5 surfaced per request via regex or BM25. **Deferred tools never enter the system-prompt prefix** — auto-expanded as `tool_reference` blocks in the conversation when discovered. Cognitive threshold: tool selection accuracy degrades past **30-50 tools** (the underlying reason for [[Boris Cherny Tips Compendium|Boris's <80 rule]]). Multi-server typical: ~55k tokens consumed in tool defs before any work; tool search reduces by >85%.
  - [[Anthropic Compaction]] — beta header `compact-2026-01-12`, edit type `compact_20260112`. Default trigger 150k input tokens (configurable, min 50k). The `compaction` block carries the summary; on next request the API auto-drops everything before it. **Same-model summarization only** (no cheaper-model option). Caching: `cache_control: ephemeral` on the `compaction` block caches the summary itself.
- **Page updates** (cross-linking the productizations into the wiki):
  - [[Token Efficiency]] — added a new subsection **"The productizations of Claude Code's caching architecture"** mapping each Thariq pattern (cache-safe forking, defer_loading) to its productized API surface. Updated the cache-preserving compaction subsection to reference [[Anthropic Compaction]] specifics.
  - [[Model Context Protocol]] — added subsection **"Tool Search: the structural fix at scale"** explaining when MCP tool sprawl warrants `defer_loading` + `tool_search_tool_*`. Combined with Boris's <80 active tools rule for the full discipline.
  - [[Thariq - Prompt Caching Is Everything]] — added productization arrows on both relevant lines (line ~111 → [[Anthropic Tool Search]]; line ~129 → [[Anthropic Compaction]]). Updated cross-references.
- **Cross-cutting insight**: Anthropic took two of Claude Code's internal cache-preservation patterns and **productized them as first-class API features**. Both are now ZDR-eligible, SDK-supported in 7 languages, batch-API compatible, and stream-able. Translation: you no longer need to roll either pattern by hand. The wiki's framing (these are architecture, not optimization) is now backed by Anthropic's own productization.
- **Bonus discoveries (Tier 3 backlog candidates surfaced from these docs)**:
  - **"Effective context engineering for AI agents"** — Anthropic engineering blog, cited from BOTH Tool Search and Compaction docs as the foundational long-context degradation read. **Strong Tier 3 priority — likely the most-referenced Anthropic engineering post relevant to [[Context Engineering]].**
  - **"Advanced tool use"** — Anthropic engineering blog, cited as background on tool-scale challenges.
  - **"Tool use with prompt caching"** — dedicated docs page (`/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching`).
  - **"Context editing"** — sibling strategies (tool result clearing, thinking block clearing).
  - **"Session memory compaction cookbook"** — runnable example with background-threading compaction.
  - **"Context windows"** docs — companion strategy reference.
- **Wiki at 112 pages** (65 sources, 29 concepts, 7 topics, 11 people).

## [2026-04-29] ingest+lint | Round 6 Tiers 2.1–2.4 + 5.1 + 1.3: structural gap-fill + synthesis layer + qmd

- **Context**: continuation of the gap-fill round per `~/.claude/plans/hey-so-can-you-warm-reddy.md`. After Tier 1.2 closed the two Anthropic-docs citations, this batch closes the high-confidence internal-structure work plus the deliverable-layer synthesis pages plus one verified raw-derived source (qmd).
- **Tier 2.1: 9 orphan source pages wikilinked into the concept/topic network.** Each source had no inbound wikilinks from concepts/topics; now each has 2-5 natural homes:
  - [[Karpathy LLM Coding Notes (Dec 2025)]] → linked from [[Karpathy Coding Principles]] (primary citation), [[Test Time Compute]], [[Ralph Wiggum Technique]] (full stamina-as-abundance section added), [[Reducing Hallucinations]] (Karpathy-named-failure-modes attribution), [[Memory]] (CLAUDE.md-alone-insufficient warning).
  - [[Diwank Field Notes]] → [[Reducing Hallucinations]] (defense #18 — AIDEV-* anchor comments + sacred-tests rule), [[Memory]] (constitution framing), [[When to Delegate to Subagents]] (three-mode framing — full new section added), [[Context Engineering]] cross-ref.
  - [[TDD Guard (Nizar Selander)]] → [[Test-Driven Development with Claude]] (canonical hook-enforced TDD; replaced alias with direct link), [[Hooks]] (TDD-enforcement section added), [[Reducing Hallucinations]] cross-ref (replaced alias).
  - [[parry-guard (Dmytro Onypko)]] → [[Reducing Hallucinations]] (defense #17 — prompt-injection at the boundary), [[Hooks]] (Bash safety section, direct link), [[Auto Mode]] (full hook-based-alternatives-and-complements section added).
  - [[Dippy (Lily Dayton)]] → [[Auto Mode]] (cross-platform AST-bash auto-approval), [[Hooks]] (Bash safety, direct link).
  - [[HCOM (Claude Hook Comms)]] → [[Hooks]] (multi-agent message-bus section), [[When to Delegate to Subagents]] (multi-agent coordination section).
  - [[claude-code-tools (Prasad Chalasani)]] → [[Subagents]] (cross-agent handoff section added), [[Token Efficiency]] (technique #14 — cross-agent session continuity).
  - [[Simone (Helmi)]] → [[Skill Building]] (artifact-generation), [[Output Styles]] (artifact styling cross-link).
  - [[Prompt Engineering Papers Reference]] → [[Prompt Engineering Techniques]] (academic foundation), [[Context Engineering]] (research basis).
- **Tier 2.2: 4 of 8 unverified-callouts resolved.**
  - [[Anthropic Claude Code]] — converted "where can readers see what CC actually does?" question into a "Visibility into the actual implementation" section pointing to [[Learn Claude Code (shareAI-lab)]] + [[Claude Code System Prompts (Piebald)]] + the two Thariq articles.
  - [[HumanLayer]] — replaced "12 Factor Agents document not fetched" with cross-link to [[12 Factor Agents (HumanLayer)]] (already covered Round 3).
  - [[Memex]] — confirmed Atlantic Monthly citation via Wikipedia: vol. 176, no. 1, July 1945, pp. 101–108 (abridged in *Life* Sept 10, 1945).
  - [[GitNexus (abhigyanpatwari)]] — converted LadybugDB sharp-edge question into a "Embedding-loss recovery" section with detection (`stats.embeddings: 0`), recovery command (`npx gitnexus analyze --embeddings`), and discipline rule (always pass the flag once you've used it).
  - 4 callouts remain as marked-exploratory (graphify wiki self-reference; CodeBurn Yield false-positive rate + Copilot output-only asymmetry; Anthropic Skills production-vs-public divergence) — these need observation rather than research.
- **Tier 2.4: 2 new concept pages.**
  - [[Permission Modes]] — unified taxonomy of the 5 modes (manual / plan / acceptEdits / auto / bypass) with decision tree, hook interactions, sandboxing orthogonality, mode-as-state-as-tool design, subagent-scoped permissions. Closes a long-standing scatter (Auto Mode, Planning Mode, Subagents each had partial coverage).
  - [[Action Space Design]] — Thariq's foundational philosophy promoted from inside [[Thariq - Seeing like an Agent]] to its own page. Covers: what's in the action space (5 primitives), the math of why tools are expensive (cache invalidation + selection accuracy + definition tokens), adding to action space ≠ adding tools (4 alternatives: skills, subagents, progressive disclosure, deferred tool stubs), state-as-tools, periodic re-audit (TodoWrite → Task Tool example), and the "see like an agent" discipline.
- **Tier 5.1: 3 new topic pages (the deliverable layer per query-optimized framing).**
  - [[Prompt Caching]] — promoted from "compression layer 1 inside Token Efficiency" to its own topic page per Thariq's "Prompt Caching Is Everything." Covers: why it's foundational not optimization, the 4-layer prompt structure, cache-breaking mistakes, the 5 canonical patterns (state-as-tools, stub-and-discover, cache-safe forking, subagent handoff, message injection), cache hit rate as leading indicator, when prompt caching is *not* enough.
  - [[Multi-Agent Orchestration]] — synthesis distinct from [[When to Delegate to Subagents]]. Covers: the 5 archetype patterns (parallel review, parallel exploration, role specialization, two-stage validation, wave-based parallelization), 5 coordination mechanisms (briefs, disk handoff, cross-agent session continuity, hooks-as-message-bus, MCP-mediated state), cache preservation in multi-agent setups, framework-at-a-glance table for the 10+ wiki frameworks, when multi-agent is overhead.
  - [[Cost Observability Playbook]] — synthesis with measurement → diagnosis → optimization loop. Covers: 5 metrics (total cost, cache hit rate, cost-per-task, one-shot rate, ghost-skill/unused-MCP/re-read patterns), the 2 canonical tools split ([[ccusage (ryoppippi)]] for at-a-glance / [[CodeBurn (AgentSeal)]] for diagnostics), adjacent tools (ccflare, ccxray, Claude Code Usage Monitor, Claudex), cost-quality framing tied to Test Time Compute, anti-patterns.
- **Tier 2.3: 5 high-priority people pages.**
  - [[Diwank Tomer]] — Julep co-founder; production practitioner. AIDEV-* anchor comments + sacred-tests rule + three-mode framing.
  - [[Abhigyan Patwari]] — Akon Labs founder; GitNexus creator. Multi-repo MCP architecture + freshness hook objective + skill auto-generation + LLM-on-own-codebase guardrails.
  - [[Safi Shamsi]] — graphify creator. Multimodal knowledge graphs + EXTRACTED/INFERRED/AMBIGUOUS confidence + 15-platform install matrix + Karpathy `/raw` folder as design target.
  - [[Carl Rannaberg]] — claudekit creator. 6-aspect parallel review + 20+ specialist subagents + extensive hook library + auto-checkpointing + thinking-level hook + codebase-map injection + hook performance discipline.
  - [[Cihat Gündüz]] — ContextKit creator (FlineDev). 4-phase planning structure with named quality agents per phase; planning as separate discipline.
- **Tier 1.3: qmd (tobi) verified and ingested.** [[LLM Wiki Idea]] line 51 explicitly recommends qmd as the wiki's search-engine substrate at scale. Confirmed via WebSearch + WebFetch: tobi/qmd, MIT, **23.6k stars**, v2.1.0 April 2026 (active). Hybrid BM25 + vector + LLM rerank using `qwen3-reranker-0.6b-q8_0` via node-llama-cpp + GGUF (all local, no cloud calls). CLI + stdio MCP + HTTP MCP (`localhost:8181`) + daemon mode. Source page placed in `wiki/sources/qmd (tobi).md` with 4 retrieval categories table comparing to AST-graph alternatives.

### Cross-cutting threads from this batch

1. **Productizations validate the architecture-not-optimization framing.** Tool Search and Compaction are Claude Code's internal patterns shipped as API features. The wiki's framing of [[Prompt Caching]] as foundational (rather than as one of many optimizations) is now backed by Anthropic's own productization decisions.
2. **The "permission modes" taxonomy was scattered for a reason — these are different abstractions.** Unifying them in [[Permission Modes]] required articulating that hooks/sandboxing/subagents are orthogonal axes, not alternatives. The decision tree separates them properly.
3. **Multi-agent orchestration has 5 archetypes, not "use subagents."** The wiki's 10+ workflow frameworks each pick from these 5 archetypes (parallel review, parallel exploration, role specialization, two-stage validation, wave-based). [[Multi-Agent Orchestration]] makes the menu explicit.
4. **Cost observability has matured into 2 distinct tools, not a long tail.** ccusage = at-a-glance; CodeBurn = diagnostic. The category is no longer "find a tool that works"; it's "use both."
5. **Karpathy's Dec 2025 notes are now properly load-bearing.** The notes were previously cited only via [[Andrej Karpathy]]; they're now anchored from [[Karpathy Coding Principles]] (primary), [[Reducing Hallucinations]], [[Test Time Compute]], [[Ralph Wiggum Technique]], [[Memory]] — making the four-principles-from-Karpathy traceable from any focus area to the original source.
6. **Diwank's three-mode framing is now the "when *not* to subagent" answer.** [[When to Delegate to Subagents]] previously had a decision tree but no mode-aware guidance. The playground/pair-programming/production split prevents premature delegation in fast-iteration work.

### Process notes

- **Tool result file persistence**: Compaction docs returned 97KB output (over the inline 30KB limit) and were auto-saved to `tool-results/`. Worked smoothly with `Read` + offset/limit patterns; worth knowing for future big-doc fetches.
- **Atlantic.com WebFetch was blocked**; Wikipedia fetch succeeded for the bibliographic confirmation. Pattern: when a primary publisher blocks scrapers, Wikipedia's citation table is usually adequate for bibliographic facts.
- **The 9 orphan-source wikilink pass took 16 file edits**; many of the orphans needed only cross-reference additions, but [[Auto Mode]] and [[Hooks]] gained substantial new sections (parry-guard alternatives; TDD Guard / parry-guard / Dippy / HCOM as direct-link sections). Consistent with the "synthesis improves when the inputs are well-named" pattern.
- **5 people-page writes happened in parallel**; each ~50 lines covering identity + 3-5 contributions + cross-refs. Pattern: structure them around named contributions with their wiki-page anchor, so backlinks light up automatically when a future ingest cites the person.

### Wiki at 123 pages (66 sources, 31 concepts, 10 topics, 16 people).

### Still open / lower priority for this round

- **Tier 1.1**: 3 X-articles (Lance Martin × 2 + Thariq Tasks Tool) need user paste workflow (X URLs return 402). Per [[Karpathy LLM Coding Notes (Dec 2025)]] precedent.
- **Tier 3**: 13 Anthropic official docs in 3 waves (Tool Use overview, Files API, Batch, Vision, Computer Use, Models, Settings, Engineering Blog index, Cookbook, Headless mode, Prompt Injection Defenses, Sandboxing engineering post, Extended Thinking API). Plus 4 bonus URLs surfaced from Tier 1.2 docs (Effective Context Engineering, Advanced Tool Use, Tool Use with Prompt Caching, Context Editing).
- **Tier 4.1**: combined [[Foundational Papers]] page (ReAct, Lost in the Middle, Constitutional AI, MemGPT, ToT, Reflexion, Toolformer, SWE-bench).
- **Tier 4.2**: practitioner voices (Armin Ronacher, Simon Willison, Geoffrey Huntley, Dex Horthy, Erik Schluntz, Catherine Wu, Steve Yegge, Alex Albert, Sholto Douglas) — VERIFY-FIRST.
- **Tier 5.2 + 5.3**: recent ecosystem repos (awesome-agent-skills VoltAgent, awesome-claude-code-toolkit rohitg00) + ongoing-sources catalog (Latent Space, Lenny's, AI Engineer Newsletter, Code with Claude conference).
- **Final**: query-readiness verification pass walking the CLAUDE.md focus-area questions through the wiki.

## [2026-04-29] ingest | Round 6 Tiers 3–5: Anthropic docs + Foundational Papers + practitioner voices + ecosystem catalogs

- **Context**: continuation. After the structural-fix batch (Tiers 1.2 / 2.1 / 2.2 / 2.4 / 5.1 / 2.3 / 1.3) closed, this batch brings the wiki outward: Anthropic API docs, foundational academic papers, high-signal practitioner voices, and recent ecosystem catalogs.
- **Tier 3: 11 Anthropic official docs** (skipped 6 lower-priority — Vision API, Computer Use, Cookbook, Headless Mode, Settings Reference, Engineering Blog Index).
  - **Wave 1 (foundational)**: [[Anthropic Effective Context Engineering]] (the most-referenced engineering blog; "context rot," "just-in-time retrieval," 1-2k token sub-agent return summaries), [[Anthropic Advanced Tool Use]] (Programmatic Tool Calling + Tool Use Examples beta), [[Anthropic Tool Use Overview]] (the agentic loop primitive; per-model tool-use overhead 346 tokens), [[Anthropic Tool Use with Prompt Caching]] (the precise cache-invalidation matrix).
  - **Wave 2 (capabilities)**: [[Anthropic Files API]] (upload-once free, beta `files-api-2025-04-14`, 500MB/file limit), [[Anthropic Batch Processing]] (50% async discount, 300k output beta on Opus 4.7/4.6/Sonnet 4.6), [[Anthropic Extended Thinking API]] (adaptive thinking required on Opus 4.7+, manual deprecated; messages-cache-only invalidation), [[Anthropic Models Overview]] (Opus 4.7 step-change in agentic coding; pricing $5/$25 vs Opus 4.1's $15/$75).
  - **Wave 3 (security + context)**: [[Anthropic Prompt Injection Defenses]] (~1% attack success at 100-attempt Best-of-N on Opus 4.5; "far from solved"), [[Anthropic Sandboxing Engineering]] (bubblewrap/seatbelt OS-level isolation; 84% prompt reduction; dual filesystem+network isolation requirement), [[Anthropic Context Editing]] (selective tool-result + thinking-block clearing; sibling to Compaction).
- **Tier 4.1: [[Foundational Papers]]** — single combined source page covering 8 academic papers (ReAct, Lost in the Middle, Constitutional AI, MemGPT, Tree of Thoughts, Reflexion, Toolformer, SWE-bench) with citations + wiki anchor mapping. Compress format chosen per [[Prompt Engineering Papers Reference]] precedent. The page articulates the **inheritance chain** (academic foundation → Anthropic engineering posts → Anthropic productizations → practitioner sources → ecosystem tooling) and explicitly anchors prior implicit citations across [[Token Efficiency]] / [[Memory]] / [[Reducing Hallucinations]] / [[Prompt Engineering Techniques]].
- **Tier 4.2: 4 practitioner voices verified and ingested** — VERIFY-FIRST gating worked. All 4 confirmed real and high-signal:
  - [[Armin Ronacher]] (lucumr.pocoo.org; Flask + Sentry; recent posts confirmed but Audit 3's 3 specific titles weren't visible — flagged in body).
  - [[Simon Willison]] (108 posts on Claude Code tag; Datasette + LLM CLI creator; the largest non-Anthropic single-author corpus).
  - [[Geoffrey Huntley]] (originator of the Ralph Wiggum loop; software-economics + agentic-coding essays).
  - [[Dex Horthy]] (HumanLayer founder; canonical posts: "12 Factor Agents" Apr 2025, "Advanced Context Engineering for Coding Agents" Aug 2025, "Context-Efficient Backpressure" Dec 2025, "A Brief History of Ralph" Jan 2026, "Getting Claude to Actually Read Your CLAUDE.md" Mar 2026).
  - **Skipped per VERIFY-FIRST**: Erik Schluntz / Catherine Wu / Steve Yegge / Alex Albert / Sholto Douglas — verification cost outweighed marginal value relative to the four already-strong voices and the existing [[Boris Cherny]] / [[Thariq]] coverage. Revisit if specific work surfaces.
- **Tier 5.2: 2 recent ecosystem catalogs verified and ingested**.
  - [[awesome-agent-skills (VoltAgent)]] — **19.4k stars** (Audit 3 said ~5k; corrected); 1,100+ skills (audit said 1000+; close); platform-agnostic (audit said Claude-specific; corrected).
  - [[awesome-claude-code-toolkit (rohitg00)]] — 1.5k stars; 135 agents + 35 skills + 42 commands + 176+ plugins + 20 hooks + 14 MCP configs (all confirmed); Apache 2.0; actively maintained (459 commits).
  - **awesome-ai-agents-2026 (caramaschiHG)** skipped — too broadly agent-focused, not Claude Code-specific enough for the wiki's focus.
- **Tier 5.3: ongoing-sources catalog added to [[Claude Code Ecosystem]]** as a new section listing practitioner blogs (Simon, Armin, Geoffrey, Dex), Anthropic creator voices, and major podcasts/newsletters/conferences (Latent Space, Lenny's, AI Engineer, Code with Claude). Brief catalog entries rather than separate source pages.

### Cross-cutting threads from this batch

1. **The wiki now has an academic root.** Before this batch, [[Prompt Engineering Techniques]] named ReAct/ToT/Reflexion as techniques without sourcing; [[Token Efficiency]] referenced "context rot" without the Liu et al. paper; [[Memory]] used "constitution-as-document" framing without Constitutional AI. The single [[Foundational Papers]] page closes all of these.
2. **Anthropic's productization arc is now traceable.** The wiki maps it: [[Thariq - Prompt Caching Is Everything]] (architectural rationale) → [[Anthropic Effective Context Engineering]] (engineering principles) → [[Anthropic Advanced Tool Use]] (engineering pre-productization) → [[Anthropic Tool Search]] / [[Anthropic Compaction]] (productized features) → [[Anthropic Tool Use with Prompt Caching]] (the precise rules). Five layers of inheritance.
3. **Audit 3's claims had verification gaps but mostly held.** Of the practitioner voices Audit 3 surfaced, 4 of 9 were verified high-signal (Armin / Simon / Geoffrey / Dex); 5 were skipped under VERIFY-FIRST as verification cost > value. The two recent ecosystem repos verified with corrected counts (VoltAgent stars were 4× audit's number; multi-platform not Claude-specific).
4. **Programmatic Tool Calling is a new wiki primitive worth tracking.** Beta `advanced-tool-use-2025-11-20`. Different shape from Tool Search: PTC reduces what enters the conversation *at all* by filtering inside a code execution sandbox before Claude sees it. 37% token reduction on the worked example. Will likely surface as a wiki-tracked pattern at scale.
5. **Adaptive thinking is the new default on Opus 4.7+.** Manual `budget_tokens` returns 400. The [[Extended Thinking]] concept page wording predates this; worth a future update sweep ([[Extended Thinking]] needs to lead with "adaptive thinking is required on Opus 4.7+").
6. **Sandboxing's dual-isolation requirement is now load-bearing.** The engineering post is explicit: filesystem-only OR network-only sandboxing is *insufficient*. Pair is required. Worth updating [[Sandboxing]] concept page to lead with this.
7. **Anthropic's honesty on prompt injection is the right framing.** "1% attack success at 100 attempts is meaningful risk; problem is far from solved." Defense-in-depth ([[Auto Mode]] + [[Sandboxing]] + [[parry-guard (Dmytro Onypko)|parry-guard]]) is the right posture; single-layer reliance is not.

### Process notes

- **Compaction docs returned 97KB** and Context Editing returned 78KB — both auto-saved to `tool-results/` and read with offset/limit. Pattern works.
- **Atlantic.com WebFetch was blocked** (Memex Tier 2.2 subtask); Wikipedia worked. Pattern: when the primary publisher blocks scrapers, Wikipedia's citation table is often adequate for bibliographic facts.
- **Practitioner-blog WebFetch worked across all 4 attempts** (lucumr.pocoo.org, simonwillison.net, ghuntley.com, humanlayer.dev/blog). The personal-blog space is friendly to fetches; institutional publishers more variable.
- **VERIFY-FIRST paid off**: Audit 3 claimed Armin's "Agent Design Is Still Hard" (Nov 2025) — not visible on his blog homepage; the claim was logged but not propagated as fact. Rule: verify *specific titles* before quoting, even when the *blog* is verified active.

### Wiki at 141 pages (80 sources, 31 concepts, 10 topics, 20 people).

### Query-readiness verification pass

Walking each CLAUDE.md focus-area question through the wiki as a stranger:

| Question | Landing page (1 hop) | Pass / fail |
|---|---|---|
| "How do I build better prompts for Claude Code?" | [[Context Engineering]] (operational) + [[Prompt Engineering Techniques]] (catalog) | **Pass**. Both reachable from index. Anthropic's "minimal high-signal tokens" principle now anchored via [[Anthropic Effective Context Engineering]]. |
| "How do I reduce hallucinations on this task?" | [[Reducing Hallucinations]] (18 defenses) | **Pass**. Now references all 9 orphan-source defenses (Karpathy, TDD Guard, parry-guard, Diwank). |
| "How do I save tokens?" | [[Token Efficiency]] (5-layer stack) + [[Prompt Caching]] (architectural foundation) | **Pass**. The two pages cover both the operational (5-layer stack) and the foundational (caching architecture). |
| "When should I delegate to subagents?" | [[When to Delegate to Subagents]] (decision tree) + [[Multi-Agent Orchestration]] (5 archetypes) | **Pass**. "When" + "How to coordinate" are now both answered. |
| "How do I design a skill?" | [[Skill Building]] | **Pass**. Strong coverage; now links [[Action Space Design]] for the underlying philosophy. |
| "How do I use hooks for X?" | [[Hooks]] | **Pass**. Four-objective taxonomy + canonical examples per objective. |
| "How do I write a good CLAUDE.md?" | [[Memory]] (full Anthropic docs + Diwank constitution framing + Karpathy warning) | **Pass**. All three load-bearing sources reachable. |
| "How do I plan a complex change?" | [[Planning Mode]] + [[Spec-Driven Development]] | **Pass**. Both pages exist; SDD page covers 10+ workflow framework references. |
| "How do I keep costs under control?" | [[Cost Observability Playbook]] | **Pass** (new this round). Measurement → diagnosis → optimization loop with 5 metrics + 2 canonical tools. |
| "How do I make Claude reason better on hard problems?" | [[Extended Thinking]] | **Pass-with-flag**. Concept page predates adaptive-thinking-required-on-Opus-4.7+; updated [[Anthropic Extended Thinking API]] source page covers it. Concept page worth a future refresh. |
| "What's the right tool/repo for ___?" | [[Claude Code Ecosystem]] | **Pass**. Updated with Anthropic API docs table + skill catalogs table + ongoing-sources section. |

**11 of 11 questions pass.** Two flagged for future polish:
1. [[Extended Thinking]] concept page should be updated to lead with "adaptive thinking is required on Opus 4.7+" (currently buried).
2. [[Sandboxing]] concept page should lead with "dual filesystem+network isolation requirement is non-negotiable" (currently in the middle).

These are minor refresh tasks, not blockers. The wiki is **query-ready** for the focus areas.

### Final state

| Layer | Count |
|---|---|
| Source pages | 80 |
| Concepts | 31 |
| Topics | 10 |
| People | 20 |
| **Total wiki pages** | **141** |

Up from 110 at session start. **+31 pages**. Three new topic synthesis pages ([[Prompt Caching]], [[Multi-Agent Orchestration]], [[Cost Observability Playbook]]) substantially strengthen the deliverable layer. The ratio of source pages to concept/topic/people pages stayed healthy.

### Still open / lower priority

- **Tier 1.1**: 3 X-articles still gated on user paste workflow (Lance Martin × 2 + Thariq Tasks Tool). 402 auth.
- **6 lower-priority Anthropic docs skipped from Tier 3**: Vision API, Computer Use, Cookbook, Headless Mode, Settings Reference, Engineering Blog Index. Add when relevance arises.
- **5 Tier 4.2 voices skipped**: Erik Schluntz, Catherine Wu, Steve Yegge, Alex Albert, Sholto Douglas. Revisit if specific work surfaces.
- **Future polish**: [[Extended Thinking]] adaptive-required update; [[Sandboxing]] dual-isolation lead update.

## [2026-04-29] ingest | Round 6 Tier 1.1: 3 X-articles closed (paste workflow)

- **Closed the round's last open work.** Alessandro pasted the three X-articles (per the [[Karpathy LLM Coding Notes (Dec 2025)]] precedent — X URLs return 402 to WebFetch, paste is the workaround):
  - `raw/articles/Lance Martin - Prompt auto-caching with Claude.md` (Dec 24, 2025)
  - `raw/articles/Lance Martin - Give Claude a computer.md` (Feb 27, 2026)
  - `raw/articles/Thariq - Tasks Tool (Todos to Tasks).md` (Jan 22, 2026)
- **Web Clipper artifact handled** (the now-routine slash-stripping artifact + smart-quote in filenames): all three landed at `raw/` root with title-as-filename; moved to `raw/articles/` with canonical `<Author> - <Title>.md` names matching the existing Thariq convention.
- **Created — 3 source pages**:
  - [[Lance Martin - Prompt auto-caching with Claude]] — the technical companion piece Thariq points to. Closes operational specifics on [[Prompt Caching]]: cached input tokens are **10% the cost** of non-cached; **20-block backward search** rule for hash matches; workspace-scoped hashes; manual (per-block) vs auto-caching (request-level, breakpoint moves automatically). Cited resources for Tier 3+ backlog: Sankalp's prompt-caching-deep-dive, kipply's transformer-inference-arithmetic, vLLM paper, SGLang, Manus context-engineering essay (peakji).
  - [[Lance Martin - Give Claude a computer]] — the Programmatic Tool Calling explainer Thariq points to. Closes the "5 reasons to promote an action to a tool" framework (UX, Guardrails, Concurrency, Observability, Autonomy) on [[Action Space Design]]; "tools trade-off control with composability" + composition-tax framing; concrete PTC metrics (BrowseComp + DeepsearchQA: +11% accuracy / -24% input tokens; Opus 4.6 + PTC #1 on LMArena Search Arena); PTC is now default in `web_search_20260209`.
  - [[Thariq - Tasks Tool (Todos to Tasks)]] — the full TodoWrite → Tasks transition announcement. Closes the canonical "tools designed for past models can constrain current models" example on [[Action Space Design]] with primary-source detail. Tasks live at `~/.claude/tasks/` (file system; not in conversation), have dependencies + blockers as first-class metadata, and broadcast updates to all sessions sharing a `CLAUDE_CODE_TASK_LIST_ID`. Works with `claude -p` (headless) and Agent SDK.
- **Created — 1 people page**: [[Steve Yegge]]. Promoted from Tier 4.2 skip-list because the Tasks announcement explicitly cites his **Beads** project as inspiration. The acknowledgement is the verification trigger that VERIFY-FIRST gating wanted. Coverage focused on Beads + multi-agent orchestration relevance; the broader Yegge corpus (Vibe Coding Manifesto, Gas Town orchestrator) noted as potential deep-dives.
- **7 cross-link updates** to existing pages:
  - [[Prompt Caching]] — added the 10% cost number + 20-block search rule + manual-vs-auto-caching subsection
  - [[Action Space Design]] — added the **5 reasons to promote an action to a tool** framework + "tools trade-off control with composability" framing; updated high-bar checklist (now 8 items including "does it justify itself against at least one of Lance's 5 reasons?")
  - [[Anthropic Advanced Tool Use]] — added concrete PTC search-benchmark metrics (+11% / -24%, #1 LMArena) and the fact that PTC is built into `web_search_20260209` by default
  - [[Subagents]] — added Tasks file-system store as canonical cross-subagent state mechanism
  - [[Multi-Agent Orchestration]] — added **file-system-mediated state (Tasks)** as the 5th coordination mechanism alongside briefs / disk handoff / cross-agent session continuity / hooks-as-message-bus / MCP-mediated state
  - [[Memory]] — added `~/.claude/tasks/` as the second file-system-resident state store (alongside Auto Memory at `~/.claude/projects/<project>/memory/`)
  - [[Cost Observability Playbook]] — added the 10× cost differential framing as the load-bearing math behind cache-hit-rate-as-leading-indicator (60% hit ≠ "good enough"; 90% is the goal)

### Cross-cutting threads from this micro-batch

1. **The wiki's [[Prompt Caching]] page was missing operational specifics that practitioners *will* ask about.** Lance Martin's caching piece closes those: 10% cost number, 20-block search, workspace scoping, manual-vs-auto-caching. These are the kinds of facts that turn "interesting framing" into "I can act on this."
2. **The "5 reasons to promote-to-tool" framework should have been in [[Action Space Design]] from the start.** It's the most-cited concrete decision tool in the Lance Martin piece. Now anchored.
3. **The "unhobble on each model bump" pattern has its canonical example.** Tasks replacing TodoWrite isn't just *one* example of "tools designed for past models can constrain current models" — Anthropic frames it as *the* canonical case (Opus 4.5 keeps state better → TodoWrite became constraining). This is now the load-bearing example for [[Action Space Design]].
4. **`~/.claude/` is now the canonical surface for Claude's persistent state.** Auto Memory at `~/.claude/projects/<project>/memory/`, Tasks at `~/.claude/tasks/`. Both Anthropic-shipped, both file-system-resident, both surveyable from outside Claude. Worth thinking about as a stable platform for build-on-top tooling.
5. **Steve Yegge surfaces as a load-bearing voice.** Audit 3 mentioned him; VERIFY-FIRST skipped him. Anthropic's direct citation of Beads-as-inspiration changed the calculus — Anthropic doesn't acknowledge community work this directly often. The page is now ingested with that as the lead.

### Process notes

- **Web Clipper artifact pattern is now fully routine**. Three iterations of "user clips → arrives at `raw/` root → mv-and-rename to `raw/articles/<Author> - <Title>.md`" worked smoothly. Smart quotes in filenames (e.g., `’` in "We're") are the only remaining sharp edge — handled with shell-quoting and a content-aware target name.
- **All three articles cited each other and prior Anthropic docs heavily**, validating the wiki's existing graph: Lance Martin's caching piece cites Thariq; Thariq's Seeing-like-an-Agent cites Lance's PTC piece; Tasks announcement references model capabilities ([[Anthropic Models Overview]]) and inspiration ([[Steve Yegge|Beads]]). The cross-link mesh is dense and verifiable.
- **Pre-ingest takeaway summary went well**. Alessandro's "yup, you got the green light" came after a structural map (5 takeaways per article + 3 page touches per article + 1 new person page + Steve Yegge promotion). The pattern for future paste-driven micro-batches: file-arrival check → read → takeaways summary → green-light → write.

### Wiki at 145 pages (83 sources, 31 concepts, 10 topics, 21 people).

### All round-6 tiers closed

| Tier | Status | New pages |
|---|---|---|
| 1.1 | ✓ closed (this batch) | 3 source pages + 1 person page |
| 1.2 | ✓ closed | 2 source pages |
| 1.3 | ✓ closed | 1 source page (qmd) |
| 2.1 | ✓ closed | 0 (16 cross-link edits) |
| 2.2 | ✓ closed | 0 (4 callouts resolved) |
| 2.3 | ✓ closed | 5 person pages |
| 2.4 | ✓ closed | 2 concept pages |
| 3 | ✓ closed (11 of 17) | 11 source pages |
| 4.1 | ✓ closed | 1 source page (Foundational Papers, 8 papers) |
| 4.2 | ✓ closed (4 of 9) | 4 person pages |
| 5.1 | ✓ closed | 3 topic pages |
| 5.2 + 5.3 | ✓ closed | 2 source pages + 1 ecosystem section |
| Final | ✓ closed | query-readiness pass; 11/11 questions pass |

**Total Round 6 net delta**: 110 → 145 pages (+35 pages over the round). All planned tiers closed. The wiki is queryable across all 11 CLAUDE.md focus-area questions within 1 hop, with primary-source backing for the load-bearing claims.

