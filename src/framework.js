/**
 * KILLFRAME App Generation Framework
 * 
 * Two modes for creating high-retention, addictive applications:
 * 1. Addictive Game Mode - Fun/retention-first approach
 * 2. Money App Mode - Utility/revenue-first approach
 */

// ============================================================================
// CORE FRAMEWORK TYPES AND CONSTANTS
// ============================================================================

const MODE = {
  GAME: 'addictive-game',
  MONEY: 'money-app',
  COMBO: 'combo'
};

const GAME_TYPES = [
  'idle-clicker',
  'reaction-timing',
  'arcade-loop',
  'upgrade-based'
];

const MONETIZATION_MODELS = [
  'subscription',
  'freemium',
  'ad-based',
  'hybrid'
];

// Game balance constants
const GAME_CONSTANTS = {
  BASE_CRIT_CHANCE: 0.1,
  CRIT_LEVEL_MULTIPLIER: 0.05,
  CRIT_DAMAGE_MULTIPLIER: 3,
  BASE_MONSTER_HEALTH: 10,
  HEALTH_PER_LEVEL: 5,
  BOSS_HEALTH_MULTIPLIER: 2,
  BASE_GOLD_REWARD: 5,
  GOLD_PER_LEVEL: 2,
  BOSS_GOLD_MULTIPLIER: 5,
  UPGRADE_COST_MULTIPLIER: 1.5,
  COMBO_TIMEOUT_MS: 500,
  COMBO_GOLD_DIVISOR: 5
};

// ============================================================================
// OUTPUT TEMPLATE STRUCTURE
// ============================================================================

/**
 * Shared output structure that both modes must produce
 */
const OutputTemplate = {
  concept: '',           // What is this app/game?
  targetUser: '',        // Who is it for?
  coreLoop: '',          // What does user do every 10 seconds?
  systems: {
    progression: [],     // Levels, upgrades, unlocks
    rewards: [],         // Coins, items, achievements
    feedback: [],        // Animations, sounds, haptics
    challenge: [],       // Difficulty scaling, obstacles
    retention: [],       // Streaks, notifications, progress
    monetization: []     // Revenue streams
  },
  mvpScope: [],          // Minimum viable features
  fullCode: '',          // Complete implementation
  nextSteps: []          // Optimization suggestions
};

// ============================================================================
// ADDICTIVE GAME MODE
// ============================================================================

class AddictiveGameMode {
  constructor() {
    this.mode = MODE.GAME;
    this.requiredSystems = ['progression', 'rewards', 'feedback', 'challenge'];
  }

  /**
   * Validates that the game has a repeatable 10-second loop
   * 
   * A valid core loop should describe a repeatable cycle of:
   * 1. Player action (tap, click, swipe, etc.)
   * 2. Immediate feedback/reward
   * 3. Progression toward a goal
   * 
   * Examples of valid loops:
   * - "Tap → Earn → Upgrade → Repeat"
   * - "Click enemy → Deal damage → Collect loot → Buy upgrades"
   * - "Swipe to match → Score points → Unlock levels"
   */
  validateCoreLoop(spec) {
    // Check if core loop is defined and not empty
    if (!spec.coreLoop || spec.coreLoop.trim() === '') {
      throw new Error(
        'Game must have a repeatable 10-second loop with action → reward → progression. ' +
        'Example: "Tap → Earn → Upgrade → Repeat"'
      );
    }
    // Core loop should contain action words suggesting a loop
    const loopKeywords = ['tap', 'click', 'earn', 'upgrade', 'repeat', 'collect', 'build', 'defeat', 'score', 'swipe', 'match', 'unlock'];
    const hasLoopStructure = loopKeywords.some(keyword => 
      spec.coreLoop.toLowerCase().includes(keyword)
    );
    
    if (!hasLoopStructure && (!spec.systems.rewards || spec.systems.rewards.length === 0)) {
      throw new Error(
        'Game must have a repeatable 10-second loop with action → reward → progression. ' +
        'Include keywords like: tap, click, earn, upgrade, collect, score, etc.'
      );
    }
    return true;
  }

  /**
   * Validates all required addictive systems are present
   */
  validateSystems(spec) {
    const missing = this.requiredSystems.filter(sys => 
      !spec.systems[sys] || spec.systems[sys].length === 0
    );
    
    if (missing.length > 0) {
      throw new Error(`Missing required systems: ${missing.join(', ')}`);
    }
    return true;
  }

