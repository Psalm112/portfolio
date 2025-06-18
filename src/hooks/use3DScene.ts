import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { gsap } from "gsap";
interface Use3DSceneOptions {
  enableControls?: boolean;
  enableBloom?: boolean;
  enableShadows?: boolean;
  antialias?: boolean;
  alpha?: boolean;
  preserveDrawingBuffer?: boolean;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  backgroundColor?: number;
  fogNear?: number;
  fogFar?: number;
}
interface SceneObjects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls?: OrbitControls;
  composer?: EffectComposer;
  clock: THREE.Clock;
  lights: {
    ambient: THREE.AmbientLight;
    directional: THREE.DirectionalLight;
    point?: THREE.PointLight[];
  };
}
export const use3DScene = (options: Use3DSceneOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneObjects | null>(null);
  const animationIdRef = useRef<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    enableControls = true,
    enableBloom = true,
    enableShadows = true,
    antialias = true,
    alpha = true,
    preserveDrawingBuffer = false,
    cameraPosition = [5, 5, 5],
    cameraFov = 75,
    ambientLightIntensity = 0.4,
    directionalLightIntensity = 1,
    backgroundColor = 0x0f172a,
    fogNear = 10,
    fogFar = 50,
  } = options;
  // Initialize scene
  const initScene = useCallback(() => {
    if (!containerRef.current) return null;
    try {
      const container = containerRef.current;
      const { clientWidth: width, clientHeight: height } = container;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(backgroundColor);
      scene.fog = new THREE.Fog(backgroundColor, fogNear, fogFar);

      // Camera
      const camera = new THREE.PerspectiveCamera(
        cameraFov,
        width / height,
        0.1,
        1000,
      );
      camera.position.set(...cameraPosition);

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias,
        alpha,
        preserveDrawingBuffer,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (enableShadows) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }

      container.appendChild(renderer.domElement);

      // Controls
      let controls: OrbitControls | undefined;
      if (enableControls) {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enableRotate = true;
      }

      // Lights
      const ambientLight = new THREE.AmbientLight(
        0xffffff,
        ambientLightIntensity,
      );
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(
        0xffffff,
        directionalLightIntensity,
      );
      directionalLight.position.set(10, 10, 5);

      if (enableShadows) {
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
      }

      scene.add(directionalLight);

      const lights = {
        ambient: ambientLight,
        directional: directionalLight,
      };

      // Post-processing
      let composer: EffectComposer | undefined;
      if (enableBloom) {
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(width, height),
          0.5, // strength
          0.4, // radius
          0.85, // threshold
        );
        composer.addPass(bloomPass);
      }

      // Clock
      const clock = new THREE.Clock();

      const sceneObjects: SceneObjects = {
        scene,
        camera,
        renderer,
        controls,
        composer,
        clock,
        lights,
      };

      sceneRef.current = sceneObjects;
      return sceneObjects;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize scene",
      );
      return null;
    }
  }, [
    enableControls,
    enableBloom,
    enableShadows,
    antialias,
    alpha,
    preserveDrawingBuffer,
    cameraPosition,
    cameraFov,
    ambientLightIntensity,
    directionalLightIntensity,
    backgroundColor,
    fogNear,
    fogFar,
  ]);
  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current) return;
    const { scene, camera, renderer, controls, composer, clock } =
      sceneRef.current;

    animationIdRef.current = requestAnimationFrame(animate);

    // Update controls
    if (controls) {
      controls.update();
    }

    // Render
    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  }, []);
  // Handle resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !sceneRef.current) return;
    const { camera, renderer, composer } = sceneRef.current;
    const { clientWidth: width, clientHeight: height } = containerRef.current;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (composer) {
      composer.setSize(width, height);
    }
  }, []);
  // Add object to scene
  const addObject = useCallback((object: THREE.Object3D) => {
    if (sceneRef.current) {
      sceneRef.current.scene.add(object);
    }
  }, []);
  // Remove object from scene
  const removeObject = useCallback((object: THREE.Object3D) => {
    if (sceneRef.current) {
      sceneRef.current.scene.remove(object);
    }
  }, []);
  // Add point light
  const addPointLight = useCallback(
    (
      position: [number, number, number],
      color = 0x00d4ff,
      intensity = 1,
      distance = 0,
    ) => {
      if (!sceneRef.current) return null;
      const light = new THREE.PointLight(color, intensity, distance);
      light.position.set(...position);

      if (enableShadows) {
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
      }

      sceneRef.current.scene.add(light);

      if (!sceneRef.current.lights.point) {
        sceneRef.current.lights.point = [];
      }
      sceneRef.current.lights.point.push(light);

      return light;
    },
    [enableShadows],
  );
  // Animate camera to position
  const animateCameraTo = useCallback(
    (
      position: [number, number, number],
      lookAt?: [number, number, number],
      duration = 2,
    ) => {
      if (!sceneRef.current) return;
      const { camera } = sceneRef.current;

      gsap.to(camera.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          if (lookAt) {
            camera.lookAt(new THREE.Vector3(...lookAt));
          }
        },
      });
    },
    [],
  );
  // Get raycaster for mouse interactions
  const getRaycaster = useCallback((mouseX: number, mouseY: number) => {
    if (!containerRef.current || !sceneRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((mouseX - rect.left) / rect.width) * 2 - 1,
      -((mouseY - rect.top) / rect.height) * 2 + 1,
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, sceneRef.current.camera);

    return raycaster;
  }, []);
  // Initialize scene on mount
  useEffect(() => {
    const scene = initScene();
    if (scene) {
      animate();
      setIsLoading(false);
    }
    // Handle resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (sceneRef.current) {
        const { renderer, controls, composer } = sceneRef.current;

        if (controls) {
          controls.dispose();
        }

        if (composer) {
          composer.dispose();
        }

        renderer.dispose();

        // Remove canvas from DOM
        if (containerRef.current && renderer.domElement.parentNode) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [initScene, animate, handleResize]);
  return {
    containerRef,
    scene: sceneRef.current,
    isLoading,
    error,
    addObject,
    removeObject,
    addPointLight,
    animateCameraTo,
    getRaycaster,
    handleResize,
  };
};
