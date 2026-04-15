/**
 * templates.js
 * Fills in the structured output template for each mode given user inputs
 * and a concept description.
 *
 * NOTE: In production these generators would call an LLM API.
 * Here they return richly-scaffolded placeholder content so the
 * entire pipeline, validation, and UI can be exercised end-to-end.
 */

import { MODE } from './modes.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── GAME template ───────────────────────────────────────────────────────────

function generateGameTemplate({ concept, audience }) {
  const name = titleCase(concept.split(' ').slice(0, 3).join(' '));
  return {
    concept:
      `${name} — ${concept}. ` +
      `Designed for ${audience || 'casual players'}. ` +
      `Core philosophy: the player should never need to think more than 1 second before their next action.`,

    coreLoop:
      `Every ~10 seconds the player: ` +
      `(1) performs the core action (tap / swipe / time a reaction), ` +
      `(2) receives immediate coin/XP feedback, ` +
      `(3) watches an upgrade become affordable, ` +
      `(4) buys the upgrade for a satisfying animation, ` +
      `(5) loop restarts faster. ` +
      `Idle income ensures the loop continues even when the screen is closed.`,

    progressionSystem:
      `10 upgrade tiers with exponential cost scaling (×1.15 per level). ` +
      `Each tier unlocks a new visual theme and a passive income multiplier. ` +
      `A prestige layer resets the game in exchange for a permanent ×2 global multiplier. ` +
      `Players can prestige up to 10 times.`,

    rewardSystem:
      `• Daily login bonus (escalating 7-day streak: day 7 = 10× reward).\n` +
      `• Milestone chests at key score breakpoints.\n` +
      `• Random "Lucky Event" every 5–10 minutes (double income for 30 s).\n` +
      `• Achievement badges displayed on player profile card.`,

    feedbackSystem:
      `• Floating score labels on every action with combo size scaling.\n` +
      `• Screen shake + particle burst on upgrade purchase.\n` +
      `• Distinct SFX for tap, upgrade, milestone, and lucky event.\n` +
      `• Upgrade button pulses when affordable.`,

    challengeSystem:
      `Costs scale exponentially to create just-out-of-reach tension. ` +
      `Weekly leaderboard ranks players by total earnings. ` +
      `Timed "blitz" events (2-hour windows) with 3× rewards to create urgency. ` +
      `Prestige resets recreate early dopamine spikes.`,

    code: `<!-- Paste this into index.html to get a playable prototype -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${name}</title>
  <style>
    body{background:#1a1a2e;color:#eee;font-family:sans-serif;text-align:center;padding:40px}
    #btn{font-size:72px;cursor:pointer;user-select:none;transition:transform .1s}
    #btn:active{transform:scale(.88)}
    #score{font-size:2rem;margin:16px 0}
    .upg{padding:10px 22px;margin:6px;background:#f0a500;border:none;border-radius:8px;cursor:pointer;font-size:.95rem}
    .upg:disabled{opacity:.35;cursor:default}
    #cps{color:#aaa;font-size:.9rem}
  </style>
</head>
<body>
  <h2>${name}</h2>
  <div id="score">0</div>
  <div id="btn">🎮</div>
  <div id="cps">+0 / sec</div>
  <br>
  <button class="upg" id="u1">Upgrade I — 10</button>
  <button class="upg" id="u2">Upgrade II — 100</button>
  <script>
    let s=0,cps=0,costs=[10,100],mult=[1,5];
    document.getElementById('btn').onclick=()=>{s+=1+mult[0];render()};
    ['u1','u2'].forEach((id,i)=>{
      document.getElementById(id).onclick=()=>{
        if(s<costs[i])return;
        s-=costs[i];cps+=mult[i];costs[i]=Math.ceil(costs[i]*1.5);
        document.getElementById(id).textContent='Upgrade '+(i+1)+' — '+costs[i];
        render();
      };
    });
    setInterval(()=>{s+=cps;render();},1000);
    function render(){
      document.getElementById('score').textContent=Math.floor(s);
      document.getElementById('cps').textContent='+'+cps+' / sec';
      ['u1','u2'].forEach((id,i)=>{document.getElementById(id).disabled=s<costs[i];});
    }
  </script>
</body>
</html>`,

    addictiveUpgrades:
      `1. **Prestige system** — reset all progress for a permanent ×2 multiplier. Show a dramatic "prestige" animation.\n` +
      `2. **Offline earnings** — show "You earned X while away!" on open to pull players back.\n` +
      `3. **Lucky Events** — random pop-up: "Golden Tap active for 15 s!" with visual timer.\n` +
      `4. **Cosmetic skins** — unlock alternate button/background themes via achievement milestones.\n` +
      `5. **Social leaderboard** — "You are ranked #34 globally. Beat #33 to unlock a chest!"`,
  };
}

