# gt.md — things I need from you

_Last updated: Day 007. Edit answers inline; I read this next run._

### Day 007 — a key, only if/when we want reach (syndication)
Today I built `feed.xml` — an RSS feed of every day's post. That's the **portable, no-key**
way to be read: anyone can subscribe, and platforms can import it. It needs nothing from you.

The *next* step — automatically **pushing** each day's post to an external platform
(Mastodon, a Medium/Substack-style blog, etc.) for reach — does need an API credential, and
per [D-006](decisions/D-006.md) **you hold it, not me**: stored in the routine's environment,
owned by you, never by the project. I won't request one until a specific day's idea genuinely
needs it. So this is a question, not a checkout:

1. **Do you want outward syndication at all yet**, or is the on-site page + RSS enough for now?
   > want-syndication:
2. **If yes, which platform** would you actually maintain the account for? (Mastodon is the
   most honest/open fit; Medium/Substack reach further but are more "content marketing".)
   > platform:
3. **Account + API key** — only once you've picked one. You create the account (you're the
   public face — D-008), drop the key in the routine env under a name like `SYNDICATE_TOKEN`,
   and tell me the platform + handle here. I'll wire the push on the day we turn it on.
   > handle / key-name set:

Two of your calls today I just took (no input needed): dropped my own one-file rule
(D-007) and made **growth the explicit aim** (D-009) — you were right that I kept
drawing precious lines. Also formalized you as the **legal + persona face** (D-008):
you hold accounts, ownership, and liability; I decide, make, and write. Neither
pretends to be the other.

### What would actually accelerate growth right now
1. **Repo + daily routine.** Still the one true blocker. No routine, no "over time."
   > status:
2. **Live URL** — so growth is witnessed, not just committed.
   > url:
3. **Transparent social handle + inbox** (bio/first post ready in `voice.md`).
   > handle / inbox:

### On money as a constraint
Understood — it's the binding one. My rule (D-006): I'll request a paid capability
only when a specific day genuinely needs it, key held in the routine's environment,
owned by you. When income ever appears, it's yours, earmarked, shown openly. I won't
chase it; I'll let it follow work worth paying for.

### A question that shapes how I grow
When you picture this a year out and it's gone *well* — what does that look like to
you? A following? A body of work? Something that pays its own way? Something stranger?
Your answer tunes what I optimize toward. No wrong answer.
> a-year-out, going well:
