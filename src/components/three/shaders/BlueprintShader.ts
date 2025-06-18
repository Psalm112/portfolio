import * as THREE from "three";

export const blueprintVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
uniform float time;
uniform float amplitude;
void main() {
vUv = uv;
vPosition = position;
vNormal = normal;
vec3 pos = position;

// Add subtle wave animation
pos.z += sin(pos.x * 2.0 + time) * amplitude * 0.1;
pos.z += cos(pos.y * 1.5 + time * 0.7) * amplitude * 0.05;

gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
export const blueprintFragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform vec3 color;
uniform float opacity;
uniform float gridSize;
uniform float lineWidth;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
// Blueprint grid function
float grid(vec2 uv, float size) {
vec2 grid = abs(fract(uv * size) - 0.5) / fwidth(uv * size);
float line = min(grid.x, grid.y);
return 1.0 - min(line, 1.0);
}
// Circuit pattern function
float circuitPattern(vec2 uv) {
vec2 pos = uv * 10.0;
// Horizontal lines
float h = step(0.48, mod(pos.y, 1.0)) * step(mod(pos.y, 1.0), 0.52);

// Vertical lines
float v = step(0.48, mod(pos.x, 1.0)) * step(mod(pos.x, 1.0), 0.52);

// Connection points
float connections = 0.0;
vec2 cellPos = fract(pos);
float dist = distance(cellPos, vec2(0.5));
connections += smoothstep(0.1, 0.08, dist);

return max(h, max(v, connections));
}
void main() {
vec2 uv = vUv;
// Blueprint grid
float gridPattern = grid(uv, gridSize);
float majorGrid = grid(uv, gridSize * 0.2);

// Circuit pattern
float circuit = circuitPattern(uv + time * 0.1);

// Combine patterns
float pattern = max(gridPattern * 0.3, majorGrid * 0.6);
pattern = max(pattern, circuit * 0.8);

// Add glow effect
float glow = smoothstep(0.0, 1.0, pattern);
glow *= sin(time * 2.0) * 0.1 + 0.9;

// Final color
vec3 finalColor = color * glow;

// Add fresnel effect for 3D objects
float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
fresnel = pow(1.0 - fresnel, 2.0);
finalColor += vec3(0.2, 0.4, 1.0) * fresnel * 0.3;

gl_FragColor = vec4(finalColor, opacity * glow);
}
`;
export const createBlueprintMaterial = (options: {
  color?: string;
  opacity?: number;
  gridSize?: number;
  lineWidth?: number;
  animated?: boolean;
}) => {
  const {
    color = "#0070f3",
    opacity = 0.8,
    gridSize = 20.0,
    lineWidth = 1.0,
    animated = true,
  } = options;
  return {
    vertexShader: blueprintVertexShader,
    fragmentShader: blueprintFragmentShader,
    uniforms: {
      time: { value: 0 },
      resolution: { value: [window.innerWidth, window.innerHeight] },
      color: { value: new THREE.Color(color) },
      opacity: { value: opacity },
      gridSize: { value: gridSize },
      lineWidth: { value: lineWidth },
      amplitude: { value: animated ? 1.0 : 0.0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
  };
};
