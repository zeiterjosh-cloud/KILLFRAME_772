/**
 * examples.js
 * Reference prompts and fully-worked output examples for all three modes.
 * These serve as quality/consistency benchmarks and in-app inspiration.
 */

import { MODE } from './modes.js';

// ─── GAME MODE examples ──────────────────────────────────────────────────────

const GAME_EXAMPLES = [
  {
    id: 'coin-tapper',
    label: '🪙 Coin Tapper',
    prompt: 'A simple idle clicker where you tap to earn coins, unlock upgrades, and watch numbers go up.',
    output: {
      concept:
        'Coin Tapper — an idle clicker where every tap produces coins. ' +
        'Idle income keeps growing even when the screen is closed, pulling players back.',
      coreLoop:
        'Tap screen → earn coins → buy upgrade → earn coins faster → tap again. ' +
        'Each cycle takes ≈8 seconds; upgrades compress the cycle to feel instant.',
      progressionSystem:
        '10 upgrade tiers (Wooden Pickaxe → Diamond Drill → Robot Miner → …). ' +
        'Each tier doubles passive income and unlocks a new visual for the tap button. ' +
        'A "prestige" layer resets progress for a permanent ×2 multiplier.',
      rewardSystem:
        'Daily login bonus (escalating 7-day streak). ' +
        'Achievement chests at milestone coin counts (1 K, 10 K, 1 M). ' +
        'Random "Golden Tap" event every 5–10 minutes that triples earnings for 15 s.',
      feedbackSystem:
        'Floating "+1" labels fly off every tap with increasing font size on combos. ' +
        'Screen shake + gold particle burst on upgrade purchase. ' +
        'Satisfying "cha-ching" SFX on every 100-coin threshold.',
      challengeSystem:
        'Costs scale exponentially (×1.15 per level). ' +
        'Prestige resets force players to rediscover the dopamine spike of early progress. ' +
        'Weekly leaderboard adds social pressure.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Coin Tapper</title>
  <style>
    body { background:#1a1a2e; color:#eee; font-family:sans-serif; text-align:center; padding:40px; }
    #coin-btn { font-size:80px; cursor:pointer; user-select:none; transition:transform .1s; }
    #coin-btn:active { transform:scale(.9); }
    #coins { font-size:2rem; margin:20px 0; }
    #upgrade-btn { padding:12px 28px; font-size:1rem; background:#f0a500; border:none; border-radius:8px; cursor:pointer; }
    #upgrade-btn:disabled { opacity:.4; cursor:default; }
    #cps { color:#aaa; margin-top:8px; }
  </style>
</head>
<body>
  <h1>🪙 Coin Tapper</h1>
  <div id="coins">Coins: 0</div>
  <div id="coin-btn">🪙</div>
  <div id="cps">+0 coins/sec</div>
  <br/>
  <button id="upgrade-btn">Buy Upgrade (Cost: 10)</button>

  <script>
    let coins = 0, cps = 0, upgradeCost = 10, upgradeLevel = 0;
    const coinsEl = document.getElementById('coins');
    const cpsEl   = document.getElementById('cps');
    const btn     = document.getElementById('upgrade-btn');
    const coinBtn = document.getElementById('coin-btn');

    coinBtn.addEventListener('click', () => {
      coins += 1 + upgradeLevel;
      render();
      floatLabel(coinBtn, \`+\${1 + upgradeLevel}\`);
    });

    btn.addEventListener('click', () => {
      if (coins < upgradeCost) return;
      coins -= upgradeCost;
      upgradeLevel++;
      cps += upgradeLevel;
      upgradeCost = Math.floor(upgradeCost * 1.5);
      btn.textContent = \`Buy Upgrade (Cost: \${upgradeCost})\`;
      render();
    });

    setInterval(() => { coins += cps; render(); }, 1000);

    function render() {
      coinsEl.textContent = \`Coins: \${Math.floor(coins)}\`;
      cpsEl.textContent   = \`+\${cps} coins/sec\`;
      btn.disabled        = coins < upgradeCost;
    }

    function floatLabel(el, text) {
      const span = document.createElement('span');
      span.textContent = text;
      Object.assign(span.style, {
        position:'fixed', left: el.getBoundingClientRect().left + 'px',
        top: el.getBoundingClientRect().top + 'px',
        color:'#f0a500', fontWeight:'bold', fontSize:'1.4rem',
        pointerEvents:'none', transition:'transform 1s, opacity 1s',
        zIndex:9999,
      });
      document.body.appendChild(span);
      requestAnimationFrame(() => {
        span.style.transform = 'translateY(-60px)';
        span.style.opacity   = '0';
      });
      setTimeout(() => span.remove(), 1000);
    }
  </script>
</body>
</html>`,
      addictiveUpgrades:
        '1. Prestige system — reset for permanent multiplier.\n' +
        '2. Offline earnings summary shown on app open ("You earned 4,200 coins while away!").\n' +
        '3. Random events: Golden Tap, Coin Rain, Double Income for 30 s.\n' +
        '4. Cosmetic tap button skins (unlocked via achievements).\n' +
        '5. Social leaderboard: "You are ranked #47 globally!"',
    },
  },
];

// ─── APP MODE examples ───────────────────────────────────────────────────────

const APP_EXAMPLES = [
  {
    id: 'habit-tracker',
    label: '📅 Daily Habit Tracker',
    prompt:
      'A habit tracker that rewards streaks, shows beautiful progress charts, and sells a premium tier for advanced analytics.',
    output: {
      problem:
        'People want to build good habits but lack accountability and visible progress. ' +
        'Existing apps are too complex or feel clinical.',
      targetUser:
        'Productivity-focused adults (25–40) who want to change behaviour and like data. ' +
        'Secondary: students building study routines.',
      monetizationPlan:
        'Freemium model:\n' +
        '• Free tier: up to 3 habits, 7-day history, basic streak counter.\n' +
        '• Pro tier ($4.99/month or $39.99/year): unlimited habits, 90-day analytics, ' +
        'export to CSV, custom reminder sounds, and a "Coach" mode with weekly summaries.\n' +
        '• One-time "Lifetime" purchase at $79.99.',
      retentionSystems:
        '• Daily push notification at user-set time ("Don\'t break your 14-day streak!").\n' +
        '• Animated streak flame that grows in size after 7, 30, 100 days.\n' +
        '• Weekly email digest: habits completed, missed, and one tip.\n' +
        '• Monthly "Habit Report Card" shareable graphic.',
      mvpFeatures:
        '1. Add / edit / delete habits.\n' +
        '2. Daily check-in with one tap.\n' +
        '3. Streak counter per habit.\n' +
        '4. Simple heatmap calendar.\n' +
        '5. Push notification reminder.\n' +
        '6. Paywall for Pro features.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Habit Tracker MVP</title>
  <style>
    body { background:#0d1117; color:#e6edf3; font-family:sans-serif; max-width:480px; margin:40px auto; padding:0 16px; }
    h1 { color:#58a6ff; }
    .habit { display:flex; align-items:center; justify-content:space-between;
             background:#161b22; border-radius:8px; padding:12px 16px; margin:8px 0; }
    .habit-name { font-size:1rem; }
    .streak { color:#f0a500; font-size:.9rem; }
    .check-btn { background:#238636; border:none; color:#fff; padding:8px 16px; border-radius:6px; cursor:pointer; }
    .check-btn.done { background:#2d333b; color:#8b949e; cursor:default; }
    #add-form { display:flex; gap:8px; margin-top:16px; }
    #habit-input { flex:1; padding:10px; border-radius:6px; border:1px solid #30363d; background:#161b22; color:#e6edf3; }
    #add-btn { padding:10px 18px; background:#1f6feb; border:none; color:#fff; border-radius:6px; cursor:pointer; }
    .pro-banner { background:#161b22; border:1px solid #f0a500; border-radius:8px; padding:12px; margin-top:24px; text-align:center; color:#f0a500; }
  </style>
</head>
<body>
  <h1>🔥 Habit Tracker</h1>
  <div id="habit-list"></div>
  <div id="add-form">
    <input id="habit-input" placeholder="New habit…" maxlength="40" />
    <button id="add-btn">+ Add</button>
  </div>
  <div class="pro-banner">⭐ Go Pro — Unlimited habits + analytics — $4.99/mo</div>

  <script>
    const MAX_FREE = 3;
    let habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const today = new Date().toDateString();

    document.getElementById('add-btn').addEventListener('click', () => {
      const input = document.getElementById('habit-input');
      const name  = input.value.trim();
      if (!name) return;
      if (habits.length >= MAX_FREE) {
        alert('Free tier: max 3 habits. Upgrade to Pro for unlimited!');
        return;
      }
      habits.push({ id: Date.now(), name, streak: 0, lastChecked: null });
      save(); render(); input.value = '';
    });

    function checkIn(id) {
      const h = habits.find(x => x.id === id);
      if (!h || h.lastChecked === today) return;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      h.streak = h.lastChecked === yesterday ? h.streak + 1 : 1;
      h.lastChecked = today;
      save(); render();
    }

    function render() {
      const list = document.getElementById('habit-list');
      list.innerHTML = habits.map(h => {
        const done = h.lastChecked === today;
        return \`<div class="habit">
          <span class="habit-name">\${h.name}</span>
          <span class="streak">🔥 \${h.streak} day\${h.streak !== 1 ? 's' : ''}</span>
          <button class="check-btn \${done ? 'done' : ''}"
                  onclick="checkIn(\${h.id})" \${done ? 'disabled' : ''}>
            \${done ? '✓ Done' : 'Check In'}
          </button>
        </div>\`;
      }).join('');
    }

    function save() { localStorage.setItem('habits', JSON.stringify(habits)); }
    render();
  </script>
</body>
</html>`,
      growthIdeas:
        '1. "Share your streak" card — viral loop via social sharing.\n' +
        '2. Friend accountability groups (Pro feature).\n' +
        '3. Integration with Apple Health / Google Fit.\n' +
        '4. AI-powered habit suggestions based on completed habits.\n' +
        '5. Marketplace for "habit packs" (Morning Routine, Study Mode, etc.).',
    },
  },
];

// ─── HYBRID MODE examples ────────────────────────────────────────────────────

const HYBRID_EXAMPLES = [
  {
    id: 'word-blitz',
    label: '💬 Word Blitz',
    prompt:
      'A fast word-finding puzzle game with a cosmetic shop, daily challenges, and an optional ad-remove purchase.',
    output: {
      concept:
        'Word Blitz — tap letters on a 4×4 grid to form words before the timer runs out. ' +
        'Short rounds (60 s) make it a perfect "one more game" loop. ' +
        'A cosmetics shop and daily challenge keep players returning.',
      coreLoop:
        'See grid → spot word → swipe letters → score points → see leaderboard → play again. ' +
        'Each round is 60 seconds. Post-game screen shows next daily challenge countdown.',
      progressionSystem:
        'XP earned per word length. Level 1–100 track with rewards every 5 levels. ' +
        'Season pass (30 days) with exclusive tile themes and avatar frames.',
      rewardSystem:
        '• Coins per round based on score.\n' +
        '• Daily challenge: bonus ×3 coins.\n' +
        '• Streak bonus: play 7 days in a row → Rare tile skin.\n' +
        '• Achievement badges visible on profile.',
      monetizationPlan:
        'Freemium + cosmetics:\n' +
        '• Free: play unlimited, watch rewarded ads for coin boost.\n' +
        '• Remove Ads: $2.99 one-time.\n' +
        '• Coin packs: $0.99 (500 coins) → $9.99 (6,000 coins).\n' +
        '• Season Pass: $4.99/month — exclusive themes, 2× XP, early challenge access.',
      premiumExpansions:
        '1. Tile skin store — animated backgrounds (fire, ice, space).\n' +
        '2. Power-ups: Shuffle (50 coins), Freeze timer (80 coins), Word Hint (30 coins).\n' +
        '3. Custom avatar builder unlocked at Level 20.\n' +
        '4. Guild system: join word clubs, compete in weekly tournaments.\n' +
        '5. "Impossible Mode" unlocked with Season Pass.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Word Blitz</title>
  <style>
    body { background:#0d1117; color:#e6edf3; font-family:sans-serif; text-align:center; padding:24px; }
    h1 { color:#58a6ff; margin-bottom:4px; }
    #timer { font-size:2rem; color:#f0a500; }
    #score { font-size:1.2rem; margin:8px 0; }
    #grid { display:inline-grid; grid-template-columns:repeat(4,64px); gap:6px; margin:16px auto; }
    .cell { width:64px; height:64px; background:#161b22; border:2px solid #30363d;
            border-radius:8px; font-size:1.6rem; font-weight:bold; cursor:pointer;
            display:flex; align-items:center; justify-content:center; user-select:none;
            transition:background .15s; }
    .cell.selected { background:#1f6feb; border-color:#58a6ff; }
    #word-display { font-size:1.4rem; letter-spacing:.2rem; min-height:2rem; color:#79c0ff; }
    #submit-btn { margin-top:8px; padding:10px 28px; background:#238636; border:none;
                  color:#fff; border-radius:8px; font-size:1rem; cursor:pointer; }
    #submit-btn:disabled { opacity:.4; cursor:default; }
    #found-words { margin-top:12px; color:#8b949e; font-size:.85rem; }
    #game-over { display:none; margin-top:24px; }
    #restart-btn { padding:12px 32px; background:#f0a500; border:none; border-radius:8px;
                   font-size:1rem; cursor:pointer; font-weight:bold; }
    .coins { color:#f0a500; }
  </style>
</head>
<body>
  <h1>💬 Word Blitz</h1>
  <div id="timer">60</div>
  <div id="score">Score: 0 &nbsp;|&nbsp; <span class="coins">🪙 Coins: 0</span></div>
  <div id="word-display">—</div>
  <div id="grid"></div>
  <button id="submit-btn" disabled>Submit Word</button>
  <div id="found-words"></div>
  <div id="game-over">
    <h2>⏱ Time's Up!</h2>
    <p id="final-score"></p>
    <button id="restart-btn">Play Again</button>
    <p style="color:#8b949e;font-size:.8rem;margin-top:16px;">
      📺 Watch an ad to double your coins!
    </p>
  </div>

  <script>
    const LETTERS = 'AAABBBCCDDEEEEFFGGHIIIJKLLLMMNNOOOPQRRRSSSTTTTUUUVVWWXYYZ'.split('');
    const VALID_WORDS = new Set(['CAT','DOG','ACE','BAD','CAB','DAD','EEL','FIG','GAP',
      'HAT','ICE','JAB','KEG','LAP','MAP','NAP','OAK','PAD','RAG','SAP','TAP','VAN',
      'WAX','YAK','CAPE','DART','FACE','GATE','HATE','JADE','KALE','LACE','MACE',
      'PACE','RACE','SAFE','TALE','VANE','WADE','CAGE','BAKE','LAKE','FAKE','CAKE',
      'DAZE','GAZE','HAZE','LAZE','MAZE','RAZE','GRAZE','BLAZE','CRAZE','PHASE',
      'SPACE','TRACE','PLACE','GRACE','BRACE','PRICE','SLICE','SPICE','TWICE']);

    let grid = [], selected = [], score = 0, coins = 0, foundWords = [], timeLeft = 60, timerInterval;

    function randomLetter() { return LETTERS[Math.floor(Math.random() * LETTERS.length)]; }

    function buildGrid() {
      grid = Array.from({length:16}, randomLetter);
      selected = []; foundWords = [];
      renderGrid();
      document.getElementById('word-display').textContent = '—';
      document.getElementById('submit-btn').disabled = true;
      document.getElementById('found-words').textContent = '';
    }

    function renderGrid() {
      const el = document.getElementById('grid');
      el.innerHTML = grid.map((l, i) =>
        \`<div class="cell \${selected.includes(i)?'selected':''}"
              onclick="toggleCell(\${i})">\${l}</div>\`
      ).join('');
    }

    function toggleCell(i) {
      if (timeLeft <= 0) return;
      const idx = selected.indexOf(i);
      if (idx >= 0) { selected.splice(idx); }
      else { selected.push(i); }
      const word = selected.map(x => grid[x]).join('');
      document.getElementById('word-display').textContent = word || '—';
      document.getElementById('submit-btn').disabled = word.length < 3;
      renderGrid();
    }

    document.getElementById('submit-btn').addEventListener('click', () => {
      const word = selected.map(x => grid[x]).join('');
      if (word.length < 3 || foundWords.includes(word)) return;
      if (VALID_WORDS.has(word)) {
        const pts = word.length * word.length;
        score += pts; coins += word.length;
        foundWords.push(word);
        document.getElementById('score').innerHTML =
          \`Score: \${score} &nbsp;|&nbsp; <span class="coins">🪙 Coins: \${coins}</span>\`;
        document.getElementById('found-words').textContent =
          'Found: ' + foundWords.join(', ');
        // Replace used letters
        selected.forEach(i => { grid[i] = randomLetter(); });
      }
      selected = [];
      document.getElementById('word-display').textContent = '—';
      document.getElementById('submit-btn').disabled = true;
      renderGrid();
    });

    function startTimer() {
      timeLeft = 60;
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          document.getElementById('game-over').style.display = 'block';
          document.getElementById('final-score').textContent =
            \`Final Score: \${score} — Coins earned: 🪙 \${coins}\`;
        }
      }, 1000);
    }

    document.getElementById('restart-btn').addEventListener('click', () => {
      score = 0; coins = 0;
      document.getElementById('score').innerHTML = 'Score: 0 &nbsp;|&nbsp; <span class="coins">🪙 Coins: 0</span>';
      document.getElementById('game-over').style.display = 'none';
      buildGrid(); startTimer();
    });

    buildGrid(); startTimer();
  </script>
</body>
</html>`,
      scalingRoadmap:
        '**Month 1:** Launch MVP — core loop + cosmetics shop + remove-ads IAP.\n' +
        '**Month 2:** Season Pass + daily challenge system + push notifications.\n' +
        '**Month 3:** Guild tournaments + social sharing card.\n' +
        '**Month 6:** Expand word dictionary, add new game modes (Blitz vs. Zen), localise to 5 languages.\n' +
        '**Year 1:** Target 50 K MAU → $5K–15K MRR from Season Pass + IAP.',
    },
  },
];

// ─── Public API ──────────────────────────────────────────────────────────────

export const EXAMPLES = {
  [MODE.GAME]: GAME_EXAMPLES,
  [MODE.APP]: APP_EXAMPLES,
  [MODE.HYBRID]: HYBRID_EXAMPLES,
};

/**
 * Returns all examples for a given mode.
 * @param {string} modeId
 * @returns {Array}
 */
export function getExamplesForMode(modeId) {
  return EXAMPLES[modeId] || [];
}

/**
 * Returns a single example by mode and index.
 * @param {string} modeId
 * @param {number} index
 * @returns {object|null}
 */
export function getExample(modeId, index = 0) {
  const list = getExamplesForMode(modeId);
  return list[index] || null;
}
