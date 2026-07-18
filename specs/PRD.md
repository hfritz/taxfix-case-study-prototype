# PRD: Taxfix Premium Expert Service

## 1. Summary

Taxfix's tax-expert service turns away self-employed people and anyone with income from another country. This document describes a new premium service built just for them: one flat price, a tax expert who actually understands these harder cases, and no surprise bills. It's part of a job-interview case study, built to show both the product idea and how AI tools were used to build it.

## 2. Contacts

| Name | Role | Comment |
|---|---|---|
| Helmut Fritz | Product (sole builder, this case study) | Owns the whole project — product thinking, design, and build, with Claude Code as an AI building partner throughout |

## 3. Background

Taxfix helps people file their German taxes. Its "Expert Service" matches a person with a real tax advisor for €99.99, or 20% of their refund. But that service says no to two real groups of people: self-employed people who earn enough to no longer count as a small business ("past Kleinunternehmer"), and anyone with money coming from outside Germany. Both of these are stated directly on Taxfix's real website — not a guess, a direct quote.

This isn't a response to something that recently changed at Taxfix. It's a response to a hiring case study that asked for a new premium tier, built as a real, clickable prototype, plus a page showing exactly how AI tools were used to build it. What *did* become newly possible is the build process itself: one person, using an AI coding assistant, could research the market, model the pricing, and build three working web pages in a single sitting — and that process is itself part of what's being shown to the panel.

## 4. Objective

Build a paid tier that real self-employed, cross-border freelancers would actually want, and show on paper that the company could afford to run it.

**Why it matters:** it turns people Taxfix currently says no to into paying customers, without asking Taxfix's engineers to change anything about the free tool.

**Benefit to the company:** new revenue from a group that's currently turned away, at a fixed price, so the cost per customer is known in advance rather than open-ended.

**Benefit to customers:** instead of doing their own complicated tax return, or paying a traditional tax advisor by the hour with no idea what the final bill will be, they get one clear price and a specialist who has actually handled cases like theirs before.

