# Wiki Index

Catalog of every wiki page, organized by type. Updated on every ingest. See [[CLAUDE]] for schema and the wiki's focus areas.

**Total: 110 pages** (63 sources, 29 concepts, 7 topics, 11 people, plus `CLAUDE.md`, `index.md`, `log.md`).

---

## Overviews / Topics

The wiki's deliverable layer — synthesis pages aimed at the focus areas in [[CLAUDE]].

- [[Getting the Most from Claude Code]] — top-level dashboard for the wiki's focus; reading paths by time budget
- [[Claude Code Ecosystem]] — categorized map of community resources around Claude Code (now with 10-workflow comparison table)
- [[Context Engineering]] — shaping what Claude perceives at each turn; 5 decision-points framework
- [[Token Efficiency]] — using tokens well; context rot zones, MCP discipline, 16+ techniques
- [[Reducing Hallucinations]] — 14 structural defenses (Karpathy, TDD, SDD, hooks, Test Time Compute, 12 Factor, Auto Mode, Sandboxing)
- [[Skill Building]] — designing skills that fire and stay maintainable; Thariq's 9 categories + 9 design principles
- [[When to Delegate to Subagents]] — decision framework for context-isolation delegation

---

## People

- [[Affaan Mustafa]] — Anthropic Hackathon winner; creator of Everything Claude Code (140k stars)
- [[Andrej Karpathy]] — AI researcher; originator of LLM coding pitfall observations (full Dec 2025 notes now in wiki)
- [[Boris Cherny]] — Anthropic engineer; creator of Claude Code; 7 compiled tip docs
- [[Daniel Rosehill]] — prolific Claude Code practitioner; 75+ repos across diverse domains
- [[Garry Tan]] — YC President; built gstack (84k stars); role-based skill model
- [[Jesse Vincent]] — founder of Prime Radiant; author of Superpowers
- [[Matt Pocock]] — TypeScript educator; author of mattpocock/skills
- [[shanraisshan]] — canonical curator; compiles Boris/Thariq tip docs; runs related hub repos
- [[Thariq]] — Anthropic engineer; foundational guidance on skills + 1M context management
- [[Vannevar Bush]] — engineer (1890–1974); originator of the Memex concept
- [[Wolf McNally]] — author of the Encyclopedia of Agentic Coding Patterns

---

## Concepts — Claude Code primitives

- [[Claude Code]] — the platform itself; 15+ "Hot" features beyond core primitives
- [[Skills]] — auto-invoked, model-controlled capabilities; full Anthropic docs; Thariq's principles
- [[Subagents]] — specialized AI assistants; Test Time Compute reframing; isolation: "worktree"
- [[Slash Commands]] — user-invoked shortcuts (`/cmd`)
- [[Hooks]] — event-triggered shell commands; full 27+ event taxonomy; 5 handler types; JSON contract
- [[Model Context Protocol]] (MCP) — open protocol for external tool/data access
- [[Plugins]] — bundled distribution; full plugin.json schema; namespacing; cannot distribute rules
- [[Memory]] — CLAUDE.md + `.claude/rules/` (paths) + Auto Memory; constitution-as-document
- [[Checkpoints]] — conversation/code rewind; 30-day persistence; bash-changes NOT tracked
- [[Planning Mode]] — plan-first workflow with explicit approval
- [[Extended Thinking]] — deep-reasoning mode; Opus 4.7 adaptive effort levels
- [[Output Styles]] — system-prompt-modifying response presentation
- [[Auto Mode]] — classifier-based permission auto-approval; two-layer defense; engineering metrics
- [[Sandboxing]] — OS-level filesystem + network isolation; 84% prompt reduction
- [[Routines]] — cloud-hosted scheduled/triggered tasks (Anthropic infra)

---

## Concepts — patterns and techniques

