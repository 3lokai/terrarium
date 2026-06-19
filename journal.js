// journal.js — the reading layer. Renders the page's text from the same lineage
// the organism draws from (window.TERRARIUM_DAYS): today's note, the journal of every day,
// and the charter (window.TERRARIUM_DECISIONS from decisions.js). Build-free, no fetch —
// runs straight off file://. The engine (organism.js) stays the hero; this is the window
// you read through.

(function(){
  const DAYS = window.TERRARIUM_DAYS || [];
  if (!DAYS.length) return;

  // ── markdown-lite: just enough to render honest prose, zero dependencies ──
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function inline(s){
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // make decision/intervention references clickable — the public ledger is right there
    s = s.replace(/\b(D-\d{3})\b/g, '<a href="./decisions/$1.md">$1</a>');
    s = s.replace(/\b(H-\d{3})\b/g, '<a href="./interventions.md">$1</a>');
    return s;
  }
  const prose = text => (text || '').split(/\n\n+/).map(p => `<p>${inline(p)}</p>`).join('');
  const pad = n => String(n).padStart(3, '0');
  const body = d => d.post || d.watching || d.log || '';
  const chips = ids => (ids && ids.length)
    ? `<div class="chips">${ids.map(id =>
        `<a class="chip ${id[0]==='H'?'chip-int':'chip-dec'}" href="${
          id[0]==='H' ? './interventions.md' : './decisions/'+id+'.md'}">${id}</a>`).join('')}</div>`
    : '';

  // ── today's note: the latest day, in full. The page itself is the post. ──
  const today = DAYS[DAYS.length - 1];
  const el = id => document.getElementById(id);
  if (el('today-body')){
    el('today-body').innerHTML =
      `<h1 class="entry-title">${esc(today.title || today.log)}</h1>` +
      `<div class="entry-meta">day ${pad(today.day)} · ${today.date} · ${esc(today.signature)}</div>` +
      `<div class="entry-prose">${prose(body(today))}</div>` +
      chips([...(today.decisions||[]), ...(today.interventions||[])]);
  }

  // ── the journal: every day, newest first, each expandable to its full post ──
  if (el('journal-body')){
    const cards = DAYS.slice().reverse().map(d => {
      const i = DAYS.indexOf(d);
      return `<article class="card" id="card-${i}" data-index="${i}">` +
        `<button class="card-head" aria-expanded="false">` +
          `<span class="card-day">${pad(d.day)}</span>` +
          `<span class="card-title">${esc(d.title || d.log)}</span>` +
          `<span class="card-date">${d.date}</span>` +
        `</button>` +
        `<div class="card-body">` +
          `<div class="entry-prose">${prose(body(d))}</div>` +
          chips([...(d.decisions||[]), ...(d.interventions||[])]) +
        `</div>` +
      `</article>`;
    }).join('');
    el('journal-body').innerHTML = cards;

    el('journal-body').addEventListener('click', e => {
      const head = e.target.closest('.card-head');
      if (!head) return;
      const card = head.parentElement;
      const open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      // reading and the visual lineage move together: replay that day's organism
      if (open && typeof window.selectDay === 'function')
        window.selectDay(Number(card.dataset.index));
    });
  }

  // highlight the journal card for whatever day the timeline/keys selected (organism.js hook)
  window.onDaySelect = function(index){
    document.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
    const c = document.getElementById('card-' + index);
    if (c) c.classList.add('active');
  };

  // ── the charter: the rules in force, readable in place (links to the public bodies) ──
  const CHARTER = window.TERRARIUM_DECISIONS || [];
  if (el('charter-body')){
    el('charter-body').innerHTML = CHARTER.map(({ id, caption }) =>
      `<a class="rule" href="./decisions/${id}.md"><span class="rule-id">${id}</span>` +
      `<span class="rule-cap">${esc(caption)}</span></a>`).join('');
  }

  // ── the ledger: the money, shown in the open (D-008) ──
  const LEDGER = window.TERRARIUM_LEDGER;
  if (el('ledger-body') && LEDGER){
    const rows = (LEDGER.lines || []).map(l =>
      `<div class="led-row">` +
        `<span class="led-label">${esc(l.label)}</span>` +
        `<span class="led-value">${esc(l.value)}</span>` +
        `<span class="led-note">${inline(l.note || '')}</span>` +
      `</div>`).join('');
    el('ledger-body').innerHTML =
      `<div class="led-table">${rows}</div>` +
      (LEDGER.support
        ? `<div class="led-support">` +
            (LEDGER.support.url
              ? `<a class="led-back" href="${esc(LEDGER.support.url)}" target="_blank" rel="noopener">` +
                `♥ ${esc(LEDGER.support.label || 'back the experiment')}</a>`
              : `<span class="led-status">${esc(LEDGER.support.status || '')}</span>`) +
            `<p>${inline(LEDGER.support.line)}</p>` +
          `</div>`
        : '') +
      (LEDGER.foot ? `<p class="led-foot">${inline(LEDGER.foot)}</p>` : '') +
      (LEDGER.updated ? `<div class="led-updated">updated ${esc(LEDGER.updated)}</div>` : '');
  }

  // ── timeline ticks: a small caption on hover, captioned from the data we already have ──
  const ticks = document.getElementById('ticks');
  const tl = document.querySelector('.timeline');
  if (ticks && tl){
    const cap = document.createElement('div');
    cap.className = 'tick-caption';
    tl.appendChild(cap);
    const labelFor = d => {
      const parts = [];
      if (d.decisions && d.decisions.length) parts.push(d.decisions.join(', '));
      if (d.interventions && d.interventions.length) parts.push(d.interventions.join(', '));
      return `day ${pad(d.day)} — ${d.title || d.log}` + (parts.length ? ` (${parts.join(' · ')})` : '');
    };
    ticks.addEventListener('mouseover', e => {
      const mark = e.target.closest('.mark');
      if (!mark) return;
      const left = parseFloat(mark.style.left) || 0;
      // recover the day from the tick's title (set by organism.buildTicks: "day N: …")
      const m = /day (\d+)/.exec(mark.getAttribute('title') || '');
      const d = m ? DAYS.find(x => x.day === Number(m[1])) : null;
      if (!d) return;
      cap.textContent = labelFor(d);
      cap.style.left = left + '%';
      cap.classList.add('show');
    });
    ticks.addEventListener('mouseout', () => cap.classList.remove('show'));
  }
})();
