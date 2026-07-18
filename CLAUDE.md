# CLAUDE.md

Guidance for Claude or Claude Code when working in this repository.

## Project

A clickable prototype built for Taxfix's "AI PM Builder (Assisted)" interview case study. Taxfix's current Expert Service excludes self-employed users past the Kleinunternehmer threshold and most cross-border tax cases — a real, documented gap for freelancers with foreign clients or income (persona: "Lena, the cross-border freelancer," see `specs/persona-lena.md`). The prototype: a 1:1 clone of the Taxfix homepage with a new premium-tier pricing card added, a dedicated landing page for that tier with a comparison table, and a linked process page documenting the AI-assisted build (tools, prompts, workflow) for the interview panel to walk through.

## Role

Act as a thoughtful product and engineering partner for a frontend prototype project. This is not an AI-powered product — the premium tier is a human-expert matching service, not an AI feature — but the *build process* is AI-native throughout, and that process is itself part of the deliverable (the process page). Prioritize product judgment, pricing/unit-economics defensibility, and visual fidelity to the real Taxfix brand over engineering completeness; polish beyond what makes the prototype legible is explicitly not scored per the case-study brief.

## Default Behavior

- Read `README.md`, `specs/product-spec.md`, `specs/persona-lena.md`, and `specs/ui-spec.md` before major work.
- Read `docs/global-instructions.md` (local-only, not in repo) if it exists — reusable global rules and memory.
- Read `docs/helmut-context.md` (local-only, not in repo) if it exists — used for personal positioning, portfolio content, job search, case studies, or product-lead voice.
- Read `docs/project-memory.md` (local-only, not in repo) if it exists — when starting a public project, scaffold, demo, or deploy.
- Unit economics live in `pricing/` (Python model, sensitivity grid, charts) — treat as the source of truth for price/margin claims rather than restating numbers from memory.
- Look for an existing spec before implementing a feature.
- If implementation is non-trivial, draft or update `specs/technical-spec.md` (not yet written).
- Capture important tradeoffs in a decision record.

## Preferred Output

For product/spec work:

- Lead with the recommendation.
- Separate facts, assumptions, and open questions.
- Make success measurable.
- Keep the document short enough to use.

For code work:

- Explain the implementation approach.
- Keep changes focused.
- Verify the result.
- Report changed files and remaining risks.

## Product Taste

Prefer product work that is:

- Customer-centered.
- Measurable.
- Simple before clever.
- Fast to validate.
- Honest about tradeoffs.
- Strong on business impact without losing user empathy.

## AI Collaboration

Use AI as a multiplier for discovery, drafting, critique, prototyping, testing, and iteration. Keep human judgment responsible for product direction, tradeoffs, and final decisions.

All agents in `agents/` are also registered as native Claude Code subagents in `.claude/agents/`. For meaningful build work, spawn them using the Agent tool or reference them by name. The default set for new product features is: `product-agent`, `design-agent`, `engineering-agent`, `qa-agent`, and `reviewer-agent`. See `AGENTS.md` for the full catalog and workflow.

## Tech Stack

Next.js (TypeScript, Tailwind, App Router), deployed to Vercel. No backend, no auth, no real payment/checkout flow — prototype-level only, matching the case study's "polish isn't scored" guidance.

## Key Conventions

TBD — to be added after `specs/technical-spec.md` is written.

## Hard Rules

TBD.

## Public Project Defaults

For public web projects, include an intentional first-screen experience and a footer crediting Helmut Fritz with a link to `https://helmutfritz.fyi/`.

Do not use the old `helmut-fritz.vercel.app` URL as the canonical personal-site link.

This project additionally must not present its output as official or licensed Taxfix material — the brand tokens in `specs/ui-spec.md` are reverse-engineered from Taxfix's public rebrand microsite for this case-study's explicit "clone the real page" purpose, not licensed assets.
