// import GUI from 'lil-gui';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import WebFont from 'webfontloader';
import FloatingChars from './FloatingChars';

/**
 * メインビジュアルクラス
 * @param {number} numChars - テクスチャの文字数
 * @param {number} charWidth - 文字の幅 [px]
 * @param {number} numTextureGridCols - テクスチャの1行文の文字列 [px]
 * @param {number} textureGridSize - テクスチャの1文字分の幅 [px]
 */

export default class MainVisual {
  constructor(numChars, charWidth, numTextureGridCols, textureGridSize) {
    // 文字数 = 正方形の数
    this.numChars = numChars || 1;

    // 文字の幅[px] (geometryの1文字の幅)
    this.charWidth = charWidth || 50;

    // テクスチャの1行文の文字列
    this.numTextureGridCols = numTextureGridCols || 1;

    // テクスチャの1文字分の幅
    this.textureGridSize = textureGridSize || 128;

    // アニメーション適用度
    // 頂点シェーダ内でアニメーションが3つ定義されており
    // それらを切り替えるための値
    // this.animationValue1 = 1;
    // this.animationValue2 = 0;
    // this.animationValue3 = 0;

    // controls
    // 第二引数にthis.renderer.domElementを指定しておかないと、dat.guiのGUIがうまく操作できない
    // this.controls = new THREE.TrackballControls(
    //   this.camera,
    //   this.renderer.domElement,
    // );

    // イニシャライズ
    this.init();
  }

  init() {
    this.window = window;
    this.MainVisual = document.querySelector('#main');
    this.canvas = document.querySelector('#webgl');

    /**
     * Renderer
     */
    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    // 高解像度対応
    const pixelRatio = Math.min(this.window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(pixelRatio);

    /**
     * Scene
     */
    this.scene = new THREE.Scene();

    /**
     * Camera
     */
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.width / this.height,
      10,
      1000,
    );

    this.camera.position.set(0, 0, 300);

    /**
     * Controls
     */
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement,
    );

    /**
     * Resize
     */
    this.window.addEventListener('resize', () => {
      this.resize();
    });

    this.iniFloatingChars().then(function() {
      // resizeイベントを発火してキャンバスサイズをリサイズ
      this.resize();

      // アニメーション開始
      self.start();
    });
  }

  iniFloatingChars() {
    return new Promise(resolve => {
      // webfont load event
      WebFont.load({
        google: {
          families: ['Cabin Sketch'],
        },
        active: function(fontFamily, fontDescription) {
          console.log('webfonts loaded');

          // FloatingCharsインスタンス化
          this.floatingChars = new FloatingChars(
            this.numChars,
            this.charWidth,
            this.numTextureGridCols,
            this.textureGridSize,
          );

          // テクスチャをイニシャライズ
          this.floatingChars.createTxtTexture('A', 'Cabin Sketch');

          // シーンに追加
          this.scene.add(this.floatingChars);

          resolve();
        },
      });
    });
  }

  /**
   * アニメーション開始
   */
  start() {
    const enterFrameHandler = () => {
      requestAnimationFrame(enterFrameHandler);
      this.update();
    };

    enterFrameHandler();
  }

  /**
   * アニメーションループ内で実行される
   */
  update() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * リサイズ処理
   * @param {event} e
   */
  resize(e) {
    this.width = this.window.innerWidth;
    this.height = this.window.innerHeight;

    this.controls.handleResize();

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}