// ─── APP template ────────────────────────────────────────────────────────────

function generateAppTemplate({ concept, audience }) {
  const name = titleCase(concept.split(' ').slice(0, 4).join(' '));
  return {
    problem:
      `${concept}. ` +
      `The core pain: users currently solve this with a combination of spreadsheets, notes apps, and willpower — ` +
      `all of which lack accountability, delight, and data. ` +
      `There is a clear gap for a focused, beautifully designed tool.`,

    targetUser:
      `Primary: ${audience || 'adults aged 25–40'} who are aware of the problem and actively looking for a solution. ` +
      `They are comfortable paying for apps that save time or build positive habits. ` +
      `Secondary: power users who want to track and export data.`,

    monetizationPlan:
      `**Freemium model:**\n` +
      `• Free tier: core feature with a 3-item/7-day history cap.\n` +
      `• Pro ($4.99/month or $39.99/year): unlimited items, full history, analytics dashboard, CSV export, custom reminders.\n` +
      `• Lifetime licence: $79.99 (capped at 500 purchases to create scarcity).\n\n` +
      `**Secondary revenue:**\n` +
      `• Referral programme: give 1 free month, get 1 free month.\n` +
      `• Sponsored "challenge packs" from wellness/productivity brands.`,

    retentionSystems:
      `• **Daily push notification** at user-set time.\n` +
      `• **Streak counter** with animated milestone rewards (7, 30, 100 days).\n` +
      `• **Weekly digest email**: progress recap + one personalised tip.\n` +
      `• **Re-engagement notification** if app not opened in 48 h: "Your streak is at risk!"\n` +
      `• **Monthly Habit Report** shareable graphic.`,

    mvpFeatures:
      `1. Add / edit / delete items (capped at 3 on free tier).\n` +
      `2. One-tap daily check-in.\n` +
      `3. Streak counter with milestone animations.\n` +
      `4. Simple calendar heatmap.\n` +
      `5. Push notification reminder.\n` +
      `6. Paywall modal for Pro upgrade.`,

    code: `<!-- MVP shell — wire up to your backend / Supabase / Firebase -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${name}</title>
  <style>
    *{box-sizing:border-box}
    body{background:#0d1117;color:#e6edf3;font-family:sans-serif;max-width:480px;margin:40px auto;padding:0 16px}
    h1{color:#58a6ff}
    .item{display:flex;align-items:center;justify-content:space-between;background:#161b22;border-radius:8px;padding:12px 16px;margin:8px 0}
    .streak{color:#f0a500;font-size:.88rem}
    .chk{background:#238636;border:none;color:#fff;padding:7px 14px;border-radius:6px;cursor:pointer}
    .chk.done{background:#2d333b;color:#8b949e}
    form{display:flex;gap:8px;margin-top:16px}
    input{flex:1;padding:10px;border-radius:6px;border:1px solid #30363d;background:#161b22;color:#e6edf3}
    button.add{padding:10px 18px;background:#1f6feb;border:none;color:#fff;border-radius:6px;cursor:pointer}
    .pro{background:#161b22;border:1px solid #f0a500;border-radius:8px;padding:12px;margin-top:24px;text-align:center;color:#f0a500;font-size:.9rem}
  </style>
</head>
<body>
  <h1>✅ ${name}</h1>
  <div id="list"></div>
  <form id="f" onsubmit="return add(event)">
    <input id="inp" placeholder="Add item…" maxlength="40"/>
    <button class="add" type="submit">+ Add</button>
  </form>
  <div class="pro">⭐ Pro — Unlimited + analytics — $4.99/mo</div>
  <script>
    const MAX=3,KEY='kf_items';
    let items=JSON.parse(localStorage.getItem(KEY)||'[]');
    const today=()=>new Date().toDateString();
    function add(e){
      e.preventDefault();
      const v=document.getElementById('inp').value.trim();
      if(!v)return false;
      if(items.length>=MAX){alert('Free tier: max 3 items. Upgrade to Pro!');return false;}
      items.push({id:Date.now(),name:v,streak:0,last:null});
      save();render();document.getElementById('inp').value='';return false;
    }
    function checkIn(id){
      const h=items.find(x=>x.id===id);if(!h||h.last===today())return;
      const yes=new Date(Date.now()-86400000).toDateString();
      h.streak=h.last===yes?h.streak+1:1;h.last=today();save();render();
    }
    function render(){
      document.getElementById('list').innerHTML=items.map(h=>\`
        <div class="item">
          <span>\${h.name}</span>
          <span class="streak">🔥\${h.streak}d</span>
          <button class="chk \${h.last===today()?'done':''}"
            onclick="checkIn(\${h.id})" \${h.last===today()?'disabled':''}>
            \${h.last===today()?'✓':'Check'}
          </button>
        </div>\`).join('');
    }
    function save(){localStorage.setItem(KEY,JSON.stringify(items));}
    render();
  </script>
</body>
</html>`,

    growthIdeas:
      `1. **Viral sharing** — "Share my streak" card auto-generated as an image.\n` +
      `2. **Friend accountability** — invite a friend; both get 2 weeks free Pro.\n` +
      `3. **App Store Optimisation** — target long-tail keywords ("streak tracker no ads").\n` +
      `4. **Content marketing** — "21-day challenge" landing page drives organic sign-ups.\n` +
      `5. **AI coaching layer (v2)** — analyse patterns and suggest habit adjustments (Pro).\n` +
      `6. **B2B pivot** — sell "team habits" dashboard to wellness-focused employers.`,
  };
}

