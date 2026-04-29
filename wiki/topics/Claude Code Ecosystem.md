---
type: overview
created: 2026-04-26
updated: 2026-04-27
sources: 18
tags: [topic, ecosystem, catalog, hub]
---

# Claude Code Ecosystem

A categorized map of the community resources around [[Claude Code]] — what exists, what's notable, and where to look for what. Built primarily on [[Awesome Claude Code (hesreallyhim)|the awesome-claude-code list]] (the canonical curation layer), enriched with the wiki's deeper-dive notes.

For *how to use* these resources to get better at Claude Code, see [[Getting the Most from Claude Code]] and the focus topics. This page is the *catalog*.

---

## Heavy frameworks (whole-workflow setups)

| Resource | Stars | Strength | Wiki page |
|---|---|---|---|
| **Superpowers** (obra / Jesse Vincent) | 168k | Composable SDLC skills + methodology; bite-sized tasks; subagent-driven dev | [[Superpowers (obra)]] |
| **Everything Claude Code** (Affaan Mustafa) | 167k | **Performance optimization system**; instinct-based learning; AgentShield security | [[Everything Claude Code (affaan-m)]] |
| **Spec Kit** (GitHub) | 91k | **Constitution-first SDD** with 5 commands; cross-tool (30+ AI agents) | [[Spec Kit (github)]] |
| **gstack** (Garry Tan) | 84k | Role-based skills (CEO/designer/engineer/QA/security); multi-vendor coordination | [[gstack (Garry Tan)]] |
| **Get Shit Done** (TÂCHES) | 57k | XML-structured tasks; wave-based parallelization; persistent artifacts | [[Get Shit Done (gsd-build)]] |
| **BMAD-METHOD** | 46k | Scale-adaptive planning; 12+ agent personas; Party Mode | [[BMAD-METHOD]] |
| **OpenSpec** (Fission-AI) | 43k | Lightweight SDD; agreement-first; minimal ceremony | [[OpenSpec (Fission-AI)]] |
| **oh-my-claudecode** (Yeachan Heo) | 31k | Smart model routing (30-50% cost cut); 4 orchestration modes | [[oh-my-claudecode]] |
| **claudekit** (Carl Rannaberg) | — | 20+ specialized subagents; hook-based quality gates; auto-checkpoints | [[claudekit (Carl Rannaberg)]] |
| **Compound Engineering Plugin** (EveryInc) | 16k | 36+ skills + 51+ agents; mistake-into-lesson framework; cross-platform | [[Compound Engineering Plugin]] |
| **Context Engineering Kit** (NeoLabHQ) | — | SDD, SADD, Reflexion, Review, FPF, Kaizen plugins | [[Context Engineering Kit (NeoLabHQ)]] |
| **HumanLayer** | 11k | Human-in-the-loop philosophy; exemplary 60-line CLAUDE.md | [[HumanLayer]] |
| **Claude Code PM (ccpm)** (Ran Aroussi) | — | GitHub-Issues-anchored PM; explicit `depends_on`/`parallel`/`conflicts_with` metadata | [[Claude Code PM (ccpm)]] |
| **ContextKit** (Cihat Gündüz) | — | 4-phase planning methodology; named quality agents per phase | [[ContextKit (Cihat Gunduz)]] |
| **TÂCHES** (glittercowboy) | — | Meta-skills (skill-auditor, hook creation); composable not heavyweight | [[TACHES Claude Code Resources]] |
| **Claude Code Infrastructure Showcase** (diet103) | — | Hooks for intelligent skill activation; 500-line rule | [[Claude Code Infrastructure Showcase (diet103)]] |

All 10 of the comparison-table workflows (per [[shanraisshan Claude Code Best Practice|shanraisshan]]) converge on **Research → Plan → Execute → Review → Ship**. Different naming, same shape. Strong evidence the pattern is load-bearing.

For deciding which to install, see [[Getting the Most from Claude Code|the reading paths]].

---

## Reference / understanding

