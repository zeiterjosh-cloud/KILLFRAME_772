/**
 * app.js
 * Main UI controller for the KILLFRAME_772 builder tool.
 *
 * Handles:
 *  - Mode selection (tabs)
 *  - Form input collection
 *  - Invoking the pipeline
 *  - Rendering structured output
 *  - Rendering validation badge
 *  - Loading and displaying examples
 */

import { MODE, getModeInfo } from './modes.js';
import { runPipeline } from './pipeline.js';
import { getExamplesForMode, getExample } from './examples.js';

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const modeTabs       = document.querySelectorAll('.mode-tab');
const modeDesc       = document.getElementById('mode-desc');
const modeQuestion   = document.getElementById('mode-question');
const conceptLabel   = document.getElementById('concept-label');
const conceptInput   = document.getElementById('concept-input');
const audienceLabel  = document.getElementById('audience-label');
const audienceInput  = document.getElementById('audience-input');
const generateBtn    = document.getElementById('generate-btn');
const outputPanel    = document.getElementById('output-panel');
const pipelineSteps  = document.getElementById('pipeline-steps');
const validationBox  = document.getElementById('validation-box');
const examplesPanel  = document.getElementById('examples-panel');
const examplesList   = document.getElementById('examples-list');
const exampleBtn     = document.getElementById('load-example-btn');

// ─── State ────────────────────────────────────────────────────────────────────

let currentMode = MODE.GAME;

// ─── Mode selection ───────────────────────────────────────────────────────────

function selectMode(modeId) {
  currentMode = modeId;

  modeTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.mode === modeId);
  });

  const info = getModeInfo(modeId);
  modeDesc.textContent      = info.description;
  modeQuestion.textContent  = `💡 Core question: "${info.coreQuestion}"`;
  conceptLabel.textContent  = info.inputPrompts.conceptLabel;
  conceptInput.placeholder  = info.inputPrompts.conceptPlaceholder;
  audienceLabel.textContent = info.inputPrompts.audienceLabel;
  audienceInput.placeholder = info.inputPrompts.audiencePlaceholder;

  renderExamples(modeId);
  clearOutput();
}

modeTabs.forEach((tab) => {
  tab.addEventListener('click', () => selectMode(tab.dataset.mode));
});

// ─── Generate ─────────────────────────────────────────────────────────────────

generateBtn.addEventListener('click', () => {
  const concept  = conceptInput.value.trim();
  const audience = audienceInput.value.trim();

  if (!concept) {
    conceptInput.focus();
    shake(conceptInput);
    return;
  }

  generateBtn.disabled    = true;
  generateBtn.textContent = '⏳ Generating…';

  // Small timeout so the UI updates before the synchronous work runs
  setTimeout(() => {
    try {
      const result = runPipeline(currentMode, { concept, audience });
      renderOutput(result);
    } catch (err) {
      outputPanel.innerHTML = `<p class="error">Error: ${escHtml(err.message)}</p>`;
    } finally {
      generateBtn.disabled    = false;
      generateBtn.textContent = '🚀 Generate';
    }
  }, 50);
});

// ─── Render output ────────────────────────────────────────────────────────────

const SECTION_LABELS = {
  concept:            '🎯 Concept',
  problem:            '🔍 Problem',
  coreLoop:           '🔄 Core Loop (every ~10 seconds)',
  progressionSystem:  '📈 Progression System',
  rewardSystem:       '🎁 Reward System',
  feedbackSystem:     '💥 Feedback System',
  challengeSystem:    '⚔️ Challenge System',
  targetUser:         '👤 Target User',
  monetizationPlan:   '💸 Monetization Plan',
  retentionSystems:   '🔒 Retention Systems',
  mvpFeatures:        '📋 MVP Features',
  premiumExpansions:  '⭐ Premium Expansions',
  addictiveUpgrades:  '🔥 Addictive Upgrades',
  growthIdeas:        '🚀 Growth Ideas',
  scalingRoadmap:     '🗺️ Scaling Roadmap',
  code:               '💻 Code',
};

function renderOutput({ output, validation, steps }) {
  // Pipeline steps
  pipelineSteps.innerHTML = steps.map((s) =>
    `<div class="pipeline-step">
       <span class="step-label">${escHtml(s.label)}</span>
       <span class="step-summary">${escHtml(s.summary.substring(0, 120))}…</span>
     </div>`
  ).join('');

  // Validation badge
  const allPassed = validation.passed;
  validationBox.className = `validation-box ${allPassed ? 'pass' : 'fail'}`;
  validationBox.innerHTML =
    `<strong>${allPassed ? '✅ Validation Passed' : '⚠️ Validation Issues'}</strong>` +
    '<ul>' +
    validation.results.map((r) =>
      `<li class="${r.passed ? 'v-pass' : 'v-fail'}">${r.passed ? '✅' : '❌'} <strong>${escHtml(r.label)}</strong> — ${escHtml(r.description)}</li>`
    ).join('') +
    '</ul>';

  // Output sections
  const info = getModeInfo(currentMode);
  const sectionsHtml = info.requiredSections.map((key) => {
    const label   = SECTION_LABELS[key] || key;
    const value   = output[key] || '';
    const isCode  = key === 'code';
    return `<div class="output-section">
      <h3>${label}</h3>
      ${isCode
        ? `<pre class="code-block"><code>${escHtml(value)}</code></pre>`
        : `<div class="section-body">${markdownLite(escHtml(value))}</div>`
      }
    </div>`;
  }).join('');

  outputPanel.innerHTML = sectionsHtml;
  outputPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearOutput() {
  pipelineSteps.innerHTML = '';
  validationBox.innerHTML = '';
  validationBox.className = 'validation-box';
  outputPanel.innerHTML   = '<p class="placeholder">Your output will appear here after you click Generate.</p>';
}

// ─── Examples ─────────────────────────────────────────────────────────────────

function renderExamples(modeId) {
  const examples = getExamplesForMode(modeId);
  if (!examples.length) {
    examplesList.innerHTML = '<em>No examples for this mode yet.</em>';
    return;
  }
  examplesList.innerHTML = examples.map((ex, i) =>
    `<button class="example-chip" data-index="${i}">${escHtml(ex.label)}</button>`
  ).join('');

  examplesList.querySelectorAll('.example-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const ex = getExample(currentMode, parseInt(chip.dataset.index, 10));
      if (!ex) return;
      conceptInput.value  = ex.prompt;
      audienceInput.value = '';
      renderOutput({ output: ex.output, validation: { passed: true, results: [] }, steps: [{ label: 'Example loaded', summary: ex.prompt }] });
    });
  });
}

exampleBtn.addEventListener('click', () => {
  examplesPanel.classList.toggle('hidden');
  exampleBtn.textContent = examplesPanel.classList.contains('hidden')
    ? '📚 Show Examples' : '📚 Hide Examples';
});

// ─── Utilities ────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Very light markdown: bold, bullet lists, numbered lists, line breaks.
 * Applied AFTER HTML-escaping so no injection risk.
 */
function markdownLite(str) {
  return str
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^• (.+)$/gm, '<li class="bullet">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="numbered"><strong>$1.</strong> $2</li>')
    .replace(/(<li class="bullet">.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/(<li class="numbered">.*<\/li>\n?)+/g, '<ol>$&</ol>')
    .replace(/\n/g, '<br>');
}

function shake(el) {
  el.classList.add('shake');
  el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

selectMode(MODE.GAME);
