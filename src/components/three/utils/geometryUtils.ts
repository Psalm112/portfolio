import * as THREE from "three";
export interface GeometryConfig {
  size?: number;
  segments?: number;
  detail?: number;
  wireframe?: boolean;
  material?: THREE.Material;
}
export class GeometryUtils {
  // Create circuit board geometry
  static createCircuitBoard(
    width = 10,
    height = 8,
    thickness = 0.2,
  ): THREE.BufferGeometry {
    const geometry = new THREE.BoxGeometry(width, thickness, height);
    // Add circuit traces using edge geometry
    const edges = new THREE.EdgesGeometry(geometry);
    return edges;
  }
  // Create microcontroller chip geometry
  static createMicrocontroller(size = 1): THREE.Group {
    const group = new THREE.Group();
    // Main chip body
    const chipGeometry = new THREE.BoxGeometry(size, size * 0.2, size);
    const chipMaterial = new THREE.MeshPhongMaterial({
      color: 0x2c2c54,
      shininess: 100,
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    group.add(chip);

    // Add pins
    const pinGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.1);
    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.8,
      roughness: 0.2,
    });

    const pinsPerSide = 8;
    const pinSpacing = size / (pinsPerSide + 1);

    for (let i = 0; i < pinsPerSide; i++) {
      // Left side pins
      const leftPin = new THREE.Mesh(pinGeometry, pinMaterial);
      leftPin.position.set(
        -size / 2 - 0.05,
        0,
        -size / 2 + pinSpacing * (i + 1),
      );
      group.add(leftPin);

      // Right side pins
      const rightPin = new THREE.Mesh(pinGeometry, pinMaterial);
      rightPin.position.set(
        size / 2 + 0.05,
        0,
        -size / 2 + pinSpacing * (i + 1),
      );
      group.add(rightPin);
    }