  /**
   * Generate a game spec from a prompt
   */
  generate(prompt) {
    return {
      mode: this.mode,
      concept: '',
      targetUser: 'Casual gamers seeking quick, satisfying gameplay sessions',
      coreLoop: 'Tap → Earn → Upgrade → Repeat',
      systems: {
        progression: [
          'Level system (1-100+)',
          'Skill tree unlocks',
          'Achievement milestones'
        ],
        rewards: [
          'Coins per action',
          'Bonus multipliers',
          'Random loot drops',
          'Daily login rewards'
        ],
        feedback: [
          'Screen shake on impact',
          'Particle effects',
          'Sound effects (satisfying clicks)',
          'Number popups',
          'Combo indicators'
        ],
        challenge: [
          'Increasing enemy speed/health',
          'Time pressure events',
          'Boss encounters',
          'Limited resources'
        ],
        retention: [],
        monetization: []
      },
      mvpScope: [],
      fullCode: '',
      nextSteps: []
    };
  }

  /**
   * Get optimization suggestions to make game more addictive
   */
  getAddictiveUpgrades() {
    return [
      'Add prestige/rebirth system for endless progression',
      'Implement offline earnings',
      'Add social leaderboards',
      'Create limited-time events',
      'Add collection/gacha mechanics',
      'Implement combo multipliers',
      'Add daily/weekly challenges',
      'Create unlock anticipation (mystery boxes)'
    ];
  }
}

// ============================================================================
// MONEY APP MODE
// ============================================================================

class MoneyAppMode {
  constructor() {
    this.mode = MODE.MONEY;
    this.requiredElements = {
      monetization: true,
      returnTriggers: true,
      realUtility: true
    };
  }

  /**
   * Validates monetization path exists
   */
  validateMonetization(spec) {
    if (!spec.systems.monetization || spec.systems.monetization.length === 0) {
      throw new Error('App must have at least one monetization path (subscription/freemium/ads)');
    }
    return true;
  }

  /**
   * Validates return triggers exist
   */
  validateRetention(spec) {
    const triggers = ['streak', 'notification', 'progress', 'daily'];
    const hasRetention = spec.systems.retention?.some(r => 
      triggers.some(t => r.toLowerCase().includes(t))
    );
    
    if (!hasRetention) {
      throw new Error('App must include return triggers (streaks/notifications/progress tracking)');
    }
    return true;
  }

  /**
   * Generate a money app spec from a prompt
   */
  generate(prompt) {
    return {
      mode: this.mode,
      concept: '',
      problemSolved: '',
      targetUser: '',
      coreLoop: 'Open app → Complete action → See progress → Return tomorrow',
      systems: {
        progression: [
          'User levels',
          'Feature unlocks',
          'Usage milestones'
        ],
        rewards: [
          'Achievement badges',
          'Streak rewards',
          'Unlock premium features temporarily'
        ],
        feedback: [
          'Progress animations',
          'Success confirmations',
          'Milestone celebrations'
        ],
        challenge: [],
        retention: [
          'Daily streak counter',
          'Push notifications for reminders',
          'Weekly progress reports',
          'Goal tracking with deadlines'
        ],
        monetization: [
          'Free tier with basic features',
          'Premium subscription ($4.99/month)',
          'One-time lifetime purchase option',
          'Optional rewarded ads for free users'
        ]
      },
      mvpScope: [],
      fullCode: '',
      nextSteps: []
    };
  }

  /**
   * Get monetization enhancement suggestions
   */
  getMonetizationUpgrades() {
    return [
      'Add annual subscription discount (save 40%)',
      'Create family/team plans',
      'Implement referral rewards',
      'Add premium themes/customization',
      'Create pro features with trial period',
      'Add export/sync features for premium',
      'Implement usage-based pricing tiers'
    ];
  }
}

// ============================================================================
// COMBO WORKFLOW
// ============================================================================

class ComboWorkflow {
  constructor() {
    this.gameMode = new AddictiveGameMode();
    this.moneyMode = new MoneyAppMode();
  }

  /**
   * Transform an addictive game into a monetizable app
   */
  transformToMonetizable(gameSpec) {
    const transformed = { ...gameSpec };
    
    // Add monetization layer
    transformed.systems.monetization = [
      'Remove ads ($2.99 one-time)',
      'Premium currency packs',
      'Cosmetic skin bundles',
      'VIP pass with exclusive rewards',
      'Double coins booster (24h)',
      'Auto-play/idle boost subscription'
    ];

    // Enhance retention
    transformed.systems.retention = [
      ...transformed.systems.retention || [],
      'Daily login bonus calendar',
      'Limited-time event notifications',
      'Friend challenge notifications',
      'Streak protection (premium feature)'
    ];

    // Add premium upgrades
    transformed.premiumFeatures = [
      'Ad-free experience',
      'Exclusive character skins',
      '2x coin multiplier',
      'Early access to new content',
      'Premium-only game modes'
    ];

    return transformed;
  }

  /**
   * Full combo workflow: game → monetization
   */
  execute(prompt) {
    // Step 1: Generate addictive game
    const gameSpec = this.gameMode.generate(prompt);
    
    // Step 2: Transform to monetizable
    const monetized = this.transformToMonetizable(gameSpec);
    
    // Step 3: Add quality checks
    const validated = this.runQualityChecks(monetized);
    
    return validated;
  }

