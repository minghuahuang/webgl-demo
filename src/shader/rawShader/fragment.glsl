precision lowp float;

varying vec2 vUv;
varying float vElevation;

void main() {
  float deep = vElevation + 0.05 * 10.0;
  gl_FragColor = vec4(deep, 0.0, 0.0, 1.0);
}