| Resource | Use for | Wiki page |
|---|---|---|
| **Encyclopedia of Agentic Coding Patterns** (Wolf McNally) | Pattern lookup; antipattern recognition | [[Encyclopedia of Agentic Coding Patterns]] |
| **12 Factor Agents** (HumanLayer) | Foundational principles for production agents | [[12 Factor Agents (HumanLayer)]] |
| **Prompt Engineering Guide** (DAIR.AI) | Canonical LLM-general prompting techniques | [[Prompt Engineering Guide (dair-ai)]] |
| **Claude Code System Prompts** (Piebald-AI) | Understanding Claude Code internals; per-version changelog | [[Claude Code System Prompts (Piebald)]] |
| **Learn Claude Code** (shareAI-lab) | Mental model — building a Claude-Code-like agent from first principles | [[Learn Claude Code (shareAI-lab)]] |
| **Claude HowTo** (luongnv89) | Canonical feature reference; learning roadmap | [[Claude HowTo (luongnv89)]] |
| **Claude Code Tips** (ykdojo) | 45 practical tactics; dense on token efficiency | [[Claude Code Tips (ykdojo)]] |
| **shanraisshan Best Practice** | 82 tips; compiled Boris/Thariq tip docs; 10-workflow comparison | [[shanraisshan Claude Code Best Practice]] |
| **Boris Cherny Tips Compendium** | 7 compiled tweet threads from CC creator | [[Boris Cherny Tips Compendium]] |
| **Thariq Anthropic Skills + Sessions** | Skill design + 1M-context management from Anthropic engineer | [[Thariq Anthropic Skills + Sessions]] |
| **Andrej Karpathy Skills** (forrestchang) | Drop-in CLAUDE.md with the four principles | [[Andrej Karpathy Skills (forrestchang)]] |
| **Matt Pocock Skills** | Vertical slicing, TDD, DDD, individual skill installation | [[Matt Pocock Skills]] |
| **jeffallan claude-skills** | The `/common-ground` assumption-surfacing command + 65 skills | [[jeffallan claude-skills]] |
| **Daniel Rosehill 75+ repos** | Proof CC is general-purpose agentic OS, not coding-only | [[Claude Code Repos Index (Daniel Rosehill)]] |
| **Awesome Claude Code** (hesreallyhim) | Discovery layer; comprehensive catalog | [[Awesome Claude Code (hesreallyhim)]] |
| **Claude Code Templates** (Daniel Avila) | Aggregator + analytics tools; web UI install | [[Claude Code Templates (Daniel Avila)]] |
| **Trail of Bits Security Skills** | Professional skill design from major security firm | [[Trail of Bits Security Skills]] |

---

## Memory and persistence

| Resource | Approach | Wiki page |
|---|---|---|
| **claude-mem** (thedotmack) | Plugin-based persistent memory compression with MCP search | [[claude-mem (thedotmack)]] |
| **Auto Memory** (Anthropic built-in v2.1.59+) | Claude writes notes itself per project | [[Memory]] |

## Codebase context / structural search (the AST-graph category)

A *category* now, with three projects spanning code-only and multimodal corpora:

| Resource | Approach | Wiki page |
|---|---|---|
| **code-review-graph** (tirth8205) | Tree-sitter AST → SQLite graph → 28 MCP tools (blast-radius, semantic search). 8.2× avg / 49× Next.js token reduction. Single-repo. | [[code-review-graph (tirth8205)]] |
| **GitNexus** (Akon Labs) | Tree-sitter AST → LadybugDB graph → 16 MCP tools + 7 resources + 2 prompts. **Multi-repo registry + group contracts**, browser WASM web UI, **Pre+Post hooks** (search-context injection + post-commit staleness detection), Leiden community detection, auto-generated repo-specific skills, Cosign-signed Docker images. 14 languages. | [[GitNexus (abhigyanpatwari)]] |
| **graphify** (Safi Shamsi) | Multimodal: code (Tree-sitter, 25 langs) + papers + images (Claude vision) + video/audio (local Whisper). Leiden topology-only clustering, EXTRACTED/INFERRED/AMBIGUOUS confidence tagging. **15-platform install matrix** (Claude Code, Codex, Cursor, Gemini CLI, Aider, etc.). 71.5× reduction on 52-file mixed corpus. | [[graphify (safishamsi)]] |

## Tool-output filtering (PreToolUse hooks)

| Resource | Approach | Wiki page |
|---|---|---|
| **rtk** (rtk-ai) | PreToolUse hook + 100+ Rust filters compress Bash command output 60-90%. -90% on test runners (cargo test, pytest, go test). 30-min session ~118k → ~24k tokens. Built-in `rtk gain` / `rtk discover` analytics. Cross-platform (12 AI tools). MIT. | [[rtk (rtk-ai)]] |

## Cost / observability tooling

