import * as THREE from 'three';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { createSoftGlowTexture } from './proceduralTextures';
import type { PageWorld } from './worldTypes';

const _emberColor = new THREE.Color();
const _emberGold = new THREE.Color(0xfde047);
const _emberLime = new THREE.Color(0xa3e635);
const _emberMint = new THREE.Color(0x6ee7b7);

const _smokeTint = new THREE.Color();
const _smokeWarm = new THREE.Color(0xfde68a);
const _smokeEmerald = new THREE.Color(0xbef264);
const _smokeMint = new THREE.Color(0x6ee7b7);

const _dummy = new THREE.Object3D();

function createRealisticLeafTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(size / 2, size * 0.9);

  const grad = ctx.createLinearGradient(0, 0, 0, -size * 0.8);
  grad.addColorStop(0, '#14532D');
  grad.addColorStop(0.45, '#166534');
  grad.addColorStop(0.85, '#4D7C0F');
  grad.addColorStop(1, '#84CC16');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(64, -36, 78, -110, 0, -size * 0.78);
  ctx.bezierCurveTo(-78, -110, -64, -36, 0, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(190, 242, 100, 0.48)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(0, -size * 0.72);
  ctx.stroke();

  ctx.lineWidth = 1.4;
  for (let i = 1; i <= 5; i++) {
    const y = -i * 28;
    const span = (6 - i) * 9;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(span * 0.6, y - 10, span, y - 22);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(-span * 0.6, y - 10, -span, y - 22);
    ctx.stroke();
  }

  ctx.restore();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createPlaceholderTexture(hex: string): THREE.DataTexture {
  const c = new THREE.Color(hex);
  const data = new Uint8Array([
    Math.round(c.r * 255),
    Math.round(c.g * 255),
    Math.round(c.b * 255),
    255,
  ]);
  const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function buildHomeWorld(maxAnisotropy: number): PageWorld {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const glowTex = createSoftGlowTexture();
  const leafTex = createRealisticLeafTexture(maxAnisotropy);
  const p1 = createPlaceholderTexture('#0B1E13');
  const p2 = createPlaceholderTexture('#0E2A19');
  const p3 = createPlaceholderTexture('#091910');
  const p4 = createPlaceholderTexture('#0D2417');
  disposables.push(glowTex, leafTex, p1, p2, p3, p4);

  const backdropUniforms = {
    uTex1: { value: p1 as THREE.Texture },
    uTex2: { value: p2 as THREE.Texture },
    uTex3: { value: p3 as THREE.Texture },
    uTex4: { value: p4 as THREE.Texture },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uParallax: { value: new THREE.Vector2(0, 0) },
  };

  const loader = new THREE.TextureLoader();
  const loadTex = (url: string, key: 'uTex1' | 'uTex2' | 'uTex3' | 'uTex4') => {
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      backdropUniforms[key].value = tex;
      disposables.push(tex);
    });
  };
  loadTex(RESTAURANT_IMAGES.bbq, 'uTex1');
  loadTex(RESTAURANT_IMAGES.stage2, 'uTex2');
  loadTex(RESTAURANT_IMAGES.stage3, 'uTex3');
  loadTex(RESTAURANT_IMAGES.stage4, 'uTex4');

  const backdropGeom = new THREE.PlaneGeometry(25, 14.5, 28, 18);
  const posAttr = backdropGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    posAttr.setZ(i, x * x * 0.015 + y * y * 0.012);
  }
  backdropGeom.computeVertexNormals();

  const backdropMat = new THREE.ShaderMaterial({
    uniforms: backdropUniforms,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTex1;
      uniform sampler2D uTex2;
      uniform sampler2D uTex3;
      uniform sampler2D uTex4;
      uniform float uProgress;
      uniform float uTime;
      uniform vec2 uParallax;
      varying vec2 vUv;

      vec2 coverUv(vec2 uv, float zoom, vec2 pan) {
        vec2 centered = (uv - 0.5) / zoom + 0.5 + pan;
        return clamp(centered, 0.002, 0.998);
      }

      void main() {
        float heatMask = smoothstep(0.95, 0.05, vUv.y);
        float shimmerX = sin(vUv.y * 28.0 - uTime * 2.6 - uProgress * 18.0) * 0.0028 * heatMask;
        float shimmerY = cos(vUv.x * 20.0 + uTime * 2.0 + uProgress * 14.0) * 0.0018 * heatMask;

        // Bold scroll zoom + horizontal camera drift so every mouse wheel turn moves the scene clearly
        float zoom = 1.08 + abs(sin(uProgress * 9.4247)) * 0.14;
        vec2 scrollPan = vec2(sin(uProgress * 12.566) * 0.032, cos(uProgress * 9.42) * 0.022);
        vec2 pan = uParallax * 0.026 + scrollPan + vec2(shimmerX, shimmerY);
        vec2 uv = coverUv(vUv, zoom, pan);

        // High-responsiveness 2.5x cyclic wave across the 4 culinary stages across full home scroll
        float cycle = mod(uProgress * 2.35, 1.0) * 4.0;
        vec3 va = texture2D(uTex1, uv).rgb;
        vec3 vb = texture2D(uTex2, uv).rgb;
        vec3 vc = texture2D(uTex3, uv).rgb;
        vec3 vd = texture2D(uTex4, uv).rgb;

        vec3 col = va;
        if (cycle < 1.0) {
          float k = smoothstep(0.05, 0.95, cycle);
          col = mix(va, vb, k);
          col *= mix(vec3(0.88, 1.02, 0.86), vec3(0.84, 1.08, 0.84), k); // Green Chili platter -> Emerald chillies
        } else if (cycle < 2.0) {
          float k = smoothstep(0.05, 0.95, cycle - 1.0);
          col = mix(vb, vc, k);
          col *= mix(vec3(0.84, 1.08, 0.84), vec3(0.94, 1.0, 0.88), k); // Emerald -> Charcoal smoke
        } else if (cycle < 3.0) {
          float k = smoothstep(0.05, 0.95, cycle - 2.0);
          col = mix(vc, vd, k);
          col *= mix(vec3(0.94, 1.0, 0.88), vec3(0.96, 1.04, 0.84), k); // Charcoal -> Citrus lime
        } else {
          float k = smoothstep(0.05, 0.95, cycle - 3.0);
          col = mix(vd, va, k);
          col *= mix(vec3(0.96, 1.04, 0.84), vec3(0.88, 1.02, 0.86), k); // Citrus lime -> Green Chili platter
        }

        float dist = length((vUv - 0.5) * vec2(1.1, 1.0));
        float vignette = smoothstep(0.95, 0.22, dist);
        // Subtle editorial left-side emerald dimming so English & Urdu hero text stays sharp over food imagery
        float leftScrim = mix(0.48, 1.0, smoothstep(0.08, 0.62, vUv.x));
        vec3 forestShadow = vec3(0.018, 0.068, 0.04);
        col = mix(forestShadow, col * 0.72 * leftScrim, vignette * 0.86 + 0.14);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  const backdropMesh = new THREE.Mesh(backdropGeom, backdropMat);
  backdropMesh.position.set(0, 0, -5.4);
  group.add(backdropMesh);
  disposables.push(backdropGeom, backdropMat);

  // Scroll-Driven 3D Brass & Lime Hearth Halo Rings (gives immediate geometric 3D motion per scroll notch)
  const haloMatBrass = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    metalness: 0.88,
    roughness: 0.24,
    transparent: true,
    opacity: 0.34,
  });
  const haloMatLime = new THREE.MeshStandardMaterial({
    color: 0x84cc16,
    emissive: 0x3f6212,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.2,
  });
  const outerHaloGeom = new THREE.TorusGeometry(4.2, 0.028, 12, 100);
  const innerHaloGeom = new THREE.TorusGeometry(3.15, 0.024, 10, 88);
  const outerHalo = new THREE.Mesh(outerHaloGeom, haloMatBrass);
  const innerHalo = new THREE.Mesh(innerHaloGeom, haloMatLime);
  outerHalo.position.set(1.55, 0, -2.8);
  innerHalo.position.set(1.55, 0, -2.8);
  group.add(outerHalo, innerHalo);
  disposables.push(outerHaloGeom, innerHaloGeom, haloMatBrass, haloMatLime);

  // Volumetric aromatic fBM smoke plane driven by both time AND scroll turbulence
  const smokeUniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uTint: { value: new THREE.Color(0xcff7c2) },
    uOpacity: { value: 0.28 },
  };
  const smokeGeom = new THREE.PlaneGeometry(17, 11);
  const smokeMat = new THREE.ShaderMaterial({
    uniforms: smokeUniforms,
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
      uniform float uTime;
      uniform float uScroll;
      uniform vec3 uTint;
      uniform float uOpacity;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.04;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 p = vUv * vec2(3.2, 2.2);
        p.y -= uTime * 0.2 + uScroll * 6.5;
        p.x += sin(vUv.y * 4.0 + uTime * 0.4 + uScroll * 8.0) * 0.34;
        float n1 = fbm(p);
        float n2 = fbm(p * 1.4 - vec2(uTime * 0.09, uTime * 0.24 + uScroll * 4.0));
        float wisp = smoothstep(0.4, 0.86, n1 * 0.6 + n2 * 0.45);
        float edgeMask = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x)
                       * smoothstep(0.0, 0.28, vUv.y) * smoothstep(1.0, 0.68, vUv.y);
        gl_FragColor = vec4(uTint, wisp * edgeMask * uOpacity);
      }
    `,
  });
  const smokeMesh = new THREE.Mesh(smokeGeom, smokeMat);
  smokeMesh.position.set(0, -0.3, -2.0);
  group.add(smokeMesh);
  disposables.push(smokeGeom, smokeMat);

  // Herb Leaves — high travel & 3D spin sensitivity on scroll
  const leafGeom = new THREE.PlaneGeometry(0.44, 0.44);
  const leafMat = new THREE.MeshStandardMaterial({
    map: leafTex,
    alphaTest: 0.3,
    transparent: true,
    roughness: 0.42,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  const leafCount = 28;
  const leafMesh = new THREE.InstancedMesh(leafGeom, leafMat, leafCount);
  leafMesh.frustumCulled = false;

  const leafTransforms: Array<{
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    scale: number;
    speed: number;
  }> = [];
  for (let i = 0; i < leafCount; i++) {
    leafTransforms.push({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 7.5,
      z: -2.4 + Math.random() * 4.4,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      scale: 0.55 + Math.random() * 0.85,
      speed: 0.22 + Math.random() * 0.36,
    });
  }
  group.add(leafMesh);
  disposables.push(leafGeom, leafMat);

  // Rising Hearth Embers stoked by scroll progress
  const emberCount = 135;
  const emberPos = new Float32Array(emberCount * 3);
  const emberData = new Float32Array(emberCount * 3);
  for (let i = 0; i < emberCount; i++) {
    emberPos[i * 3] = (Math.random() - 0.5) * 12;
    emberPos[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
    emberPos[i * 3 + 2] = -2.8 + Math.random() * 5.2;
    emberData[i * 3] = emberPos[i * 3 + 1];
    emberData[i * 3 + 1] = Math.random() * Math.PI * 2;
    emberData[i * 3 + 2] = 0.28 + Math.random() * 0.65;
  }
  const emberGeom = new THREE.BufferGeometry();
  emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const emberMat = new THREE.PointsMaterial({
    map: glowTex,
    color: 0xfde047,
    size: 0.16,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const emberPoints = new THREE.Points(emberGeom, emberMat);
  group.add(emberPoints);
  disposables.push(emberGeom, emberMat);

  let prevProgress = 0;

  return {
    group,
    disposables,
    update: ({ progress, elapsed, dt, mouseX, mouseY, motionMult, camera }) => {
      const scrollVelocity = Math.abs(progress - prevProgress) * 35;
      prevProgress = progress;

      backdropUniforms.uProgress.value = progress;
      backdropUniforms.uTime.value = elapsed * motionMult;
      backdropUniforms.uParallax.value.set(mouseX * 0.7 * motionMult, -mouseY * 0.45 * motionMult);

      // Bold responsive camera zoom, bank, and sweep tied directly to every scroll step
      camera.position.set(
        mouseX * 0.32 * motionMult + Math.sin(progress * Math.PI * 5.0) * 0.68,
        -mouseY * 0.22 * motionMult + Math.cos(progress * Math.PI * 4.0) * 0.28,
        6.1 - Math.abs(Math.sin(progress * Math.PI * 3.0)) * 1.15
      );
      camera.lookAt(Math.sin(progress * Math.PI * 4.0) * 0.35, 0, -2.5);

      // Rotate 3D Brass & Lime Halo Rings with every scroll tick
      outerHalo.rotation.set(
        0.55 + progress * Math.PI * 3.2,
        progress * Math.PI * 2.4 + elapsed * 0.14 * motionMult,
        progress * 2.5
      );
      innerHalo.rotation.set(
        -0.65 - progress * Math.PI * 2.8,
        -progress * Math.PI * 3.6 - elapsed * 0.2 * motionMult,
        0.4
      );

      // Dynamic smoke & ember color cycling across the 4 stages
      const cycle = (progress * 2.35) % 1;
      if (cycle < 0.33) {
        const t = cycle / 0.33;
        _emberColor.copy(_emberGold).lerp(_emberLime, t);
        _smokeTint.copy(_smokeWarm).lerp(_smokeEmerald, t);
      } else if (cycle < 0.66) {
        const t = (cycle - 0.33) / 0.33;
        _emberColor.copy(_emberLime).lerp(_emberMint, t);
        _smokeTint.copy(_smokeEmerald).lerp(_smokeMint, t);
      } else {
        const t = (cycle - 0.66) / 0.34;
        _emberColor.copy(_emberMint).lerp(_emberGold, t);
        _smokeTint.copy(_smokeMint).lerp(_smokeWarm, t);
      }
      smokeUniforms.uTime.value = elapsed * motionMult;
      smokeUniforms.uScroll.value = progress;
      smokeUniforms.uTint.value.copy(_smokeTint);
      smokeUniforms.uOpacity.value = Math.min(0.45, 0.24 + scrollVelocity * 0.25 + Math.sin(progress * Math.PI * 4) * 0.07);
      emberMat.color.copy(_emberColor);

      // Leaves rush vertically and tumble strongly as you scroll
      for (let i = 0; i < leafTransforms.length; i++) {
        const lf = leafTransforms[i];
        const yCycle =
          ((lf.y + elapsed * lf.speed * 0.4 * motionMult + progress * 18.0 + 3.75) % 7.5) - 3.75;
        _dummy.position.set(
          lf.x + Math.sin(elapsed * 0.5 + i + progress * 6.0) * 0.42,
          yCycle,
          lf.z
        );
        _dummy.rotation.set(
          lf.rx + elapsed * 0.35 * motionMult + progress * 6.5,
          lf.ry + elapsed * 0.48 * motionMult + progress * 8.0,
          lf.rz + Math.sin(elapsed * 0.3 + i) * 0.35
        );
        _dummy.scale.setScalar(lf.scale);
        _dummy.updateMatrix();
        leafMesh.setMatrixAt(i, _dummy.matrix);
      }
      leafMesh.instanceMatrix.needsUpdate = true;

      // Embers rise + surge faster whenever scrolling
      const emberAttr = emberPoints.geometry.attributes.position as THREE.BufferAttribute;
      const arr = emberAttr.array as Float32Array;
      for (let i = 0; i < emberAttr.count; i++) {
        const surge = 1 + scrollVelocity * 2.5;
        let y = arr[i * 3 + 1] + dt * emberData[i * 3 + 2] * surge * motionMult;
        if (y > 3.8) y = -3.8;
        arr[i * 3 + 1] = y;
        arr[i * 3] += Math.sin(elapsed * 1.2 + emberData[i * 3 + 1] + progress * 8.0) * 0.16 * dt * motionMult;
      }
      emberAttr.needsUpdate = true;
    },
  };
}
