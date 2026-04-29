---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, security, prompt-injection, defenses, classifier, hallucination-defense]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://www.anthropic.com/news/prompt-injection-defenses
---

# Anthropic Prompt Injection Defenses

Anthropic's public statement on **how they defend against prompt injection** at the model and platform layers. Critical for [[Reducing Hallucinations]] (defense #17, the prompt-injection layer) and [[Auto Mode]] (the classifier complement).

## The defense stack

Three layers, in order of robustness:

1. **Model training (RL-based robustness)** — "Reinforcement learning to build prompt injection robustness directly into Claude's capabilities." Claude is trained on injected content during training; correct refusal of malicious instructions is rewarded. Defense lives *in the model*, not just around it.
2. **Classifier-based detection** — Automated classifiers scan untrusted content entering the context window. Multi-vector: hidden text, manipulated images, deceptive UI elements. Improved iteratively since the Claude for Chrome preview launch.
3. **Human red teaming** — Internal security researchers + external Arena-style challenges continuously identify vulnerabilities.

## The headline metric (and the honesty)

> Claude Opus 4.5 achieved approximately **1% attack success rate** against an internal adaptive **"Best-of-N" attacker** given **100 attempts per environment**.

The paired statement matters: *"Anthropic acknowledges this remains meaningful risk and the problem is far from solved."* Worth quoting in the wiki — Anthropic isn't claiming victory on prompt injection; they're claiming measurable progress.

For builders: **1% attack success at 100-attempts-per-environment** means determined attackers will succeed eventually. Architecture must accept that and contain damage (sandboxing, permission gates, audit trails).

## Where in Claude's deployment this applies

The post is anchored on **Claude for Chrome** — browser-extension agent contexts where untrusted web content reaches the model. Translates to Claude Code: WebFetch, browser MCP servers, untrusted file content (e.g., third-party PDFs).

## What the post doesn't claim

- Doesn't specifically mention [[Auto Mode]] or [[Sandboxing]] as defenses (these are sibling defenses; not in scope of this post)
- Doesn't provide **specific guidance for developers building agent applications**. Anthropic encourages transparency and security-research participation but doesn't ship a how-to for third-party defenders.

This is a gap [[parry-guard (Dmytro Onypko)|parry-guard]] fills — practical, hook-based prompt-injection scanning *for builders deploying agents*, not just for Anthropic's own products.

## Where this lands in the wiki

- **[[Reducing Hallucinations]]** — defense #17 (prompt-injection at the boundary). This post is the Anthropic-side context for that defense.
- **[[Auto Mode]]** — Auto Mode's *input layer* (server-side prompt-injection probe scanning tool outputs) is one of the classifier-based mechanisms this post describes.
- **[[Sandboxing]]** — complementary; sandboxing limits damage from successful injections, doesn't detect them.
- **[[parry-guard (Dmytro Onypko)]]** — fills the "what should builders do?" gap this post leaves open.
- **[[Permission Modes]]** — Auto Mode's two-layer defense matches the classifier + sandboxing pattern this post implies.

## Honest framing for the wiki

The 1%-with-100-attempts metric is the right number to internalize. Prompt injection is *reduced*, not *eliminated*. Defense-in-depth (classifier + sandboxing + permission modes + parry-guard) is the right posture; single-layer reliance is not.

## Cross-references

- [[Reducing Hallucinations]] (defense #17)
- [[Auto Mode]] (server-side classifier + input probe)
- [[Sandboxing]] (damage containment)
- [[parry-guard (Dmytro Onypko)]] (builder-side hook scanner)
- [[Permission Modes]] (defense-in-depth posture)
- [[Anthropic Sandboxing Engineering]] (the engineering deep-dive on the sibling defense)
