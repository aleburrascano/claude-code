---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, security, hooks, prompt-injection, ml-classifier]
source_url: https://github.com/vaporif/parry
source_author: Dmytro Onypko (vaporif)
license: MIT (Llama Prompt Guard 2 separately licensed under Meta)
---

# parry-guard (Dmytro Onypko)

A **prompt injection scanner for Claude Code** that detects malicious inputs/outputs in tool execution. By Dmytro Onypko. Six layered detection approaches from simple pattern matching to ML classification.

For our wiki, parry-guard is the canonical implementation of **layered injection defense**. Pair with [[Everything Claude Code (affaan-m)|AgentShield]] (red-team/blue-team pipeline) and [[gstack (Garry Tan)|gstack's 22MB ML classifier]] for the wiki's most aggressive defense-in-depth.

## Hook integration (3 hooks)

| Hook | Purpose |
|---|---|
| **PreToolUse** | Validate inputs before tools execute; check for injections; block destructive ops |
| **PostToolUse** | Scan tool outputs for injected content + credential leaks |
| **UserPromptSubmit** | Audit `.claude/` for dangerous permissions + injected commands |

Configurable timeouts (1000-5000ms). Sensible defaults.

## Six detection layers

1. **Unicode analysis** — invisible characters, homoglyphs (catches steganographic injection)
2. **Substring matching** — known injection phrases
3. **Secret detection** — **40+ credential patterns** (AWS keys, GitHub tokens, database URIs)
4. **ML classification** — **DeBERTa v3 transformer** with 0.7 default threshold
5. **Bash exfiltration** — AST-based analysis for data tunneling via DNS or cloud storage
6. **Script exfiltration** — same analysis across **16 programming languages**

Layered approach: cheap detection runs first, expensive ML only on flagged content.

## Three modes (latency vs depth tradeoff)

| Mode | Per-chunk latency | Models used |
|---|---|---|
| **Fast** (default) | ~50-70ms | DeBERTa v3 only |
| **Full** | ~1.5 seconds | DeBERTa v3 + Llama Prompt Guard 2 |
| **Custom** | varies | User-defined models |

**Cached results: ~8ms with 30-day TTL** across projects. Significant for repeat-pattern scenarios.

## Installation

Multiple paths:
- **Nix home-manager** (recommended for Linux/macOS)
- **Rust toolchain**: `cargo install --path bin`
- **Runtime wrappers**: `uvx parry-guard` or `rvx parry-guard`
- **Release binaries** (pre-compiled)

Requires HuggingFace token + acceptance of Llama 4 Community License (for Llama Prompt Guard 2).

## License

**MIT** for parry-guard itself. **Llama Prompt Guard 2 separately licensed** under Meta's Llama 4 Community License (which has restrictions on commercial use beyond certain scale). If using Full mode commercially, check Meta's terms.

## My assessment

parry-guard's distinctive contributions for our wiki:

1. **Six-layer cascading detection** — cheap to expensive. Cheap layers handle most cases; ML reserves for flagged content. Good engineering.

2. **AST-based exfiltration detection across 16 languages** — most exfiltration scanners look at obvious patterns; AST-based catches more sophisticated tunneling. Significant.

3. **40+ credential patterns** — broad coverage. Comparable to [[Trail of Bits Security Skills|Trail of Bits' insecure-defaults skill]].

4. **30-day cross-project cache** — material for sessions with repetitive patterns. Most scanners are stateless per session; caching across projects is novel.

For Alessandro's focus areas:
- For [[Reducing Hallucinations]]: prompt injection is the most insidious hallucination cause — Claude can be tricked into doing the wrong thing by hostile content. parry-guard is structural defense.
- For [[Hooks]]: a complete reference implementation of `PreToolUse` + `PostToolUse` + `UserPromptSubmit` working together. Worth studying.
- For [[Sandboxing]]: complementary. parry-guard catches *intent* (injection); Sandboxing limits *blast radius*. Pair them.

Caveats:
- ~50-70ms per chunk in Fast mode adds up across many tool calls. Cache helps but baseline cost is real.
- Llama Prompt Guard 2 license matters for commercial deployment.

Cross-references: [[Hooks]] · [[Sandboxing]] · [[Reducing Hallucinations]] · [[Adversarial Prompting|Prompt Engineering Techniques]] (the technique they're defending against) · [[Everything Claude Code (affaan-m)|AgentShield]] · [[gstack (Garry Tan)]] · [[Claude Code Ecosystem]]
