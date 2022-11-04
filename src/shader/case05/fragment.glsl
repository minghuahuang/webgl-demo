precision lowp float;

varying vec3 vColor;
varying int vImgIndex;

uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

void main() {
  // 将顶点颜色混入进来
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength *= 2.0;
  strength = 1.0 - strength;
  strength = pow(strength, 1.5);

  vec3 mixColor = mix(vec3(0.0), vColor, strength);
  gl_FragColor = vec4(mixColor, strength);
}