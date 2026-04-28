import * as THREE from './node_modules/three/build/three.module.js';
import { PlayerController } from './player.js';
import { WeaponSystem } from './weapon.js';
import { EnemyManager } from './enemy.js';
import { KillframeSystem } from './killframe.js';
import { UISystem } from './ui.js';
import { GameManager } from './gameManager.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x060910);
scene.fog = new THREE.Fog(0x070912, 20, 66);

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 140);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('app').appendChild(renderer.domElement);

const ui = new UISystem(document.body);
const game = new GameManager();
const player = new PlayerController(camera, renderer.domElement);
const killframe = new KillframeSystem();

scene.add(new THREE.AmbientLight(0x5f7cbb, 0.45));
const keyLight = new THREE.DirectionalLight(0xb8eeff, 1.25);
keyLight.position.set(11, 18, 8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.left = -38;
keyLight.shadow.camera.right = 38;
keyLight.shadow.camera.top = 38;
keyLight.shadow.camera.bottom = -38;
scene.add(keyLight);
const fillLight = new THREE.PointLight(0x2865ff, 0.6, 42, 2);
fillLight.position.set(-8, 3, -14);
scene.add(fillLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(90, 90),
  new THREE.MeshStandardMaterial({ color: 0x0d1220, roughness: 0.92, metalness: 0.04 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(26, 0.18, 12, 72),
  new THREE.MeshStandardMaterial({ color: 0x15192d, emissive: 0x1a295f, emissiveIntensity: 1.1 })
);
ring.rotation.x = Math.PI / 2;
ring.position.y = 0.05;
scene.add(ring);

const enemyManager = new EnemyManager(scene);
enemyManager.spawnInitial(6);

const weapon = new WeaponSystem(camera, ui, renderer.domElement);
weapon.setHitables(enemyManager.getHitableMeshes());

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function onEnemyKilled() {
  game.addScore(Math.round(100 * (killframe.killframeActive ? 1.5 : 1)));
}

function updateGame(delta, elapsed) {
  if (game.state === 'game_over') {
    ui.setGameOver(true);
    ui.setHealth(game.health, game.maxHealth);
    ui.setScore(game.score);
    ui.setStats(killframe.getAccuracy(), killframe.getAverageHitReaction());
    ui.update(delta);
    return;
  }
  ui.setGameOver(false);

  killframe.update(delta);
  player.update(delta * killframe.timeScale);
  weapon.setDamageMultiplier(killframe.damageBoost);

  enemyManager.update(
    delta * killframe.timeScale,
    player.position,
    (damage) => game.applyDamage(damage * (killframe.killframeActive ? 0.55 : 1)),
    onEnemyKilled
  );

  weapon.update(
    delta,
    elapsed,
    (hit) => {
      const activated = killframe.registerShot(hit, elapsed);
      if (activated) {
        ui.showHitMarker(true);
      }
    },
    (kick) => player.addRecoil(kick),
    game.state === 'playing'
  );

  ui.setKillframeActive(killframe.killframeActive);
  ui.setHealth(game.health, game.maxHealth);
  ui.setScore(game.score);
  ui.setStats(killframe.getAccuracy(), killframe.getAverageHitReaction());
  ui.update(delta);
}

function animate() {
  const delta = Math.min(clock.getDelta(), 0.033);
  updateGame(delta, clock.elapsedTime);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
