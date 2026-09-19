import * as THREE from 'three';

// Cache generated textures so we don't redraw canvases unnecessarily
const textureCache = new Map<string, THREE.Texture>();

export function getCelestialTexture(id: string): THREE.Texture {
  if (textureCache.has(id)) {
    return textureCache.get(id)!;
  }

  let canvas: HTMLCanvasElement;
  switch (id) {
    case 'sun':
      canvas = createSunCanvas();
      break;
    case 'mercury':
      canvas = createMercuryCanvas();
      break;
    case 'venus':
      canvas = createVenusCanvas();
      break;
    case 'earth':
      canvas = createEarthCanvas();
      break;
    case 'earth-clouds':
      canvas = createEarthCloudsCanvas();
      break;
    case 'moon':
      canvas = createMoonCanvas();
      break;
    case 'mars':
      canvas = createMarsCanvas();
      break;
    case 'jupiter':
      canvas = createJupiterCanvas();
      break;
    case 'saturn':
      canvas = createSaturnCanvas();
      break;
    case 'saturn-ring':
      canvas = createSaturnRingsCanvas();
      break;
    case 'uranus':
      canvas = createUranusCanvas();
      break;
    case 'uranus-ring':
      canvas = createUranusRingsCanvas();
      break;
    case 'neptune':
      canvas = createNeptuneCanvas();
      break;
    case 'pluto':
      canvas = createPlutoCanvas();
      break;
    case 'ceres':
      canvas = createCeresCanvas();
      break;
    case 'proxima-b':
      canvas = createProximaBCanvas();
      break;
    case 'trappist-1e':
      canvas = createTrappist1eCanvas();
      break;
    case 'kepler-452b':
      canvas = createKepler452bCanvas();
      break;
    default:
      canvas = createGenericCanvas('#888888');
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(id, texture);
  return texture;
}

// 1. SUN
function createSunCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#ff4500');
  gradient.addColorStop(0.5, '#ffa500');
  gradient.addColorStop(1, '#ff3300');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Solar granules and flares
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 24 + 4;
    const alpha = Math.random() * 0.4 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > 0.4 ? `rgba(255, 240, 150, ${alpha})` : `rgba(255, 80, 0, ${alpha * 0.8})`;
    ctx.fill();
  }

  // Sunspots
  for (let i = 0; i < 16; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
    const r = Math.random() * 12 + 6;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(120, 20, 0, 0.7)';
    ctx.fill();
    // Umbra
    ctx.beginPath();
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40, 5, 0, 0.9)';
    ctx.fill();
  }

  return canvas;
}

// 2. MERCURY
function createMercuryCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#85827e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Surface texture noise
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 10 + 1;
    const shade = Math.floor(Math.random() * 50 + 100);
    ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
    ctx.fillRect(x, y, size, size);
  }

  // Craters
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 18 + 3;

    // Rim
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(210, 210, 210, 0.6)';
    ctx.lineWidth = Math.max(1, r * 0.2);
    ctx.stroke();

    // Floor
    ctx.beginPath();
    ctx.arc(x, y, r * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(60, 60, 60, 0.5)';
    ctx.fill();
  }

  return canvas;
}

// 3. VENUS
function createVenusCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#c99a5b');
  gradient.addColorStop(0.3, '#deb887');
  gradient.addColorStop(0.5, '#e9d298');
  gradient.addColorStop(0.7, '#deb887');
  gradient.addColorStop(1, '#be8f52');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Swirling sulfuric acid bands
  ctx.lineWidth = 14;
  for (let i = 0; i < 40; i++) {
    const y = (i / 40) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 40) {
      const wave = Math.sin((x / canvas.width) * Math.PI * 6 + i * 0.5) * 12;
      ctx.lineTo(x, y + wave);
    }
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(240, 220, 160, 0.35)' : 'rgba(160, 110, 60, 0.25)';
    ctx.stroke();
  }

  return canvas;
}