    return group;
  }
  // Create robot arm segment
  static createRobotArmSegment(length = 2, radius = 0.2): THREE.Group {
    const group = new THREE.Group();
    // Main arm cylinder
    const armGeometry = new THREE.CylinderGeometry(radius, radius, length);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0x404040,
      shininess: 50,
    });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.rotateZ(Math.PI / 2);
    group.add(arm);

    // Joint spheres
    const jointGeometry = new THREE.SphereGeometry(radius * 1.2);
    const jointMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      metalness: 0.7,
      roughness: 0.3,
    });

    const startJoint = new THREE.Mesh(jointGeometry, jointMaterial);
    startJoint.position.x = -length / 2;
    group.add(startJoint);

    const endJoint = new THREE.Mesh(jointGeometry, jointMaterial);
    endJoint.position.x = length / 2;
    group.add(endJoint);

    return group;
  }
  // Create communication tower
  static createCommTower(height = 10, levels = 4): THREE.Group {
    const group = new THREE.Group();
    // Main tower structure
    const towerGeometry = new THREE.ConeGeometry(0.1, height, 8);
    const towerMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = height / 2;
    group.add(tower);

    // Add antenna levels
    for (let i = 0; i < levels; i++) {
      const levelHeight = height * (0.2 + i * 0.2);
      const antennaGeometry = new THREE.TorusGeometry(
        0.5 + i * 0.3,
        0.05,
        8,
        16,
      );
      const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x00d4ff });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.y = levelHeight;
      group.add(antenna);
    }

    return group;
  }
  // Create signal wave geometry
  static createSignalWave(
    amplitude = 1,
    frequency = 2,
    length = 10,
  ): THREE.BufferGeometry {
    const points = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * length - length / 2;
      const y = Math.sin((i / segments) * frequency * Math.PI * 2) * amplitude;
      points.push(new THREE.Vector3(x, y, 0));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }
  // Create gear geometry
  static createGear(
    innerRadius = 0.5,
    outerRadius = 1,
    teeth = 12,
    thickness = 0.2,
  ): THREE.ExtrudeGeometry {
    const shape = new THREE.Shape();
    const toothAngle = (Math.PI * 2) / teeth;
    const toothDepth = outerRadius - innerRadius;

    // Start at inner radius
    shape.moveTo(innerRadius, 0);

    for (let i = 0; i < teeth; i++) {
      const angle1 = i * toothAngle;
      const angle2 = angle1 + toothAngle * 0.4;
      const angle3 = angle1 + toothAngle * 0.6;
      const angle4 = (i + 1) * toothAngle;

      // Inner arc
      const innerX1 = Math.cos(angle1) * innerRadius;
      const innerY1 = Math.sin(angle1) * innerRadius;
      const innerX2 = Math.cos(angle4) * innerRadius;
      const innerY2 = Math.sin(angle4) * innerRadius;

      // Outer tooth points
      const outerX1 = Math.cos(angle2) * outerRadius;
      const outerY1 = Math.sin(angle2) * outerRadius;
      const outerX2 = Math.cos(angle3) * outerRadius;
      const outerY2 = Math.sin(angle3) * outerRadius;

      shape.lineTo(innerX1, innerY1);
      shape.lineTo(outerX1, outerY1);
      shape.lineTo(outerX2, outerY2);
      shape.lineTo(innerX2, innerY2);
    }

    shape.lineTo(innerRadius, 0);

    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 8,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }
  // Create PCB trace paths
  static createPCBTraces(points: THREE.Vector3[]): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];

      positions.push(start.x, start.y, start.z);
      positions.push(end.x, end.y, end.z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geometry;
  }
  // Create component socket
  static createComponentSocket(width = 1, height = 0.5, pins = 8): THREE.Group {
    const group = new THREE.Group();
    // Socket body
    const socketGeometry = new THREE.BoxGeometry(width, height, width * 0.6);
    const socketMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const socket = new THREE.Mesh(socketGeometry, socketMaterial);
    group.add(socket);

    // Pin holes
    const holeGeometry = new THREE.CylinderGeometry(0.02, 0.02, height);
    const holeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const pinsPerSide = pins / 2;
    const pinSpacing = (width * 0.8) / (pinsPerSide - 1);

    for (let i = 0; i < pinsPerSide; i++) {
      const leftHole = new THREE.Mesh(holeGeometry, holeMaterial);
      leftHole.position.set(-width * 0.3, 0, -width * 0.4 + pinSpacing * i);
      group.add(leftHole);

      const rightHole = new THREE.Mesh(holeGeometry, holeMaterial);
      rightHole.position.set(width * 0.3, 0, -width * 0.4 + pinSpacing * i);
      group.add(rightHole);
    }

    return group;
  }
  // Create LED geometry
  static createLED(radius = 0.1, height = 0.2, color = 0xff0000): THREE.Group {
    const group = new THREE.Group();
    // LED body
    const bodyGeometry = new THREE.CylinderGeometry(
      radius,
      radius * 0.8,
      height,
    );
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      emissive: color,
      emissiveIntensity: 0.3,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // LED leads
    const leadGeometry = new THREE.CylinderGeometry(0.01, 0.01, height * 0.3);
    const leadMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.9,
      roughness: 0.1,
    });

    const lead1 = new THREE.Mesh(leadGeometry, leadMaterial);
    lead1.position.set(-radius * 0.5, -height * 0.65, 0);
    group.add(lead1);

    const lead2 = new THREE.Mesh(leadGeometry, leadMaterial);
    lead2.position.set(radius * 0.5, -height * 0.65, 0);
    group.add(lead2);

    return group;
  }
  // Create capacitor geometry
  static createCapacitor(radius = 0.15, height = 0.4): THREE.Group {
    const group = new THREE.Group();
    // Capacitor body
    const bodyGeometry = new THREE.CylinderGeometry(radius, radius, height);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4169e1 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Label
    const labelGeometry = new THREE.PlaneGeometry(radius * 1.5, height * 0.3);
    const labelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.z = radius + 0.01;
    group.add(label);

    // Leads
    const leadGeometry = new THREE.CylinderGeometry(0.01, 0.01, height * 0.2);
    const leadMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.9,
      roughness: 0.1,
    });

    const lead1 = new THREE.Mesh(leadGeometry, leadMaterial);
    lead1.position.y = -height * 0.6;
    group.add(lead1);

    const lead2 = new THREE.Mesh(leadGeometry, leadMaterial);
    lead2.position.set(radius * 0.7, -height * 0.6, 0);
    group.add(lead2);

    return group;
  }
  // Utility function to create custom mesh from vertices
  static createCustomMesh(
    vertices: number[],
    faces: number[],
    material?: THREE.Material,
  ): THREE.Mesh {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.setIndex(faces);
    geometry.computeVertexNormals();
    const defaultMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    return new THREE.Mesh(geometry, material || defaultMaterial);
  }
  // Create wireframe from geometry
  static createWireframe(
    geometry: THREE.BufferGeometry,
    color = 0x00d4ff,
  ): THREE.LineSegments {
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color });
    return new THREE.LineSegments(wireframe, material);
  }
}
