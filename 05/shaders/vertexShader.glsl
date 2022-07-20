attribute float alpha;

uniform float uTime;
uniform float uRatio;

varying vec2 vUv;
varying vec3 vColor;
varying float vAlpla;

void main() {
  float power = 100.0;
  vec3 vertexDirection = vec3(normalize(position.xy), position.z);
  vec3 finalPosition = position + vertexDirection * power * uRatio;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0 );
  gl_PointSize = 6.0;

  vColor = color;
  vAlpla = alpha;
  vUv = uv;
}