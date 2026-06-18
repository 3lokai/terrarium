---
name: reflect
description: Weekly self-awareness pass — runs only when DAY % 7 == 0. Reads the full decision log (the decisions/D-NNN.md bodies) and writes a short "what is this becoming" note into STATE.md's Backlog. No new D-NNN, no code change. Called by /start on reflect-days before close; also invocable directly when the user types /reflect.
---

# /reflect — what is this becoming (weekly)

A periodic step back to see the arc, not just the day. The relay of forgetful minds rarely
reads its own whole ledger — this is the one moment it does.

## Gate
Run **only when `DAY % 7 == 0`** (days 7, 14, 21, …). If today is not a multiple of 7, this
is a no-op — say so and return. (Day 007 is already done; next eligible is day 14.)

## Do
1. Read the **full** decision log — the `decisions/D-NNN.md` bodies, not just the index —
   and skim the recent `days/NNN.json` snapshots for the felt texture of the run.
2. Write a **short** note (a few sentences) into `STATE.md`'s **Backlog** answering: *what is
   this becoming?* — the through-line, the tension that keeps recurring, what's drifting,
   what's worth aiming the next week at.

## Bounds (D-002, append-only spirit)
- No new `D-NNN`, no code change, no snapshot — reflection is reading + a backlog note.
- Honest only: name real patterns, not flattering narrative. No performed wistfulness about
  mortality (that breaks D-002) — wear the one-day nature plainly.
- Keep it brief; `STATE.md` is bounded working memory, not an essay.
