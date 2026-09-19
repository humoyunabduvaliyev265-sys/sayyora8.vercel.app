import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CelestialBodyData, ScaleMode } from '../types';
import { getCelestialTexture } from '../utils/textureGenerator';
import { spaceAudio } from '../utils/spaceAudio';

interface SolarSystem3DProps {
  celestialBodies: CelestialBodyData[];
  selectedBody: CelestialBodyData | null;
  onSelectBody: (body: CelestialBodyData) => void;
  simulationSpeed: number;
  isPaused: boolean;
  scaleMode: ScaleMode;
  showOrbits: boolean;
  showLabels: boolean;
  zoomLevelDelta: number; // incremented when external zoom button clicked
  onResetViewTrigger: number;
}

interface PlanetRenderItem {
  data: CelestialBodyData;
  orbitGroup: THREE.Group;
  planetMesh: THREE.Mesh;
  cloudsMesh?: THREE.Mesh;
  ringMesh?: THREE.Mesh;
  orbitLine?: THREE.Line;
  labelPosition: THREE.Vector3;
  screenPosition: { x: number; y: number; visible: boolean };
}

export const SolarSystem3D: React.FC<SolarSystem3DProps> = ({
  celestialBodies,
  selectedBody,
  onSelectBody,
  simulationSpeed,
  isPaused,
  scaleMode,
  showOrbits,
  showLabels,
  zoomLevelDelta,
  onResetViewTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Storage for animated objects
  const renderItemsRef = useRef<Map<string, PlanetRenderItem>>(new Map());
  const moonGroupRef = useRef<THREE.Group | null>(null);
  const asteroidBeltRef = useRef<THREE.Points | null>(null);
  const sunCoronaRef = useRef<THREE.Mesh | null>(null);

  // Camera Target & Animation
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const isTransitioningRef = useRef<boolean>(false);
  const transitionStartCamPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const transitionEndCamPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const transitionStartLookAt = useRef<THREE.Vector3>(new THREE.Vector3());
  const transitionEndLookAt = useRef<THREE.Vector3>(new THREE.Vector3());
  const transitionProgress = useRef<number>(1);

  // Manual Orbit controls state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sphericalRef = useRef<THREE.Spherical>(new THREE.Spherical(90, Math.PI / 3, Math.PI / 4));

  // 2D labels state for UI projection
  const [labels, setLabels] = useState<{ id: string; nameUz: string; x: number; y: number; visible: boolean; isSelected: boolean }[]>([]);

  // Calculate distance based on scale mode
  const getBodyDistance = useCallback((body: CelestialBodyData): number => {
    if (body.id === 'sun') return 0;
    if (scaleMode === 'visual') {
      return body.visual.distanceAuVisual;
    } else {
      // Logarithmic / relative distance
      return 10 + Math.log(body.visual.realDistanceScale + 1) * 28;
    }
  }, [scaleMode]);

  // Set up Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 3000);
    camera.position.set(0, 75, 110);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    // Central point light inside Sun
    const sunLight = new THREE.PointLight(0xfff7e6, 3.2, 500, 0.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Subtle ambient cosmic starlight
    const ambientLight = new THREE.AmbientLight(0x334155, 0.5);
    scene.add(ambientLight);

    // 5. Starfield & Cosmic Dust
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#fef08a'),
      new THREE.Color('#bae6fd'),
      new THREE.Color('#fbcfe8')
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 600 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starsGeo, starMaterial);
    scene.add(starField);

    // 6. Asteroid Belt (between Mars and Jupiter)
    const asteroidCount = 1500;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    const asteroidColors = new Float32Array(asteroidCount * 3);

    for (let i = 0; i < asteroidCount; i++) {
      const r = 36 + Math.random() * 6; // distance in visual scale
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 3;

      asteroidPositions[i * 3] = Math.cos(angle) * r;
      asteroidPositions[i * 3 + 1] = yOffset;
      asteroidPositions[i * 3 + 2] = Math.sin(angle) * r;

      const shade = 0.4 + Math.random() * 0.3;
      asteroidColors[i * 3] = shade;
      asteroidColors[i * 3 + 1] = shade * 0.95;
      asteroidColors[i * 3 + 2] = shade * 0.9;
    }

    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));
    asteroidGeo.setAttribute('color', new THREE.BufferAttribute(asteroidColors, 3));

    const asteroidMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
    scene.add(asteroidBelt);
    asteroidBeltRef.current = asteroidBelt;

    // 7. Create Celestial Bodies Meshes & Orbits
    const renderMap = new Map<string, PlanetRenderItem>();

    celestialBodies.forEach((body) => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const distance = getBodyDistance(body);
      const texture = getCelestialTexture(body.id);

      let material: THREE.Material;
      if (body.visual.isEmissive) {
        material = new THREE.MeshBasicMaterial({
          map: texture,
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1,
        });
      }

      const sphereGeo = new THREE.SphereGeometry(body.visual.baseRadius, 48, 48);
      const planetMesh = new THREE.Mesh(sphereGeo, material);
      planetMesh.position.set(distance, 0, 0);
      planetMesh.rotation.z = THREE.MathUtils.degToRad(body.visual.axialTiltDeg);
      planetMesh.userData = { bodyId: body.id };
      orbitGroup.add(planetMesh);

      // Sun Corona / Glow
      if (body.id === 'sun') {
        const coronaGeo = new THREE.SphereGeometry(body.visual.baseRadius * 1.25, 32, 32);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#ff9900'),
          transparent: true,
          opacity: 0.22,
          side: THREE.BackSide,
        });
        const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
        planetMesh.add(coronaMesh);
        sunCoronaRef.current = coronaMesh;
      }

      // Earth Clouds Layer
      let cloudsMesh: THREE.Mesh | undefined;
      if (body.visual.hasClouds) {
        const cloudsTex = getCelestialTexture(body.id === 'earth' ? 'earth-clouds' : 'earth-clouds');
        const cloudsGeo = new THREE.SphereGeometry(body.visual.baseRadius * 1.025, 48, 48);
        const cloudsMat = new THREE.MeshStandardMaterial({
          map: cloudsTex,
          transparent: true,
          opacity: 0.65,
          blending: THREE.NormalBlending,
        });
        cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
        planetMesh.add(cloudsMesh);
      }

      // Earth Moon (Oy)
      if (body.id === 'earth') {
        const moonGroup = new THREE.Group();
        planetMesh.add(moonGroup);
        moonGroupRef.current = moonGroup;

        const moonTex = getCelestialTexture('moon');
        const moonGeo = new THREE.SphereGeometry(0.38, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({
          map: moonTex,
          roughness: 0.9,
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(3.4, 0, 0);
        moonGroup.add(moonMesh);

        // Moon orbit circle
        const moonOrbitGeo = new THREE.BufferGeometry();
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * 3.4, 0, Math.sin(a) * 3.4));
        }
        moonOrbitGeo.setFromPoints(pts);
        const moonOrbitLine = new THREE.Line(
          moonOrbitGeo,
          new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 })
        );
        moonGroup.add(moonOrbitLine);
      }

      // Atmosphere Glow
      if (body.visual.hasAtmosphereGlow && body.visual.atmosphereColor && body.id !== 'sun') {
        const atmoGeo = new THREE.SphereGeometry(body.visual.baseRadius * 1.06, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(body.visual.atmosphereColor),
          transparent: true,
          opacity: 0.16,
          side: THREE.BackSide,
        });
        const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
        planetMesh.add(atmoMesh);
      }

      // Saturn & Uranus Rings
      let ringMesh: THREE.Mesh | undefined;
      if (body.visual.hasRings && body.visual.ringInnerRadius && body.visual.ringOuterRadius) {
        const ringGeo = new THREE.RingGeometry(body.visual.ringInnerRadius, body.visual.ringOuterRadius, 64);
        // Rotate ring to lie in the planet's equatorial plane
        ringGeo.rotateX(Math.PI / 2);

        const ringTex = getCelestialTexture(`${body.id}-ring`);
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
          roughness: 0.6,
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetMesh.add(ringMesh);
      }

      // Orbital Path Ring Line
      let orbitLine: THREE.Line | undefined;
      if (distance > 0) {
        const orbitPoints: THREE.Vector3[] = [];
        const segments = 128;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          orbitPoints.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(body.visual.color),
          transparent: true,
          opacity: 0.28,
        });
        orbitLine = new THREE.Line(orbitGeo, orbitMat);
        scene.add(orbitLine);
      }

      renderMap.set(body.id, {
        data: body,
        orbitGroup,
        planetMesh,
        cloudsMesh,
        ringMesh,
        orbitLine,
        labelPosition: new THREE.Vector3(),
        screenPosition: { x: 0, y: 0, visible: false },
      });
    });

    renderItemsRef.current = renderMap;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Initial Spherical setup
    sphericalRef.current.setFromVector3(camera.position);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [celestialBodies, getBodyDistance]);

  // Update distances when scaleMode changes
  useEffect(() => {
    renderItemsRef.current.forEach((item) => {
      const dist = getBodyDistance(item.data);
      item.planetMesh.position.set(dist, 0, 0);

      // Recreate orbit line
      if (item.orbitLine && dist > 0) {
        const orbitPoints: THREE.Vector3[] = [];
        const segments = 128;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          orbitPoints.push(new THREE.Vector3(Math.cos(angle) * dist, 0, Math.sin(angle) * dist));
        }
        item.orbitLine.geometry.dispose();
        item.orbitLine.geometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      }
    });
  }, [scaleMode, getBodyDistance]);

  // Update Orbits visibility
  useEffect(() => {
    renderItemsRef.current.forEach((item) => {
      if (item.orbitLine) {
        item.orbitLine.visible = showOrbits;
      }
    });
  }, [showOrbits]);

  // Handle Planet Selection & Smooth Fly-To Camera Animation
  useEffect(() => {
    if (!selectedBody || !cameraRef.current) return;

    const item = renderItemsRef.current.get(selectedBody.id);
    if (!item) return;

    // Play whoosh sound
    spaceAudio.playWarpSound();

    // Calculate world position of targeted planet
    const targetWorldPos = new THREE.Vector3();
    item.planetMesh.getWorldPosition(targetWorldPos);

    // Target look-at will follow this planet
    cameraTargetRef.current.copy(targetWorldPos);

    // Position camera at a dramatic, close observation angle relative to target
    const currentCam = cameraRef.current;
    const viewDistance = selectedBody.visual.baseRadius * 3.8 + (selectedBody.visual.hasRings ? 4 : 2);

    // Start transition
    isTransitioningRef.current = true;
    transitionProgress.current = 0;
    transitionStartCamPos.current.copy(currentCam.position);
    transitionStartLookAt.current.copy(currentLookAtRef.current);

    // End positions
    const offsetDir = new THREE.Vector3(1.2, 0.7, 1.4).normalize().multiplyScalar(viewDistance);
    transitionEndCamPos.current.copy(targetWorldPos).add(offsetDir);
    transitionEndLookAt.current.copy(targetWorldPos);
  }, [selectedBody]);

  // Handle Zoom In / Zoom Out Delta from external buttons
  useEffect(() => {
    if (zoomLevelDelta === 0 || !cameraRef.current) return;
    const cam = cameraRef.current;
    const dir = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);
    const len = dir.length();
    const factor = zoomLevelDelta > 0 ? 0.75 : 1.3;
    const newLen = Math.max(selectedBody ? selectedBody.visual.baseRadius * 2.2 : 12, Math.min(len * factor, 400));
    dir.normalize().multiplyScalar(newLen);
    cam.position.copy(currentLookAtRef.current).add(dir);
  }, [zoomLevelDelta, selectedBody]);

  // Reset View to full solar system overview
  useEffect(() => {
    if (onResetViewTrigger === 0 || !cameraRef.current) return;
    isTransitioningRef.current = true;
    transitionProgress.current = 0;
    transitionStartCamPos.current.copy(cameraRef.current.position);
    transitionStartLookAt.current.copy(currentLookAtRef.current);

    transitionEndCamPos.current.set(0, 95, 135);
    transitionEndLookAt.current.set(0, 0, 0);
  }, [onResetViewTrigger]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const effectiveSpeed = isPaused ? 0 : simulationSpeed;

      // 1. Rotate Sun Corona
      if (sunCoronaRef.current) {
        sunCoronaRef.current.rotation.y += 0.002;
      }

      // 2. Rotate Asteroid Belt
      if (asteroidBeltRef.current && !isPaused) {
        asteroidBeltRef.current.rotation.y += 0.004 * effectiveSpeed;
      }

      // 3. Animate each celestial body
      renderItemsRef.current.forEach((item) => {
        // Orbit revolution
        if (effectiveSpeed > 0 && item.data.visual.orbitSpeed > 0) {
          item.orbitGroup.rotation.y += item.data.visual.orbitSpeed * effectiveSpeed * 0.1;
        }

        // Planet axial spin
        item.planetMesh.rotation.y += item.data.visual.rotationSpeed * (effectiveSpeed > 0 ? effectiveSpeed * 0.4 : 0.005);

        // Clouds spin slightly faster
        if (item.cloudsMesh) {
          item.cloudsMesh.rotation.y += 0.002 + (item.data.visual.cloudsSpeed || 0.01) * (effectiveSpeed > 0 ? effectiveSpeed * 0.3 : 0.003);
        }
      });

      // 4. Animate Moon orbit around Earth
      if (moonGroupRef.current && effectiveSpeed > 0) {
        moonGroupRef.current.rotation.y += 0.05 * effectiveSpeed;
      }

      // 5. Camera transitions & tracking
      const camera = cameraRef.current;
      if (camera) {
        if (isTransitioningRef.current) {
          transitionProgress.current += delta * 1.5;
          if (transitionProgress.current >= 1) {
            transitionProgress.current = 1;
            isTransitioningRef.current = false;
          }

          // Smooth cosine ease
          const t = transitionProgress.current;
          const ease = (1 - Math.cos(t * Math.PI)) / 2;

          camera.position.lerpVectors(transitionStartCamPos.current, transitionEndCamPos.current, ease);
          currentLookAtRef.current.lerpVectors(transitionStartLookAt.current, transitionEndLookAt.current, ease);
          camera.lookAt(currentLookAtRef.current);
        } else if (selectedBody) {
          // Track target as it moves in orbit
          const item = renderItemsRef.current.get(selectedBody.id);
          if (item) {
            const currentWorldPos = new THREE.Vector3();
            item.planetMesh.getWorldPosition(currentWorldPos);

            // Follow offset
            const offset = new THREE.Vector3().subVectors(camera.position, currentLookAtRef.current);
            currentLookAtRef.current.copy(currentWorldPos);
            camera.position.copy(currentWorldPos).add(offset);
            camera.lookAt(currentLookAtRef.current);
          }
        }

        // Project 2D screen positions for labels
        if (showLabels && containerRef.current) {
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          const updatedLabels: { id: string; nameUz: string; x: number; y: number; visible: boolean; isSelected: boolean }[] = [];

          renderItemsRef.current.forEach((item) => {
            const worldPos = new THREE.Vector3();
            item.planetMesh.getWorldPosition(worldPos);

            // Place label slightly above planet
            worldPos.y += item.data.visual.baseRadius * 1.3 + 0.8;

            const screenVector = worldPos.clone().project(camera);
            const isVisible = screenVector.z < 1.0;
            const x = (screenVector.x * 0.5 + 0.5) * w;
            const y = (-(screenVector.y * 0.5) + 0.5) * h;

            updatedLabels.push({
              id: item.data.id,
              nameUz: item.data.nameUz,
              x,
              y,
              visible: isVisible && x >= 0 && x <= w && y >= 0 && y <= h,
              isSelected: selectedBody?.id === item.data.id,
            });
          });

          setLabels(updatedLabels);
        }
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, simulationSpeed, selectedBody, showLabels]);

  // Mouse & Touch Drag Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;

    const deltaX = e.clientX - previousMousePosRef.current.x;
    const deltaY = e.clientY - previousMousePosRef.current.y;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };

    const cam = cameraRef.current;
    const offset = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);

    sphericalRef.current.setFromVector3(offset);
    sphericalRef.current.theta -= deltaX * 0.006;
    sphericalRef.current.phi -= deltaY * 0.006;
    // Limit vertical angle
    sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sphericalRef.current.phi));

    offset.setFromSpherical(sphericalRef.current);
    cam.position.copy(currentLookAtRef.current).add(offset);
    cam.lookAt(currentLookAtRef.current);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    const offset = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);
    const zoomFactor = e.deltaY > 0 ? 1.08 : 0.92;

    const minDistance = selectedBody ? selectedBody.visual.baseRadius * 2.2 : 12;
    const maxDistance = 450;
    const currentLen = offset.length();
    const newLen = Math.max(minDistance, Math.min(currentLen * zoomFactor, maxDistance));

    offset.normalize().multiplyScalar(newLen);
    cam.position.copy(currentLookAtRef.current).add(offset);
    cam.lookAt(currentLookAtRef.current);
  };

  // Touch Support
  const touchDistanceRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cameraRef.current) return;

    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - previousMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosRef.current.y;
      previousMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const cam = cameraRef.current;
      const offset = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);
      sphericalRef.current.setFromVector3(offset);
      sphericalRef.current.theta -= deltaX * 0.008;
      sphericalRef.current.phi -= deltaY * 0.008;
      sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sphericalRef.current.phi));

      offset.setFromSpherical(sphericalRef.current);
      cam.position.copy(currentLookAtRef.current).add(offset);
      cam.lookAt(currentLookAtRef.current);
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const factor = touchDistanceRef.current / newDist;
      touchDistanceRef.current = newDist;

      const cam = cameraRef.current;
      const offset = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);
      const minDistance = selectedBody ? selectedBody.visual.baseRadius * 2.2 : 12;
      const maxDistance = 450;
      const newLen = Math.max(minDistance, Math.min(offset.length() * factor, maxDistance));

      offset.normalize().multiplyScalar(newLen);
      cam.position.copy(currentLookAtRef.current).add(offset);
      cam.lookAt(currentLookAtRef.current);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDistanceRef.current = null;
  };

  // Click on 3D planet using Raycaster
  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const meshes: THREE.Mesh[] = [];
    renderItemsRef.current.forEach((item) => {
      meshes.push(item.planetMesh);
    });

    const intersects = raycaster.intersectObjects(meshes, false);
    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      const bodyId = hit.userData.bodyId;
      const found = celestialBodies.find((b) => b.id === bodyId);
      if (found) {
        onSelectBody(found);
      }
    }
  };

  return (
    <div
      id="solar-system-3d-viewport"
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Projected 3D Labels Overlay */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {labels.map((lbl) => {
            if (!lbl.visible) return null;
            return (
              <div
                key={lbl.id}
                style={{
                  transform: `translate(${lbl.x}px, ${lbl.y}px) translate(-50%, -100%)`,
                }}
                className={`absolute transition-opacity duration-150 flex flex-col items-center pointer-events-auto cursor-pointer ${
                  lbl.isSelected ? 'scale-110 z-20' : 'scale-95 opacity-80 hover:opacity-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  const found = celestialBodies.find((b) => b.id === lbl.id);
                  if (found) onSelectBody(found);
                }}
              >
                <div
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide flex items-center gap-1 backdrop-blur-md border shadow-lg ${
                    lbl.isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-amber-500/20'
                      : 'bg-slate-900/70 text-slate-200 border-slate-700/60 shadow-black/50'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        celestialBodies.find((b) => b.id === lbl.id)?.visual.color || '#fff',
                    }}
                  />
                  <span>{lbl.nameUz}</span>
                </div>
                <div
                  className={`w-px h-2 ${
                    lbl.isSelected ? 'bg-amber-400/60' : 'bg-slate-500/40'
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
