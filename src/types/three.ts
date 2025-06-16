import * as THREE from 'three';

export interface ModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  visible?: boolean;
  animated?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

export interface SceneProps {
  children: React.ReactNode;
  camera?: {
    position: [number, number, number];
    fov?: number;
  };
  controls?: boolean;
  shadows?: boolean;
  fog?: {
    color: string;
    near: number;
    far: number;
  };
}

export interface ShaderMaterial extends THREE.ShaderMaterial {
  uniforms: {
    time: { value: number };
    resolution: { value: THREE.Vector2 };
    mouse: { value: THREE.Vector2 };
    [key: string]: { value: any };
  };
}

export interface AnimationMixer {
  mixer: THREE.AnimationMixer;
  actions: THREE.AnimationAction[];
  clips: THREE.AnimationClip[];
}

export interface ModelRef {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  mixer?: THREE.AnimationMixer;
  materials: THREE.Material[];
  meshes: THREE.Mesh[];
}

export interface InteractiveObject {
  object: THREE.Object3D;
  onHover?: (hovered: boolean) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}