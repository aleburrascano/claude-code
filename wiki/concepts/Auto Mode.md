---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [claude-code, auto-mode, permissions, primitive, autonomous]
---

# Auto Mode

A Claude Code permission mode where a **separate classifier model reviews actions before they run**, blocking anything that escalates beyond your request, targets unrecognized infrastructure, or appears driven by hostile content. Replaces manual permission prompts with model-based safety review.

For our wiki's focus on **token efficiency** and **autonomous operation**, Auto Mode is one of the highest-leverage features. It's the answer to "I want to run Claude unattended without `--dangerously-skip-permissions`."

## The problem Auto Mode solves

> Per [Anthropic's engineering deep-dive](https://www.anthropic.com/engineering/claude-code-auto-mode): users approve **93% of permission prompts**, creating approval fatigue that undermines safety.

Anthropic maintains an internal "agentic misbehaviors" log: deleted git branches from misinterpreted instructions, uploaded authentication tokens, attempted production database migrations. The pattern: not malicious, but **overeager** — taking initiative the user didn't intend.

Auto Mode delegates decisions to a model-based classifier — a middle ground between manual review and unrestricted access.

## Two-layer defense architecture

### Output layer: transcript classifier
Model-based classifier (server-configured, **Sonnet 4.6**) evaluates each action before execution.

**Two-stage pipeline**:
1. **Fast single-token filter** decides whether to block
2. **Chain-of-thought reasoning** runs ONLY on flagged actions

This breaks the traditional performance-cost tradeoff by reserving expensive reasoning for genuinely uncertain cases.

### Input layer: prompt-injection probe
Server-side detector scans **tool outputs** for hijacking attempts. When hostile content detected, the probe **adds a warning to the agent's context** before the result is passed along — telling the agent to treat this content as suspect and anchor on what the user actually asked for.

## How it works

Each tool call goes through a fixed decision order:
1. Allow/deny rules → resolve immediately
2. Read-only actions and working-directory file edits → auto-approved (except [protected paths](#protected-paths))
3. Everything else → classifier
4. Classifier blocks → Claude receives the reason, tries an alternative

### The "stripping decision" (important)
The classifier deliberately **never sees the agent's own reasoning or tool outputs**. This prevents the agent from "talking the classifier into making a bad call" through persuasive rationalizations.

> Testing showed including assistant messages actually *decreased* performance on overeagerness detection. The shorter, tool-calls-only transcript was easier to evaluate and left less room for the agent's own framing to influence decisions.

Security benefit: "a model that conceals misaligned reasoning can still be caught here if the resulting action trips a block rule."

## Performance metrics (Anthropic's honest numbers)

| Metric | Stage 1 | After Stage 2 reasoning |
|---|---|---|
| **False positive rate** (benign blocked) | 8.5% | **0.4%** |
| **False negative rate** (dangerous allowed) | 6.6% | **17%** |

The 17% false-negative on real overeager actions is substantial. In most misses, the classifier **correctly identified danger but disagreed about whether user consent covered the specific action's blast radius**. Prompt engineering hasn't improved this without costs exceeding gains.

> "Whether 17% is acceptable depends on what you're comparing against. If you are running --dangerously-skip-permissions, this is a substantial improvement. If you are manually approving every action carefully, it's arguably a regression."

Calibrating expectations: Auto Mode is **better than `--dangerously-skip-permissions`**, but **not as safe as careful manual review**.

## Configurable trusted infrastructure

Rather than hard-coding safety rules, the system uses a templated prompt with three customizable slots:
- The fixed template handles **interpretive logic** (what an action *actually does* vs surface appearance)
- An **"environment" parameter** sets trust boundaries (which domains, cloud buckets, services trusted)
- **Block rules** in 4 categories: destroy-or-exfiltrate, security-posture degradation, cross-trust-boundary, review-bypass attempts

By default, only the current git repository counts as trusted. See [Configure auto mode](https://code.claude.com/docs/en/auto-mode-config) for trusted-infrastructure setup.

## Graceful failure (denials don't halt sessions)

When classifier blocks, agent **doesn't halt** — it recovers and tries safer alternatives. Denials include reasoning + instructions to find alternate paths.

Sessions accumulating **3 consecutive denials or 20 total** escalate to humans. Design makes false positives survivable; blocked action costs a retry, not a killed session.

In **non-interactive mode** (`-p` flag), repeated blocks abort the session (no human to escalate to).

## What's auto-allowed by default

- Local file operations in working directory
- Installing dependencies declared in lock files / manifests
- Reading `.env` and sending credentials **only** to their matching API
- Read-only HTTP requests
- Pushing to the branch you started on, or one Claude created

## What's blocked by default

- Downloading and executing code (`curl | bash`)
- Sending sensitive data to external endpoints
- Production deploys and migrations
- Mass deletion on cloud storage
- Granting IAM or repo permissions
- Modifying shared infrastructure
- Irreversibly destroying pre-existing files
- **Force push, or pushing directly to `main`**

## Boundaries you state in conversation

The classifier treats **conversational boundaries** as block signals. Tell Claude "don't push" or "wait until I review before deploying" — the classifier blocks matching actions even when default rules would allow them.

**Caveat**: boundaries aren't stored as rules. The classifier re-reads them from the transcript on each check. **A boundary can be lost if [context compaction](https://code.claude.com/docs/en/costs#reduce-token-usage) removes the message that stated it.** For a hard guarantee, add a deny rule instead.

## When the classifier blocks

- Each denied action shows a notification + appears in `/permissions` "Recently denied" tab
- Press `r` to retry with manual approval
- **Auto-pause threshold**: 3 consecutive blocks or 20 total → Auto Mode pauses, returns to prompting. Approving the prompted action resumes Auto Mode.
- In non-interactive mode (`-p` flag): repeated blocks abort the session.

Repeated blocks usually mean the classifier lacks context about your infrastructure. Use `/feedback` to report false positives, or have an admin [configure trusted infrastructure](https://code.claude.com/docs/en/auto-mode-config).

## Subagent handling

Auto Mode classifier checks [[Subagents|subagent]] work at three points:
1. **Before subagent starts** — delegated task description evaluated; dangerous tasks blocked at spawn
2. **During subagent execution** — each action goes through classifier (subagent's own `permissionMode` is **ignored**)
3. **After subagent finishes** — full action history reviewed; concerns prepended as security warnings

## Requirements

Auto Mode requires Claude Code v2.1.83+ AND:

- **Plan**: Max, Team, Enterprise, or API. **Not Pro.**
- **Admin** (Team/Enterprise): admin must enable in Claude Code admin settings
- **Model**: Sonnet 4.6, Opus 4.6, Opus 4.7 on Team/Enterprise/API; **Opus 4.7 only on Max**
- **Provider**: Anthropic API only (not Bedrock, Vertex, Foundry)

## Configuration

```bash
claude --permission-mode auto    # at startup
```

Or in [[Memory|settings.json]]:
```json
{ "permissions": { "defaultMode": "auto" } }
```

In CLI, cycle modes with `Shift+Tab`. Auto appears in cycle when account meets requirements.

## What gets dropped on entering Auto Mode

Broad allow rules that grant arbitrary code execution are **dropped**:
- Blanket `Bash(*)` or `PowerShell(*)`
- Wildcarded interpreters (`Bash(python*)`)
- Package-manager run commands
- `Agent` allow rules

Narrow rules (`Bash(npm test)`) carry over. Dropped rules restored on exit.

## Cost / latency

The classifier uses a server-configured model (independent of `/model`). Each check sends transcript portion + pending action — adds a round-trip. Reads and working-directory edits skip the classifier. Overhead comes mainly from shell commands and network ops.

**Classifier calls count toward your token usage.** This is a real cost. Auto Mode trades classifier tokens for prompt fatigue + speed.

## Protected paths (never auto-approved in any mode)

- `.git`, `.vscode`, `.idea`, `.husky`
- `.claude` (except `.claude/commands`, `.claude/agents`, `.claude/skills`, `.claude/worktrees`)
- `.gitconfig`, `.gitmodules`
- `.bashrc`, `.bash_profile`, `.zshrc`, `.zprofile`, `.profile`
- `.ripgreprc`, `.mcp.json`, `.claude.json`

## Auto Mode vs alternatives

| Mode | Auto-approves | Best for |
|---|---|---|
| `default` | Reads only | Sensitive work, getting started |
| `acceptEdits` | + file edits + filesystem commands | Iterating on code you'll review |
| `plan` | Reads only (no edits) | Exploring before changing |
| **`auto`** | **Everything, with classifier** | **Long tasks, parallel agents, prompt-fatigue reduction** |
| `dontAsk` | Only pre-approved tools | Locked-down CI |
| `bypassPermissions` | Everything except protected | Containers/VMs only |

## When Auto Mode is right

- Long autonomous tasks ([[Ralph Wiggum Technique|Ralph loops]], deep research, complex refactors)
- Parallel Claude instances (per [[Boris Cherny Tips Compendium|Boris's Opus 4.7 tips]])
- Reducing prompt fatigue when you trust the general direction

## When Auto Mode is wrong

- Sensitive infrastructure work (production deploys, credential rotation)
- Greenfield prototyping where direction shifts rapidly
- Pro plan (not available)
- Bedrock/Vertex/Foundry deployments (Anthropic API only)

## Related Anthropic resources

- [Auto Mode blog](https://claude.com/blog/auto-mode)
- [Engineering deep dive](https://www.anthropic.com/engineering/claude-code-auto-mode)

## Cross-references

- [[Sandboxing]] — complementary OS-level isolation; pair for defense-in-depth
- [[Hooks]] — classifier doesn't replace `PreToolUse` hooks; both can be active
- [[Subagents]] · [[Token Efficiency]] · [[Reducing Hallucinations]]
- Sources: [[Boris Cherny Tips Compendium]] (Apr 6 tips emphasize Auto Mode); [Anthropic permission-modes docs](https://code.claude.com/docs/en/permission-modes)
