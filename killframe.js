export class KillframeSystem {
  constructor() {
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.hitTimestamps = [];
    this.killframeActive = false;
    this.killframeTimer = 0;
    this.timeScale = 1;
    this.damageBoost = 1;
  }

  registerShot(hit, elapsedTime) {
    this.shotsFired += 1;
    if (hit) {
      this.shotsHit += 1;
      this.hitTimestamps.push(elapsedTime);
      if (this.hitTimestamps.length > 6) {
        this.hitTimestamps.shift();
      }
    }

    if (!this.killframeActive && this._isHighSkillSequence()) {
      this.killframeActive = true;
      this.killframeTimer = 3.2;
      this.timeScale = 0.45;
      this.damageBoost = 1.85;
      return true;
    }
    return false;
  }

  _isHighSkillSequence() {
    if (this.hitTimestamps.length < 3 || this.shotsFired < 5 || this.getAccuracy() < 0.58) {
      return false;
    }
    const last = this.hitTimestamps.length - 1;
    const d1 = this.hitTimestamps[last] - this.hitTimestamps[last - 1];
    const d2 = this.hitTimestamps[last - 1] - this.hitTimestamps[last - 2];
    return d1 < 0.45 && d2 < 0.45;
  }

  update(delta) {
    if (!this.killframeActive) {
      this.timeScale = 1;
      this.damageBoost = 1;
      return;
    }
    this.killframeTimer -= delta;
    if (this.killframeTimer <= 0) {
      this.killframeActive = false;
      this.timeScale = 1;
      this.damageBoost = 1;
    }
  }

  getAccuracy() {
    return this.shotsFired > 0 ? this.shotsHit / this.shotsFired : 0;
  }

  getAverageHitReaction() {
    if (this.hitTimestamps.length < 2) {
      return 0;
    }
    let total = 0;
    for (let i = 1; i < this.hitTimestamps.length; i += 1) {
      total += this.hitTimestamps[i] - this.hitTimestamps[i - 1];
    }
    return total / (this.hitTimestamps.length - 1);
  }
}