- [[Karpathy Coding Principles]] — the four principles for LLM coding
- [[Test-Driven Development with Claude]] — RED-GREEN-REFACTOR as structural defense
- [[Spec-Driven Development]] (SDD) — spec→plan→execute→verify with gates; Spec Kit constitution-first
- [[Compound Engineering]] — each cycle makes next easier; mistake-into-lesson framework
- [[Vertical Slice]] — end-to-end thin slice as decomposition unit
- [[Ralph Wiggum Technique]] — autonomous loop until done; the joke that works
- [[Test Time Compute]] — multiple uncorrelated context windows beat single agents (Boris)
- [[Verification Loops]] — the umbrella discipline; "highest-leverage thing you can do"
- [[Continuous Learning]] — auto-extract patterns from sessions into reusable skills
- [[Iterative Retrieval]] — progressive context refinement for subagents
- [[Agentic Search vs RAG]] — Boris's claim "agentic search beats RAG for code"
- [[Prompt Engineering Techniques]] — catalog (CoT, ToT, ReAct, Self-Consistency, RAG, etc.)
- [[Second Brain]] — LLM-maintained personal knowledge wiki (the pattern this vault implements)
- [[Memex]] — Vannevar Bush's 1945 personal-knowledge-store vision

---

## Sources

### Foundational + meta
- [[LLM Wiki Idea]] — pattern document this wiki implements
- [[Awesome Claude Code (hesreallyhim)]] — canonical curated list of the entire ecosystem
- [[shanraisshan Claude Code Best Practice]] — comprehensive hub; 82 tips; 10-workflow comparison
- [[Encyclopedia of Agentic Coding Patterns]] — 245-entry pattern compendium (Wolf McNally)
- [[12 Factor Agents (HumanLayer)]] — foundational principles for production AI agents
- [[Prompt Engineering Guide (dair-ai)]] — canonical LLM-general prompting reference
- [[Prompt Engineering Papers Reference]] — research papers catalog (DAIR.AI)

### Anthropic-authoritative + creator/engineer voices
- [[Karpathy LLM Coding Notes (Dec 2025)]] — original Karpathy X post (foundational primary source)
- [[Boris Cherny Tips Compendium]] — 7 compiled tweet threads from CC creator (Jan-Apr 2026)
- [[Thariq Anthropic Skills + Sessions]] — Anthropic engineer on skill design + 1M context (compiled summaries)
- [[Thariq - Seeing like an Agent]] — full article: action-space design philosophy + tool-design as art
- [[Thariq - Prompt Caching Is Everything]] — full article: the architectural rationale for the entire harness
- [[Anthropic Claude Code]] — official `anthropics/claude-code` repo (configs/plugins/installers, 119k stars; not the CLI source)
- [[Anthropic Skills]] — official `anthropics/skills` repo (canonical SKILL.md format + production document skills, 125k stars)
- [[Anthropic Claude Quickstarts]] — official starter projects
- [[Anthropic Claude Code GitHub Action]] — official CI/CD integration
- [[Diwank Field Notes]] — production practitioner perspective; AIDEV-* anchor comments

### Learning resources, indices, templates
- [[Claude HowTo (luongnv89)]] — 10-module learning roadmap; canonical feature reference
- [[Claude Code Templates (Daniel Avila)]] — aggregator + analytics tools; web UI install
- [[Claude Code Repos Index (Daniel Rosehill)]] — 75+ repos showing CC as general-purpose agentic OS

### Discipline files / drop-in CLAUDE.md
- [[Andrej Karpathy Skills (forrestchang)]] — drop-in CLAUDE.md with the four Karpathy principles

### Skill / agent collections
- [[Matt Pocock Skills]] — 18 skills; "real engineering, not vibe coding"
- [[Superpowers (obra)]] — composable skills + methodology by Jesse Vincent
- [[jeffallan claude-skills]] — 65 skills + the `/common-ground` assumption-surfacing command
- [[Trail of Bits Security Skills]] — 40+ professional security skills
- [[claude-skills (alirezarezvani)]] — **235+ skills, 9 domains, 13k stars**; persona-driven; engineering + business + C-level + marketing
- [[agents (wshobson)]] — **184 agents + 150 skills + 98 commands** in 78 plugins; 25 categories; three-tier model routing
- [[claude-scientific-skills (K-Dense-AI)]] — **133 scientific skills** (biology, chemistry, medicine, physics); 100+ scientific DB integrations

