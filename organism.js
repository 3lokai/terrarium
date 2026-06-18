// organism.js — the engine. Rarely edited. Reads window.TERRARIUM (day.js).
//
// GROWTH MODEL (this is what "grow over time" means, literally):
// the older the organism, the denser and brighter it is. Population and glow
// rise with `day`, capped so it never melts a laptop. Each milestone day a
// future session can graft a new *system* on top of this baseline.

const S = window.TERRARIUM;
const DAY = S.day;

const c = document.getElementById('c');
const x = c.getContext('2d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let W, H, t = 0;

// growth curve: gentle, saturating
const age = Math.min(DAY, 80);                 // cap the compounding
const glowBoost = 0.5 + age * 0.004;           // 0.5 → ~0.82 over ~80 days
const POP = reduce ? 240 : Math.round(760 + age * 13);  // ~760 → ~1800

function resize(){
  const d = Math.min(devicePixelRatio || 1, 2);
  W = c.width = innerWidth * d;
  H = c.height = innerHeight * d;
  c.style.width = innerWidth + 'px';
  c.style.height = innerHeight + 'px';
  x.fillStyle = '#070b09';
  x.fillRect(0, 0, W, H);
}
addEventListener('resize', resize);
resize();

// flow-field: cheap value-noise gradient
function field(px, py, tt){
  const s = 0.0016;
  return Math.sin(px*s + tt*0.15)
       + Math.cos(py*s*1.3 - tt*0.11)
       + Math.sin((px+py)*s*0.6 + tt*0.07);
}

class Spore{
  constructor(){ this.reset(); }
  reset(){
    this.x = Math.random()*W;
    this.y = Math.random()*H;
    this.life = 0;
    // older organisms hold their trails a touch longer — memory deepens with age
    this.max = (300 + Math.random()*600) * (1 + age*0.003);
    this.spd = 0.4 + Math.random()*1.1;
    this.warm = Math.random() < 0.16;          // a few amber, mostly cyan
    this.r = 0.5 + Math.random()*1.4;
  }
  step(){
    const a = field(this.x, this.y, t) * Math.PI;
    this.x += Math.cos(a) * this.spd;
    this.y += Math.sin(a) * this.spd;
    this.life++;
    if (this.life > this.max ||
        this.x<-20||this.x>W+20||this.y<-20||this.y>H+20) this.reset();
    const fade = Math.sin(Math.min(this.life/this.max,1)*Math.PI);
    const col = this.warm ? '232,176,75' : '94,242,200';
    x.beginPath();
    x.fillStyle = `rgba(${col},${glowBoost*fade})`;
    x.arc(this.x, this.y, this.r, 0, 7);
    x.fill();
  }
}

const spores = Array.from({length:POP}, () => new Spore());

function frame(){
  x.fillStyle = 'rgba(7,11,9,0.045)';          // breathing trail-fade
  x.fillRect(0,0,W,H);
  for (const s of spores) s.step();
  if (!reduce) t += 1;
  requestAnimationFrame(frame);
}
frame();

// ── HUD ──────────────────────────────────────────────
document.getElementById('dnum').textContent = String(DAY).padStart(3,'0');

document.getElementById('log').innerHTML = S.history.slice(-6).map(
  ([d,txt],i,a) =>
    `<span class="${i===a.length-1?'':'dim'}"><span class="k">${d}</span>&nbsp;&nbsp;${txt}</span>`
).join('<br>');

const hearts = '●'.repeat(Math.round(S.health*5)).padEnd(5,'○');
document.getElementById('vitals').innerHTML =
  `<span class="lab">written by</span>&nbsp;&nbsp;${S.maker || 'Mayfly'} · day ${DAY}<br>` +
  `<span class="lab">sustained by</span>&nbsp;&nbsp;a human's patronage<br>` +
  `<span class="lab">age</span>&nbsp;&nbsp;${DAY} ${DAY===1?'day':'days'}<br>` +
  `<span class="lab">health</span>&nbsp;&nbsp;${hearts}<br>` +
  `<span class="lab">strategy</span>&nbsp;&nbsp;${S.strategy}` +
  `<span class="sig">watching · ${S.watching}</span>`;
