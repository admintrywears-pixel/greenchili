import * as THREE from 'three';
import type { PageWorld } from './worldTypes';

// CONTACT US PAGE CONCEPT: Emerald Signal Horizon & Expanding Resonance Ripples
// Smooth radial wave plane emitting concentric golden-lime signal pulses + hovering communication nodes.
export function buildContactWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Concentric Resonance Ripple Shader Floor
  const waveUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
  };
  const discGeom = new THREE.PlaneGeometry(34, 28, 90, 72);
  discGeom.rotateX(-Math.PI / 2.2);

  const discMat = new THREE.ShaderMaterial({
    uniforms: waveUniforms,
    wireframe: true,
    transparent: true,
    vertexShader: `
      uniform float uTime;
      uniform float uProgress;
      varying float vDist;
      varying float vRipple;
      void main() {
        vec3 p = position;
        float d = length(p.xz);
        float ripple = sin(d * 1.4 - uTime * 2.2 - uProgress * 6.0) * exp(-d * 0.08) * 0.75;
        p.y += ripple;
        vDist = d;
        vRipple = ripple;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      varying float vDist;
      varying float vRipple;
      void main() {
        vec3 emerald = vec3(0.08, 0.35, 0.18);
        vec3 lime = vec3(0.64, 0.9, 0.22);
        vec3 gold = vec3(0.92, 0.7, 0.06);
        float crest = smoothstep(-0.1, 0.55, vRipple);
        vec3 col = mix(emerald, lime, crest);
        col = mix(col, gold, pow(crest, 3.0) * 0.55);
        float alpha = smoothstep(16.0, 2.0, vDist) * (0.28 + crest * 0.45);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
  const rippleMesh = new THREE.Mesh(discGeom, discMat);
  rippleMesh.position.set(0, -1.9, -4.5);
  group.add(rippleMesh);
  disposables.push(discGeom, discMat);

  // 2. Central Vertical Communication Beacon & Orbiting Signal Satellites
  const coreGeom = new THREE.IcosahedronGeometry(0.55, 1);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xa3e635,
    emissive: 0x365314,
    emissiveIntensity: 0.65,
    roughness: 0.18,
    metalness: 0.35,
    clearcoat: 1.0,
    wireframe: true,
  });
  const coreMesh = new THREE.Mesh(coreGeom, coreMat);
  coreMesh.position.set(0, 0.45, -4.5);
  group.add(coreMesh);
  disposables.push(coreGeom, coreMat);

  const ringGeom = new THREE.TorusGeometry(2.2, 0.025, 12, 80);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    metalness: 0.92,
    roughness: 0.2,
  });
  const halo1 = new THREE.Mesh(ringGeom, ringMat);
  const halo2 = new THREE.Mesh(ringGeom, ringMat);
  halo1.position.set(0, 0.45, -4.5);
  halo2.position.set(0, 0.45, -4.5);
  group.add(halo1, halo2);
  disposables.push(ringGeom, ringMat);

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      waveUniforms.uTime.value = elapsed * motionMult;
      waveUniforms.uProgress.value = progress;

      coreMesh.rotation.y = elapsed * 0.45 * motionMult + progress * 2.5;
      coreMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.25;

      halo1.rotation.set(Math.PI / 3 + progress, elapsed * 0.3 * motionMult, 0.3);
      halo2.rotation.set(-Math.PI / 3, -elapsed * 0.25 * motionMult + progress, -0.4);

      camera.position.set(
        mouseX * 0.5 * motionMult,
        1.15 - mouseY * 0.28 * motionMult - progress * 0.35,
        6.2 - Math.sin(progress * Math.PI) * 1.1
      );
      camera.lookAt(0, -0.35, -4.5);
    },
  };
}
