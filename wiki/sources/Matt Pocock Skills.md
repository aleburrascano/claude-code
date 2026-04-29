---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, skills, tdd, ddd, planning]
source_path: raw/repos/mattpocock-skills.md
source_date: 2026-04-26
source_author: Matt Pocock
source_url: https://github.com/mattpocock/skills
---

# Matt Pocock Skills

[[Matt Pocock]]'s personal directory of Claude Code skills, framed explicitly as "agent skills for **real engineers** — not vibe coders." 18 skills across four phases of the SDLC, each installable individually via `npx skills@latest add mattpocock/skills/<name>`.

## What's in it

### Planning & Design
- **to-prd** — Synthesize the current conversation into a PRD and file it as a GitHub issue. No interview — just compresses what's already been discussed.
- **to-issues** — Break a plan/spec/PRD into independently-grabbable GitHub issues using **vertical slices** ([[Vertical Slice]]).
- **grill-me** — Have the agent relentlessly interview you about a plan until every branch of the decision tree is resolved.
- **design-an-interface** — Generate multiple radically different interface designs for a module by spawning parallel sub-agents.
- **request-refactor-plan** — Build a detailed refactor plan with **tiny commits** via interview, then file as a GitHub issue.

### Development
- **tdd** — Red-green-refactor loop. One vertical slice at a time. Builds features or fixes bugs.
- **triage-issue** — Investigate a bug by exploring the codebase, identify root cause, file a GitHub issue with a TDD-based fix plan.
- **improve-codebase-architecture** — Find deepening opportunities, informed by `CONTEXT.md` domain language and `docs/adr/` decisions.
- **migrate-to-shoehorn** — Migrate test files from `as` type assertions to @total-typescript/shoehorn.
- **scaffold-exercises** — Create exercise directory structures with sections, problems, solutions, explainers.

### Tooling & Setup
- **setup-pre-commit** — Husky + lint-staged + Prettier + type checking + tests.
- **git-guardrails-claude-code** — Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean).

### Writing & Knowledge
- **write-a-skill** — Create new skills with proper structure, **progressive disclosure**, and bundled resources. (Meta-skill — directly relevant to [[Skill Building]].)
- **edit-article** — Restructure sections, improve clarity, tighten prose.
- **ubiquitous-language** — Extract a DDD-style ubiquitous language glossary from the current conversation.
- **obsidian-vault** — Search, create, and manage notes in an Obsidian vault with wikilinks and index notes. (Notable for our setup — Pocock has tooling for this exact pattern.)

## Notable patterns

- **Vertical slicing as a default decomposition strategy** — both `to-issues` and `tdd` operate on one vertical slice at a time. See [[Vertical Slice]].
- **Conversation-as-source** — `to-prd`, `to-issues`, and `ubiquitous-language` all extract structure from the current conversation rather than asking you to fill out forms. The conversation is treated as the spec; the skill is the compiler.
- **Meta-skills** — `write-a-skill` is a skill for writing skills, with explicit guidance on **progressive disclosure** and bundled resources. Cross-reference [[Skill Building]] and [[TACHES Claude Code Resources]] (which has more meta-skills).
- **Guardrails over permissions** — `git-guardrails-claude-code` shows a hook-based approach to safety (block destructive commands at the [[Hooks|PreToolUse]] level) rather than relying on the user's permission prompts.

## Author framing

The "real engineers, not vibe coding" line in the README is doing real work — Pocock is signaling that these skills assume software-engineering discipline (PRDs, TDD, DDD, vertical slices, type-safety). This contrasts with skill collections aimed at one-shot generation. The skills are tools for *sustained* engineering work where context, decisions, and architecture matter.

## Distribution

Skills are installed individually via the `npx skills@latest add <author>/<repo>/<skill>` pattern. This is a notable distribution model — finer-grained than installing a whole plugin.

Cross-references: [[Matt Pocock]] · [[Skill Building]] · [[Vertical Slice]] · [[Test-Driven Development with Claude]] · [[Skills]] · [[Claude Code Ecosystem]]
