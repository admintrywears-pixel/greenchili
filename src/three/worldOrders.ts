import * as THREE from 'three';
import type { PageWorld } from './worldTypes';

const _dummy = new THREE.Object3D();

// ORDERS PAGE CONCEPT: Kitchen Dispatch Conveyor Lattice & Orbital Seals
// Fast, energetic dark-emerald studio with spiraling golden brass conveyor arcs,
// gliding emerald packet blocks, and radiant dispatch horizon lines.
export function buildOrdersWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Deep Forest Gradient Backdrop
  const bgGeom = new THREE.PlaneGeometry(36, 22);
  const bgMat = new THREE.ShaderMaterial({
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        vec3 base = vec3(0.015, 0.055, 0.032);
        vec3 limeGlow = vec3(0.11, 0.28, 0.09);
        float pulse = exp(-pow((vUv.y - 0.45) * 3.0, 2.0));
        vec3 col = mix(base, limeGlow, pulse * 0.75);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const bgMesh = new THREE.Mesh(bgGeom, bgMat);
  bgMesh.position.set(0, 0, -10);
  group.add(bgMesh);
  disposables.push(bgGeom, bgMat);

  // 2. Diagonal Perspective Dispatch Floor Grid
  const floorGeom = new THREE.PlaneGeometry(32, 24, 32, 24);
  floorGeom.rotateX(-Math.PI / 2);
  const floorMat = new THREE.MeshBasicMaterial({
    color: 0x65a30d,
    wireframe: true,
    transparent: true,
    opacity: 0.16,
  });
  const floorMesh = new THREE.Mesh(floorGeom, floorMat);
  floorMesh.position.set(0, -2.6, -4);
  group.add(floorMesh);
  disposables.push(floorGeom, floorMat);

  // 3. Triple Tilted Golden Brass & Lime Conveyor Ribbons
  const ribbonMat1 = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    metalness: 0.9,
    roughness: 0.2,
  });
  const ribbonMat2 = new THREE.MeshStandardMaterial({
    color: 0x84cc16,
    emissive: 0x3f6212,
    emissiveIntensity: 0.45,
    metalness: 0.65,
    roughness: 0.25,
  });

  const torusGeom1 = new THREE.TorusGeometry(4.2, 0.05, 14, 110);
  const torusGeom2 = new THREE.TorusGeometry(3.2, 0.04, 14, 100);
  const torusGeom3 = new THREE.TorusGeometry(5.2, 0.035, 14, 120);

  const ring1 = new THREE.Mesh(torusGeom1, ribbonMat1);
  const ring2 = new THREE.Mesh(torusGeom2, ribbonMat2);
  const ring3 = new THREE.Mesh(torusGeom3, ribbonMat1);
  ring1.position.set(0, 0, -3);
  ring2.position.set(0, 0, -3);
  ring3.position.set(0, 0, -3);
  group.add(ring1, ring2, ring3);
  disposables.push(torusGeom1, torusGeom2, torusGeom3, ribbonMat1, ribbonMat2);

  // 4. Orbiting Faceted Emerald Dispatch Seals (InstancedMesh)
  const sealGeom = new THREE.BoxGeometry(0.28, 0.18, 0.28);
  const sealMat = new THREE.MeshPhysicalMaterial({
    color: 0xa3e635,
    emissive: 0x166534,
    emissiveIntensity: 0.35,
    roughness: 0.18,
    metalness: 0.45,
    clearcoat: 1.0,
  });
  const sealCount = 36;
  const sealMesh = new THREE.InstancedMesh(sealGeom, sealMat, sealCount);
  sealMesh.frustumCulled = false;

  const seeds = Array.from({ length: sealCount }, (_, i) => ({
    angle: (i / sealCount) * Math.PI * 2,
    radius: 3.1 + (i % 3) * 1.0,
    y: ((i % 6) - 2.5) * 0.65,
    speed: 0.35 + (i % 4) * 0.12,
  }));
  group.add(sealMesh);
  disposables.push(sealGeom, sealMat);

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      ring1.rotation.set(0.9 + progress * 1.5, elapsed * 0.28 * motionMult, 0.4);
      ring2.rotation.set(-0.7 - progress * 1.1, -elapsed * 0.36 * motionMult, 0.2);
      ring3.rotation.set(1.2, elapsed * 0.18 * motionMult + progress * 2.0, -0.5);
      floorMesh.position.z = -4 + ((elapsed * 0.6 * motionMult + progress * 3.0) % 1.0);

      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        const a = s.angle + elapsed * s.speed * motionMult + progress * 2.5;
        _dummy.position.set(
          Math.cos(a) * s.radius,
          s.y + Math.sin(a * 2) * 0.3,
          -3.0 + Math.sin(a) * s.radius * 0.45
        );
        _dummy.rotation.set(elapsed + i, a, elapsed * 0.5);
        _dummy.scale.setScalar(1);
        _dummy.updateMatrix();
        sealMesh.setMatrixAt(i, _dummy.matrix);
      }
      sealMesh.instanceMatrix.needsUpdate = true;

      camera.position.set(mouseX * 0.4 * motionMult, -mouseY * 0.25 * motionMult, 6.2 - progress * 0.8);
      camera.lookAt(0, 0, -3);
    },
  };
}
