---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 5
tags: [claude-code, plugins, primitive, distribution, bundle]
---

# Plugins

Bundled collections of [[Slash Commands]], [[Subagents]], [[Skills]], [[Hooks]], and [[Model Context Protocol|MCP]] configurations distributed as a single installable unit. The most user-friendly **distribution format** for Claude Code extensions.

## Installation pattern

### From a marketplace
```
/plugin marketplace add <user>/<repo>
/plugin install <plugin-name>@<marketplace>
```

Example:
```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

### From a marketplace already added
```
/plugin install <plugin-name>
```

### Cross-platform variants
Some plugins (e.g., [[Compound Engineering Plugin]]) support installation across Cursor, Codex, Copilot, and others via marketplace abstraction or `bunx` converters.

## Anatomy of a plugin (full Anthropic spec)

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # required manifest
├── skills/
│   └── <name>/SKILL.md      # skills (per skill: folder + SKILL.md)
├── commands/                # legacy — slash commands as flat .md
├── agents/                  # subagent definitions
├── hooks/
│   └── hooks.json           # hooks config (auto-loaded; do NOT add hooks: to plugin.json)
├── .mcp.json                # MCP server configs
├── .lsp.json                # LSP server configs (code intelligence)
├── monitors/
│   └── monitors.json        # background monitors
├── bin/                     # executables added to PATH while plugin enabled
├── settings.json            # default settings (only `agent` and `subagentStatusLine` keys)
└── output-styles/           # optional output styles
```

**Common mistake**: Don't put `commands/`, `agents/`, `skills/`, or `hooks/` inside `.claude-plugin/`. Only `plugin.json` goes inside `.claude-plugin/`. All other directories at plugin root.

## `plugin.json` schema

```json
{
  "name": "my-plugin",
  "description": "Shown in plugin manager when browsing/installing",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

| Field | Purpose |
|---|---|
| `name` | Unique identifier AND skill namespace (`/my-plugin:hello`) |
| `description` | Shown in plugin manager |
| `version` | Optional. Users only get updates when bumped. If omitted + git distributed, commit SHA used (every commit = new version). |
| `author` | Optional, helpful for attribution |

Additional optional fields: `homepage`, `repository`, `license`.

## Plugin namespacing

Plugin skills are **always namespaced**: `/plugin-name:hello`. Prevents conflicts when multiple plugins have skills with the same name. To change the namespace, update `name` in `plugin.json`.

This contrasts with standalone configurations (`.claude/`) which use plain names (`/hello`).

## Standalone vs plugin (when to use which)

| | Standalone (`.claude/`) | Plugin |
|---|---|---|
| Skill names | `/hello` | `/plugin-name:hello` |
| Best for | Personal workflows, project-specific, quick experiments | Sharing with teammates, distributing to community, versioned releases, reusable across projects |

> Per Anthropic: "Start with standalone configuration in `.claude/` for quick iteration, then convert to a plugin when you're ready to share."

## Development workflow

```bash
# Test locally without installing
claude --plugin-dir ./my-plugin

# Multiple plugins at once
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two

# Reload after edits (no restart needed)
/reload-plugins
```

When `--plugin-dir` plugin shares name with installed marketplace plugin, **the local copy takes precedence** for that session. Lets you test changes without uninstalling.

## What plugins CANNOT distribute

> Per Anthropic upstream: **rules cannot be distributed via plugins.**

If your plugin needs `.claude/rules/` files installed, document the manual copy step in your README. ECC's install guidance handles this carefully (see [[Everything Claude Code (affaan-m)]]).

This is the most-cited limitation in the ecosystem. Many heavy frameworks need rules + plugin + manual setup combination.

## When to ship as a plugin vs alternatives

| Distribution | Best for |
|---|---|
| **Plugin** | Multi-primitive bundles meant to be installed wholesale |
| **`npx skills add`** ([[Matt Pocock Skills]] style) | Fine-grained, single-skill installation |
| **CLAUDE.md snippet** ([[Andrej Karpathy Skills (forrestchang)|Karpathy skills]] style) | Just principles or prose; no tools |
| **Manual repo + `cp` instructions** | Reference implementations the user adapts |

## Notable plugin examples in the wiki

- **Compound Engineering** ([[Compound Engineering Plugin]]) — 36+ skills + 51+ agents, cross-platform
- **Superpowers** ([[Superpowers (obra)]]) — composable skills framework + methodology
- **Context Engineering Kit** ([[Context Engineering Kit (NeoLabHQ)]]) — marketplace of specialized plugins (SDD, SADD, Reflexion, Review, FPF, Kaizen, etc.)
- **claudekit** ([[claudekit (Carl Rannaberg)]]) — npm-distributed (not marketplace), but plugin-shaped
- **TÂCHES** ([[TACHES Claude Code Resources]]) — marketplace plugin
- **DX Plugin** ([[Claude Code Tips (ykdojo)]]) — bundle for context handoff and conversation cloning

## Token efficiency consideration

A plugin's installed [[Skills]], [[Subagents]], and tool descriptions all consume system-prompt tokens (or registry weight that informs activation decisions). **Granular installation** matters: only install plugins you actually use; uninstall what you don't.

[[Context Engineering Kit (NeoLabHQ)]] explicitly notes this — its design lets you install only the sub-plugins you need rather than the whole kit.

## Anti-patterns

- **Plugin sprawl** — installing every interesting plugin. Each contributes overhead and competes for skill activation.
- **Conflicting hooks** — multiple plugins registering hooks for the same event without coordination. Can cause unpredictable ordering.
- **Plugins that override your workflow** — heavyweight frameworks may impose conventions that fight your project's existing patterns. Prefer composable plugins ([[TACHES Claude Code Resources|TÂCHES]]'s framing) over monolithic ones.

## Plugin marketplaces

- **Anthropic-official marketplace** — built into Claude Code
- **Community marketplaces** — added via `/plugin marketplace add <user>/<repo>`. Each can curate its own plugins.

The marketplace model means anyone can publish; quality varies. The [[Awesome Claude Code (hesreallyhim)|awesome list]] is the current de facto curation layer.

## What plugins are *not*

- Not a primitive in themselves — they're a *distribution format* for the other primitives.
- Not isolated — installed plugin contents affect global Claude Code behavior.
- Not sandboxed — plugin hooks run with the same permissions as user-authored hooks.

## Cross-references

- [[Slash Commands]] · [[Subagents]] · [[Skills]] · [[Hooks]] · [[Model Context Protocol]]
- [[Claude Code Ecosystem]] (plugin landscape)
- Sources: most ecosystem deep-dives ship as plugins; see [[Awesome Claude Code (hesreallyhim)]] for the catalog.