// 4. EARTH
function createEarthCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0c356a');
  oceanGrad.addColorStop(0.5, '#176b87');
  oceanGrad.addColorStop(1, '#0c356a');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Continents simulation
  ctx.fillStyle = '#2d6a4f';

  function drawContinent(cx: number, cy: number, rx: number, ry: number, points = 12) {
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const variation = 0.7 + Math.sin(angle * 3) * 0.2 + Math.cos(angle * 2) * 0.15;
      const x = cx + Math.cos(angle) * rx * variation;
      const y = cy + Math.sin(angle) * ry * variation;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Eurasia & Africa
  drawContinent(550, 210, 180, 110);
  ctx.fillStyle = '#b5835a'; // Sahara / Middle East
  drawContinent(510, 240, 60, 45);
  ctx.fillStyle = '#2d6a4f';
  drawContinent(540, 320, 80, 90); // Africa

  // Americas
  drawContinent(240, 190, 100, 75); // North America
  drawContinent(300, 330, 70, 95); // South America

  // Australia
  drawContinent(780, 360, 50, 40);

  // Antarctica (Ice)
  ctx.fillStyle = '#eaf4f4';
  ctx.beginPath();
  ctx.rect(0, 470, canvas.width, 42);
  ctx.fill();

  // Arctic (Ice)
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, 25);
  ctx.fill();

  return canvas;
}

// 4b. EARTH CLOUDS
function createEarthCloudsCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Semi-transparent cloud wisps
  for (let i = 0; i < 280; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const rx = Math.random() * 60 + 20;
    const ry = Math.random() * 20 + 8;
    const alpha = Math.random() * 0.35 + 0.15;

    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random() * 0.5 - 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }

  return canvas;
}

// MOON
function createMoonCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Lunar Maria (dark plains)
  ctx.fillStyle = 'rgba(70, 70, 70, 0.4)';
  ctx.beginPath();
  ctx.arc(180, 100, 60, 0, Math.PI * 2);
  ctx.arc(280, 140, 70, 0, Math.PI * 2);
  ctx.arc(140, 160, 45, 0, Math.PI * 2);
  ctx.fill();

  // Craters
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 12 + 2;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(230, 230, 230, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 50, 50, 0.4)';
    ctx.fill();
  }

  return canvas;
}

// 5. MARS
function createMarsCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Rust orange background
  ctx.fillStyle = '#c1440e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dark maria patches (Acidalia, Syrtis Major)
  ctx.fillStyle = 'rgba(80, 28, 10, 0.45)';
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
    const rx = Math.random() * 100 + 40;
    const ry = Math.random() * 40 + 20;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random() * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Valles Marineris canyon scratch
  ctx.strokeStyle = 'rgba(50, 15, 5, 0.7)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300, 270);
  ctx.lineTo(480, 285);
  ctx.stroke();

  // North & South Polar Ice Caps
  ctx.fillStyle = '#f8f9fa';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 8, 140, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height - 8, 110, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

// 6. JUPITER
function createJupiterCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Distinct gas bands
  const bands = [
    '#c88b48', '#d6a36c', '#ead3b1', '#b97a47', '#a85f2f',
    '#d9a05b', '#ebd9be', '#9e5628', '#c98a4b', '#eedac0',
    '#aa6332', '#dca971', '#c78044', '#b66e39', '#e8d2b3'
  ];

  const bandHeight = canvas.height / bands.length;
  for (let i = 0; i < bands.length; i++) {
    ctx.fillStyle = bands[i];
    ctx.fillRect(0, i * bandHeight, canvas.width, bandHeight + 1);
  }

  // Atmospheric turbulence & waves
  for (let b = 0; b < bands.length; b++) {
    const y = b * bandHeight;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 20) {
      const wave = Math.sin((x / canvas.width) * Math.PI * 12 + b * 2) * 5;
      ctx.lineTo(x, y + wave);
    }
    ctx.strokeStyle = b % 2 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(80, 40, 20, 0.25)';
    ctx.stroke();
  }

  // Great Red Spot (Katta Qizil Dog')
  const grsX = 640;
  const grsY = 320;
  const grsRx = 55;
  const grsRy = 32;

  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRx, grsRy, 0, 0, Math.PI * 2);
  const grsGrad = ctx.createRadialGradient(grsX, grsY, 5, grsX, grsY, grsRx);
  grsGrad.addColorStop(0, '#c1121f');
  grsGrad.addColorStop(0.7, '#e63946');
  grsGrad.addColorStop(1, '#a84224');
  ctx.fillStyle = grsGrad;
  ctx.fill();

  // Swirl inside Great Red Spot
  ctx.strokeStyle = 'rgba(255, 200, 180, 0.5)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRx * 0.5, grsRy * 0.4, 0.2, 0, Math.PI * 2);
  ctx.stroke();

  return canvas;
}

