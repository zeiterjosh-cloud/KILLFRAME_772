/**
 * pipeline.js
 * Implements the hybrid pipeline and orchestrates generation + validation
 * across all three modes.
 *
 * Hybrid pipeline steps:
 *  Step 1 — Generate the addictive core loop (game template).
 *  Step 2 — Transform into a monetizable product (inject monetization plan).
 *  Step 3 — Attach premium/booster/cosmetic expansion paths.
 *
 * For GAME and APP modes a single-step generation is run instead.
 */

import { MODE } from './modes.js';
import { generateTemplate } from './templates.js';
import { validate } from './validator.js';

// ─── Pipeline steps ──────────────────────────────────────────────────────────

/**
 * Step 1: Generate the addictive core loop.
 * Produces a GAME-mode output and extracts the fields needed for step 2.
 *
 * @param {object} inputs
 * @returns {object} partial output
 */
function stepCoreLoop(inputs) {
  const gameOutput = generateTemplate(MODE.GAME, inputs);
  return {
    concept: gameOutput.concept,
    coreLoop: gameOutput.coreLoop,
    progressionSystem: gameOutput.progressionSystem,
    rewardSystem: gameOutput.rewardSystem,
    feedbackSystem: gameOutput.feedbackSystem,
    challengeSystem: gameOutput.challengeSystem,
  };
}

/**
 * Step 2: Transform the loop into a monetizable product.
 * Takes the partial output from Step 1 and adds monetization sections.
 *
 * @param {object} partial  - output from stepCoreLoop
 * @param {object} inputs
 * @returns {object} enriched output
 */
function stepMonetize(partial, inputs) {
  const appOutput = generateTemplate(MODE.APP, inputs);
  return {
    ...partial,
    monetizationPlan: appOutput.monetizationPlan,
    retentionSystems: appOutput.retentionSystems,
  };
}

/**
 * Step 3: Attach premium/booster/cosmetic expansion paths.
 * Generates the full HYBRID template and merges the missing fields.
 *
 * @param {object} partial  - output from stepMonetize
 * @param {object} inputs
 * @returns {object} complete hybrid output
 */
function stepExpansions(partial, inputs) {
  const hybridOutput = generateTemplate(MODE.HYBRID, inputs);
  return {
    ...partial,
    premiumExpansions: hybridOutput.premiumExpansions,
    code: hybridOutput.code,
    scalingRoadmap: hybridOutput.scalingRoadmap,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Runs the full pipeline for the specified mode.
 *
 * @param {string} modeId   - One of the MODE constants.
 * @param {object} inputs   - { concept: string, audience: string }
 * @returns {{ output: object, validation: object, steps: Array }}
 */
export function runPipeline(modeId, inputs) {
  const steps = [];
  let output;

  if (modeId === MODE.HYBRID) {
    // Three-step hybrid pipeline
    const s1 = stepCoreLoop(inputs);
    steps.push({ label: 'Step 1 — Core Loop', summary: s1.coreLoop });

    const s2 = stepMonetize(s1, inputs);
    steps.push({ label: 'Step 2 — Monetization Layer', summary: s2.monetizationPlan });

    const s3 = stepExpansions(s2, inputs);
    steps.push({ label: 'Step 3 — Premium Expansions', summary: s3.premiumExpansions });

    output = s3;
  } else {
    // Single-step generation for GAME and APP modes
    output = generateTemplate(modeId, inputs);
    steps.push({ label: 'Generation complete', summary: output.concept || output.problem });
  }

  const validation = validate(output, modeId);

  return { output, validation, steps };
}