  /**
   * Run quality checks on spec
   */
  runQualityChecks(spec) {
    const checks = {
      userReturn: this.checkUserReturn(spec),
      rewardLoop: this.checkRewardLoop(spec),
      revenue: this.checkRevenue(spec),
      mvpReady: this.checkMvpReady(spec)
    };

    spec.qualityChecks = checks;
    return spec;
  }

  checkUserReturn(spec) {
    const reasons = [];
    if (spec.systems.retention?.length > 0) {
      reasons.push(...spec.systems.retention.slice(0, 2));
    }
    if (spec.systems.progression?.length > 0) {
      reasons.push('Progress to maintain');
    }
    return {
      question: 'Why will users come back?',
      answer: reasons.length > 0 ? reasons : ['NEEDS IMPROVEMENT']
    };
  }

  checkRewardLoop(spec) {
    const hasRewards = spec.systems.rewards?.length > 0;
    const hasProgression = spec.systems.progression?.length > 0;
    return {
      question: 'Where is the reward loop?',
      answer: hasRewards && hasProgression 
        ? `${spec.coreLoop}` 
        : 'NEEDS IMPROVEMENT'
    };
  }

  checkRevenue(spec) {
    return {
      question: 'How does this earn revenue?',
      answer: spec.systems.monetization?.length > 0 
        ? spec.systems.monetization.slice(0, 3) 
        : ['NEEDS MONETIZATION STRATEGY']
    };
  }

  checkMvpReady(spec) {
    return {
      question: 'Is MVP small and shippable?',
      answer: spec.mvpScope?.length > 0 && spec.mvpScope.length <= 5
        ? 'Yes - focused scope'
        : 'Define 3-5 core MVP features'
    };
  }
}

// ============================================================================
// QUALITY CHECKS MODULE
// ============================================================================

class QualityChecker {
  constructor() {
    this.checks = [
      {
        id: 'user-return',
        question: 'Why will users come back?',
        validate: (spec) => spec.systems.retention?.length > 0 || spec.systems.progression?.length > 0
      },
      {
        id: 'reward-loop',
        question: 'Where is the reward loop?',
        validate: (spec) => spec.systems.rewards?.length > 0 && spec.coreLoop
      },
      {
        id: 'revenue',
        question: 'How does this earn revenue?',
        validate: (spec) => spec.systems.monetization?.length > 0
      },
      {
        id: 'mvp-scope',
        question: 'Is MVP small and shippable?',
        validate: (spec) => spec.mvpScope?.length > 0 && spec.mvpScope.length <= 5
      }
    ];
  }

  runAll(spec) {
    const results = {};
    for (const check of this.checks) {
      results[check.id] = {
        question: check.question,
        passed: check.validate(spec),
        recommendation: check.validate(spec) ? 'OK' : 'NEEDS ATTENTION'
      };
    }
    return results;
  }

  getFailingChecks(spec) {
    return this.checks.filter(check => !check.validate(spec));
  }
}

// ============================================================================
// MAIN FRAMEWORK CLASS
// ============================================================================

class KillframeGenerator {
  constructor() {
    this.gameMode = new AddictiveGameMode();
    this.moneyMode = new MoneyAppMode();
    this.comboWorkflow = new ComboWorkflow();
    this.qualityChecker = new QualityChecker();
  }

  /**
   * Generate an app/game based on mode
   */
  generate(prompt, mode = MODE.GAME) {
    let spec;

    switch (mode) {
      case MODE.GAME:
        spec = this.gameMode.generate(prompt);
        this.gameMode.validateCoreLoop(spec);
        this.gameMode.validateSystems(spec);
        spec.nextSteps = this.gameMode.getAddictiveUpgrades();
        break;

      case MODE.MONEY:
        spec = this.moneyMode.generate(prompt);
        this.moneyMode.validateMonetization(spec);
        this.moneyMode.validateRetention(spec);
        spec.nextSteps = this.moneyMode.getMonetizationUpgrades();
        break;

      case MODE.COMBO:
        spec = this.comboWorkflow.execute(prompt);
        break;

      default:
        throw new Error(`Unknown mode: ${mode}`);
    }

    // Run quality checks
    spec.qualityReport = this.qualityChecker.runAll(spec);

    return spec;
  }

  /**
   * Convert existing game to monetizable app
   */
  monetize(gameSpec) {
    return this.comboWorkflow.transformToMonetizable(gameSpec);
  }

  /**
   * Get failing quality checks for a spec
   */
  getIssues(spec) {
    return this.qualityChecker.getFailingChecks(spec);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  KillframeGenerator,
  AddictiveGameMode,
  MoneyAppMode,
  ComboWorkflow,
  QualityChecker,
  MODE,
  GAME_TYPES,
  MONETIZATION_MODELS,
  GAME_CONSTANTS,
  OutputTemplate
};
