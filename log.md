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

