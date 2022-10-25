precision lowp float;

varying float vElevation;

uniform vec3 uLowColor;
uniform vec3 uHighColor;
uniform float uOpacity;

void main() {
  float alpha = (vElevation + 1.0) / 2.0;
  vec3 mixColor = mix(uLowColor, uHighColor, alpha);
  gl_FragColor = vec4(mixColor, uOpacity);
}