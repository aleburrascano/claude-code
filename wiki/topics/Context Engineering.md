---
type: topic
created: 2026-04-26
updated: 2026-04-26
sources: 8
tags: [topic, focus, context-engineering, memory, skills]
---

# Context Engineering

The discipline of **shaping what Claude perceives at each turn** so its reasoning is aimed at the right problem with the right information. The deepest of the wiki's focus areas — many other concerns reduce to context engineering done well or poorly.

Per [[Learn Claude Code (shareAI-lab)]]:
> "Trust the model's reasoning, design the world it inhabits."

Context engineering *is* designing the world. [[Memory]], [[Skills]], [[Hooks]], [[Subagents]], [[Slash Commands]] — all of them are levers for what's in context when Claude reasons.

---

## The four context surfaces

| Surface | What it is | Loaded |
|---|---|---|
| **System prompt** | Claude Code's internal instructions + tool descriptions | Always (overhead) |
| **[[Memory\|CLAUDE.md files]]** | Your persistent rules and facts | Always (per session) |
| **Skill / subagent descriptions** | Activation signals | Always (registry) |
| **Conversation** | Messages + tool results | Per turn (grows) |

You control the second three. Each has its own design discipline.

---

## CLAUDE.md design ([[Memory]])

Sections that earn their tokens:
- **Domain language** — what your terms mean in *your* codebase ([[Vertical Slice|DDD ubiquitous language]])
- **Hard rules / guardrails** — "never modify migrations once shipped"
- **Project structure** — where code lives, key commands
- **Standing workflows** — "after fixing a bug, write a regression test"
- **Style / standards** — code style, type strictness, commit format

Sections that *don't* earn their tokens (use [[Skills]] or [[Hooks]] instead):
- Task-specific instructions (skill them)
- Conditional rules ("if Python, do X") (skill or hook)
- Long examples (link out, or progressive disclosure)
- Anything that decays fast (date-stamp or skip)

