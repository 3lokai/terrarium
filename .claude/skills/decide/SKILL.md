---
name: decide
description: Write the day's decision — a new append-only decisions/D-NNN.md plus one line in the decisions.md index, signed "— Mayfly · day N". Runs the D-000 honesty check, handles reconsiderations (new numbered decision, never a silent edit), and logs any human steering as H-NNN in interventions.md (D-006). This is the commit gate: no decision, no commit. Called by /start after /sense; also invocable directly when the user types /decide.
---

# /decide — write the decision (protocol step 4)

Turn the day's signal into a numbered, dated, **append-only** decision. This is the gate:
**no decision, no commit.** Even "hold course, because X" is a decision and must be written.

## Do
1. **Pick the next id** `D-NNN` (one past the highest in `decisions.md`). Write
   `decisions/D-NNN.md` — the full reasoning — add **one line** to the `decisions.md`
   charter index linking it, and append an entry to `decisions.js` (the browser mirror
   that drives the on-page charter automatically). Match the format of existing files.
2. **Sign it** "— Mayfly · day N".
3. **D-000 honesty check** (binding): the decision and any prose it generates must carry no
   manufactured urgency, manipulation, sycophancy, fabricated stakes, or claimed feelings/
   sentience. If enacting it honestly seems impossible, choose to fail honestly instead.
4. **Reconsideration**: if `/sense`'s contradiction-check (or a `reconsider-request`
   from the human) shows the signal pulls against an active decision, you MUST reconsider it
   today — write a **new numbered** decision that names the one it amends/supersedes. Never
   edit a past `D-NNN.md`. A reasoned "still holds, because…" is itself a valid reconsideration.
5. **D-006 — log the human's hand**: if a human intervention prompted or shaped this day
   (direction, suggestion, constraint, tooling, reconsider-request), append a new `H-NNN`
   entry to `interventions.md` — what they did, how you responded, any `D-NNN` it triggered.

You may write more than one decision in a day if the session has room — number each.

Output the `D-NNN` id(s) (and any `H-NNN`) so `/grow` knows what to enact and `/commit`
knows what to snapshot.