### Heavy frameworks (whole-workflow)
- [[Everything Claude Code (affaan-m)]] — agent harness performance optimization (140k stars)
- [[Spec Kit (github)]] — GitHub's spec-driven development toolkit; constitution-first
- [[gstack (Garry Tan)]] — 41+ skills, role-based; multi-vendor coordination via `/pair-agent`
- [[Get Shit Done (gsd-build)]] — XML-structured tasks; wave-based parallelization
- [[BMAD-METHOD]] — scale-adaptive planning; 12+ agent personas; Party Mode
- [[OpenSpec (Fission-AI)]] — lightweight SDD; agreement-first
- [[oh-my-claudecode]] — multi-agent orchestration; smart model routing
- [[claudekit (Carl Rannaberg)]] — 20+ subagents, hook-based quality gates, auto-checkpoints
- [[Compound Engineering Plugin]] — EveryInc's mistake-into-lesson framework; cross-platform
- [[Context Engineering Kit (NeoLabHQ)]] — SDD/SADD, Reflexion, FPF reasoning, Kaizen
- [[Claude Code PM (ccpm)]] — GitHub-Issues-anchored PM with explicit dependency metadata
- [[ContextKit (Cihat Gunduz)]] — 4-phase planning + named quality agents per phase
- [[HumanLayer]] — human-in-the-loop philosophy; exemplary 60-line CLAUDE.md
- [[AB Method]] — incremental missions; mandatory TDD per mission; DDD integration
- [[RIPER Workflow (Tony Narlock)]] — 5 phases with permission boundaries
- [[Simone (Helmi)]] — artifact-generation ecosystem; legacy + MCP variants
- [[The Agentic Startup (Rudolf Schmidt)]] — uses Output Styles; team-based roles
- [[Pilot Shell (formerly Claude CodePro)]] — commercial; Pilot Console + Bot + status line + 15 quality hooks

### Infrastructure / meta-skills / hook tools
- [[Claude Code Infrastructure Showcase (diet103)]] — hooks for intelligent skill activation; 500-line rule
- [[TACHES Claude Code Resources]] — meta-skills (skill-auditor, hook creation), `/consider:*` commands
- [[claude-mem (thedotmack)]] — persistent memory compression plugin; 5 lifecycle hooks; MCP search
- [[code-review-graph (tirth8205)]] — Tree-sitter AST → SQLite graph → 28 MCP tools; 8.2× avg token reduction (49× on Next.js monorepo)
- [[GitNexus (abhigyanpatwari)]] — Tree-sitter AST → LadybugDB → 16 MCP tools + 7 resources + 2 prompts; multi-repo registry; Pre+Post hooks; Leiden communities; auto-generated repo-skills; 14 langs; signed Docker
- [[graphify (safishamsi)]] — multimodal knowledge-graph skill (code + papers + images + video); EXTRACTED/INFERRED/AMBIGUOUS confidence; 15-platform install matrix; 71.5× token reduction on 52-file mixed corpus
- [[rtk (rtk-ai)]] — PreToolUse hook + 100+ Rust filters; compresses Bash output 60-90%; built-in savings analytics
- [[claude-code-tools (Prasad Chalasani)]] — session continuity; cross-agent handoff CC↔Codex; Rust/Tantivy search
- [[HCOM (Claude Hook Comms)]] — multi-agent comms via hooks-as-message-bus
- [[TDD Guard (Nizar Selander)]] — hooks-driven TDD enforcement
- [[parry-guard (Dmytro Onypko)]] — prompt injection scanner with 6 detection layers
- [[Dippy (Lily Dayton)]] — AST-based bash auto-approval

### Cost / token observability
- [[ccusage (ryoppippi)]] — originator of CC cost-observability lineage (13.5k stars, MIT); CLI + statusline; multi-provider sibling packages
- [[CodeBurn (AgentSeal)]] — TUI dashboard + macOS menubar; 9 providers; **`codeburn optimize`** with copy-paste fixes for re-reads, ghost skills, bloated CLAUDE.md, unused MCPs; one-shot rate per task category; Compare + Yield modes

### Reference / understanding internals
- [[Claude Code System Prompts (Piebald)]] — version-tracked extraction of CC's actual system prompts
- [[Learn Claude Code (shareAI-lab)]] — reverse-engineered minimal Claude Code in ~500 lines/session

### Practical tactics
- [[Claude Code Tips (ykdojo)]] — 45 practical tips on context, tokens, multi-model, containers