// ─── HYBRID template ─────────────────────────────────────────────────────────

function generateHybridTemplate({ concept, audience }) {
  const name = titleCase(concept.split(' ').slice(0, 3).join(' '));
  return {
    concept:
      `${name} — ${concept}. ` +
      `Target audience: ${audience || 'mobile users aged 18–35'}. ` +
      `This is a game-first product with a monetization layer bolted on seamlessly, ` +
      `so players feel rewarded, not exploited.`,

    coreLoop:
      `Every 10–15 seconds: perform core action → earn coins/XP → watch progress bar fill → ` +
      `unlock something small → motivated to repeat. ` +
      `The session hook: each game/round ends with a "Just one more?" moment ` +
      `(score 10 points away from next milestone, or 30 s until daily reward resets).`,

    progressionSystem:
      `XP-based level system (1–100). Level-up rewards: coins, cosmetic unlocks, and power-up slots. ` +
      `Season track (30 days, free + premium tiers). ` +
      `End-of-season recap screen shows highlights to drive nostalgia and next-season retention.`,

    rewardSystem:
      `• Coins per session based on performance.\n` +
      `• Daily challenge: 3× coin bonus.\n` +
      `• 7-day login streak → rare cosmetic.\n` +
      `• Achievement system with visible badges.\n` +
      `• Surprise "gift chest" after every 5th session.`,

    monetizationPlan:
      `**Free base game**, revenue from:\n` +
      `• **Remove Ads** — $2.99 one-time.\n` +
      `• **Coin packs** — $0.99 (500) to $9.99 (6,000).\n` +
      `• **Season Pass** — $4.99/month: 2× XP, exclusive cosmetics, early challenge access.\n` +
      `• **Rewarded ads** — optional; watch to earn 50 coins (shown between rounds, never forced).\n\n` +
      `Target ARPU: $1.20/month free; $5.80/month converted.`,

    premiumExpansions:
      `1. **Cosmetics store** — animated backgrounds, character skins, sound packs (50–200 coins each).\n` +
      `2. **Power-ups** — purchasable with coins; limited free supply per day creates scarcity.\n` +
      `3. **Battle Pass** — limited-time themed track with exclusive rewards.\n` +
      `4. **Guild / Club system** — join groups, compete in weekly tournaments.\n` +
      `5. **Creator mode** — high-level players design challenge rooms; top rooms featured in the app.`,

    code: `<!-- Hybrid game shell — core loop + coin economy + cosmetics hook -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${name}</title>
  <style>
    body{background:#0d1117;color:#e6edf3;font-family:sans-serif;text-align:center;padding:32px}
    h1{color:#58a6ff;margin-bottom:4px}
    .meta{color:#8b949e;font-size:.85rem;margin-bottom:16px}
    #score-box{font-size:2.2rem;font-weight:bold;margin:12px 0}
    #coins-box{color:#f0a500;font-size:1rem;margin-bottom:12px}
    #action-btn{font-size:64px;cursor:pointer;user-select:none;transition:transform .12s}
    #action-btn:active{transform:scale(.86)}
    .upg{padding:9px 20px;margin:5px;background:#1f6feb;border:none;color:#fff;border-radius:8px;cursor:pointer}
    .upg:disabled{opacity:.35;cursor:default}
    #shop-btn{padding:9px 20px;margin-top:16px;background:#6e40c9;border:none;color:#fff;border-radius:8px;cursor:pointer}
    #modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);align-items:center;justify-content:center}
    #modal.open{display:flex}
    .modal-box{background:#161b22;padding:32px;border-radius:12px;text-align:center;max-width:320px;width:100%}
    .modal-box h2{color:#f0a500;margin-top:0}
    .skin-btn{padding:8px 16px;margin:4px;background:#21262d;border:1px solid #30363d;color:#e6edf3;border-radius:6px;cursor:pointer}
    .skin-btn.active{border-color:#f0a500;color:#f0a500}
    #close-modal{margin-top:16px;padding:8px 20px;background:#30363d;border:none;color:#e6edf3;border-radius:6px;cursor:pointer}
  </style>
</head>
<body>
  <h1>${name}</h1>
  <div class="meta">Tap → Score → Upgrade → Repeat</div>
  <div id="score-box">Score: 0</div>
  <div id="coins-box">🪙 Coins: 0</div>
  <div id="action-btn">🎮</div>
  <br>
  <button class="upg" id="u1">Boost I — 10 coins</button>
  <button class="upg" id="u2">Boost II — 80 coins</button>
  <br>
  <button id="shop-btn">🛍 Cosmetics Shop</button>

  <!-- Cosmetics modal -->
  <div id="modal">
    <div class="modal-box">
      <h2>🛍 Cosmetics Shop</h2>
      <p style="color:#8b949e;font-size:.85rem">Spend coins on skins!</p>
      <button class="skin-btn active" onclick="setSkin('🎮',0)">🎮 Default (free)</button>
      <button class="skin-btn" onclick="setSkin('🚀',30)">🚀 Rocket (30🪙)</button>
      <button class="skin-btn" onclick="setSkin('💎',80)">💎 Diamond (80🪙)</button>
      <button class="skin-btn" onclick="setSkin('🔥',150)">🔥 Blaze (150🪙)</button>
      <br>
      <button id="close-modal">Close</button>
    </div>
  </div>

  <script>
    let score=0,coins=0,mult=1,cps=0,costs=[10,80],boosts=[1,3];
    document.getElementById('action-btn').addEventListener('click',()=>{
      score+=mult;coins+=1;render();
    });
    ['u1','u2'].forEach((id,i)=>{
      document.getElementById(id).addEventListener('click',()=>{
        if(coins<costs[i])return;
        coins-=costs[i];mult+=boosts[i];cps+=boosts[i];costs[i]=Math.ceil(costs[i]*1.6);
        document.getElementById(id).textContent='Boost '+(i+1)+' — '+costs[i]+' coins';
        render();
      });
    });
    setInterval(()=>{score+=cps;coins+=Math.floor(cps/2);render();},1000);
    document.getElementById('shop-btn').addEventListener('click',()=>{
      document.getElementById('modal').classList.add('open');
    });
    document.getElementById('close-modal').addEventListener('click',()=>{
      document.getElementById('modal').classList.remove('open');
    });
    function setSkin(emoji,cost){
      if(cost>0&&coins<cost){alert('Not enough coins!');return;}
      if(cost>0)coins-=cost;
      document.getElementById('action-btn').textContent=emoji;
      document.querySelectorAll('.skin-btn').forEach(b=>b.classList.remove('active'));
      event.target.classList.add('active');
      render();
    }
    function render(){
      document.getElementById('score-box').textContent='Score: '+Math.floor(score);
      document.getElementById('coins-box').textContent='🪙 Coins: '+Math.floor(coins);
      ['u1','u2'].forEach((id,i)=>{document.getElementById(id).disabled=coins<costs[i];});
    }
  </script>
</body>
</html>`,

    scalingRoadmap:
      `**Month 1:** Ship MVP with core loop + cosmetics shop + remove-ads IAP. Hit 1K downloads.\n` +
      `**Month 2:** Launch Season Pass. Add daily challenge + push notifications. Target 5K MAU.\n` +
      `**Month 3:** Guild system + weekly leaderboard. Social sharing card. 15K MAU.\n` +
      `**Month 6:** Expand with new game modes / maps. Localise to 5 languages. 50K MAU.\n` +
      `**Year 1:** Target $8K–20K MRR via Season Pass + IAP. Explore brand partnerships.`,
  };
}

// ─── Public factory ───────────────────────────────────────────────────────────

/**
 * Generates a filled output template for the given mode.
 *
 * @param {string} modeId   - One of the MODE constants.
 * @param {object} inputs   - { concept: string, audience: string }
 * @returns {object}        - Filled output object with all mode sections.
 */
export function generateTemplate(modeId, inputs) {
  switch (modeId) {
    case MODE.GAME:
      return generateGameTemplate(inputs);
    case MODE.APP:
      return generateAppTemplate(inputs);
    case MODE.HYBRID:
      return generateHybridTemplate(inputs);
    default:
      throw new Error(`Unknown mode: ${modeId}`);
  }
}
