import * as THREE from 'three';
import type { PageWorld } from './worldTypes';

// BRANCHES PAGE CONCEPT: Pakistan Architectural Topographic Grid & 3 City Beacon Towers
// Zero food photos, zero botanical leaves! Pure architectural spatial terrain:
// 1. Sweeping neon-lime wireframe + dark emerald elevation terrain (Indus plains -> Margalla ridges)
// 2. 3 Multi-part Architectural Beacon Towers (Karachi, Lahore, Islamabad) with glowing sky beams & halos
// 3. Rotating brass geometric compass rings overhead; scroll flies the camera smoothly across all 3 cities
export function buildBranchesWorld(): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Night Sky Horizon Gradient
  const skyGeom = new THREE.PlaneGeometry(42, 24);
  const skyMat = new THREE.ShaderMaterial({
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
        vec3 zenith = vec3(0.012, 0.04, 0.028);
        vec3 horizon = vec3(0.04, 0.16, 0.09);
        vec3 limeAura = vec3(0.22, 0.44, 0.08);
        float h = smoothstep(0.0, 0.6, vUv.y);
        float glow = exp(-pow((vUv.y - 0.35) * 4.0, 2.0));
        vec3 col = mix(horizon, zenith, h) + limeAura * glow * 0.4;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyMesh = new THREE.Mesh(skyGeom, skyMat);
  skyMesh.position.set(0, 2, -13);
  group.add(skyMesh);
  disposables.push(skyGeom, skyMat);

  // 2. Topographic Elevation Grid Terrain
  const terrainGeom = new THREE.PlaneGeometry(32, 28, 72, 64);
  terrainGeom.rotateX(-Math.PI / 2);
  const posAttr = terrainGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    const elevation =
      Math.sin(x * 0.35) * Math.cos(z * 0.32) * 0.75 +
      Math.sin(x * 0.8 + z * 0.6) * 0.25 +
      Math.max(0, -z - 4) * 0.14; // rises northward toward Margalla hills
    posAttr.setY(i, elevation - 2.3);
  }
  terrainGeom.computeVertexNormals();

  const terrainBaseMat = new THREE.MeshStandardMaterial({
    color: 0x051a0f,
    roughness: 0.75,
    metalness: 0.15,
  });
  const terrainWireMat = new THREE.MeshBasicMaterial({
    color: 0x84cc16,
    wireframe: true,
    transparent: true,
    opacity: 0.26,
  });
  const terrainBase = new THREE.Mesh(terrainGeom, terrainBaseMat);
  const terrainWire = new THREE.Mesh(terrainGeom, terrainWireMat);
  terrainWire.position.y = 0.015;
  group.add(terrainBase, terrainWire);
  disposables.push(terrainGeom, terrainBaseMat, terrainWireMat);

  // 3. 3 Multi-Part Architectural City Landmark Beacons (Karachi, Lahore, Islamabad)
  const plinthGeom = new THREE.CylinderGeometry(0.55, 0.75, 0.35, 8);
  const shaftGeom = new THREE.CylinderGeometry(0.14, 0.28, 2.2, 8);
  const crownGeom = new THREE.OctahedronGeometry(0.32, 0);
  const haloGeom = new THREE.TorusGeometry(0.62, 0.025, 10, 48);
  const beamGeom = new THREE.CylinderGeometry(0.06, 0.22, 9.0, 16, 1, true);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x0d2b1c,
    roughness: 0.45,
    metalness: 0.3,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    roughness: 0.22,
    metalness: 0.9,
  });
  const limeBeaconMat = new THREE.MeshStandardMaterial({
    color: 0xa3e635,
    emissive: 0x84cc16,
    emissiveIntensity: 0.8,
    roughness: 0.2,
  });
  const beamMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
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
        float fade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.1, vUv.y);
        gl_FragColor = vec4(0.64, 0.95, 0.22, fade * 0.26);
      }
    `,
  });

  disposables.push(
    plinthGeom,
    shaftGeom,
    crownGeom,
    haloGeom,
    beamGeom,
    stoneMat,
    brassMat,
    limeBeaconMat,
    beamMat
  );

  const beaconLocations = [
    { x: -4.2, z: -1.5, y: -2.1 }, // Karachi Flagship
    { x: 0.4, z: -4.5, y: -1.8 }, // Lahore Kitchen
    { x: 4.5, z: -7.5, y: -1.3 }, // Islamabad Margalla Pavilion
  ];
  const halos: THREE.Mesh[] = [];
  const crowns: THREE.Mesh[] = [];

  beaconLocations.forEach((loc) => {
    const tower = new THREE.Group();
    tower.position.set(loc.x, loc.y, loc.z);

    const plinth = new THREE.Mesh(plinthGeom, stoneMat);
    plinth.position.y = 0.175;
    const shaft = new THREE.Mesh(shaftGeom, brassMat);
    shaft.position.y = 1.45;
    const crown = new THREE.Mesh(crownGeom, limeBeaconMat);
    crown.position.y = 2.95;
    const halo = new THREE.Mesh(haloGeom, brassMat);
    halo.position.y = 2.95;
    halo.rotation.x = Math.PI / 2.4;
    const beam = new THREE.Mesh(beamGeom, beamMat);
    beam.position.y = 5.6;

    tower.add(plinth, shaft, crown, halo, beam);
    group.add(tower);
    halos.push(halo);
    crowns.push(crown);
  });

  // 4. Overhead Celestial Compass Ring
  const compassGeom = new THREE.TorusGeometry(6.5, 0.03, 12, 100);
  const compass = new THREE.Mesh(compassGeom, brassMat);
  compass.position.set(0, 3.2, -5.2);
  compass.rotation.x = Math.PI / 2.1;
  group.add(compass);
  disposables.push(compassGeom);

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      halos.forEach((h, i) => {
        h.rotation.z = elapsed * (0.5 + i * 0.15) * motionMult;
        h.rotation.y = Math.sin(elapsed * 0.4 + i) * 0.3;
      });
      crowns.forEach((c, i) => {
        c.rotation.y = elapsed * 0.8 * motionMult + i;
        c.position.y = 2.95 + Math.sin(elapsed * 1.4 + i) * 0.12;
      });
      compass.rotation.z = elapsed * 0.08 * motionMult + progress * 1.2;

      // Swooping flight camera across Karachi -> Lahore -> Islamabad
      const flightX = THREE.MathUtils.lerp(-2.2, 2.4, progress) + mouseX * 0.45 * motionMult;
      const flightY = 1.25 - progress * 0.25 - mouseY * 0.25 * motionMult;
      const flightZ = THREE.MathUtils.lerp(5.8, 1.6, progress);
      camera.position.set(flightX, flightY, flightZ);
      camera.lookAt(THREE.MathUtils.lerp(-1.2, 1.8, progress), -0.4, -5.0);
    },
  };
}
