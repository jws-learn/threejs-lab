import * as THREE from 'three';
export default class FloatingCharsGeometry {
  /**
   * THREE.BufferGeometryを拡張した独自Geoemtryクラス
   * @param {number} numChars
   * @param {number} charWidth
   * @param {number} numTextureGridCols
   */
  constructor(numChars, charWidth, numTextureGridCols) {
    this.geometry = new THREE.BufferGeometry();
    this.numChars = numChars;
    this.charWidth = charWidth;
    this.numTextureGridCols = numTextureGridCols;

    // ちょっと意味わからん
    Object.create(THREE.BufferGeometry, {
      value: { constructor: THREE.BufferGeometry },
    });

    this.init();
  }

  init() {
    // attributes用の配列を生成
    this.vertices = [];
    this.charIndices = [];
    this.randomValues = [];
    this.uvs = [];
    this.indices = [];

    const charHeight = this.charWidth;
    const charHalfWidth = this.charWidth / 2;
    const charHalfHeight = charHeight / 2;

    // Math.ceil() 関数は、引数として与えた数以上の最小の整数を返します。
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    const numUvGridRows = Math.ceil(this.numChars / this.numTextureGridCols);

    // this.numCharsの数だけplaneを生成
    for (let i = 0; i < this.numChars; i++) {
      // GLSLで使用するランダムな値
      const randomValue = [Math.random(), Math.random(), Math.random()];

      // 頂点データを生成
      // 左上
      this.vertices.push(-charHalfWidth); //x
      this.vertices.push(charHalfHeight); //y
      this.vertices.push(0); //z

      this.uvs.push(0); //u
      this.uvs.push(0); //v

      this.charIndices.push(i); //何文字目かを表すインデックス番号

      this.randomValues.push(randomValue[0]); // GLSLで使用するランダムな値 (vec3になるので3つ)
      this.randomValues.push(randomValue[1]); // GLSLで使用するランダムな値 (vec3になるので3つ)
      this.randomValues.push(randomValue[2]); // GLSLで使用するランダムな値 (vec3になるので3つ)

      // 右上
      this.vertices.push(charHalfWidth);
      this.vertices.push(charHalfHeight);
      this.vertices.push(0);

      this.uvs.push(1);
      this.uvs.push(0);

      this.charIndices.push(i);

      this.randomValues.push(randomValue[0]);
      this.randomValues.push(randomValue[1]);
      this.randomValues.push(randomValue[2]);

      // 左下
      this.vertices.push(-charHalfWidth);
      this.vertices.push(-charHalfHeight);

      this.vertices.push(0);

      this.uvs.push(0);
      this.uvs.push(1);

      this.charIndices.push(i);

      this.randomValues.push(randomValue[0]);
      this.randomValues.push(randomValue[1]);
      this.randomValues.push(randomValue[2]);

      // 右下
      this.vertices.push(charHalfWidth);
      this.vertices.push(-charHalfHeight);

      this.vertices.push(0);

      this.uvs.push(1);
      this.uvs.push(1);

      this.charIndices.push(i);

      this.randomValues.push(randomValue[0]);
      this.randomValues.push(randomValue[1]);
      this.randomValues.push(randomValue[2]);

      // ポリゴンを生成するインデックスをpush (三角形ポリゴンが2枚なので6個)
      const indexOffset = i * 4;
      this.indices.push(indexOffset + 1);
      this.indices.push(indexOffset + 2);
      this.indices.push(indexOffset + 1);
      this.indices.push(indexOffset + 2);
      this.indices.push(indexOffset + 3);
      this.indices.push(indexOffset + 1);
    }

    // attributes
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(this.vertices), 3),
    );
    this.geometry.setAttribute(
      'randomValues',
      new THREE.BufferAttribute(new Float32Array(this.randomValues), 3),
    );
    this.geometry.setAttribute(
      'charIndex',
      new THREE.BufferAttribute(new Uint16Array(this.charIndices), 1),
    );
    this.geometry.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array(this.uvs), 2),
    );

    // index
    this.geometry.setIndex(
      new THREE.BufferAttribute(new Uint16Array(this.indices), 1),
    );

    // 配列としては使用しないので削除
    delete this.vertices;
    delete this.charIndices;
    delete this.randomValues;
    delete this.uvs;
    delete this.indices;

    this.geometry.computeVertexNormals();
  }
}
