import * as THREE from 'three';
import FloatingCharsGeometry from './FloatingCharsGeometry';

export default class FloatingChars {
  /**
   *  THREE.Meshを拡張した独自3Dオブジェクトクラス
   * @param {number} numChars
   * @param {number} charWidth
   * @param {number} numTextureGridCols
   * @param {number} textureGridSize
   */
  constructor(numChars, charWidth, numTextureGridCols, textureGridSize) {
    this.numChars = numChars;
    this.charWidth = charWidth;
    this.numTextureGridCols = numTextureGridCols;
    this.textureGridSize = textureGridSize;

    // カスタムジオメトリオブジェクトをインスタンス化
    this.geometry = new FloatingCharsGeometry(
      this.numChars,
      this.charWidth,
      this.numTextureGridCols,
    );

    // マテリアル
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    Object.create(THREE.Mesh, { value: { constructor: THREE.Mesh } });
  }

  /**
   * テクスチャを生成
   * @param {string} txt - テクスチャとして使用したい文字列
   * @param {string} fontFamily - フォント名
   */
  createTxtTexture(txt, fontFamily) {
    this.txtCanvas = document.createElement('canvas');
    this.txtCanvasCtx = this.txtCanvas.getContext('2d');
    this.txtCanvas.width = this.textureGridSize * this.numTextureGridCols;
    this.txtCanvas.height =
      this.textureGridSize * Math.ceil(txt.length / this.numTextureGridCols);

    const textureTxtLength = txt.length;
    const numCols = Math.min(textureTxtLength, this.numTextureGridCols);
    const numRos = Math.ceil(textureTxtLength / this.numTextureGridCols);

    // canvasのスタイルを設定
    this.txtCanvasCtx.clearRect(
      0,
      0,
      this.txtCanvas.width,
      this.txtCanvas.height,
    );
    this.txtCanvasCtx.font =
      'normal ' + this.textureGridSize * 0.8 + 'px ' + fontFamily;
    this.txtCanvasCtx.textAlign = 'center';
    this.txtCanvasCtx.fillStyle = '#ffffff';

    let colIndex;
    let rowIndex;

    for (var i = 0, l = textureTxtLength; i < l; i++) {
      colIndex = i % this.numTextureGridCols;
      rowIndex = Math.floor(i / this.numTextureGridCols);

      // canvasに文字を描画
      this.txtCanvasCtx.fillText(
        txt.charAt(i),
        colIndex * this.textureGridSize + this.textureGridSize / 2,
        rowIndex * this.textureGridSize + this.textureGridSize * 0.8,
        this.textureGridSize,
      );
    }

    // canvasからthree.jsのテクスチャを生成
    this.txtTexture = new THREE.Texture(this.txtCanvas);
    this.txtTexture.flipY = false;
    this.txtTexture.needsUpdate = true;
  }
}
