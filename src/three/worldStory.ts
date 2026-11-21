import * as THREE from 'three';
import type { PageWorld } from './worldTypes';

// OUR STORY PAGE CONCEPT: Living Mirpurkhas Botanical Ocean & Floating 3D Sculpted Green Chillies
// Zero background photos! Pure procedural 3D art:
// 1. Undulating double-layer emerald spice wave terrain + luminous botanical contour lines
// 2. 14 multi-part 3D sculpted glossy Green Chilli Pods (LatheGeometry curved pod + TubeGeometry stem)
// 3. Diagonal golden-lime volumetric sunbeam shafts cutting across the dark canopy
export function buildStoryWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Deep Forest Botanical Horizon Gradient Backdrop
  const bgGeom = new THREE.PlaneGeometry(34, 20);
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
        vec3 deepCanopy = vec3(0.015, 0.06, 0.032);
        vec3 sunMist = vec3(0.07, 0.24, 0.11);
        vec3 goldRim = vec3(0.24, 0.34, 0.08);
        float glow = smoothstep(0.0, 0.72, vUv.y);
        float horizon = exp(-pow((vUv.y - 0.56) * 3.5, 2.0));
        vec3 col = mix(deepCanopy, sunMist, glow) + goldRim * horizon * 0.55;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const bgPlane = new THREE.Mesh(bgGeom, bgMat);
  bgPlane.position.set(0, 0, -9);
  group.add(bgPlane);
  disposables.push(bgGeom, bgMat);

  // 2. Undulating Botanical Emerald Wave Ocean (onBeforeCompile PBR extension)
  const waveUniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
  };
  const waveGeom = new THREE.PlaneGeometry(28, 18, 96, 56);
  waveGeom.rotateX(-Math.PI / 2.35);

  const waveMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f5132,
    emissive: 0x062e18,
    emissiveIntensity: 0.45,
    roughness: 0.24,
    metalness: 0.35,
    clearcoat: 0.85,
    clearcoatRoughness: 0.18,
    wireframe: false,
  });

  waveMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = waveUniforms.uTime;
    shader.uniforms.uScroll = waveUniforms.uScroll;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;
        uniform float uScroll;
        varying float vCrest;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float phase = uTime * 0.9 + uScroll * 4.5;
        float h = sin(transformed.x * 0.42 + phase) * cos(transformed.z * 0.36 - phase * 0.7) * 0.85;
        h += sin((transformed.x + transformed.z) * 0.75 - phase * 1.1) * 0.35;
        transformed.y += h;
        vCrest = h;`
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying float vCrest;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float crestMix = smoothstep(-0.2, 1.0, vCrest);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.78, 0.12), crestMix * 0.52);`
      );
  };

  const waveMesh = new THREE.Mesh(waveGeom, waveMat);
  waveMesh.position.set(0, -2.35, -3.5);
  group.add(waveMesh);
  disposables.push(waveGeom, waveMat);

  // Luminous upper silk contour wireframe overlay
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x84cc16,
    wireframe: true,
    transparent: true,
    opacity: 0.16,
  });
  wireMat.onBeforeCompile = waveMat.onBeforeCompile;
  const wireMesh = new THREE.Mesh(waveGeom, wireMat);
  wireMesh.position.set(0, -2.31, -3.5);
  group.add(wireMesh);
  disposables.push(wireMat);

  // 3. Sculpted Multi-Part 3D Green Chilli Pods (LatheGeometry + curved TubeGeometry Stem)
  const podProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.02, 0.12),
    new THREE.Vector2(0.055, 0.32),
    new THREE.Vector2(0.095, 0.56),
    new THREE.Vector2(0.115, 0.76),
    new THREE.Vector2(0.095, 0.88),
    new THREE.Vector2(0.05, 0.92),
    new THREE.Vector2(0.0, 0.92),
  ];
  const podGeom = new THREE.LatheGeometry(podProfile, 18);
  // Give the chilli pod an organic slight banana curve along Z
  const podPos = podGeom.attributes.position;
  for (let i = 0; i < podPos.count; i++) {
    const y = podPos.getY(i);
    podPos.setZ(i, podPos.getZ(i) + Math.pow(1.0 - y, 2) * 0.14);
  }
  podGeom.computeVertexNormals();

  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.9, 0),
    new THREE.Vector3(0.02, 1.05, -0.02),
    new THREE.Vector3(0.08, 1.18, -0.05),
  ]);
  const stemGeom = new THREE.TubeGeometry(stemCurve, 12, 0.018, 8, false);
  const calyxGeom = new THREE.ConeGeometry(0.075, 0.09, 8);

  const podMat = new THREE.MeshPhysicalMaterial({
    color: 0x65a30d,
    emissive: 0x1a2e05,
    emissiveIntensity: 0.28,
    roughness: 0.18,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x365314,
    roughness: 0.65,
    metalness: 0.05,
  });

  disposables.push(podGeom, stemGeom, calyxGeom, podMat, stemMat);

  const chilliPods: Array<{
    mesh: THREE.Group;
    baseX: number;
    baseY: number;
    baseZ: number;
    speed: number;
    phase: number;
  }> = [];

  for (let i = 0; i < 14; i++) {
    const podGroup = new THREE.Group();
    const body = new THREE.Mesh(podGeom, podMat);
    const stem = new THREE.Mesh(stemGeom, stemMat);
    const calyx = new THREE.Mesh(calyxGeom, stemMat);
    calyx.position.set(0, 0.92, 0);
    calyx.rotation.x = Math.PI;
    podGroup.add(body, stem, calyx);

    const scale = 0.65 + (i % 4) * 0.24;
    podGroup.scale.setScalar(scale);

    const baseX = ((i % 7) - 3) * 1.9 + Math.sin(i * 1.7) * 0.6;
    const baseY = ((i % 3) - 1) * 1.3 + 0.5;
    const baseZ = -4.2 + (i % 5) * 1.15;
    podGroup.position.set(baseX, baseY, baseZ);
    group.add(podGroup);

    chilliPods.push({
      mesh: podGroup,
      baseX,
      baseY,
      baseZ,
      speed: 0.4 + (i % 3) * 0.2,
      phase: i * 1.1,
    });
  }

  // 4. Volumetric Diagonal Canopy Sunbeam Shafts
  const rayGeom = new THREE.PlaneGeometry(2.6, 12);
  const rayMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
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
        float beam = sin(vUv.x * 3.14159);
        float fadeY = smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.15, vUv.y);
        vec3 sun = vec3(0.64, 0.9, 0.24);
        gl_FragColor = vec4(sun, pow(beam, 2.2) * fadeY * 0.14);
      }
    `,
  });
  disposables.push(rayGeom, rayMat);

  [-3.2, 0.4, 3.8].forEach((xPos, idx) => {
    const ray = new THREE.Mesh(rayGeom, rayMat);
    ray.position.set(xPos, 1.4, -4.8 - idx * 0.4);
    ray.rotation.z = -0.35;
    group.add(ray);
  });

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      waveUniforms.uTime.value = elapsed * motionMult;
      waveUniforms.uScroll.value = progress;

      chilliPods.forEach((p) => {
        const t = elapsed * p.speed * motionMult + p.phase;
        p.mesh.position.y = p.baseY + Math.sin(t) * 0.35 + (progress - 0.5) * 0.8;
        p.mesh.position.x = p.baseX + Math.cos(t * 0.7) * 0.25;
        p.mesh.rotation.set(
          Math.sin(t * 0.8) * 0.5 + progress * 1.6,
          t * 0.9,
          Math.cos(t * 0.6) * 0.4 + 0.35
        );
      });

      camera.position.set(
        mouseX * 0.55 * motionMult,
        0.55 - mouseY * 0.25 * motionMult - progress * 0.45,
        6.0 - Math.sin(progress * Math.PI) * 0.7
      );
      camera.lookAt(0, -0.5, -3.5);
    },
  };
}
