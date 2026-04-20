export class GameManager {
  constructor(maxHealth = 100) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.score = 0;
    this.state = 'playing';
  }

  addScore(value) {
    if (this.state !== 'playing') {
      return;
    }
    this.score += value;
  }

  applyDamage(value) {
    if (this.state !== 'playing') {
      return;
    }
    this.health = Math.max(this.health - value, 0);
    if (this.health <= 0) {
      this.state = 'game_over';
    }
  }
}
