#define PI 3.1415926535897932384626433832795

attribute vec3 position;
attribute vec2 uv;

uniform float uSpeed;
uniform vec2 uViewportSizes;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec4 vPosition;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  vPosition = newPosition;

  gl_Position = projectionMatrix * newPosition;
}