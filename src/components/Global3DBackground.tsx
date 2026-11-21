import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { buildHomeWorld } from '../three/worldHome';
import { buildMenuWorld } from '../three/worldMenu';
import { buildHealthWorld } from '../three/worldHealth';
import { buildOrdersWorld } from '../three/worldOrders';
import { buildStoryWorld } from '../three/worldStory';
import { buildBranchesWorld } from '../three/worldBranches';
import { buildReserveWorld } from '../three/worldReserve';
import { buildContactWorld } from '../three/worldContact';
import { buildPrivacyWorld } from '../three/worldPrivacy';
import type { PageWorld } from '../three/worldTypes';
import type { PageId } from '../types/navigation';

export interface Global3DBackgroundProps {
  activePage: PageId;
  pageScrollProgress: number;
  reducedMotion: boolean;
}

export default function Global3DBackground({
  activePage,
  pageScrollProgress,
  reducedMotion,
}: Global3DBackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const stateRef = useRef({
    activePage,
    prevPage: activePage,
    transitionFade: 0,
    targetProgress: pageScrollProgress,
    smoothProgress: pageScrollProgress,
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
    reducedMotion,
  });

  useEffect(() => {
    if (stateRef.current.activePage !== activePage) {
      stateRef.current.prevPage = stateRef.current.activePage;
      stateRef.current.activePage = activePage;
      stateRef.current.transitionFade = 1.0;
    }
    stateRef.current.targetProgress = pageScrollProgress;
    stateRef.current.reducedMotion = reducedMotion;
  }, [activePage, pageScrollProgress, reducedMotion]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas');
        const gl = probe.getContext('webgl2') || probe.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const onLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    const onRestored = () => setWebglFailed(false);
    renderer.domElement.addEventListener('webglcontextlost', onLost);
    renderer.domElement.addEventListener('webglcontextrestored', onRestored);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04120a);

    // Mandatory studio environment reflection for PBR metals, brass, and glossy botanicals
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 60);
    camera.position.set(0, 0, 6.2);

    const hemiLight = new THREE.HemisphereLight(0xd9f99d, 0x05140c, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfef08a, 1.45);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x84cc16, 0.75);
    rimLight.position.set(-5, -2, 3);
    scene.add(rimLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // Build 8 completely separate, page-exclusive 3D worlds
    const worlds: Record<PageId, PageWorld> = {
      home: buildHomeWorld(maxAniso),
      menu: buildMenuWorld(maxAniso),
      health: buildHealthWorld(),
      orders: buildOrdersWorld(),
      story: buildStoryWorld(),
      branches: buildBranchesWorld(),
      reserve: buildReserveWorld(),
      contact: buildContactWorld(),
      privacy: buildPrivacyWorld(),
    };

    (Object.keys(worlds) as PageId[]).forEach((key) => {
      worlds[key].group.visible = key === stateRef.current.activePage;
      scene.add(worlds[key].group);
    });

    // Subtle emerald fade veil for clean page-world switches
    const veilGeom = new THREE.PlaneGeometry(3, 3);
    const veilMat = new THREE.MeshBasicMaterial({
      color: 0x04120a,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    const veilMesh = new THREE.Mesh(veilGeom, veilMat);
    veilMesh.renderOrder = 999;
    camera.add(veilMesh);
    veilMesh.position.set(0, 0, -0.5);
    scene.add(camera);

    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(Math.floor(width / 2), Math.floor(height / 2)),
        0.34,
        0.55,
        0.74
      );
      composer.addPass(bloomPass);
      renderer.compile(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      if (bloomPass) bloomPass.resolution.set(Math.floor(w / 2), Math.floor(h / 2));
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const dt = Math.min(delta, 0.08);
      const s = stateRef.current;
      const motionMult = s.reducedMotion ? 0.15 : 1.0;

      s.smoothProgress = THREE.MathUtils.damp(s.smoothProgress, s.targetProgress, 16.0, dt);
      s.smoothMouseX = THREE.MathUtils.damp(s.smoothMouseX, s.mouseX, 4.5, dt);
      s.smoothMouseY = THREE.MathUtils.damp(s.smoothMouseY, s.mouseY, 4.5, dt);
      s.transitionFade = THREE.MathUtils.damp(s.transitionFade, 0, 6.0, dt);

      veilMat.opacity = s.transitionFade * 0.68;
      veilMesh.visible = veilMat.opacity > 0.01;

      const progress = THREE.MathUtils.clamp(s.smoothProgress, 0, 1);

      (Object.keys(worlds) as PageId[]).forEach((key) => {
        const isCurrent = key === s.activePage;
        worlds[key].group.visible = isCurrent;
        if (isCurrent) {
          worlds[key].update({
            progress,
            elapsed,
            dt,
            mouseX: s.smoothMouseX,
            mouseY: s.smoothMouseY,
            motionMult,
            camera,
          });
        }
      });

      if (isSoftwareGl || !composer) {
        renderer.render(scene, camera);
      } else {
        composer.render();
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onRestored);
      (Object.keys(worlds) as PageId[]).forEach((key) => {
        worlds[key].disposables.forEach((d) => d.dispose());
      });
      veilGeom.dispose();
      veilMat.dispose();
      envTarget.dispose();
      composer?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#07170F] via-[#0C2618] to-[#06130C]"
        aria-hidden="true"
      />
    );
  }

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