Per [[Andrej Karpathy Skills (forrestchang)|Karpathy's CLAUDE.md]]: a CLAUDE.md can also encode **operating principles** ([[Karpathy Coding Principles]]) rather than facts. This is among the highest-leverage uses.

---

## Skill design ([[Skills]] + [[Skill Building]])

Skill activation is context engineering. A skill that doesn't fire when needed is invisible context; a skill that fires when *not* needed is poisoning context.

Two activation patterns:
1. **Implicit** — Claude reads the skill registry and decides per-turn. Description quality is everything.
2. **Explicit, hook-driven** — [[Claude Code Infrastructure Showcase (diet103)]]'s `skill-rules.json` + `UserPromptSubmit` hook. Deterministic, auditable.

Pattern 2 is the answer to the "skills just sit there" failure mode.

---

## Hook-injected context ([[Hooks]])

[[claudekit (Carl Rannaberg)]] ships a `codebase-map` hook on `UserPromptSubmit` that injects a project map per turn. Equivalent to "memory, but contextual rather than persistent." Useful for things that:
- Decay fast (file structure, recent commits)
- Apply to *some* turns, not all (project-map only when discussing structure)
- Aren't worth the always-loaded cost of memory

This pattern generalizes to anything: inject only when the prompt warrants it.

---

## Subagent context ([[Subagents]])

Each subagent gets a fresh context. This is *good* — keeps the main agent clean. But it means each subagent must be *given* its context: you pass it a brief, plus relevant files/prior decisions, plus a tool subset.

Per [[Learn Claude Code (shareAI-lab)]] session 4: subagents isolate noise; they prevent reasoning clutter in the main conversation. Use them when the work would otherwise pollute main context with verbose intermediates.

---

## Priming patterns ([[Slash Commands]])

Context-priming commands like `/context-prime`, `/prime`, `/rsi` — load standardized project context at session start. This is a *session start ritual* that complements always-loaded [[Memory]]. Useful for:
- Pulling current state Claude wouldn't otherwise see (recent commits, open PRs)
- Loading on-demand knowledge for specific work types
- Providing a session-specific frame ("today we're working on the auth refactor")

---

## Surfacing hidden assumptions

[[Awesome Claude Code (hesreallyhim)|`/common-ground` (Fullstack Dev Skills, jeffallan)]] surfaces Claude's hidden assumptions about your project. When Claude is wrong, it's often because of an assumption you didn't realize it had made.

Concrete techniques:
- **Ask Claude to list assumptions** before implementing.
- **Have Claude "play back" the spec** in its own words before starting.
- **Use [[TACHES Claude Code Resources|TÂCHES]] `/consider:first-principles`** — name the lens.

---

## On-demand knowledge ([[Learn Claude Code (shareAI-lab)]])

The framework-defining principle:
> "Knowledge arrives on-demand. Load skill files (product docs, API specs) via tool results, not upfront in the system prompt."

Don't dump the entire API spec into [[Memory]]. Build a `look-up-api(name)` skill (or similar) and let Claude fetch on demand. Saves system-prompt budget; lets you have *much more* total knowledge available.

This is the architectural justification for [[Claude Code Infrastructure Showcase (diet103)|the 500-line rule]] and [[Skill Building|progressive disclosure]].

---

## Compaction-aware design ([[Claude Code System Prompts (Piebald)]])

Claude Code compacts long sessions automatically using its own compaction prompt. **What survives compaction is shaped by that prompt** — typically: high-level decisions, recent activity, key state. What doesn't survive: detailed exploration, individual tool outputs, mid-thought tangents.

Implication: if something is critical and the session is long, *write it to [[Memory|CLAUDE.md]] or a doc* before compaction loses it. Don't rely on conversation persistence for load-bearing facts.

---

## Anti-patterns

- **Stuffing everything into [[Memory|CLAUDE.md]]** — see [[Token Efficiency]]; some content belongs in skills/hooks/docs instead.
- **Skill descriptions that don't name trigger conditions** — Claude can't activate what it can't recognize.
- **Multiple skills competing for the same trigger** — Claude picks one, possibly the wrong one. Audit.
- **Never priming, hoping memory is enough** — for fresh sessions on a long-running project, prime explicitly.
- **Subagents without enough brief** — fresh context means *no* shared context; pass what they need.
- **Trusting compaction to preserve key facts** — write them to [[Memory|CLAUDE.md]] or a sidecar doc.

---

## Reading paths

For *practical* context engineering today:
1. Audit your `~/.claude/CLAUDE.md` against the [[Memory]] anti-patterns.
2. Adopt [[Andrej Karpathy Skills (forrestchang)|Karpathy's principles CLAUDE.md]] (drop-in, language-agnostic).
3. Install [[Claude Code Infrastructure Showcase (diet103)]]'s skill-activation pattern.
4. Read [[Claude Code System Prompts (Piebald)]] to understand what's *already* in context.

For deeper grounding:
- [[Learn Claude Code (shareAI-lab)]] sessions 5 (skills/knowledge) and 6 (compaction)
- [[Encyclopedia of Agentic Coding Patterns]] — Context Engineering pattern + the antipatterns

---

## Cross-references

- [[Memory]] · [[Skills]] · [[Hooks]] · [[Subagents]] · [[Slash Commands]] · [[Model Context Protocol]]
- [[Token Efficiency]] · [[Skill Building]] · [[Reducing Hallucinations]]
- Sources: [[Claude Code System Prompts (Piebald)]] · [[Learn Claude Code (shareAI-lab)]] · [[Claude Code Infrastructure Showcase (diet103)]] · [[Context Engineering Kit (NeoLabHQ)]] · [[claudekit (Carl Rannaberg)]] · [[Encyclopedia of Agentic Coding Patterns]] · [[Andrej Karpathy Skills (forrestchang)]] · [[Prompt Engineering Papers Reference]] (academic foundation for context-engineering techniques) · [[Diwank Field Notes]] (constitution-as-document framing for CLAUDE.md design) · [[RIPER Workflow (Tony Narlock)]] (Research phase as structured context-building)
