export interface FloatingShape {
  id: string;
  type: "cube" | "sphere" | "pyramid" | "torus";
  size: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  color: string;
  opacity: number;
  duration: number;
}

export const floatingShapes: FloatingShape[] = [
  {
    id: "cube-1",
    type: "cube",
    size: 60,
    position: { x: 10, y: 20, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: "from-cyan-500/20 to-blue-600/20",
    opacity: 0.6,
    duration: 8,
  },
  {
    id: "sphere-1",
    type: "sphere",
    size: 40,
    position: { x: 85, y: 60, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: "from-purple-500/20 to-pink-600/20",
    opacity: 0.5,
    duration: 10,
  },
  {
    id: "pyramid-1",
    type: "pyramid",
    size: 50,
    position: { x: 75, y: 25, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: "from-green-500/20 to-emerald-600/20",
    opacity: 0.4,
    duration: 12,
  },
  {
    id: "torus-1",
    type: "torus",
    size: 35,
    position: { x: 20, y: 75, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: "from-orange-500/20 to-red-600/20",
    opacity: 0.3,
    duration: 15,
  },
];
