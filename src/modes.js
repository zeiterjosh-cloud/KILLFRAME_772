/**
 * modes.js
 * Defines the three operating modes: GAME, APP, HYBRID.
 * Each mode carries a descriptor, required output sections,
 * validation rules, and default UI prompts.
 */

export const MODE = {
  GAME: 'game',
  APP: 'app',
  HYBRID: 'hybrid',
};

export const MODE_META = {
  [MODE.GAME]: {
    id: MODE.GAME,
    label: '🎮 Addictive Game',
    tagline: 'Core loop + retention systems first',
    description:
      'Build high-retention games with simple mechanics and strong reward loops. ' +
      'Every decision prioritises fun, repeatability, and engagement time.',
    coreQuestion: 'What does the player do every 10 seconds?',
    requiredSections: [
      'concept',
      'coreLoop',
      'progressionSystem',
      'rewardSystem',
      'feedbackSystem',
      'challengeSystem',
      'code',
      'addictiveUpgrades',
    ],
    inputPrompts: {
      conceptLabel: 'Game Concept',
      conceptPlaceholder: 'e.g. Tap coins, upgrade miners, idle to riches',
      audienceLabel: 'Target Player',
      audiencePlaceholder: 'e.g. Casual mobile players, 18-35',
    },
  },

  [MODE.APP]: {
    id: MODE.APP,
    label: '💰 Money-Making App',
    tagline: 'Problem/market/monetization first',
    description:
      'Build apps that solve a real problem, keep users coming back daily, ' +
      'and generate sustainable income through clear monetization models.',
    coreQuestion: 'Would someone pay for this? Why would users return daily?',
    requiredSections: [
      'problem',
      'targetUser',
      'monetizationPlan',
      'retentionSystems',
      'mvpFeatures',
      'code',
      'growthIdeas',
    ],
    inputPrompts: {
      conceptLabel: 'App Idea',
      conceptPlaceholder: 'e.g. Daily habit tracker with streaks and analytics',
      audienceLabel: 'Target User',
      audiencePlaceholder: 'e.g. Productivity-focused adults, 25-40',
    },
  },

  [MODE.HYBRID]: {
    id: MODE.HYBRID,
    label: '🔥 Hybrid (Game + Revenue)',
    tagline: 'Addictive core loop → monetizable product',
    description:
      'Combine addictive game mechanics with a solid monetization layer. ' +
      'Start with a hook that players cannot put down, then build revenue paths on top.',
    coreQuestion: 'What is the addictive loop AND how does it make money?',
    requiredSections: [
      'concept',
      'coreLoop',
      'progressionSystem',
      'rewardSystem',
      'monetizationPlan',
      'premiumExpansions',
      'code',
      'scalingRoadmap',
    ],
    inputPrompts: {
      conceptLabel: 'Concept',
      conceptPlaceholder: 'e.g. Puzzle game with cosmetic shop and daily challenges',
      audienceLabel: 'Target Audience',
      audiencePlaceholder: 'e.g. Mobile gamers willing to spend on cosmetics',
    },
  },
};

/**
 * Returns metadata for a given mode id.
 * @param {string} modeId
 * @returns {object}
 */
export function getModeInfo(modeId) {
  const info = MODE_META[modeId];
  if (!info) throw new Error(`Unknown mode: ${modeId}`);
  return info;
}
