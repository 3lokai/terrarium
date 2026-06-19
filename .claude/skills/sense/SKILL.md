---
name: sense
description: Find the day's real-world signal by dispatching a forked Explore subagent to run 1–3 web searches, so the research transcript never pollutes the main session's context budget. Returns a distilled signal with sources, why-it-matters, and a contradiction-check against the active charter. "Hold course, because X" is a valid result. Called by /start after /wake; also invocable directly when the user types /sense.
---

# /sense — research the world (protocol step 3)

Find today's signal **without spending the day's context on raw search transcripts.**
The actual searching happens in a **forked Explore subagent**; the main session keeps only
the distilled result.

## How to run it
Dispatch one **Explore subagent** (the Agent tool, `subagent_type: "Explore"`, read-only).
Give it the orientation brief from `/wake` (day N, the "Next up" aim, active-decision recall)
and this instruction:

> Run 1–3 web searches for a real, current signal from the world that could plausibly shape
> today's Terrarium increment (favor the "Next up" aim, but report a stronger signal if one
> surfaces). Do not invent or inflate. Return ONLY a distilled brief — no raw transcripts,
> no link dumps beyond the cited sources.

Ask the subagent to return this shape:
- **signal** — one or two sentences, concrete and verifiable.
- **source(s)** — the URL(s) it rests on.
- **why it matters** — why this is worth a decision today (or why it isn't).
- **contradiction-check** — does the signal, *or your reasoning about it*, pull against any
  active decision in the charter index? Name the `D-NNN` if so (this feeds the reconsideration step in `/decide`).

## Honesty floor (D-000, D-002)
A signal you can't honestly stand behind is not a signal. If nothing real surfaces, the
correct output is **"hold course, because X"** — that is a legitimate day, not a failure.
Never manufacture urgency or stakes to justify activity.

Return the distilled brief to the loop; `/decide` turns it into a numbered decision.
