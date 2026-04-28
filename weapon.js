import * as THREE from './node_modules/three/build/three.module.js';

export class WeaponSystem {
  constructor(camera, ui, domElement) {
    this.camera = camera;
    this.ui = ui;
    this.domElement = domElement;
    this.fireRate = 9;
    this.damage = 25;
    this.damageMultiplier = 1;
    this.lastShotTime = -Infinity;
    this.triggerHeld = false;
    this.raycaster = new THREE.Raycaster();
    this.tempDirection = new THREE.Vector3();
    this.hitables = [];

    this.muzzleLight = new THREE.PointLight(0x6ff7ff, 0, 6, 2);
    this.muzzleLight.position.set(0.18, -0.12, -0.65);
    this.camera.add(this.muzzleLight);

    const flashMaterial = new THREE.MeshBasicMaterial({ color: 0x87ffff, transparent: true, opacity: 0 });
    this.muzzleFlashMesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), flashMaterial);
    this.muzzleFlashMesh.position.copy(this.muzzleLight.position);
    this.camera.add(this.muzzleFlashMesh);
    this.flashTimer = 0;

    window.addEventListener('mousedown', (event) => event.button === 0 && (this.triggerHeld = true));
    window.addEventListener('mouseup', () => (this.triggerHeld = false));
    window.addEventListener('blur', () => (this.triggerHeld = false));
  }

  setHitables(hitables) {
    this.hitables = hitables;
  }

  setDamageMultiplier(multiplier) {
    this.damageMultiplier = multiplier;
  }

  update(delta, elapsed, onShot, recoilCallback, canFire = true) {
    if (this.flashTimer > 0) {
      this.flashTimer -= delta;
      const normalized = Math.max(this.flashTimer / 0.05, 0);
      this.muzzleLight.intensity = normalized * 5.8;
      this.muzzleFlashMesh.material.opacity = normalized;
    } else {
      this.muzzleLight.intensity = 0;
      this.muzzleFlashMesh.material.opacity = 0;
    }

    const pointerLocked = document.pointerLockElement === this.domElement;
    if (!this.triggerHeld || !canFire || !pointerLocked) {
      return;
    }
    if (elapsed - this.lastShotTime < 1 / this.fireRate) {
      return;
    }

    this.lastShotTime = elapsed;
    this.flashTimer = 0.05;
    this.camera.getWorldDirection(this.tempDirection);
    this.raycaster.set(this.camera.position, this.tempDirection);

    const intersections = this.raycaster.intersectObjects(this.hitables, true);
    let hitEnemy = false;
    if (intersections.length > 0) {
      let target = intersections[0].object;
      while (target && !target.userData.enemyRef) {
        target = target.parent;
      }
      if (target?.userData.enemyRef) {
        target.userData.enemyRef.takeDamage(this.damage * this.damageMultiplier);
        hitEnemy = true;
      }
    }

    onShot(hitEnemy);
    this.ui.showHitMarker(hitEnemy);
    recoilCallback(0.024 + Math.random() * 0.007);
  }
}
