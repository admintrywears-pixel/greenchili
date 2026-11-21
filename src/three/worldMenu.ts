import * as THREE from 'three';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import type { PageWorld } from './worldTypes';

const _dummy = new THREE.Object3D();

// MENU PAGE CONCEPT: Monumental Cosmic Emerald Culinary Observatory
// Expanded deep aurora nebula sky dome + triple counter-rotating brass & lime astrolabe rings
// + 6 large curved 3D culinary dish mural arcs with brass edge trim orbiting on a grand scroll helix
// + 84 faceted floating emerald & gold spice crystals sweeping wide across the viewport
export function buildMenuWorld(maxAnisotropy: number): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Deep Emerald & Lime Aurora Nebula Sky Backdrop Shader
  const auroraUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
  };
  const skyGeom = new THREE.SphereGeometry(24, 32, 24);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: auroraUniforms,
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
        float y = vPos.y;
        float band = sin(vPos.x * 4.2 + uTime * 0.35 + uProgress * 6.0)
                   * cos(vPos.z * 3.2 - uTime * 0.25 + uProgress * 4.0);
        float ribbon = smoothstep(0.12, 0.85, band * 0.5 + 0.5) * exp(-abs(y + 0.04) * 2.8);

        vec3 abyss = vec3(0.015, 0.055, 0.035);
        vec3 canopy = vec3(0.045, 0.17, 0.095);
        vec3 limeGlow = vec3(0.46, 0.80, 0.14);
        vec3 goldAccent = vec3(0.78, 0.64, 0.16);

        vec3 col = mix(abyss, canopy, smoothstep(-0.65, 0.65, y));
        col += limeGlow * ribbon * 0.36;
        col += goldAccent * pow(ribbon, 2.6) * 0.22;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyDome = new THREE.Mesh(skyGeom, skyMat);
  group.add(skyDome);
  disposables.push(skyGeom, skyMat);

  // 2. Monumental Triple Counter-Rotating Brass & Lime Astrolabe Rings
  const ringMatOuter = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    metalness: 0.92,
    roughness: 0.22,
  });
  const ringMatInner = new THREE.MeshStandardMaterial({
    color: 0x84cc16,
    emissive: 0x365314,
    emissiveIntensity: 0.48,
    metalness: 0.78,
    roughness: 0.26,
  });
  const outerRingGeom = new THREE.TorusGeometry(5.6, 0.048, 16, 128);
  const midRingGeom = new THREE.TorusGeometry(4.45, 0.038, 16, 112);
  const innerRingGeom = new THREE.TorusGeometry(3.3, 0.028, 14, 96);

  const outerRing = new THREE.Mesh(outerRingGeom, ringMatOuter);
  const midRing = new THREE.Mesh(midRingGeom, ringMatInner);
  const innerRing = new THREE.Mesh(innerRingGeom, ringMatOuter);
  outerRing.position.set(0, 0, -2.5);
  midRing.position.set(0, 0, -2.5);
  innerRing.position.set(0, 0, -2.5);
  group.add(outerRing, midRing, innerRing);
  disposables.push(outerRingGeom, midRingGeom, innerRingGeom, ringMatOuter, ringMatInner);

  // 3. Large Helical Orbit of 6 Curved Culinary Dish Panels + Top/Bottom Brass Arc Ribs
  const galleryGroup = new THREE.Group();
  galleryGroup.position.set(0, 0, -2.5);
  group.add(galleryGroup);

  const menuPhotos = [
    RESTAURANT_IMAGES.pizza,
    RESTAURANT_IMAGES.fries,
    RESTAURANT_IMAGES.karachiStreet,
    RESTAURANT_IMAGES.handi,
    RESTAURANT_IMAGES.bbq,
    RESTAURANT_IMAGES.fastFood,
  ];

  const loader = new THREE.TextureLoader();
  const panelGeom = new THREE.CylinderGeometry(4.85, 4.85, 2.65, 24, 1, true, -0.36, 0.72);
  const trimArcGeom = new THREE.TorusGeometry(4.85, 0.032, 10, 32, 0.72);
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    metalness: 0.9,
    roughness: 0.22,
  });

  const panels: THREE.Group[] = [];

  menuPhotos.forEach((url, idx) => {
    const holder = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.32,
      metalness: 0.08,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      mat.map = tex;
      mat.needsUpdate = true;
      disposables.push(tex);
    });

    const curvedCard = new THREE.Mesh(panelGeom, mat);
    holder.add(curvedCard);

    // Top & bottom curved brass frame borders so each 3D dish arc has sculptural silhouette
    const topTrim = new THREE.Mesh(trimArcGeom, trimMat);
    topTrim.rotation.x = Math.PI / 2;
    topTrim.rotation.z = -Math.PI / 2 - 0.36;
    topTrim.position.y = 1.325;

    const botTrim = new THREE.Mesh(trimArcGeom, trimMat);
    botTrim.rotation.x = Math.PI / 2;
    botTrim.rotation.z = -Math.PI / 2 - 0.36;
    botTrim.position.y = -1.325;

    holder.add(topTrim, botTrim);

    const angle = (idx / menuPhotos.length) * Math.PI * 2;
    holder.rotation.y = angle;
    holder.position.y = (idx - 2.5) * 0.65;
    galleryGroup.add(holder);
    panels.push(holder);
    disposables.push(mat);
  });
  disposables.push(panelGeom, trimArcGeom, trimMat);

  // 4. Sweeping Faceted Emerald & Lime Spice Crystals (InstancedMesh)
  const crystalGeom = new THREE.OctahedronGeometry(0.16, 0);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xa3e635,
    emissive: 0x166534,
    emissiveIntensity: 0.42,
    roughness: 0.14,
    metalness: 0.25,
    clearcoat: 1.0,
  });
  const crystalCount = 84;
  const crystalMesh = new THREE.InstancedMesh(crystalGeom, crystalMat, crystalCount);
  crystalMesh.frustumCulled = false;

  const crystalSeeds = Array.from({ length: crystalCount }, (_, i) => ({
    angle: (i / crystalCount) * Math.PI * 2,
    radius: 3.3 + (i % 6) * 0.65,
    yBase: ((i % 11) - 5) * 0.68,
    speed: 0.2 + (i % 4) * 0.08,
    scale: 0.55 + (i % 3) * 0.4,
  }));
  group.add(crystalMesh);
  disposables.push(crystalGeom, crystalMat);

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      auroraUniforms.uTime.value = elapsed * motionMult;
      auroraUniforms.uProgress.value = progress;

      // Scroll drives the grand culinary carousel rotation & vertical helix spiral
      galleryGroup.rotation.y = progress * Math.PI * 3.0 + elapsed * 0.12 * motionMult;
      galleryGroup.rotation.x = Math.sin(progress * Math.PI * 2.0) * 0.2;

      panels.forEach((p, idx) => {
        p.position.y = Math.sin(elapsed * 0.48 + idx + progress * 6.5) * 0.52 + (idx - 2.5) * 0.42;
      });

      outerRing.rotation.x = Math.PI / 2.7 + progress * 1.8;
      outerRing.rotation.z = elapsed * 0.2 * motionMult + progress * 0.9;
      midRing.rotation.y = -elapsed * 0.3 * motionMult + progress * 2.6;
      midRing.rotation.x = -Math.PI / 3.1;
      innerRing.rotation.z = elapsed * 0.38 * motionMult - progress * 2.4;
      innerRing.rotation.x = Math.PI / 3.8;

      for (let i = 0; i < crystalSeeds.length; i++) {
        const c = crystalSeeds[i];
        const a = c.angle + elapsed * c.speed * motionMult + progress * 4.2;
        _dummy.position.set(
          Math.cos(a) * c.radius,
          c.yBase + Math.sin(elapsed * 0.8 + i) * 0.28,
          -2.5 + Math.sin(a) * c.radius * 0.58
        );
        _dummy.rotation.set(elapsed * 0.7 + i, elapsed * 0.9 + progress * 4.0, i);
        _dummy.scale.setScalar(c.scale);
        _dummy.updateMatrix();
        crystalMesh.setMatrixAt(i, _dummy.matrix);
      }
      crystalMesh.instanceMatrix.needsUpdate = true;

      camera.position.set(
        mouseX * 0.48 * motionMult + Math.sin(progress * Math.PI * 2.5) * 0.42,
        -mouseY * 0.28 * motionMult + 0.18,
        6.55 - progress * 1.35
      );
      camera.lookAt(0, 0, -2.5);
    },
  };
}
