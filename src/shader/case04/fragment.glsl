precision lowp float;

uniform sampler2D uTexture;

void main() {
  // gl_FragColor = vec4(gl_PointCoord, 0.0, 1.0);

  // 渐变圆
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // gl_FragColor = vec4(strength);

  // 设置白色圆
  // float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
  // strength = step(0.5, strength);
  // gl_FragColor = vec4(strength);

  // 模糊圆
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength *= 2.0;
  // strength = 1.0 - strength;
  // gl_FragColor = vec4(strength);

  // 根据纹理设置图案
  // vec4 textureColor = texture2D(uTexture, gl_PointCoord);
  // gl_FragColor = vec4(textureColor.rgb, textureColor.r);

  // 渐变色纹理
  vec4 textureColor = texture2D(uTexture, gl_PointCoord);
  gl_FragColor = vec4(gl_PointCoord, 1.0, textureColor.r);
}