| Resource | Approach | Wiki page |
|---|---|---|
| **ccusage** (ryoppippi) | Originator of the category (13.5k stars, MIT). Lightweight CLI + statusline. Daily/monthly/session/blocks reports. Multi-provider sibling packages (`@ccusage/codex`, `/opencode`, `/pi`, `/amp`, `/mcp`). | [[ccusage (ryoppippi)]] |
| **CodeBurn** (AgentSeal) | TUI + native macOS menubar + CLI. Reads from disk (no API keys). 9 providers (Claude, Codex, Cursor, OpenCode, Pi, OMP, Copilot, +). 13 task categories with **one-shot rate per category**. **`codeburn optimize`** with copy-paste fixes for re-reads, ghost skills, bloated CLAUDE.md, unused MCPs, etc. **Compare** mode. **Yield** (productive vs reverted commits). MIT. | [[CodeBurn (AgentSeal)]] |
| **Claude Code Templates** `--analytics` | Real-time monitoring layer of the Templates ecosystem | [[Claude Code Templates (Daniel Avila)]] |
| **ccflare / ccxray / Claudex / Claude Code Usage Monitor** | Other tools in the category — see [[Token Efficiency#measurement-layer-0-in-detail]] | — |

## Skill collections (community-scale)

The wiki tracks **9 distinct skill / agent collections**. The largest are organized below by domain breadth:

| Collection | Skills/agents | Domain | Wiki page |
|---|---|---|---|
| **Anthropic Skills** (official) | ~21 across 4 categories; 125k stars | Reference + production document skills | [[Anthropic Skills]] |
| **Anthropic Claude Code** (official) | configs/plugins; 119k stars | CLI distribution + canonical plugin examples | [[Anthropic Claude Code]] |
| **claude-skills** (alirezarezvani) | **235+** across 9 domains; 13k stars | Persona-driven; engineering + business + C-level + marketing | [[claude-skills (alirezarezvani)]] |
| **agents** (wshobson) | **184 agents + 150 skills + 98 commands** in 78 plugins; 25 categories | Three-tier model routing (Opus/Sonnet/Haiku per agent) | [[agents (wshobson)]] |
| **claude-scientific-skills** (K-Dense-AI) | **133** | Biology, chemistry, medicine, physics, materials, geospatial — non-developer domain at scale | [[claude-scientific-skills (K-Dense-AI)]] |
| **Matt Pocock Skills** | 18 | TS engineering | [[Matt Pocock Skills]] |
| **Superpowers** (obra) | 14 | Composable workflow + methodology | [[Superpowers (obra)]] |
| **Trail of Bits Security Skills** | 40+ | Security, professional-grade | [[Trail of Bits Security Skills]] |
| **jeffallan claude-skills** | 65 | Eng + meta (`/common-ground`) | [[jeffallan claude-skills]] |
| **gstack** (Garry Tan) | 41+ | Role-based, multi-vendor coordination | [[gstack (Garry Tan)]] |

The pattern: **collections specialize by domain × design philosophy**. There is no canonical skill set; pick by your work shape. For setup-bloat hygiene at this scale, run [[CodeBurn (AgentSeal)|CodeBurn `optimize`]] periodically to detect ghost skills.

## Community resources noted but not deep-dived

These appear in the awesome list and are worth knowing about; the wiki notes them but doesn't have dedicated pages yet:

### Workflows & teams
- **Claude CodePro** (Max Ritter) — Spec-driven workflow, TDD, cross-session memory, semantic search.
- **AB Method** (Ayoub Bensalah) — Spec-driven workflow with sub agents.
- **The Agentic Startup** (Rudolf Schmidt) — Yet-Another-Orchestrator, but uses Output Styles.
- **RIPER Workflow** (Tony Narlock) — Research-Innovate-Plan-Execute-Review.
- **Simone** (Helmi) — PM workflow as documents + processes.

### Tooling
- **Claude Composer** (Mike Bannister) — small enhancements to Claude Code.
- **claude-code-tools** (Prasad Chalasani) — Session continuity, cross-agent handoff Claude↔Codex, Tantivy-powered session search.
- **claude-devtools** (matt1398) — desktop app for session observability.
- **claudekit-style hook collections**: [[Awesome Claude Code (hesreallyhim)|TDD Guard]] (Nizar Selander), Dippy (Lily Dayton, AST-based bash auto-approval), parry (Dmytro Onypko, prompt-injection scanner), Britfix (Talieisin, US→UK English).
- **Container Use** (dagger) — dev environments for coding agents.
- **viwo-cli** / **run-claude-docker** — containerized Claude Code instances.
- **VoiceMode MCP** (Mike Bailey) — voice interaction.
- **stt-mcp-server-linux** (marcindulak) — local STT.

### Orchestrators (multi-agent)
- **Claude Squad**, **Claude Swarm**, **Auto-Claude**, **Claude Code Flow**, **Claude Task Master**, **Happy Coder**, **Ruflo**, **TSK**, **The Agentic Startup**, **sudocode**.

### Skill collections (additional, smaller / not deep-dived)
- **cc-devops-skills** (akin-ozer) — DevOps IaC.
- **Claude Mountaineering Skills** (Dmytro Gaivoronsky) — mountain route research (illustrative of how *anything* can be a skill).
- **Web Assets Generator** (Alon Wolenitz) — favicons, social-media images.
- **`mehdi-lamrani/awesome-claude-skills`** — referenced as "Apache 2.0" in [[Claude Code Templates (Daniel Avila)|Templates]] attribution; **repo currently 404**, possibly renamed or removed.

### CLAUDE.md examples
The awesome list has a section for CLAUDE.md files by language and domain. **pre-commit-hooks** (aRustyDev) is called out as exemplary — "thorough but not verbose, doesn't primarily consist of shouting in all-caps."

### Alternative clients
**Claudable**, **Crystal**, **Omnara**, **claude-tmux**, **claude-esp**. Workflow conveniences over Claude Code; not capability extensions.

### Status lines (low priority for our wiki)
**CCometixLine**, **Claude HUD**, **claude-pace**, **claude-powerline**, **claudia-statusline**, **ccstatusline**.

### Usage monitors
The category has matured — see the **Cost / observability tooling** section above for the two canonical entries with deep-dive pages ([[ccusage (ryoppippi)]], [[CodeBurn (AgentSeal)]]). Other tools without deep-dive pages: **ccflare** / **better-ccflare**, **ccxray**, **Claude Code Usage Monitor**, **Claudex**, **viberank**, **CodexBar** (the macOS-Codex menubar that inspired CodeBurn — repo not currently locatable on its expected GitHub path).

---

## The Ralph Wiggum subsection

Special category from the awesome list — autonomous loops. See [[Ralph Wiggum Technique]] for the concept; the implementations:

- **awesome-ralph** (snwfdhmp) — index
- **Ralph for Claude Code** (Frank Bria) — Bash + tmux framework with circuit breakers
- **Ralph Wiggum Marketer** (Muratcan Koylan)
- **ralph-orchestrator** (mikeyobrien) — Anthropic-cited
- **ralph-wiggum-bdd** (marcindulak)
- **The Ralph Playbook** (Clayton Farr) — the technique guide

---

## Anthropic-official resources

| Resource | Stars | Wiki page |
|---|---|---|
| **anthropics/claude-code** (official CLI distribution + plugins repo) | 119k | [[Anthropic Claude Code]] |
| **anthropics/skills** (official skills repo + spec reference) | 125k | [[Anthropic Skills]] |
| **Anthropic Quickstarts** | — | [[Anthropic Claude Quickstarts]] |
| **Claude Code GitHub Actions** | — | [[Anthropic Claude Code GitHub Action]] |
| **Anthropic Documentation** — code.claude.com/docs/en/overview | — | (linked throughout) |
| **Claude Code Documentation Mirror** (Eric Buess, ericbuess/claude-code-docs) — community-maintained mirror with fast updates | — | — |

---

## Curation philosophy notes

The awesome list's curation model is unusual: only Claude is allowed to submit PRs. Submissions go through a recommendation system. This makes the list itself a Claude-Code-managed artifact — useful proof-of-concept that LLM-curated indices can stay current.

Annotations are opinionated and conversational (humor, asides, occasional skepticism). Treat framings as one curator's judgment.

License: CC BY-NC-ND 4.0 — fork/redistribute with attribution; no modifications, no commercial use. Listed resources have their own licenses (typically MIT).

---

## How this page is meant to be used

When you're looking for "is there a resource for X?":
1. Check the table of heavy frameworks and reference resources first (these have wiki pages).
2. Skim the noted-but-not-deep-dived section.
3. If still not found, go to [[Awesome Claude Code (hesreallyhim)]] directly — it's the canonical discovery layer.
4. If a resource emerges as load-bearing for your work, ask the wiki to deep-dive it (creates a source page + folds into existing concept pages).

---

## Cross-references

- [[Getting the Most from Claude Code]] (the *use* layer; this is the *catalog* layer)
- [[Awesome Claude Code (hesreallyhim)]] (the underlying meta-source)
- All deep-dive source pages
- All concept and topic pages
