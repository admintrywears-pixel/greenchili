import type * as THREE from 'three';

export interface PageWorld {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  update: (params: {
    progress: number;
    elapsed: number;
    dt: number;
    mouseX: number;
    mouseY: number;
    motionMult: number;
    camera: THREE.PerspectiveCamera;
  }) => void;
}
