---
type: concept
created: 2026-04-29
updated: 2026-04-29
sources: 6
tags: [claude-code, permissions, primitive, autonomy, security, decision-framework]
aliases: [Permission Mode, Permission Model]
---

# Permission Modes

Claude Code's framework for deciding **which actions require human approval**. Modes range from "ask for everything" to "ask for nothing"; the right choice depends on the task, the environment, and how much you trust the agent.

The taxonomy is currently scattered across [[Auto Mode]], [[Planning Mode]], and [[Subagents]]. This page is the unified reference.

## The five modes

| Mode | What it asks about | When | Anthropic API only? |
|---|---|---|---|
| **Default (manual)** | Every non-read-only tool call | Sensitive work, unfamiliar territory | No |
| **[[Planning Mode]]** | All actions deferred — read-only allowed; edits + Bash gated until you exit plan mode | Designing changes; want to review before any execution | No |
| **`acceptEdits`** | File edits auto-approved within working dir; Bash and other tools still ask | Fast-iterating in a known codebase | No |
| **[[Auto Mode]]** | Server-side classifier reviews each action; blocks scope-escalation, hostile-content-driven ops, unrecognized infra targeting | Long autonomous runs, parallel agents, low oversight | **Yes** (Anthropic API; not Bedrock/Vertex/Foundry) |
| **`bypassPermissions`** (`--dangerously-skip-permissions`) | Nothing | Sandboxed environments only | No |

## The decision tree

```
What's the blast radius if Claude makes a mistake here?
  Catastrophic (production deploy, credential rotation):
    → Default (manual). No exceptions. No automation.
  High but recoverable (modifies main branch, touches shared infra):
    → Planning Mode for the design phase
    → Default (manual) for execution, OR Auto Mode if you trust the spec
  Medium (local feature work, contained changes):
    → acceptEdits if iterating fast in a known codebase
    → Default (manual) if learning the codebase
  Low (sandbox, scratch repo, throwaway):
    → Auto Mode for autonomous loops
    → bypassPermissions only if fully sandboxed via Sandboxing or container

Are you running parallel agents?
  → Auto Mode is essential — manual approval doesn't scale across N agents

Is the work going to span 2+ hours unattended?
  → Auto Mode (with Planning Mode for the design phase before kicking it off)

Are you on Bedrock/Vertex/Foundry?
  → Auto Mode unavailable. Use Default + Planning Mode + [[Hooks]] for guardrails
    + [[Dippy (Lily Dayton)]] for AST-based bash auto-approval
    + [[parry-guard (Dmytro Onypko)]] for prompt-injection defense
```

## How modes interact with hooks

Hooks run **regardless of permission mode**. A `PreToolUse` hook returning exit 2 blocks the action even in `bypassPermissions`. This is the right architecture: permission mode controls Claude's prompts to *you*; hooks control what's actually allowed to execute.

Common hook-based augmentations per mode:

| Mode | Hook augmentation pattern | Reference |
|---|---|---|
| Default | None — manual prompts already exist | — |
| Planning Mode | `PreToolUse` hook injecting plan-context into tool calls | [[Planning Mode]] |
| `acceptEdits` | `PreToolUse` hook on `Bash` for git-guardrails | [[Matt Pocock Skills]] |
| Auto Mode | `PreToolUse` hooks for prompt-injection scanning | [[parry-guard (Dmytro Onypko)]] |
| `bypassPermissions` | Heavy hook stack: TDD enforcement + bash AST + injection scan | [[TDD Guard (Nizar Selander)]] + [[Dippy (Lily Dayton)]] + [[parry-guard (Dmytro Onypko)]] |

## How modes interact with sandboxing

[[Sandboxing]] (filesystem + network isolation) is **orthogonal** to permission modes. Sandboxing limits what an action *can do*; permission mode controls *whether you're asked* before it tries.

Strongest defense-in-depth:
- Sandboxing on (limits damage from any executed action)
- Auto Mode (classifier blocks scope-escalation)
- Hooks (deterministic guardrails for known patterns)

Per Anthropic's engineering data: sandboxing alone produces an **84% reduction** in permission prompts (most prompts were for actions that would have been safe under sandboxing). Pair with Auto Mode and the prompt fatigue problem essentially goes away.

## Mode-as-state-as-tool (the cache-preserving design)

Per [[Thariq - Prompt Caching Is Everything]] and [[Action Space Design]]: permission mode transitions are designed as **tools the agent itself can call** (`EnterPlanMode`, `ExitPlanMode`), not as toolset swaps.

Why: swapping toolsets per mode would invalidate the cache for the entire conversation. With state-as-tools, the cached prefix stays stable; only the model's tool-call history changes.

Implication for plugin/skill authors: don't try to "switch modes" by reconfiguring tools. Either (a) use the existing mode-tools, or (b) design new state-as-tools following the same pattern.

## Subagent-scoped permissions

Per [[Subagents]]: a subagent inherits the parent's permission mode by default but can have its tools restricted in frontmatter (`tools: [Read, Grep]`). Combined with Auto Mode, you can run high-autonomy subagents without granting them write access. The classifier sees the smaller tool set; effective permission surface shrinks.

Pattern: research subagents with `tools: [Read, Grep, WebFetch]` are effectively read-only by construction, regardless of parent mode.

## Anti-patterns

- **`--dangerously-skip-permissions` outside a sandbox.** Defeats the entire model. Pair with [[Sandboxing]] or a container, or don't use.
- **Auto Mode for catastrophic operations.** The classifier is a reduction in approval-ask, not a substitute for human judgment on irreversible actions.
- **Default mode for long autonomous runs.** Approval fatigue → 93% rubber-stamping → the prompts become noise. Use Auto Mode or Planning Mode + Auto Mode for the execution phase.
- **Planning Mode without exit discipline.** Plans that never execute are debt; plans that execute autonomously without review are risk. Define your exit criteria.
- **Mixing Auto Mode with `--dangerously-skip-permissions`.** Auto Mode is meaningless if you've also disabled all checks. Pick a coherent posture.
- **Trusting Auto Mode on Bedrock/Vertex/Foundry.** It's not available there. Build hook-based equivalents instead.

## Permission persistence

Per [[Auto Mode]] docs: approved permissions persist within session by default. Re-prompts on session restart unless explicitly added to allow-rules. This means:

- A risky pattern approved in one session doesn't carry to the next *automatically* — good for safety
- But you'll re-approve things across session boundaries — adjust by adding stable patterns to `.claude/settings.json` `permissions.allow`

The allow-list is also where Auto Mode customization lives: explicit allow rules short-circuit the classifier (and run faster).

## Cross-references

- [[Auto Mode]] (the classifier-based mode in detail)
- [[Planning Mode]] (the design-then-execute mode in detail)
- [[Sandboxing]] (orthogonal isolation layer)
- [[Hooks]] (mode-agnostic guardrails)
- [[Subagents]] (subagent-scoped permission inheritance)
- [[Action Space Design]] (mode-as-state-as-tool design pattern)
- [[Reducing Hallucinations]] (modes are a structural defense layer)
- Sources: [[Boris Cherny Tips Compendium]] (Apr 6 Auto Mode emphasis) · [[Thariq - Prompt Caching Is Everything]] (state-as-tools rationale) · [[Dippy (Lily Dayton)]] (cross-platform Bash auto-approval) · [[parry-guard (Dmytro Onypko)]] (prompt-injection layer) · [Anthropic Permission Modes docs](https://code.claude.com/docs/en/permission-modes) · [Auto Mode engineering blog](https://www.anthropic.com/engineering/claude-code-auto-mode)
