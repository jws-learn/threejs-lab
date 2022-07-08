import './style.scss';

import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('#webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000');

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

/**
 * Geometry
 */

// Box
// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshNormalMaterial({
  color: 0xffffff,
  // wireframe: true,
});

// Mesh
const num = 3;
const group = new THREE.Group();
for (let i = 0; i < num; i++) {
  for (let j = 0; j < num; j++) {
    for (let k = 0; k < num; k++) {
      const cube = new THREE.Mesh(geometry, material);
      switch (i % 3) {
        case 0:
          cube.position.x = -1;
          break;
        case 1:
          cube.position.x = 0;
          break;
        case 2:
          cube.position.x = 1;
          break;
        default:
          break;
      }
      switch (j % 3) {
        case 0:
          cube.position.y = -1;
          break;
        case 1:
          cube.position.y = 0;
          break;
        case 2:
          cube.position.y = 1;
          break;
        default:
          break;
      }
      switch (k % 3) {
        case 0:
          cube.position.z = -1;
          break;
        case 1:
          cube.position.z = 0;
          break;
        case 2:
          cube.position.z = 1;
          break;
        default:
          break;
      }
      group.add(cube);
    }
  }
}

scene.add(group);

// Triangle
// Geometry
const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5, 0);
// Material

// Mesh
const tetra = new THREE.Mesh(tetrahedronGeometry, material);

scene.add(tetra);

/**
 * Light
 */
const spotLight = new THREE.SpotLight(0xffffff, 1, 2000, Math.PI / 5, 0.2, 1.5);
spotLight.position.set(50, 30, 50);
spotLight.castShadow = true; // 影を落とす設定
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
scene.add(spotLight);

const light = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
scene.add(light);

/**
 * Camera
 */
// Base camera
const aspectRatio = sizes.width / sizes.height;
const frustumSize = 4;

const camera = new THREE.OrthographicCamera(
  frustumSize * -1 * aspectRatio,
  frustumSize * 1 * aspectRatio,
  frustumSize * 1,
  frustumSize * -1,
  1,
  1000,
);
// const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 2000);
camera.position.set(100, 100, 100);
// camera.zoom = -200;
camera.lookAt(0, 0, 0);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Resize
 */
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Animate
 */

const cubes = group.children;
for (let i = 0; i < cubes.length; i++) {
  cubes[0].visible = true;
  cubes[1].visible = true;
  cubes[2].visible = true;
  cubes[3].visible = true;
  cubes[4].visible = false;
  cubes[5].visible = true;
  cubes[6].visible = true;
  cubes[7].visible = true;
  cubes[8].visible = true;
  cubes[9].visible = true;
  cubes[10].visible = false;
  cubes[11].visible = true;
  cubes[12].visible = false;
  cubes[13].visible = false;
  cubes[14].visible = false;
  cubes[15].visible = true;
  cubes[16].visible = false;
  cubes[17].visible = true;
  cubes[18].visible = true;
  cubes[19].visible = true;
  cubes[20].visible = true;
  cubes[21].visible = true;
  cubes[22].visible = false;
  cubes[23].visible = true;
  cubes[24].visible = true;
  cubes[25].visible = true;
  cubes[26].visible = true;
}

console.log(cubes[0].getWorldPosition);

const clock = new THREE.Clock();

function changePosition(elm, elapsedTime, num) {
  const effect = 0.4;
  if (num == 0) {
    elm.position.x -= Math.cos(Math.PI * 2 * elapsedTime) / 20 * effect;
    elm.position.y -= Math.cos(Math.PI * 2 * elapsedTime) / 20 * effect;
    elm.position.z -= Math.cos(Math.PI * 2 * elapsedTime) / 20 * effect;
  }
}

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  for (let i = 0; i < cubes.length; i++) {
    changePosition(cubes[i], elapsedTime, i);
  }

  // Update controls
  controls.update();
  // camera.position.set(
  //   Math.sin(-Math.PI * elapsedTime * 0.5) * 10,
  //   Math.cos(-Math.PI * elapsedTime * 0.5) * 10,
  //   Math.cos(-Math.PI * elapsedTime * 0.5) * 10,
  // );

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
