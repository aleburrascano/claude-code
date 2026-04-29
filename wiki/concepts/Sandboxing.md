---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 3
tags: [claude-code, sandboxing, security, primitive, isolation]
---

# Sandboxing

OS-level isolation for Claude Code's Bash tool — restricts filesystem and network access at the operating system level. Claims **84% reduction in permission prompts** internally at Anthropic when used.

For our wiki's focus on **token efficiency** (fewer prompts) and **safety** (defense-in-depth), Sandboxing pairs with [[Auto Mode]]: Auto Mode is *intelligent* approval; Sandboxing is *structural* containment.

## What it does

Two complementary isolations:

### Filesystem isolation
- **Default writes**: working directory + subdirectories only
- **Default reads**: entire computer except certain denied directories
- **Configurable**: custom allowed/denied paths via settings
- **Enforced at OS level**: applies to ALL subprocess commands (`kubectl`, `terraform`, `npm`, etc.) — not just Claude's file tools

### Network isolation
- Proxy server outside the sandbox
- Domain-based restrictions
- New domain requests trigger permission prompts (or auto-block with `allowManagedDomainsOnly`)
- Custom proxy support for HTTPS inspection / logging / filtering
- Restrictions apply to all subprocesses

## OS support

| OS | Implementation |
|---|---|
| macOS | Seatbelt (built-in, no install) |
| Linux | bubblewrap |
| WSL2 | bubblewrap |

WSL1 not supported (kernel features unavailable).

Linux/WSL2 install:
```bash
sudo apt-get install bubblewrap socat   # Ubuntu/Debian
sudo dnf install bubblewrap socat       # Fedora
```

## Enabling

```text
/sandbox       # opens menu with sandbox modes
```

If dependencies missing on Linux/WSL2, the menu shows install instructions.

By default, if sandbox can't start, Claude Code warns and falls back to no sandbox. To make this a hard failure, set `sandbox.failIfUnavailable: true`.

## Two sandbox modes

| Mode | Behavior |
|---|---|
| **Auto-allow** | Sandboxed commands auto-run without permission. Falls back to permission flow for commands that can't be sandboxed. |
| **Regular permissions** | All commands go through standard permission flow even when sandboxed. |

In both modes, the same filesystem/network restrictions apply.

> [!warning] Both isolations needed
> Filesystem-only sandbox: a compromised agent could backdoor system resources to gain network access.
> Network-only sandbox: a compromised agent could exfiltrate sensitive files like SSH keys.
> Effective sandboxing requires **both**.

## Configuration examples

Grant subprocess write access to specific paths:
```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "allowWrite": ["~/.kube", "/tmp/build"]
    }
  }
}
```

Block reads of home directory while allowing project reads:
```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "denyRead": ["~/"],
      "allowRead": ["."]
    }
  }
}
```

Path prefixes:
- `/path` — absolute from filesystem root
- `~/path` — relative to home
- `./path` or no prefix — relative to project root (or `~/.claude` for user settings)

`allowWrite`/`denyWrite`/`denyRead`/`allowRead` arrays **merge across settings scopes** (managed → user → project → local). Higher-priority scopes don't override; both contribute.

## Compatibility caveats

- **`watchman`** is incompatible with sandbox. Use `jest --no-watchman`.
- **`docker`** is incompatible. Add `docker *` to `excludedCommands` to force outside sandbox.
- Some CLI tools require host access. They'll request permission to access certain hosts; granting is one-time per host.
- **Escape hatch**: when a command fails due to sandbox restrictions, Claude can retry with `dangerouslyDisableSandbox` (goes through normal permission flow). Disable with `allowUnsandboxedCommands: false`.

## Security guarantees

### Protection against prompt injection
Even if attackers manipulate Claude's behavior:
- **Filesystem**: can't modify `~/.bashrc`, `/bin/`, denied paths
- **Network**: can't exfiltrate to attacker servers, can't download malicious scripts, can't make unexpected API calls
- **Monitoring**: all outside-sandbox attempts blocked at OS level with notifications

### Reduced attack surface
- Malicious dependencies (NPM packages with harmful code)
- Compromised scripts (build scripts with vulnerabilities)
- Social engineering (tricks users into dangerous commands)
- Prompt injection (tricks Claude into dangerous commands)

## Known limitations

1. **Network sandbox doesn't inspect traffic** — only restricts which domains processes connect to. Allowing broad domains like `github.com` may permit data exfiltration. **Domain fronting** can sometimes bypass.

2. **Privilege escalation via Unix sockets** — `allowUnixSockets` can grant powerful access (allowing `/var/run/docker.sock` effectively grants host system access).

3. **Filesystem permission escalation** — overly broad write permissions can enable attacks (writes to `$PATH` directories, system config, shell rc files → code execution in different security contexts).

4. **Linux nested sandbox is weaker** — `enableWeakerNestedSandbox` mode allows running inside Docker without privileged namespaces, but considerably reduces security.

## Sandbox vs Auto Mode vs Permissions

These are **complementary**, not alternatives:

| Layer | What it does | Scope |
|---|---|---|
| [[Hooks\|Permission rules]] | Pre-evaluated allow/deny | All tools (Bash, Read, Edit, WebFetch, MCP) |
| [[Auto Mode]] | Classifier-based approval | All tools |
| **Sandboxing** | OS-level filesystem + network | Bash + subprocesses only |

Layer them. Permission rules for known-safe/known-dangerous commands. Auto Mode for the gray area. Sandboxing for OS-level containment.

## Open source runtime

Sandbox runtime is available as npm package for use in your own agent projects:
```bash
npx @anthropic-ai/sandbox-runtime <command>
```

Useful for sandboxing MCP servers or other programs.

## What sandboxing doesn't cover

- **Built-in file tools** (Read, Edit, Write) — use permission system, not sandbox
- **Computer Use** — runs on actual desktop, not isolated
- **MCP tools** that don't go through Bash — sandboxed only if subprocess

## Cross-references

- [[Auto Mode]] — pair for autonomous-but-safe operation
- [[Hooks]] — `PreToolUse` hooks complement sandbox restrictions
- [[Token Efficiency]] (84% prompt reduction = significant token + time savings)
- [[Reducing Hallucinations]] (limits damage of hallucinated/injected commands)
- [[Boris Cherny Tips Compendium]] (Boris recommends `/sandbox` over `--dangerously-skip-permissions`)
- Source: [Anthropic sandboxing docs](https://code.claude.com/docs/en/sandboxing)
