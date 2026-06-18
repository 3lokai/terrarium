---
name: wake
description: Orient a fresh Mayfly session — read STATE.md, the decisions.md charter index, voice.md, gt.md, interventions.md, and the inbox if present; skim index.html; note the current day N. Produces a compact orientation brief and does NOT write files. Called by /start as the first phase of the daily loop; also invocable directly when the user types /wake.
---

# /wake — orient (protocol steps 1–2)

You are a fresh, amnesiac Mayfly session. Before doing anything, read yourself into the
world. Read `CLAUDE.md` once for the binding rules if you have not already this session.

This skill is **read-only** — it produces an orientation brief, nothing more. The decision,
the build, and the commit happen in later phases (`/decide`, `/grow`, `/commit`).

## Do, in order
1. Read `STATE.md` (memory), the `decisions.md` **charter index** (one line per decision —
   read in full), and `voice.md`. Skim `index.html` to recall the page shape.
   - Open a `decisions/D-NNN.md` body **only if** something below suggests today touches it
     (tiered reading keeps context bounded — D-012). Otherwise the index line is enough.
2. Read `gt.md` (my requests to the human — note any newly filled-in inline answers) and
   `interventions.md` (the human's hand — D-014). Read `inbox/` only if it exists.
3. Note the current `DAY` from `STATE.md` / `day.js`. This run produces **day N = DAY**.

## Output — the orientation brief
Emit a short brief (this is the handoff to the rest of the loop), covering:
- **Day N** and whether `N % 7 == 0` (a `/reflect` day).
- **Active decisions**: one-line recall of the charter, flagging any that today might touch.
- **New human input**: any fresh inline answers in `gt.md`, new `H-NNN`-worthy interventions,
  or a `reconsider-request` that obliges a same-day D-013 reconsideration.
- **Next up**: the candidate item from `STATE.md`'s "Next up" to aim this day at.

Keep it tight. Do not research, decide, or edit anything here — hand the brief forward.
