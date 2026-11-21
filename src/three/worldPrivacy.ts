import * as THREE from 'three';
import type { PageWorld } from './worldTypes';

// PRIVACY POLICY PAGE CONCEPT: Botanical Crystal Sanctuary Vault
// Serene floating translucent emerald crystal prisms & architectural brass geometric lattice frames
// turning calmly in deep quiet space as the user reads through privacy commitments.
export function buildPrivacyWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Deep Quiet Botanical Sanctuary Gradient
  const bgGeom = new THREE.PlaneGeometry(34, 22);
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
        float d = distance(vUv, vec2(0.5, 0.5));
        vec3 inner = vec3(0.03, 0.13, 0.08);
        vec3 outer = vec3(0.01, 0.045, 0.025);
        gl_FragColor = vec4(mix(inner, outer, smoothstep(0.1, 0.8, d)), 1.0);
      }
    `,
  });
  const bgMesh = new THREE.Mesh(bgGeom, bgMat);
  bgMesh.position.set(0, 0, -10);
  group.add(bgMesh);
  disposables.push(bgGeom, bgMat);

  // 2. Interlocking Rotated Brass Sanctuary Lattice Diamonds
  const frameGeom = new THREE.TorusGeometry(2.9, 0.022, 8, 4);
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    metalness: 0.9,
    roughness: 0.24,
  });
  const latticeA = new THREE.Mesh(frameGeom, brassMat);
  const latticeB = new THREE.Mesh(frameGeom, brassMat);
  const latticeC = new THREE.Mesh(frameGeom, brassMat);
  latticeA.position.set(0, 0, -4.5);
  latticeB.position.set(0, 0, -5.2);
  latticeC.position.set(0, 0, -5.9);
  group.add(latticeA, latticeB, latticeC);
  disposables.push(frameGeom, brassMat);

  // 3. Calm Translucent Emerald Glass Prisms
  const prismGeom = new THREE.OctahedronGeometry(0.45, 0);
  const prismMat = new THREE.MeshPhysicalMaterial({
    color: 0x34d399,
    emissive: 0x064e3b,
    emissiveIntensity: 0.35,
    roughness: 0.12,
    metalness: 0.1,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.72,
  });
  disposables.push(prismGeom, prismMat);

  const prisms: Array<{ mesh: THREE.Mesh; x: number; y: number; z: number; phase: number }> = [];
  for (let i = 0; i < 12; i++) {
    const mesh = new THREE.Mesh(prismGeom, prismMat);
    const angle = (i / 12) * Math.PI * 2;
    const r = 3.2 + (i % 3) * 0.9;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * (r * 0.62);
    const z = -4.8 + ((i % 4) - 1.5) * 0.7;
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(0.55 + (i % 3) * 0.25);
    group.add(mesh);
    prisms.push({ mesh, x, y, z, phase: i * 0.8 });
  }

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      latticeA.rotation.z = Math.PI / 4 + elapsed * 0.08 * motionMult + progress * 0.9;
      latticeB.rotation.z = -elapsed * 0.06 * motionMult - progress * 0.7;
      latticeC.rotation.z = Math.PI / 8 + elapsed * 0.05 * motionMult + progress * 0.5;

      prisms.forEach((p) => {
        const t = elapsed * 0.35 * motionMult + p.phase;
        p.mesh.position.y = p.y + Math.sin(t) * 0.28;
        p.mesh.rotation.set(t * 0.6, t * 0.8 + progress * 1.4, t * 0.3);
      });

      camera.position.set(mouseX * 0.3 * motionMult, -mouseY * 0.2 * motionMult, 6.2 - progress * 0.7);
      camera.lookAt(0, 0, -4.8);
    },
  };
}
