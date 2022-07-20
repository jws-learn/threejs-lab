import gsap from 'gsap';
import * as THREE from 'three';
import ImagePixel from './ImagePixel';
import logo from './logo.png';
import logoFragmentShader from './shaders/fragmentShader.glsl';
import logoVertexShader from './shaders/vertexShader.glsl';
import textureImg from './static/textures/particles/2.png';

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();

// let geometry = null;
// let material = null;
// let points = null;
// const clock = new THREE.Clock();

export default class Particle {
  constructor(stage) {
    this.stage = stage;
    this.promiseList = [];
    this.pathList = [
      // 'https://hisamikurita.github.io/sample-images/dist/assets/images/logo.png',
      logo,
    ];
    this.imageList = [];
    // console.log('vertexShader :>> ', logoVertexShader);
    // console.log('fragmentShader :>> ', logoFragmentShader);
  }

  init() {
    this.pathList.forEach(image => {
      this.promiseList.push(
        new Promise(resolve => {
          const img = new Image();
          img.src = image;
          img.crossOrigin = 'anonymous';

          img.addEventListener('load', () => {
            this.imageList.push(ImagePixel(img, img.width, img.height, 4.0));
            resolve();
          });
        }),
      );
    });
    Promise.all(this.promiseList).then(() => {
      this._setMesh();
      this._setAutoPlay();
    });
  }

  _setMesh() {
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(textureImg);

    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(
      new Float32Array(this.imageList[0].position),
      3,
    );
    const color = new THREE.BufferAttribute(
      new Float32Array(this.imageList[0].color),
      3,
    );
    const alpha = new THREE.BufferAttribute(
      new Float32Array(this.imageList[0].alpha),
      1,
    );
    geometry.setAttribute('position', position);
    geometry.setAttribute('color', color);
    geometry.setAttribute('alpha', alpha);

    const material = new THREE.ShaderMaterial({
      vertexShader: logoVertexShader,
      fragmentShader: logoFragmentShader,
      transparent: true,
      vertexColors: true,
      // map: particleTexture,
      // alphaMap: particleTexture,
      // blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uRatio: { value: 0.0 },
        uTex: { value: particleTexture },
      },
    });
    console.log('particleTexture :>> ', particleTexture);
    this.mesh = new THREE.Points(geometry, material);
    this.stage.scene.add(this.mesh);

    // for (let i = 0; i < this.mesh.geometry.attributes.position.count; i++) {
    //   const i3 = i * 3;
    //   const arr = this.mesh.geometry.attributes.position.array;
    //   const x = arr[i3 + 0];
    // let y = arr[i3 + 1];
    // const z = arr[i3 + 2];
    // console.log('x :>> ', x);
    // x = Math.random() * 20;
    // }

    // console.log('this.mesh :>> ', this.mesh);
  }

  _setDiffusion() {
    gsap.to(this.mesh.material.uniforms.uRatio, {
      value: 0.1,
      duration: 2,
      ease: 'expo.out',
      repeat: 1,
      yoyo: true,
    });
  }

  _setAutoPlay() {
    this._setDiffusion();

    gsap.to(
      {},
      {
        ease: 'none',
        duration: 4.2,
        repeat: -1.0,
        onRepeat: () => {
          this._setDiffusion();
        },
      },
    );
  }

  _render() {
    //
  }

  onResize() {
    //
  }

  onRaf() {
    // let elapsedTime = clock.getElapsedTime();

    this._render();
  }
}
