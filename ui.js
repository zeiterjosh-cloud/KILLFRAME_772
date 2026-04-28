export class UISystem {
  constructor(parent = document.body) {
    this.root = document.createElement('div');
    this.root.className = 'ui';

    this.crosshair = document.createElement('div');
    this.crosshair.className = 'crosshair';

    this.killframeIndicator = document.createElement('div');
    this.killframeIndicator.className = 'killframe-indicator';
    this.killframeIndicator.textContent = 'KILLFRAME';

    this.toast = document.createElement('div');
    this.toast.className = 'toast';

    this.gameOverBanner = document.createElement('div');
    this.gameOverBanner.className = 'game-over';
    this.gameOverBanner.textContent = 'GAME OVER';

    this.hud = document.createElement('div');
    this.hud.className = 'hud';

    const health = document.createElement('div');
    health.className = 'health';
    const healthLabel = document.createElement('label');
    healthLabel.textContent = 'HEALTH';
    const healthTrack = document.createElement('div');
    healthTrack.className = 'health-track';
    this.healthFill = document.createElement('div');
    this.healthFill.className = 'health-fill';

    this.scoreLabel = document.createElement('div');
    this.scoreLabel.className = 'score';

    healthTrack.appendChild(this.healthFill);
    health.append(healthLabel, healthTrack);
    this.hud.append(health, this.scoreLabel);
    this.root.append(this.crosshair, this.killframeIndicator, this.toast, this.gameOverBanner, this.hud);
    parent.appendChild(this.root);

    this.hitTimer = 0;
  }

  setHealth(value, max) {
    const normalized = Math.max(0, Math.min(1, value / max));
    this.healthFill.style.width = `${normalized * 100}%`;
  }

  setScore(score) {
    this.scoreLabel.textContent = `SCORE ${score.toString().padStart(5, '0')}`;
  }

  setStats(accuracy, reaction) {
    this.scoreLabel.textContent += `\nACC ${(accuracy * 100).toFixed(1)}% | REACT ${(reaction * 1000).toFixed(0)}ms`;
  }

  setKillframeActive(active) {
    this.killframeIndicator.classList.toggle('active', active);
  }

  showHitMarker(isHit) {
    this.toast.textContent = isHit ? 'HIT CONFIRMED' : 'MISS';
    this.toast.classList.add('show');
    this.hitTimer = 0.18;
  }

  setGameOver(active) {
    this.gameOverBanner.classList.toggle('show', active);
  }

  update(delta) {
    if (this.hitTimer <= 0) {
      return;
    }
    this.hitTimer -= delta;
    if (this.hitTimer <= 0) {
      this.toast.classList.remove('show');
    }
  }
}
