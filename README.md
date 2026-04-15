# KILLFRAME_772

**Build high-retention games and money-making apps — with addictive core loops, progression systems, and monetization baked in from the start.**

## Overview

KILLFRAME_772 is a browser-based builder framework with three operating modes:

| Mode | Focus | Core question |
|------|-------|---------------|
| 🎮 **Addictive Game** | Core loop + retention first | What does the player do every 10 seconds? |
| 💰 **Money-Making App** | Problem / market / monetization first | Would someone PAY for this? |
| 🔥 **Hybrid** | Addictive loop → monetizable product | What's the loop AND how does it make money? |

## Features

- **Mode-selection layer** — structured output templates differ by intent (game, app, hybrid)
- **Hybrid pipeline** — 3-step process: generate core loop → add monetization → attach premium expansions
- **Validation rules** — every output is checked for a repeatable loop, retention mechanic, and (for app/hybrid) a monetization path
- **Reference examples** — one worked example per mode to verify quality and consistency

## Project Structure

```
KILLFRAME_772/
├── index.html          # Single-page app shell
├── package.json        # npm scripts
└── src/
    ├── app.js          # Main UI controller
    ├── modes.js        # Mode definitions (GAME / APP / HYBRID)
    ├── templates.js    # Output template generators per mode
    ├── pipeline.js     # Hybrid pipeline orchestration
    ├── validator.js    # Validation rules (loop / retention / monetization)
    ├── examples.js     # Reference prompts & worked examples
    └── styles.css      # Dark-mode UI styles
```

## Getting Started

```bash
npm install
npm run start
# Open http://localhost:8080
```

## How It Works

### 1. Select a mode

Choose **Game**, **App**, or **Hybrid** using the tab bar.

### 2. Describe your idea

Enter a one-sentence concept and (optionally) a target audience.

### 3. Generate

Click **🚀 Generate**. The pipeline runs and produces a structured output with all required sections filled in, along with a validation badge confirming the output meets the mode's rules.

### 4. Explore examples

Click **📚 Show Examples** to load a reference prompt for the current mode and inspect the expected output quality.

---

## Addictive Systems (Required for all outputs)

| System | What it does |
|--------|-------------|
| **Progression** | Levels, upgrades, prestige — keeps the loop growing |
| **Rewards** | Coins, chests, unlocks — delivers dopamine hits |
| **Feedback** | Animations, particles, sounds — makes every action feel great |
| **Challenge** | Escalating costs, leaderboards, timed events — creates just-out-of-reach tension |

## Monetization Models

| Model | Best for |
|-------|---------|
| Freemium | Apps with a hard-cap free tier |
| Subscription / Season Pass | Regular content drops |
| One-time IAP | Cosmetics, remove-ads |
| Rewarded Ads | Free games where interruption must be minimal |

## "Make It More Addictive" Upgrades

Every Game or Hybrid output includes an **Addictive Upgrades** or **Premium Expansions** section with 5 specific enhancements:

1. Prestige / rebirth system
2. Offline earnings notification
3. Lucky / random events
4. Cosmetic skins and unlocks
5. Social leaderboard with proximity ranking
