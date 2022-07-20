import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// const clock = new THREE.Clock();

export default class Stage {
  constructor() {
    this.renderParam = {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.cameraParam = {
      fov: 45,
      near: 0.1,
      far: 3000,
      lookAt: new THREE.Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 2500,
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.isInitialized = false;
    this.orbitcontrols = null;
    this.isDev = false;
  }

  init() {
    this._setScene();
    this._setRender();
    this._setCamera();
    this._setDev();
  }

  _setScene() {
    this.scene = new THREE.Scene();
  }

  _setRender() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
    const wrapper = document.querySelector('#webgl');
    wrapper.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    if (!this.isInitialized) {
      this.camera = new THREE.PerspectiveCamera(
        0,
        0,
        this.cameraParam.near,
        this.cameraParam.far,
      );

      this.camera.position.set(
        this.cameraParam.x,
        this.cameraParam.y,
        this.cameraParam.z,
      );
      this.camera.lookAt(this.cameraParam.lookAt);

      this.isInitialized = true;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.camera.aspect = windowWidth / windowHeight;
    this.camera.fov = this.cameraParam.fov;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(windowWidth, windowHeight);
  }

  _setDev() {
    this.orbitcontrols = new OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.orbitcontrols.enableDamping = true;
    this.isDev = true;
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
    if (this.isDev) this.orbitcontrols.update();
  }

  onResize() {
    this._setCamera();
  }

  onRaf() {
    // const elapsedTime = clock.getElapsedTime();

    // this.camera.position.set(
    //   Math.sin(-Math.PI * elapsedTime * 0.1) * 1000 + 1000,
    //   0,
    //   Math.cos(-Math.PI * elapsedTime * 0.1) * 1000 + 1000,
    // );

    this._render();
  }
}
