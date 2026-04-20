import * as THREE from './node_modules/three/build/three.module.js';

const ENEMY_STATES = { IDLE: 'idle', CHASE: 'chase', ATTACK: 'attack' };

export class Enemy {
  constructor(scene, spawnPosition) {
    this.scene = scene;
    this.state = ENEMY_STATES.IDLE;
    this.speed = 2.7;
    this.health = 100;
    this.alive = true;
    this.respawnTimer = 0;
    this.attackCooldown = 0;

    const material = new THREE.MeshStandardMaterial({
      color: 0x1d2f66,
      emissive: 0x1a63cf,
      emissiveIntensity: 0.6,
      roughness: 0.26,
      metalness: 0.16
    });
    this.mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.44, 1.22, 5, 10), material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.copy(spawnPosition);
    this.mesh.userData.enemyRef = this;
    this.scene.add(this.mesh);
  }

  takeDamage(amount) {
    if (!this.alive) {
      return;
    }
    this.health -= amount;
    this.mesh.material.emissiveIntensity = 1.5;
    if (this.health <= 0) {
      this.alive = false;
      this.state = ENEMY_STATES.IDLE;
      this.respawnTimer = 2.6;
      this.mesh.visible = false;
      this.attackCooldown = 0;
    }
  }

  respawn(position) {
    this.health = 100;
    this.alive = true;
    this.state = ENEMY_STATES.CHASE;
    this.mesh.visible = true;
    this.mesh.position.copy(position);
    this.mesh.material.emissiveIntensity = 0.6;
  }

  update(delta, playerPosition, onAttack) {
    if (!this.alive) {
      this.respawnTimer -= delta;
      return;
    }

    this.mesh.material.emissiveIntensity = THREE.MathUtils.damp(this.mesh.material.emissiveIntensity, 0.6, 10, delta);
    const distance = this.mesh.position.distanceTo(playerPosition);
    if (distance > 11) this.state = ENEMY_STATES.IDLE;
    else if (distance > 2.2) this.state = ENEMY_STATES.CHASE;
    else this.state = ENEMY_STATES.ATTACK;

    if (this.state === ENEMY_STATES.CHASE) {
      const direction = new THREE.Vector3().subVectors(playerPosition, this.mesh.position).setY(0).normalize();
      this.mesh.position.addScaledVector(direction, this.speed * delta);
      this.mesh.lookAt(playerPosition.x, this.mesh.position.y, playerPosition.z);
    }

    if (this.state === ENEMY_STATES.ATTACK) {
      this.attackCooldown -= delta;
      this.mesh.lookAt(playerPosition.x, this.mesh.position.y, playerPosition.z);
      if (this.attackCooldown <= 0) {
        this.attackCooldown = 0.8;
        onAttack(7);
      }
    }
  }
}

export class EnemyManager {
  constructor(scene, worldSize = 26) {
    this.scene = scene;
    this.worldSize = worldSize;
    this.enemies = [];
  }

  spawnInitial(count) {
    for (let i = 0; i < count; i += 1) {
      const enemy = new Enemy(this.scene, this.getRandomSpawn());
      enemy.state = ENEMY_STATES.CHASE;
      this.enemies.push(enemy);
    }
  }

  getRandomSpawn() {
    return new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(this.worldSize * 2),
      1,
      THREE.MathUtils.randFloatSpread(this.worldSize * 2)
    );
  }

  update(delta, playerPosition, onPlayerDamaged, onEnemyKilled) {
    for (const enemy of this.enemies) {
      const wasAlive = enemy.alive;
      enemy.update(delta, playerPosition, onPlayerDamaged);
      if (wasAlive && !enemy.alive) {
        onEnemyKilled(enemy);
      }
      if (!enemy.alive && enemy.respawnTimer <= 0) {
        enemy.respawn(this.getRandomSpawn());
      }
    }
  }

  getHitableMeshes() {
    return this.enemies.map((enemy) => enemy.mesh);
  }
}
