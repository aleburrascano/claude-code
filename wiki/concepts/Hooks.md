---
type: concept
created: 2026-04-26
updated: 2026-04-27
sources: 9
tags: [claude-code, hooks, primitive, event-driven, automation, guardrails, context-injection]
---

# Hooks

Event-triggered shell commands that execute automatically in response to Claude Code lifecycle events. Configured in `settings.json`. The most powerful primitive for **guardrails, quality gates, and workflow automation**.

## Configuration

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Write",
      "hooks": ["~/.claude/hooks/format-code.sh"]
    }],
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": ["~/.claude/hooks/security-scan.sh"]
    }]
  }
}
```

Hook scripts can read structured JSON from stdin (the event payload) and write structured JSON to stdout to influence Claude's behavior (block the action, suggest alternatives, inject context).

## Hook taxonomy (full 27+ events per Anthropic docs)

### Session-level (once per session)
- **SessionStart** — session begins or resumes
- **SessionEnd** — session terminates

### Per-turn events (once per user prompt)
- **UserPromptSubmit** — before Claude processes a prompt; can block, can inject context
- **UserPromptExpansion** — when slash commands expand into prompts
- **Stop** — when Claude finishes responding; can nudge to continue
- **StopFailure** — turn ends due to API error

### Agentic loop (every tool call)
- **PreToolUse** — before tool execution; can block
- **PermissionRequest** — when permission dialog appears
- **PermissionDenied** — when tool denied by [[Auto Mode]] classifier
- **PostToolUse** — after successful tool completion
- **PostToolUseFailure** — when tool execution fails
- **PostToolBatch** — after parallel tool batch resolves

### Compaction events
- **PreCompact** (can block) — prevent compaction
- **PostCompact** — react after compaction; no blocking

### Subagent + task events
- **SubagentStart**, **SubagentStop**
- **TaskCreated**, **TaskCompleted**
- **TeammateIdle** — agent team idle detection

### Lifecycle / async
- **Notification**
- **WorktreeCreate**, **WorktreeRemove**
- **CwdChanged**, **FileChanged**
- **InstructionsLoaded** — observe when CLAUDE.md / `.claude/rules` loaded; audit-only (no blocking)
- **ConfigChange**
- **Elicitation**, **ElicitationResult** — MCP server user input

## 5 handler types (per Anthropic docs)

| Type | What it does |
|---|---|
| **`command`** | Run a shell script. Receives JSON on stdin; returns decisions via exit codes + stdout. Most common. |
| **`http`** | POST JSON to a URL; parse 2xx response bodies as decisions. |
| **`mcp_tool`** | Call a tool on a connected MCP server. |
| **`prompt`** | Send a prompt to Claude for yes/no evaluation (fast model by default). |
| **`agent`** | Spawn a subagent with tool access for verification logic (experimental). |

The variety is significant. **`prompt` and `agent` handler types are unique to Claude Code** and rarely seen in other event-driven systems — they're hooks that themselves use AI judgment.

## Hook input contract (JSON on stdin)

Common fields all hooks receive:
```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/current/working/directory",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "agent_id": "optional-subagent-id",
  "agent_type": "optional-agent-name"
}
```

Plus event-specific fields (e.g., `tool_name`, `tool_input` for tool events; `prompt` for `UserPromptSubmit`).

## Hook output contract (JSON on stdout, exit code 0)

```json
{
  "continue": true,
  "suppressOutput": false,
  "systemMessage": "Warning text",
  "decision": "block",
  "reason": "Why blocked",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Policy violation",
    "additionalContext": "For Claude to see"
  }
}
```

For `PreToolUse` specifically, can also return `updatedInput` (modify the action) and `additionalContext` (inject context for Claude).

## Exit code semantics (Unix convention flipped — important)

- **Exit 0** — Success. JSON stdout parsed for structured output.
- **Exit 2** — **Blocking error.** Stderr fed to Claude/user; action prevented.
- **Other (e.g. exit 1)** — Non-blocking error. First stderr line shown in transcript.

> ⚠️ **Common mistake**: exit 1 doesn't block. Use **exit 2** for enforcement.

## Matcher patterns

| Pattern | Meaning |
|---|---|
| `"*"` or empty | Match all |
| Letters/digits/`_`/`\|` | Exact or pipe-separated (`Bash` or `Edit\|Write`) |
| Other characters | Regex (`^Notebook`, `mcp__memory__.*`) |

Tool events match on `tool_name`; `SessionStart` on `source`; `Notification` on type.

## Scope hierarchy

Hooks defined at multiple layers (later overrides earlier... or, where merged, additive):
- `~/.claude/settings.json` (user-wide)
- `.claude/settings.json` (project)
- `.claude/settings.local.json` (project, gitignored)
- Managed policy settings (org-wide)
- Plugin `hooks/hooks.json` (when plugin enabled)
- Skill / agent frontmatter (scoped to component lifetime — see [[Skills]])

## Path variables for scripts

- `$CLAUDE_PROJECT_DIR` — project root
- `${CLAUDE_PLUGIN_ROOT}` — plugin root (when in plugin)
- `${CLAUDE_PLUGIN_DATA}` — stable storage across upgrades

Use these in hook commands so scripts are portable.

## Cache-preserving hook design (the `<system-reminder>` pattern)

Per [[Thariq - Prompt Caching Is Everything|Thariq]]: when injecting runtime info via hooks, **use messages, not system-prompt edits**. Editing the system prompt breaks the cache for the entire conversation.

**The right pattern**: `UserPromptSubmit` hook returns `additionalContext` in `hookSpecificOutput`. This injects via the next user message — cache-preserving.

**The wrong pattern**: hook scripts that modify `~/.claude/CLAUDE.md` or settings to inject context — every modification invalidates the cache.

The `<system-reminder>` tag itself is Anthropic's internal pattern for this: it's how Claude Code injects "it is now Wednesday" or current todo list status without breaking the cached prefix. Lift this pattern when designing your own hooks.

## High-leverage use cases

### Quality gates ([[claudekit (Carl Rannaberg)]])
| Event | Hook | What it does |
|---|---|---|
| PreToolUse | file-guard | Blocks sensitive file access |
| PostToolUse | typecheck-changed | Runs `tsc` on changed files |
| PostToolUse | lint-changed | Runs linter |
| PostToolUse | test-changed | Runs tests for modified code |
| PostToolUse | check-any-changed | Blocks TypeScript `any` |
| Stop | self-review | Pre-finish quality check |
| Stop | project-wide validation | End-of-session sweep |

### Intelligent skill activation ([[Claude Code Infrastructure Showcase (diet103)]])
**UserPromptSubmit** hook reads a `skill-rules.json`, matches against prompt + file context, and injects suggestions about which [[Skills]] are relevant. **PostToolUse** logs tool usage to refine future activations.

This pattern is the answer to the "skills just sit there" problem. See [[Skill Building]].

### Context injection per turn ([[claudekit (Carl Rannaberg)]] codebase-map)
**UserPromptSubmit** hook injects a project map into the conversation, giving Claude per-turn structural context without requiring it to re-explore.

### Reasoning depth control ([[claudekit (Carl Rannaberg)]] thinking-level)
**UserPromptSubmit** hook adjusts `thinking_level` based on prompt content, enabling [[Extended Thinking]] only when warranted. Token efficiency lever.

### Auto-checkpointing ([[claudekit (Carl Rannaberg)]] create-checkpoint)
**Stop** / **SubagentStop** hooks auto-save git state, enabling rewind/restore via [[Checkpoints]].

### Git guardrails ([[Matt Pocock Skills|`mattpocock/skills/git-guardrails-claude-code`]])
**PreToolUse** hooks blocking dangerous git commands (push, reset --hard, clean) before they execute. Better than relying on user vigilance.

### Bash safety ([[Claude Code Tips (ykdojo)|cc-safe]] + Dippy + parry)
- **cc-safe** — scans approved commands for risky patterns (`rm -rf`, `sudo`, `docker --privileged`)
- **Dippy** — auto-approves safe bash via AST parsing, prompts for destructive
- **parry** — prompt-injection scanner for tool inputs/outputs

## Hook performance discipline ([[claudekit (Carl Rannaberg)]])

Hooks run synchronously. Slow hooks degrade the workflow. claudekit profiles hooks and warns when any hook exceeds 5s. **Rule of thumb**: hooks should be sub-second; if they're not, push the work to a background process or async job.

## SDKs for writing hooks

- **cchooks** (Python, GowayLee) — clean API, good docs
- **claude-code-hooks-sdk** (Laravel-inspired PHP, beyondcode)
- **claude-hooks** (TypeScript, John Lindquist)

These provide structured request/response handling so you don't write JSON parsing boilerplate.

## Session-based disable ([[claudekit (Carl Rannaberg)]])

Hooks can be temporarily disabled within a single session without modifying config — for cases like token profiling or special workflows. Important escape valve.

## Anti-patterns

- **Hooks that should be skills** — if activation depends on prompt *meaning*, it's a [[Skills|skill]] (model-controlled). Hooks are for *deterministic* event responses.
- **Slow hooks** — anything >5s is a bug. claudekit profiles hooks and warns at 5s threshold.
- **Silent failure hooks** — failing hook without surfacing produces ghost behavior. Log + exit-code properly.
- **Hooks that modify untracked state** — make side effects auditable; don't quietly mutate things Claude doesn't know about.
- **Exit code 1 expecting to block** — won't work; use **exit 2**.
- **Shell profile printing on startup** — breaks JSON parsing. Redirect to `/dev/null`.
- **Storing secrets in settings files** — use environment variables; interpolate with `allowedEnvVars`.
- **Slow synchronous PreToolUse** — use `async` command field if available, or push work to background process.
- **Complex logic in `if` matcher conditions** — use separate hooks instead.

## The claude-mem 5-hook pattern ([[claude-mem (thedotmack)]])

Reference implementation of full lifecycle hook usage:

| Event | Hook | Purpose |
|---|---|---|
| **SessionStart** | load context | Load relevant past observations |
| **UserPromptSubmit** | inject context | Inject memory relevant to current prompt |
| **PostToolUse** | capture observations | Record tool usage as memory entries |
| **Stop** | generate summaries | Distill session into observations |
| **SessionEnd** | finalize storage | Persist final state |

This is among the cleanest examples of using hooks for cross-session memory. Worth studying as architectural pattern even if you don't adopt claude-mem itself.

## Hooks as transparent transforms (the broader pattern)

Beyond guardrails, hooks are a general-purpose **deterministic-transform-at-turn-boundary** primitive. The wiki now tracks four distinct objectives, all using the same plumbing:

| Hook event | Pattern | Example | Objective |
|---|---|---|---|
| **PreToolUse** | Rewrite the call | [[rtk (rtk-ai)]] (`git status` → `rtk git status`) | **Compression** — Bash output 60-90% smaller |
| **PostToolUse** | Compress the result | [[claude-mem (thedotmack)]] (record observations) | **Compression** — cross-session memory |
| **PreToolUse / SessionStart** | Inject relevant context | [[GitNexus (abhigyanpatwari)]] (read GRAPH_REPORT before grep), [[graphify (safishamsi)]] (rule injection before file-read tools) | **Context injection** — agent navigates by structure, not keywords |
| **PostToolUse on commits** | Detect drift, prompt recovery | [[GitNexus (abhigyanpatwari)]] (post-commit stale-index detection) | **Freshness / maintenance** — keep derived state in sync |

All four are **transparent to Claude** — neither pattern requires Claude to know the hook is there. All four pay latency outside the LLM's perception. **The same primitive serves four orthogonal objectives** — compression, guardrails, context injection, freshness.

### Context injection vs system-prompt edits

GitNexus and graphify both use **PreToolUse hooks before search/read tools** to inject "knowledge graph exists, read GRAPH_REPORT.md first." This is a **rule-injection-via-hook-message** pattern, distinct from:

- **`alwaysApply: true` rules files** (Cursor `.cursor/rules/*.mdc`, Kiro `.kiro/steering/`, Antigravity `.agents/rules/`) — included automatically every session, no hook plumbing needed
- **`AGENTS.md` / `CLAUDE.md` augmentation** — same mechanism, project-level always-on file
- **`<system-reminder>` injection** — Anthropic's internal cache-preserving message-injection pattern

When the platform supports hooks, hook-based injection is more *targeted* (fires only before specific tools, e.g. Glob/Grep). When the platform doesn't (Aider, Trae, Hermes, OpenClaw, Antigravity for Web), `AGENTS.md` becomes the always-on substitute. graphify's 15-platform install matrix maps both options across the AI-coding-tool landscape — see [[graphify (safishamsi)|graphify install table]].

### Freshness as a hook objective

GitNexus's PostToolUse hook fires after commits, compares changed files against the indexed snapshot, and prompts the agent to reindex if drift exceeds threshold. **The hook isn't compressing or guarding — it's keeping derived state coherent**. This is novel relative to the other patterns: hooks for *eventual consistency between live filesystem and cached index*.

**Generalization**: anywhere there's a deterministic transform between agent and world (compression), a deterministic guard (guardrails), a deterministic enrichment (context injection), or a deterministic consistency check (freshness), a hook can perform it without touching the agent's logic.

For RTK specifically, the PreToolUse hook reads `tool_name == "Bash"` from the JSON input, rewrites the command via `updatedInput`, and lets the rewritten call flow through. The agent never sees the original — only the filtered output. See [[rtk (rtk-ai)]] for full mechanics.

See also [[Token Efficiency#13 Hooks-as-token-efficiency-lever (the pattern)]] for the cross-cutting framing.

## The `/hooks` menu

Run `/hooks` to:
- Verify hook configuration
- Check source layer (which settings file)
- Inspect handler details

Useful for debugging "why isn't my hook firing."

## What hooks are *not*

- Not [[Skills]] (model-controlled, contextual)
- Not [[Slash Commands]] (user-invoked)
- Not [[Subagents]] (isolated agent contexts)
- Not [[Plugins]] (plugins can *include* hooks, but the primitive is the event handler)

## Cross-references

- [[Skills]] · [[Subagents]] · [[Plugins]] · [[Checkpoints]] · [[Memory]]
- [[Skill Building]] · [[Reducing Hallucinations]]
- Sources: [[claudekit (Carl Rannaberg)]] (extensive hook library) · [[Claude Code Infrastructure Showcase (diet103)]] (skill-activation pattern) · [[Claude HowTo (luongnv89)]] (taxonomy) · [[Matt Pocock Skills]] (git guardrails) · [[claude-mem (thedotmack)]] (PostToolUse memory compression) · [[rtk (rtk-ai)]] (PreToolUse output filtering) · [[GitNexus (abhigyanpatwari)]] (Pre+Post: context injection + freshness) · [[graphify (safishamsi)]] (PreToolUse rule injection across 15 platforms)
