import * as THREE from 'three';

/**
 * Generates high-resolution procedural textures on HTML5 Canvas with proper
 * SRGBColorSpace and anisotropic filtering so zero external asset 404s occur.
 */
export function createHandiClayTextures(maxAnisotropy: number) {
  const width = 1024;
  const height = 512;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d')!;

  // Vertical gradient from smoky charcoal-kissed clay bottom to warm baked terracotta top
  const grad = ctx.createLinearGradient(0, height, 0, 0);
  grad.addColorStop(0.0, '#3C2418');
  grad.addColorStop(0.28, '#6B3F26');
  grad.addColorStop(0.58, '#8E5332');
  grad.addColorStop(0.85, '#9F5F3A');
  grad.addColorStop(1.0, '#854D2E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle lathe wheel throwing grooves
  for (let y = 0; y < height; y += 3) {
    const alpha = 0.03 + Math.sin(y * 0.25) * 0.02;
    ctx.fillStyle = y % 6 === 0 ? `rgba(255, 224, 185, ${alpha})` : `rgba(25, 12, 6, ${alpha})`;
    ctx.fillRect(0, y, width, 1.5);
  }

  // Natural clay mineral speckles
  for (let i = 0; i < 4500; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 0.6 + Math.random() * 1.4;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(218, 175, 130, 0.08)' : 'rgba(38, 20, 12, 0.12)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Artisanal Emerald & Brass botanical collar band near the shoulder (top 18%-28% of UV)
  const bandY = Math.floor(height * 0.22);
  ctx.fillStyle = '#15422B';
  ctx.fillRect(0, bandY, width, 28);

  // Fine golden-lime trim borders
  ctx.fillStyle = '#B8893A';
  ctx.fillRect(0, bandY - 3, width, 3);
  ctx.fillRect(0, bandY + 28, width, 3);

  // Hand-painted lime leaf motifs along the emerald band
  ctx.fillStyle = '#84CC16';
  for (let x = 16; x < width; x += 32) {
    ctx.beginPath();
    ctx.ellipse(x, bandY + 14, 7, 3.2, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 14, bandY + 14, 7, 3.2, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
  }

  const colorTexture = new THREE.CanvasTexture(colorCanvas);
  colorTexture.colorSpace = THREE.SRGBColorSpace;
  colorTexture.wrapS = THREE.RepeatWrapping;
  colorTexture.anisotropy = maxAnisotropy;

  // Roughness map (lower glazed roughness on the emerald band, earthy matte clay below)
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = 512;
  roughCanvas.height = 256;
  const rCtx = roughCanvas.getContext('2d')!;
  rCtx.fillStyle = '#C8C8C8';
  rCtx.fillRect(0, 0, 512, 256);
  rCtx.fillStyle = '#555555';
  rCtx.fillRect(0, Math.floor(256 * 0.21), 512, 18);
  const roughnessTexture = new THREE.CanvasTexture(roughCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;

  return { colorTexture, roughnessTexture };
}

export function createStonePedestalTexture(maxAnisotropy: number) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#112219';
  ctx.fillRect(0, 0, size, size);

  // Subtle dark slate stone veining (strictly green/earthy, zero red)
  for (let i = 0; i < 65; i++) {
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(163, 230, 53, 0.035)' : 'rgba(15, 45, 30, 0.35)';
    ctx.lineWidth = 1 + Math.random() * 2.5;
    ctx.beginPath();
    let x = Math.random() * size;
    let y = Math.random() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 5; s++) {
      x += (Math.random() - 0.5) * 140;
      y += (Math.random() - 0.5) * 140;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.08)';
    ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createSoftGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.35, 'rgba(240, 255, 220, 0.55)');
  grad.addColorStop(0.7, 'rgba(180, 235, 140, 0.14)');
  grad.addColorStop(1.0, 'rgba(180, 235, 140, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
  grad.addColorStop(0.0, 'rgba(2, 10, 6, 0.85)');
  grad.addColorStop(0.55, 'rgba(3, 12, 7, 0.45)');
  grad.addColorStop(1.0, 'rgba(3, 12, 7, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
