import * as THREE from 'three';
import { createSoftGlowTexture } from './proceduralTextures';
import type { PageWorld } from './worldTypes';

const _dummy = new THREE.Object3D();

// HEALTH BENEFITS PAGE CONCEPT: Bio-Botanical Chlorophyll & Vitamin C Helix Sanctuary
// Deep translucent cellular emerald sky + scrolling double-helix vitality spiral (lime & brass rungs)
// + 64 floating crystalline vitamin C polyhedra & bio-luminescent mist
export function buildHealthWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const glowTex = createSoftGlowTexture();
  disposables.push(glowTex);

  // 1. Living Cellular Emerald Backdrop Shader
  const bioUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
  };
  const skyGeom = new THREE.SphereGeometry(24, 32, 24);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: bioUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      varying vec3 vPos;

      void main() {
        float wave1 = sin(vPos.y * 5.0 - uTime * 0.4 + uProgress * 7.0);
        float wave2 = cos(vPos.x * 4.0 + vPos.z * 3.0 + uTime * 0.3);
        float pulse = smoothstep(0.1, 0.95, (wave1 * wave2) * 0.5 + 0.5);

        vec3 deepBio = vec3(0.015, 0.06, 0.038);
        vec3 leafMid = vec3(0.05, 0.21, 0.105);
        vec3 vitaminC = vec3(0.55, 0.85, 0.16);
        vec3 amberGlow = vec3(0.84, 0.70, 0.22);

        vec3 col = mix(deepBio, leafMid, smoothstep(-0.6, 0.7, vPos.y));
        col += vitaminC * pulse * 0.22;
        col += amberGlow * pow(pulse, 4.0) * 0.16;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyDome = new THREE.Mesh(skyGeom, skyMat);
  group.add(skyDome);
  disposables.push(skyGeom, skyMat);

  // 2. Central 3D Double-Helix Botanical Vitality Sculpture (28-rung emerald & brass DNA-like spiral)
  const helixGroup = new THREE.Group();
  helixGroup.position.set(0, 0, -2.6);
  group.add(helixGroup);

  const limeNodeMat = new THREE.MeshPhysicalMaterial({
    color: 0x84cc16,
    emissive: 0x365314,
    emissiveIntensity: 0.45,
    roughness: 0.16,
    metalness: 0.2,
    clearcoat: 1.0,
  });
  const goldNodeMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    emissive: 0x713f12,
    emissiveIntensity: 0.3,
    roughness: 0.22,
    metalness: 0.88,
  });
  const rungMat = new THREE.MeshStandardMaterial({
    color: 0x34d399,
    transparent: true,
    opacity: 0.45,
    roughness: 0.35,
    metalness: 0.4,
  });

  const nodeGeom = new THREE.SphereGeometry(0.15, 16, 16);
  const rungGeom = new THREE.CylinderGeometry(0.02, 0.02, 2.3, 8);
  disposables.push(nodeGeom, rungGeom, limeNodeMat, goldNodeMat, rungMat);

  const rungCount = 26;
  for (let i = 0; i < rungCount; i++) {
    const t = (i / (rungCount - 1)) * Math.PI * 3.6;
    const y = (i - (rungCount - 1) / 2) * 0.38;
    const r = 1.15;

    const a = new THREE.Mesh(nodeGeom, limeNodeMat);
    a.position.set(Math.cos(t) * r, y, Math.sin(t) * r);

    const b = new THREE.Mesh(nodeGeom, goldNodeMat);
    b.position.set(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r);

    const rung = new THREE.Mesh(rungGeom, rungMat);
    rung.position.set(0, y, 0);
    rung.rotation.z = Math.PI / 2;
    rung.rotation.y = -t;

    helixGroup.add(a, b, rung);
  }

  // 3. Outer Protective Brass Aura Rings
  const ringGeom = new THREE.TorusGeometry(4.3, 0.032, 14, 110);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    metalness: 0.9,
    roughness: 0.22,
    transparent: true,
    opacity: 0.65,
  });
  const ringA = new THREE.Mesh(ringGeom, ringMat);
  const ringB = new THREE.Mesh(ringGeom, ringMat);
  ringA.position.set(0, 0, -2.6);
  ringB.position.set(0, 0, -2.6);
  group.add(ringA, ringB);
  disposables.push(ringGeom, ringMat);

  // 4. Floating Antioxidant Vitamin Micro-Crystals (InstancedMesh)
  const crystalGeom = new THREE.IcosahedronGeometry(0.11, 0);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xbef264,
    emissive: 0x166534,
    emissiveIntensity: 0.42,
    roughness: 0.14,
    metalness: 0.2,
    clearcoat: 1.0,
  });
  const crystalCount = 64;
  const crystalMesh = new THREE.InstancedMesh(crystalGeom, crystalMat, crystalCount);
  crystalMesh.frustumCulled = false;

  const seeds = Array.from({ length: crystalCount }, (_, i) => ({
    angle: (i / crystalCount) * Math.PI * 2,
    radius: 2.6 + (i % 5) * 0.72,
    yBase: ((i % 10) - 4.5) * 0.75,
    speed: 0.18 + (i % 4) * 0.07,
    scale: 0.6 + (i % 3) * 0.35,
  }));
  group.add(crystalMesh);
  disposables.push(crystalGeom, crystalMat);

  // 5. Soft Bio-Luminescent Particles
  const sparkCount = 90;
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i++) {
    sparkPos[i * 3] = (Math.random() - 0.5) * 11;
    sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
    sparkPos[i * 3 + 2] = -4.5 + Math.random() * 4.5;
  }
  const sparkGeom = new THREE.BufferGeometry();
  sparkGeom.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    map: glowTex,
    color: 0xa3e635,
    size: 0.14,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sparks = new THREE.Points(sparkGeom, sparkMat);
  group.add(sparks);
  disposables.push(sparkGeom, sparkMat);

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      bioUniforms.uTime.value = elapsed * motionMult;
      bioUniforms.uProgress.value = progress;

      helixGroup.rotation.y = progress * Math.PI * 3.8 + elapsed * 0.35 * motionMult;
      helixGroup.rotation.z = Math.sin(progress * Math.PI * 2.0) * 0.22;
      helixGroup.position.y = Math.sin(progress * Math.PI * 2.0) * 0.45;

      ringA.rotation.set(0.65 + progress * 2.1, elapsed * 0.18 * motionMult, 0.3);
      ringB.rotation.set(-0.75 - progress * 1.8, -elapsed * 0.24 * motionMult, -0.4);

      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        const a = s.angle + elapsed * s.speed * motionMult + progress * 3.2;
        _dummy.position.set(
          Math.cos(a) * s.radius,
          s.yBase + Math.sin(elapsed * 0.7 + i) * 0.25,
          -2.6 + Math.sin(a) * s.radius * 0.6
        );
        _dummy.rotation.set(elapsed * 0.6 + i, elapsed * 0.8 + progress * 3.0, i);
        _dummy.scale.setScalar(s.scale);
        _dummy.updateMatrix();
        crystalMesh.setMatrixAt(i, _dummy.matrix);
      }
      crystalMesh.instanceMatrix.needsUpdate = true;

      sparks.rotation.y = elapsed * 0.04 * motionMult + progress * 0.6;

      camera.position.set(
        mouseX * 0.38 * motionMult + Math.sin(progress * Math.PI * 2.0) * 0.3,
        -mouseY * 0.24 * motionMult + 0.1,
        6.25 - progress * 1.05
      );
      camera.lookAt(0, 0, -2.6);
    },
  };
}
