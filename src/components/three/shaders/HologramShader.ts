import * as THREE from "three";
export const hologramVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
uniform float time;
uniform float glitchIntensity;
void main() {
vUv = uv;
vPosition = position;
vNormal = normal;
vec4 worldPosition = modelMatrix * vec4(position, 1.0);
vWorldPosition = worldPosition.xyz;

vec3 pos = position;

// Hologram distortion
float glitch = sin(pos.y * 20.0 + time * 10.0) * glitchIntensity;
pos.x += glitch * 0.01;
pos.z += sin(pos.y * 15.0 + time * 8.0) * glitchIntensity * 0.005;

gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
export const hologramFragmentShader = `
uniform float time;
uniform vec3 color;
uniform float opacity;
uniform float scanlineIntensity;
uniform float glitchIntensity;
uniform float rimPower;
uniform vec2 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;
// Noise function
float random(vec2 st) {
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
// Scanline effect
float scanlines(vec2 uv, float time) {
float line = sin(uv.y * 800.0 + time * 2.0) * 0.04 + 0.96;
float mask = sin(uv.y * 300.0) * 0.5 + 0.5;
return line * mask;
}
// Digital glitch effect
float digitalGlitch(vec2 uv, float time) {
float glitch = 0.0;
// Horizontal glitch bars
float bars = step(0.98, sin(uv.y * 50.0 + time * 20.0));
glitch += bars;

// Random pixel noise
vec2 pixelUv = floor(uv * 200.0) / 200.0;
float noise = random(pixelUv + time);
glitch += smoothstep(0.97, 1.0, noise) * 0.5;

return glitch;
}
// Holographic interference
float interference(vec2 uv, float time) {
vec2 pos = uv * 10.0;
float wave1 = sin(pos.x * 2.0 + time * 3.0);
float wave2 = cos(pos.y * 3.0 + time * 2.0);
float wave3 = sin((pos.x + pos.y) * 1.5 + time * 4.0);
return (wave1 + wave2 + wave3) * 0.1 + 0.9;
}
void main() {
vec2 uv = vUv;
// Base hologram color
vec3 holo = color;

// Scanlines
float scan = scanlines(uv, time);
holo *= scan * scanlineIntensity + (1.0 - scanlineIntensity);

// Digital glitch
float glitch = digitalGlitch(uv, time);
holo += vec3(0.0, glitch * glitchIntensity, glitch * glitchIntensity * 0.5);

// Interference pattern
float inter = interference(uv, time);
holo *= inter;

// Rim lighting (fresnel)
vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
float fresnel = 1.0 - max(0.0, dot(vNormal, viewDirection));
fresnel = pow(fresnel, rimPower);

// Add rim glow
holo += color * fresnel * 0.8;

// Opacity based on viewing angle
float viewOpacity = fresnel * 0.7 + 0.3;

// Add some temporal flickering
float flicker = sin(time * 50.0) * 0.02 + 0.98;

// Final opacity
float finalOpacity = opacity * viewOpacity * flicker;

// Add some color shifting
holo.r += sin(time * 3.0 + uv.y * 10.0) * 0.1;
holo.g += cos(time * 2.5 + uv.x * 15.0) * 0.1;
holo.b += sin(time * 4.0 + (uv.x + uv.y) * 8.0) * 0.1;

gl_FragColor = vec4(holo, finalOpacity);
}
`;
export const createHologramMaterial = (options: {
  color?: string;
  opacity?: number;
  scanlineIntensity?: number;
  glitchIntensity?: number;
  rimPower?: number;
}) => {
  const {
    color = "#00ffff",
    opacity = 0.7,
    scanlineIntensity = 0.5,
    glitchIntensity = 0.3,
    rimPower = 2.0,
  } = options;
  return {
    vertexShader: hologramVertexShader,
    fragmentShader: hologramFragmentShader,
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      opacity: { value: opacity },
      scanlineIntensity: { value: scanlineIntensity },
      glitchIntensity: { value: glitchIntensity },
      rimPower: { value: rimPower },
      resolution: { value: [window.innerWidth, window.innerHeight] },
    },
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  };
};
