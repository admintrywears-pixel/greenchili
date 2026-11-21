import * as THREE from 'three';
import { createSoftGlowTexture } from './proceduralTextures';
import type { PageWorld } from './worldTypes';

// RESERVE PAGE CONCEPT: Candlelit 3D Mughal Mehrab Archway Corridor & Swaying Brass Lanterns
// Zero wireframe grids, zero kitchen smoke, zero outdoor hills!
// 1. 6 Sculpted 3D Pakistani Pointed Mehrab Archway Frames (ExtrudeGeometry) forming a deep corridor
// 2. 10 Multi-Part Pierced Brass Fanoos Lanterns (LatheGeometry + warm amber candle glow core) swaying overhead
// 3. Smooth scroll-driven forward glide straight down the candlelit corridor
export function buildReserveWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const glowTex = createSoftGlowTexture();
  disposables.push(glowTex);

  // 1. Warm Candlelit Deep Emerald Backdrop
  const bgGeom = new THREE.PlaneGeometry(30, 20);
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
        float dist = distance(vUv, vec2(0.5, 0.46));
        vec3 amberCore = vec3(0.18, 0.16, 0.04);
        vec3 deepEmerald = vec3(0.018, 0.058, 0.036);
        vec3 col = mix(amberCore, deepEmerald, smoothstep(0.06, 0.72, dist));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const bgMesh = new THREE.Mesh(bgGeom, bgMat);
  bgMesh.position.set(0, 0, -16);
  group.add(bgMesh);
  disposables.push(bgGeom, bgMat);

  // 2. Marble Reflective Sanctuary Floor
  const floorGeom = new THREE.PlaneGeometry(16, 26);
  floorGeom.rotateX(-Math.PI / 2);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x05140c,
    roughness: 0.16,
    metalness: 0.55,
  });
  const floorMesh = new THREE.Mesh(floorGeom, floorMat);
  floorMesh.position.set(0, -2.55, -5.5);
  group.add(floorMesh);
  disposables.push(floorGeom, floorMat);

  // 3. Sculpted Pointed Mehrab Archway Frame (ExtrudeGeometry with Arch Cutout)
  const outerShape = new THREE.Shape();
  outerShape.moveTo(-3.6, -2.6);
  outerShape.lineTo(3.6, -2.6);
  outerShape.lineTo(3.6, 3.2);
  outerShape.lineTo(-3.6, 3.2);
  outerShape.closePath();

  const archHole = new THREE.Path();
  archHole.moveTo(-2.15, -2.6);
  archHole.lineTo(-2.15, 0.35);
  archHole.quadraticCurveTo(-2.15, 1.65, 0.0, 2.35);
  archHole.quadraticCurveTo(2.15, 1.65, 2.15, 0.35);
  archHole.lineTo(2.15, -2.6);
  archHole.closePath();
  outerShape.holes.push(archHole);

  const archGeom = new THREE.ExtrudeGeometry(outerShape, {
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 2,
  });
  const archMat = new THREE.MeshStandardMaterial({
    color: 0x092416,
    roughness: 0.55,
    metalness: 0.25,
  });

  // Thin Brass Inner Arch Trim (TubeGeometry)
  const trimCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.1, -2.5, 0.4),
    new THREE.Vector3(-2.1, 0.35, 0.4),
    new THREE.Vector3(-1.35, 1.48, 0.4),
    new THREE.Vector3(0.0, 2.28, 0.4),
    new THREE.Vector3(1.35, 1.48, 0.4),
    new THREE.Vector3(2.1, 0.35, 0.4),
    new THREE.Vector3(2.1, -2.5, 0.4),
  ]);
  const trimGeom = new THREE.TubeGeometry(trimCurve, 36, 0.032, 8, false);
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    roughness: 0.22,
    metalness: 0.92,
  });
  disposables.push(archGeom, archMat, trimGeom, brassMat);

  for (let i = 0; i < 6; i++) {
    const z = 1.5 - i * 2.8;
    const archGroup = new THREE.Group();
    archGroup.position.set(0, 0, z);
    archGroup.add(new THREE.Mesh(archGeom, archMat));
    archGroup.add(new THREE.Mesh(trimGeom, brassMat));
    group.add(archGroup);
  }

  // 4. Multi-Part Pierced Brass Fanoos Lanterns (LatheGeometry + Glowing Core)
  const lanternProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.14, 0.06),
    new THREE.Vector2(0.22, 0.25),
    new THREE.Vector2(0.18, 0.48),
    new THREE.Vector2(0.07, 0.62),
    new THREE.Vector2(0.0, 0.66),
  ];
  const lanternBodyGeom = new THREE.LatheGeometry(lanternProfile, 8);
  const chainGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.4, 6);
  const flameGeom = new THREE.SphereGeometry(0.11, 10, 10);

  const lanternShellMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    roughness: 0.28,
    metalness: 0.85,
    wireframe: true,
  });
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xfde047,
  });
  const spriteMat = new THREE.SpriteMaterial({
    map: glowTex,
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  disposables.push(lanternBodyGeom, chainGeom, flameGeom, lanternShellMat, flameMat, spriteMat);

  const lanterns: Array<{ pivot: THREE.Group; phase: number; speed: number }> = [];
  for (let i = 0; i < 10; i++) {
    const pivot = new THREE.Group();
    const side = i % 2 === 0 ? -1.45 : 1.45;
    const z = 0.6 - i * 1.45;
    const y = 2.0 + (i % 3) * 0.2;
    pivot.position.set(side, y, z);

    const chain = new THREE.Mesh(chainGeom, brassMat);
    chain.position.y = -0.7;
    const shell = new THREE.Mesh(lanternBodyGeom, lanternShellMat);
    shell.position.y = -1.65;
    const flame = new THREE.Mesh(flameGeom, flameMat);
    flame.position.y = -1.38;
    const glow = new THREE.Sprite(spriteMat);
    glow.position.y = -1.38;
    glow.scale.set(1.15, 1.15, 1.0);

    pivot.add(chain, shell, flame, glow);
    group.add(pivot);
    lanterns.push({ pivot, phase: i * 0.9, speed: 0.85 + (i % 3) * 0.15 });
  }

  // 5. Warm Candlelight Gold Bokeh Sparks
  const sparkCount = 70;
  const sparkPos = new Float32Array(sparkCount * 3);
  const sparkSpeed = new Float32Array(sparkCount);
  for (let i = 0; i < sparkCount; i++) {
    sparkPos[i * 3] = (Math.random() - 0.5) * 6.0;
    sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
    sparkPos[i * 3 + 2] = 2.0 - Math.random() * 15.0;
    sparkSpeed[i] = 0.15 + Math.random() * 0.3;
  }
  const sparkGeom = new THREE.BufferGeometry();
  sparkGeom.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    map: glowTex,
    color: 0xfef08a,
    size: 0.24,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sparkPoints = new THREE.Points(sparkGeom, sparkMat);
  group.add(sparkPoints);
  disposables.push(sparkGeom, sparkMat);

  return {
    group,
    disposables,
    update: ({ progress, elapsed, dt, mouseX, mouseY, motionMult, camera }) => {
      lanterns.forEach((l) => {
        l.pivot.rotation.z = Math.sin(elapsed * l.speed * motionMult + l.phase) * 0.055;
        l.pivot.rotation.x = Math.cos(elapsed * 0.7 * motionMult + l.phase) * 0.03;
      });

      const sparkAttr = sparkPoints.geometry.attributes.position as THREE.BufferAttribute;
      const arr = sparkAttr.array as Float32Array;
      for (let i = 0; i < sparkAttr.count; i++) {
        let y = arr[i * 3 + 1] + dt * sparkSpeed[i] * motionMult;
        if (y > 2.4) y = -2.4;
        arr[i * 3 + 1] = y;
      }
      sparkAttr.needsUpdate = true;

      // Forward walkthrough camera gliding smoothly through the candlelit Mehrab corridor
      const camZ = THREE.MathUtils.lerp(4.8, -4.4, progress);
      camera.position.set(
        mouseX * 0.35 * motionMult,
        -0.15 - mouseY * 0.22 * motionMult,
        camZ
      );
      camera.lookAt(mouseX * 0.15, -0.1, camZ - 7.0);
    },
  };
}