**Key results** (how we'd know this worked):

- The company keeps at least 40% of the €449 price as profit, once real data on advisor time replaces today's guess.
- People visiting the new page actually click "start my case" at a reasonable rate, before any money is spent on ads.
- For every €1 spent finding a new customer, the company gets back at least €2 in profit over three years.

## 5. Market Segment(s)

Not "self-employed people" in general — that's too broad, and most self-employed people are already served fine by Taxfix's regular tools.

The real group: people who are self-employed **and** have money crossing a border. In Germany that comes out to roughly **100,000 people** — a careful estimate, not an official count — narrowed down from about 1.8 million solo self-employed people to the ones who: (1) earn enough to no longer count as a small business, (2) work in a field like consulting, design, or software where international clients are common, and (3) actually have a client or income source outside Germany.

That's a small group on purpose. It's small because it's exactly the group Taxfix currently turns away, and exactly the group for whom the problem hurts most: a normal tax advisor is slowest and most expensive right where this group needs the most help.

One extra wrinkle worth naming: even the German tax office itself isn't always sure whether someone in this group counts as a "freelancer" or a "trade business" under the law. That's not a weak point in the target group — it's more proof these are genuinely complicated cases, exactly the kind the normal service isn't built to handle.

## 6. Value Proposition(s)

**The job customers are trying to get done:** file a correct, on-time tax return without (a) spending days figuring it out themselves, (b) paying an unpredictable hourly bill, or (c) getting something wrong and owing extra tax and penalties later.

**What customers gain:**

- One clear price, decided before work starts, not an open-ended hourly bill.
- A tax advisor who has actually handled self-employed, cross-border cases before, not a generalist guessing at something unfamiliar.
- Time back — doing it yourself realistically takes 6 to 10 hours; this trades that for a flat fee.

**Pains avoided:**

- No surprise bill at the end (a normal advisor billed by the hour is, in practice, "unpredictable, and most expensive exactly where you need the most support").
- No costly mistakes on income earned abroad, which can lead to fines and extra tax owed later.

**Why this beats the real alternatives, in real numbers:**

- **Doing it yourself:** about 6–10 hours of your own time — worth roughly €480–800 if your time is worth €80/hour — plus the risk of a mistake.
- **A traditional tax firm, billed by the hour:** real market rates run about €150–200/hour for complex cases (or €65–165/hour under the legal fee schedule), so an 8-hour case can cost €520 to over €1,500 — and you don't know the total until the bill arrives.
- **This service:** €449, decided up front, no surprises.

The advantage isn't "cheaper than what Taxfix pays its own advisor" — that €60/hour figure is what Taxfix pays behind the scenes, not a rate any customer could ever get elsewhere. The real advantage is being cheaper *and* more predictable than the alternatives a customer would actually choose otherwise.

## 7. Solution

### 7.1 UX/Prototypes

Three connected web pages, built to look and feel like the real Taxfix website:

1. **The homepage**, with a new third pricing card added next to Taxfix's two real ones.
2. **A new landing page** explaining the premium service — who it's for, what's included, the price, and a side-by-side comparison against the normal service.
3. **A "how this was built" page**, showing the actual reasoning, prompts, and steps used to build the whole thing with AI tools — including an interactive price calculator a reader can drag to see how the numbers change live.

### 7.2 Key Features

- Flat price: **€449**, with up to 5 hours of advisor time included.
- A quick check of how complicated the case is, done *before* any work starts. If it needs more than 5 hours, the customer is told the new price up front — never billed by the hour afterward.
- Matched with an advisor who has real experience with self-employed and cross-border cases, not a generalist.
- Covers the case types Taxfix's normal service currently refuses: self-employed past the small-business threshold, and cross-border income (foreign clients, foreign rental income, double-taxation cases).
- Scope is the one big annual tax return only. It does **not** include the separate quarterly VAT filings many freelancers also owe. That's a real gap, but closing it would turn a simple, fixed-price service into an ongoing bookkeeping relationship — a different, much bigger product.

### 7.3 Technology

A Next.js website with no backend, no database, and no real payment processing. The homepage and comparison page reuse Taxfix's own real webpage code where possible, so they look genuinely identical to the real site rather than an approximation.

### 7.4 Assumptions

Several numbers behind this plan are best guesses, not confirmed facts, because no internal Taxfix data was available while building this:

- **How many hours an advisor actually needs per case:** guessed at 5, but could realistically be anywhere from 3 to 8. This single guess matters more than any other number in the plan — if real cases run long, the company could lose money on this service.
- **What Taxfix would pay an advisor per hour:** guessed at €60.
- **What it costs to win one new paying customer:** guessed at €90.
- **How many customers come back the following year:** guessed at 55%.
- **How many self-employed, cross-border people exist in Germany, and how many would say yes:** both estimated, not measured.

All of these are flagged on purpose rather than hidden, so the real next step is clear: get real numbers from the first 15–20 actual cases before trusting the price or the profit math.

## 8. Release

This is a prototype, not a live product, so "release" here means: build and share it now, and describe how a real launch would follow — in relative order, not fixed dates.

**First version (what exists now):** the three pages described above, live and clickable, with real, working pricing math and a real market-sizing estimate a reader can check the sources for.

**Right after that, before spending any money on ads:** put the new landing page in front of real target customers and see if they actually click "start my case." This costs nothing and tells us if the demand is real.

**Once there's real interest:** run a small number of real cases (about 15–20) with real advisors, to replace every guessed number above with an actual one, and confirm or adjust the €449 price before rolling it out more widely.

**Not in this version, on purpose:** any support for the ongoing, quarterly tax filings some freelancers also owe. That's a bigger, different product, and would only make sense after this simpler version proves itself first.

---

*Full technical and pricing detail behind every number above lives in `specs/product-spec.md`, `specs/persona-lena.md`, and `pricing/premium_tier_unit_economics.py`.*
