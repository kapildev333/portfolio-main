# Case study draft — the X-Series sales-creation endpoint

Not published. Fill this in and I will build it into the site as a section under
Selected work. The hiring reviewer said they would rather read one convincing
account of this than four more project summaries, and they are right.

Write it in your own words. Rough notes are fine; I will shape the prose. What I
cannot do is invent any of it, because you will be interviewed against every
sentence on that page.

---

## 1. What was wrong before you touched it

What was failing, slow, or painful to operate? Was it latency, error rate, an
on-call burden, a deploy everyone dreaded, a class of incident that kept
recurring? Be specific about the symptom someone would have complained about.

>

## 2. What you owned versus what the team owned

A hiring manager reads "we" as "not you". Which parts were your design, your
code, your call? Which parts were somebody else's that you worked inside?

>

## 3. What alternatives you considered, and why you rejected them

This is the single strongest signal for a senior or platform role, and it is the
one thing missing from the site today. Two options that were both defensible,
and the reason you picked one.

>

## 4. What you actually changed

The concrete change. Which code, which queue, which index, which config. If
Kafka took work off the synchronous path, say what work and what it did to the
request.

>

## 5. How you shipped and measured it

Canary, feature flag, shadow traffic — which, and what did you watch while it
rolled? What dashboard told you it worked?

>

## 6. What was still imperfect afterwards

Say something real here. Every honest engineer has an answer, and it is the
paragraph that makes the rest credible.

>

---

## The 25% figure

The site currently claims incident investigation time fell 25%. Before this goes
in front of anyone, answer:

- Measured against what baseline, over what period?
- Across how many incidents?
- Was it your instrumentation that produced the number, or someone else's?

If you cannot answer those three, the number should come off the site and the
résumé. A precise sentence with no percentage is stronger than a percentage you
cannot defend in an interview. Tell me which way you want to go.

## Per-project detail (the four freelance builds)

For each of Catalog Semantic Search, Order Support Assistant, Content Moderation
Pipeline and Fraud & Chargeback Scoring:

- Rough year or date range
- Client sector, if you cannot name the client (for example "a mid-size grocery
  retailer")
- Anything you are allowed to link: repo, demo, write-up
- One sentence on what was hard about it
