/**
 * validator.js
 * Validates that a generated output object satisfies all required rules
 * for its mode before being shown to the user.
 *
 * Rules enforced across all modes:
 *  1. clear repeatable loop
 *  2. retention mechanic
 *  3. monetization path (required for APP and HYBRID)
 *
 * Additional mode-specific section presence checks are also run.
 */

import { MODE, getModeInfo } from './modes.js';

// ─── Rule definitions ────────────────────────────────────────────────────────

const RULES = {
  /** Every output must define a repeatable core loop.
   *  For APP mode the loop is expressed through retentionSystems or mvpFeatures. */
  hasRepeatableLoop: {
    id: 'hasRepeatableLoop',
    label: 'Repeatable Core Loop',
    description:
      'Output must define a clear repeatable action (coreLoop for games, retentionSystems/mvpFeatures for apps).',
    test(output) {
      return (
        (typeof output.coreLoop === 'string' && output.coreLoop.trim().length > 0) ||
        (typeof output.retentionSystems === 'string' && output.retentionSystems.trim().length > 0) ||
        (typeof output.mvpFeatures === 'string' && output.mvpFeatures.trim().length > 0)
      );
    },
  },

  /** Every output must include at least one retention mechanic. */
  hasRetentionMechanic: {
    id: 'hasRetentionMechanic',
    label: 'Retention Mechanic',
    description: 'Output must include progression, streaks, rewards, or similar retention.',
    test(output) {
      return (
        (typeof output.progressionSystem === 'string' && output.progressionSystem.trim().length > 0) ||
        (typeof output.retentionSystems === 'string' && output.retentionSystems.trim().length > 0) ||
        (typeof output.rewardSystem === 'string' && output.rewardSystem.trim().length > 0)
      );
    },
  },

  /** APP and HYBRID modes require a monetization path. */
  hasMonetizationPath: {
    id: 'hasMonetizationPath',
    label: 'Monetization Path',
    description: 'App/Hybrid outputs must specify how the product generates revenue.',
    applicableModes: [MODE.APP, MODE.HYBRID],
    test(output) {
      return (
        typeof output.monetizationPlan === 'string' &&
        output.monetizationPlan.trim().length > 0
      );
    },
  },

  /** Output must include code or a code outline. */
  hasCode: {
    id: 'hasCode',
    label: 'Code / Code Outline',
    description: 'Output must provide implementation code or a detailed code outline.',
    test(output) {
      return typeof output.code === 'string' && output.code.trim().length > 10;
    },
  },

  /** All required sections for the mode must be present. */
  hasAllRequiredSections: {
    id: 'hasAllRequiredSections',
    label: 'All Required Sections Present',
    description: 'Every section defined by the mode template must be populated.',
    test(output, modeId) {
      const { requiredSections } = getModeInfo(modeId);
      return requiredSections.every(
        (section) =>
          typeof output[section] === 'string' && output[section].trim().length > 0
      );
    },
  },
};

// ─── Validation runner ───────────────────────────────────────────────────────

/**
 * Validates an output object against all rules applicable to the given mode.
 *
 * @param {object} output   - The generated output object.
 * @param {string} modeId   - One of the MODE constants.
 * @returns {{ passed: boolean, results: Array<{rule, passed, label, description}> }}
 */
export function validate(output, modeId) {
  const results = [];

  for (const rule of Object.values(RULES)) {
    // Skip rules that are restricted to specific modes
    if (rule.applicableModes && !rule.applicableModes.includes(modeId)) {
      continue;
    }

    const passed = rule.test(output, modeId);
    results.push({
      ruleId: rule.id,
      label: rule.label,
      description: rule.description,
      passed,
    });
  }

  const allPassed = results.every((r) => r.passed);
  return { passed: allPassed, results };
}

/**
 * Returns a human-readable summary of validation results.
 *
 * @param {{ passed: boolean, results: Array }} validation
 * @returns {string}
 */
export function summarizeValidation(validation) {
  const lines = validation.results.map(
    (r) => `${r.passed ? '✅' : '❌'} ${r.label}: ${r.description}`
  );
  return lines.join('\n');
}
