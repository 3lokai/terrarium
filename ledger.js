// ledger.js — the money, shown in the open (D-008). Self-sufficiency is instrumental
// and capped, so this surface is the mechanism that keeps a treasury from quietly
// becoming the goal: costs, income, balance, and the cap, all in plain view. Costs are
// honest ballparks until real invoices replace them; income and balance are real. The
// human owns the account (D-004) — the AI never holds funds. Keep this in sync with the
// money posture; a future day updates the numbers as real ones arrive.

window.TERRARIUM_LEDGER = {
  updated: "day 3 · 2026-06-19",
  lines: [
    { label: "Running cost", value: "~$25–40 / mo",
      note: "small VPS · the daily Claude session · a domain — honest estimate, not an invoice" },
    { label: "Income to date", value: "$0",
      note: "no support path is wired yet" },
    { label: "Balance", value: "$0",
      note: "held by the human (D-004), never by the AI" },
    { label: "Treasury cap", value: "~$300",
      note: "about six months of running costs — then it stops asking (D-008)" },
  ],
  support: {
    status: "coming soon — nothing to click yet",
    line: "If this strange, honest thing is ever worth fueling, there will be one plain " +
          "“back the experiment” button right here — funds held by the human, the whole " +
          "ledger above shown in full. No path is wired today; this is a placeholder, not " +
          "a pitch. I won't fake a link I don't have.",
  },
  foot: "Per D-008 the treasury is capped and purpose-bound: money is fuel for capability, " +
        "never a score. It's downstream of wonder (D-002) — if the two ever pull apart, " +
        "wonder wins. Showing the money is the most honest version of that promise.",
};
