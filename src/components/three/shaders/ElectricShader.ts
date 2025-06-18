import * as THREE from "three";
export const electricVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
uniform float time;
uniform float intensity;
void main() {
vUv = uv;
vPosition = position;
vNormal = normal;
vec3 pos = position;

// Electric displacement
float noise = sin(pos.x * 5.0 + time * 3.0) * 
              cos(pos.y * 7.0 + time * 2.0) * 
              sin(pos.z * 3.0 + time * 4.0);

pos += normal * noise * intensity * 0.02;

gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
export const electricFragmentShader = `
uniform float time;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float intensity;
uniform float speed;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
// Noise function
float noise(vec2 pos) {
return fract(sin(dot(pos, vec2(12.9898, 78.233))) * 43758.5453);
}
// Electric arc function
float electricArc(vec2 uv, float t) {
vec2 pos = uv * 10.0;
float arc = 0.0;
for (int i = 0; i < 5; i++) {
  float fi = float(i);
  vec2 offset = vec2(sin(t * 2.0 + fi), cos(t * 1.5 + fi * 0.5)) * 0.5;
  float dist = distance(pos, vec2(5.0) + offset);
  arc += 1.0 / (dist * 10.0 + 1.0);
}

return arc;
}
// Lightning bolt pattern
float lightning(vec2 uv, float t) {
vec2 pos = uv;
pos.x += sin(pos.y * 10.0 + t * 5.0) * 0.1;
float bolt = 0.0;
float thickness = 0.02;

// Main bolt
bolt += smoothstep(thickness, 0.0, abs(pos.x - 0.5));

// Branches
for (int i = 0; i < 3; i++) {
  float fi = float(i) + 1.0;
  vec2 branchPos = pos;
  branchPos.x += sin(pos.y * 20.0 + t * 3.0 + fi) * 0.05;
  branchPos.y += fi * 0.2;
  
  float branch = smoothstep(thickness * 0.5, 0.0, 
                           distance(branchPos, vec2(0.5 + fi * 0.1, fi * 0.25)));
  bolt += branch * 0.5;
}

return bolt;
}
void main() {
vec2 uv = vUv;
float t = time * speed;
// Electric effects
float arc = electricArc(uv, t);
float bolt = lightning(uv, t);

// Combine effects
float electric = max(arc, bolt);

// Color mixing
vec3 color = mix(color1, color2, sin(t * 2.0) * 0.5 + 0.5);
color = mix(color, color3, electric);

// Intensity modulation
float pulse = sin(t * 10.0) * 0.1 + 0.9;
electric *= pulse * intensity;

// Glow effect
float glow = electric * 2.0;
color += vec3(glow * 0.5, glow * 0.7, glow);

// Fresnel for rim lighting
float fresnel = 1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
fresnel = pow(fresnel, 2.0);
color += color1 * fresnel * 0.5;

gl_FragColor = vec4(color, electric + fresnel * 0.3);
}
`;
export const createElectricMaterial = (options: {
  color1?: string;
  color2?: string;
  color3?: string;
  intensity?: number;
  speed?: number;
}) => {
  const {
    color1 = "#00d4ff",
    color2 = "#00ffff",
    color3 = "#ffffff",
    intensity = 1.0,
    speed = 1.0,
  } = options;
  return {
    vertexShader: electricVertexShader,
    fragmentShader: electricFragmentShader,
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
      color3: { value: new THREE.Color(color3) },
      intensity: { value: intensity },
      speed: { value: speed },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
  };
};
