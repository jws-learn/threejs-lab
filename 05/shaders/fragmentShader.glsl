precision mediump float;

varying vec3 vColor;
varying float vAlpla;
varying vec2 vUv;

uniform sampler2D uTex;

// varying vec2 v_texCoord;

void main() {
  // vec2 temp = gl_PointCoord - vec2(0.5);
  // float f = dot(temp, temp);
  // if (f > 0.25 ) {
  //   discard;
  // }

  // gl_FragColor = texture2D( uTex, vUv );

  // vec4 colA = texture2D(uTex, vUv);

  vec2 texcoord = vec2(0.5, 0.5);

  vec4 textureColor = texture2D(uTex, texcoord);
  vec4 color = vec4(vColor, vAlpla);

  // gl_FragColor = texture2D(uTex, vAlpla) * vColor;

  // vec4 c1 = vec4(vColor, vAlpla);
  // vec4 c2 = texture2D(uTex, vUv);
  // vec4 col = mix(c1,c2);

  gl_FragColor = vec4(vColor, vAlpla);

  // gl_FragColor = mix(textureColor,color);
}