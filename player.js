import * as THREE from './node_modules/three/build/three.module.js';

const WORLD_UP = new THREE.Vector3(0, 1, 0);

export class PlayerController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.sensitivity = 0.0018;
    this.acceleration = 45;
    this.deceleration = 14;
    this.maxSpeed = 8.75;
    this.input = { forward: 0, right: 0 };
    this.keyState = { forward: false, back: false, left: false, right: false };
    this.velocity = new THREE.Vector3();
    this.targetVelocity = new THREE.Vector3();
    this.forward = new THREE.Vector3();
    this.right = new THREE.Vector3();
    this.position = new THREE.Vector3(0, 1.72, 9);
    this.baseHeight = 1.72;
    this.lookPitch = 0;
    this.lookYaw = 0;
    this.headBobTime = 0;
    this.mouseDeltaX = 0;
    this.pointerLocked = false;

    this._bindEvents();
    this.camera.position.copy(this.position);
  }

  _bindEvents() {
    window.addEventListener('keydown', (event) => this._setKey(event.code, 1));
    window.addEventListener('keyup', (event) => this._setKey(event.code, 0));
    this.domElement.addEventListener('click', () => !this.pointerLocked && this.domElement.requestPointerLock());
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.domElement;
    });

    window.addEventListener('mousemove', (event) => {
      if (!this.pointerLocked) {
        return;
      }
      const deltaX = event.movementX ?? 0;
      const deltaY = event.movementY ?? 0;
      this.lookYaw -= deltaX * this.sensitivity;
      this.lookPitch -= deltaY * this.sensitivity;
      this.lookPitch = THREE.MathUtils.clamp(this.lookPitch, -1.45, 1.45);
      this.mouseDeltaX = THREE.MathUtils.lerp(this.mouseDeltaX, deltaX, 0.3);
    });
  }

  _setKey(code, value) {
    const isDown = value === 1;
    if (code === 'KeyW') this.keyState.forward = isDown;
    if (code === 'KeyS') this.keyState.back = isDown;
    if (code === 'KeyD') this.keyState.right = isDown;
    if (code === 'KeyA') this.keyState.left = isDown;
    this.input.forward = Number(this.keyState.forward) - Number(this.keyState.back);
    this.input.right = Number(this.keyState.right) - Number(this.keyState.left);
  }

  addRecoil(kickAmount) {
    this.lookPitch -= kickAmount;
    this.lookPitch = THREE.MathUtils.clamp(this.lookPitch, -1.45, 1.45);
  }

  update(delta, worldBounds = 30) {
    const hasInput = this.input.forward !== 0 || this.input.right !== 0;
    this.forward.set(Math.sin(this.lookYaw), 0, Math.cos(this.lookYaw));
    this.right.crossVectors(this.forward, WORLD_UP).normalize();

    const targetVelocity = this.targetVelocity.set(0, 0, 0);
    if (hasInput) {
      targetVelocity
        .addScaledVector(this.forward, this.input.forward)
        .addScaledVector(this.right, this.input.right)
        .normalize()
        .multiplyScalar(this.maxSpeed);
    }

    const blend = hasInput ? this.acceleration : this.deceleration;
    this.velocity.lerp(targetVelocity, 1 - Math.exp(-blend * delta));
    this.position.addScaledVector(this.velocity, delta);
    this.position.x = THREE.MathUtils.clamp(this.position.x, -worldBounds, worldBounds);
    this.position.z = THREE.MathUtils.clamp(this.position.z, -worldBounds, worldBounds);

    const planarSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.headBobTime += planarSpeed * delta * 0.95;
    const bobAmp = Math.min(planarSpeed / this.maxSpeed, 1) * 0.045;
    const bobOffset = Math.sin(this.headBobTime * 9.6) * bobAmp;
    const sway = THREE.MathUtils.clamp(this.mouseDeltaX * -0.0008, -0.03, 0.03);

    this.camera.position.set(this.position.x, this.baseHeight + bobOffset, this.position.z);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.lookYaw + sway;
    this.camera.rotation.x = this.lookPitch + Math.sin(this.headBobTime * 4.2) * bobAmp * 0.28;
    this.mouseDeltaX = THREE.MathUtils.damp(this.mouseDeltaX, 0, 18, delta);
  }
}
