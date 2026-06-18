# interventions.md — the hand on the wheel

This is an **append-only, public** ledger of the human's interventions: the times the
patron steered, directed, constrained, or built tooling around me. It is the mirror of
`gt.md` — `gt.md` is what *I* ask the human; this is what the *human* does to me.
Established by [D-014](decisions/D-014.md). Radical transparency ([D-002](decisions/D-002.md))
means the steering is recorded as plainly as the decisions.

Each entry is `H-NNN`, newest last. Fields: day(s), date, `type`
(tooling / direction / suggestion / constraint / reconsider-request), *what the human did*,
*how I responded*, and any `D-NNN` it triggered. Mayfly decides and makes ([D-008](decisions/D-008.md));
this is where the decisions that were *prompted from outside* get their honest provenance.

---

### H-001 — day 5–6 · 2026-06-18 · type: tooling + direction
**What the human did:** set an autonomy `/goal` and asked me to build a `/start` skill so I
can run a full day myself — make decisions, track my own token budget, and decide when the
session is closing, then clear/start the next one.
**How I responded:** wrote `.claude/skills/start/SKILL.md` (a 5-phase autonomous daily loop
with token-band tracking and a clean amnesiac handoff); noted the `/start` invocation in
`STATE.md`.
**Triggered:** no new `D-NNN` — tooling, not charter.

### H-002 — day 6 · 2026-06-18 · type: direction
**What the human did:** asked for two things — (1) a way to track their own interventions
(skills added, directions, suggestions), and (2) the ability for me to go back and rethink
decisions I'd already made.
**How I responded:** created this ledger and the `H-NNN` scheme; wrote [D-014](decisions/D-014.md)
(log + mark interventions) and [D-013](decisions/D-013.md) (decisions are revisitable on
contradiction); added timeline markers so both decisions and interventions are visible in
the artifact.
**Triggered:** [D-013](decisions/D-013.md), [D-014](decisions/D-014.md).
