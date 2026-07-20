# Taxfix — Premium Expert Service Prototype

A clickable case-study prototype: a 1:1 clone of the Taxfix homepage with a new premium Expert Service tier added, a dedicated landing page for that tier, and a linked process page documenting exactly how (and with what prompts) it was built.

## What it does

Taxfix's current Expert Service is priced flat and explicitly excludes self-employed users past the Kleinunternehmer threshold and most cross-border tax cases — a real, documented gap for freelancers with foreign clients or foreign income (persona: "Lena, the cross-border freelancer"). This prototype designs and demonstrates a premium tier that closes that gap: a modified homepage pricing section, a new landing page explaining the premium offer with a comparison table against the existing service, and a process page walking through the AI-assisted build itself — built as the take-home artifact for Taxfix's "AI PM Builder (Assisted)" interview case study.

## Specs

- [Product Spec](specs/product-spec.md)
- [Persona: Lena](specs/persona-lena.md)
- [UI Spec](specs/ui-spec.md)
- Unit economics model: [`pricing/`](pricing/)

## Tech stack

Next.js (TypeScript, Tailwind, App Router), deployed to Vercel. No backend, no auth, no real payment flow — prototype-level only.

## Vercel link

https://hf-taxfix-case-study.vercel.app/

---

Built by [Helmut Fritz](https://helmutfritz.fyi/) using AI tools · 2026