// 7. SATURN
function createSaturnCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#c2a679');
  gradient.addColorStop(0.25, '#dfc499');
  gradient.addColorStop(0.5, '#eddcb5');
  gradient.addColorStop(0.75, '#deb87c');
  gradient.addColorStop(1, '#b5935f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft subtle bands
  for (let i = 0; i < 30; i++) {
    const y = (i / 30) * canvas.height;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(150, 100, 40, 0.1)';
    ctx.fillRect(0, y, canvas.width, canvas.height / 30);
  }

  // Hexagon at north pole simulation
  ctx.fillStyle = 'rgba(120, 110, 80, 0.3)';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 10, 80, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

// 7b. SATURN RINGS
function createSaturnRingsCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32; // 1D radial ring texture mapped onto a ring geometry
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Inner transparent
  gradient.addColorStop(0.12, 'rgba(180, 150, 110, 0.4)'); // C ring
  gradient.addColorStop(0.28, 'rgba(220, 195, 150, 0.85)'); // B ring (dense)
  gradient.addColorStop(0.58, 'rgba(230, 205, 160, 0.95)');
  gradient.addColorStop(0.62, 'rgba(0, 0, 0, 0.05)'); // Cassini Division (gap)
  gradient.addColorStop(0.68, 'rgba(200, 175, 130, 0.7)'); // A ring
  gradient.addColorStop(0.92, 'rgba(180, 155, 120, 0.5)');
  gradient.addColorStop(0.94, 'rgba(0, 0, 0, 0)'); // Encke gap
  gradient.addColorStop(0.96, 'rgba(160, 140, 110, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Outer transparent

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}

// 8. URANUS
function createUranusCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#52b2cf');
  gradient.addColorStop(0.3, '#74c5de');
  gradient.addColorStop(0.5, '#8be3ee');
  gradient.addColorStop(0.7, '#74c5de');
  gradient.addColorStop(1, '#4fa0be');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft atmospheric haze
  for (let i = 0; i < 15; i++) {
    const y = (i / 15) * canvas.height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fillRect(0, y, canvas.width, canvas.height / 30);
  }

  return canvas;
}

// 8b. URANUS RINGS
function createUranusRingsCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 16;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.3, 'rgba(180, 220, 240, 0.3)');
  grad.addColorStop(0.5, 'rgba(200, 240, 255, 0.5)');
  grad.addColorStop(0.8, 'rgba(180, 220, 240, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

// 9. NEPTUNE
function createNeptuneCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep royal azure
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#103783');
  gradient.addColorStop(0.5, '#1e5fcb');
  gradient.addColorStop(1, '#0c2763');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Great Dark Spot (Katta qorong'i dog')
  ctx.beginPath();
  ctx.ellipse(360, 220, 48, 26, 0.1, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(5, 18, 55, 0.7)';
  ctx.fill();

  // White methane cloud streaks ('Scooter')
  for (let i = 0; i < 24; i++) {
    const x = Math.random() * canvas.width;
    const y = 140 + Math.random() * 240;
    const len = Math.random() * 90 + 40;
    ctx.strokeStyle = 'rgba(230, 245, 255, 0.5)';
    ctx.lineWidth = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y + Math.sin(x) * 3);
    ctx.stroke();
  }

  return canvas;
}

// 10. PLUTO
function createPlutoCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#b79d85';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dark tholin patches (Cthulhu Macula)
  ctx.fillStyle = 'rgba(80, 40, 20, 0.6)';
  ctx.beginPath();
  ctx.ellipse(140, 140, 80, 50, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tombaugh Regio ("Heart" shape)
  ctx.fillStyle = '#f5ebe0';
  ctx.beginPath();
  const hx = 320;
  const hy = 110;
  ctx.arc(hx - 20, hy, 28, 0, Math.PI * 2);
  ctx.arc(hx + 20, hy, 28, 0, Math.PI * 2);
  ctx.moveTo(hx - 44, hy + 12);
  ctx.lineTo(hx, hy + 50);
  ctx.lineTo(hx + 44, hy + 12);
  ctx.fill();

  return canvas;
}

// 11. CERES
function createCeresCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#6c757d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Craters and salt spots (Occator crater)
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 8 + 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.fill();
  }

  // Bright sodium carbonate spots (Cerealia Facula)
  ctx.beginPath();
  ctx.arc(240, 120, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  return canvas;
}

// 12. PROXIMA B
function createProximaBCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#b05d42';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dark desert rocks & canyons
  ctx.fillStyle = 'rgba(60, 20, 15, 0.4)';
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, 40, 20, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

// 13. TRAPPIST-1e
function createTrappist1eCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean & lush islands
  ctx.fillStyle = '#1b4332';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#2d6a4f';
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 35 + 10, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

// 14. KEPLER-452b
function createKepler452bCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1d3557';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#457b9d';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, 60, 30, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

// Fallback
function createGenericCanvas(color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}
