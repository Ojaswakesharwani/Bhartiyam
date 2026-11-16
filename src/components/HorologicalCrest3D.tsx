import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PILLARS } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface HorologicalCrest3DProps {
  activePillar: number;
  onSelectPillar: (id: number) => void;
}

export const HorologicalCrest3D: React.FC<HorologicalCrest3DProps> = ({
  activePillar,
  onSelectPillar,
}) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  // References to keep animation loop clean
  const targetRotationRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const previousMouseXRef = useRef<number>(0);
  const activePillarRef = useRef<number>(activePillar);
  activePillarRef.current = activePillar;

  // When activePillar changes from external tabs, set target rotation
  useEffect(() => {
    // Map pillars 1, 2, 3, 4 to angles (0, -PI/2, -PI, -3PI/2)
    const angles = [0, -Math.PI / 2, -Math.PI, -Math.PI * 1.5];
    targetRotationRef.current = angles[(activePillar - 1) % 4];
  }, [activePillar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL support
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch (e) {
      setWebGLSupported(false);
      return;
    }

    let animationFrameId: number;
    const width = 480;
    const height = 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xf2ede2, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 2.8);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa67c2e, 2.0);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffd700, 3.5, 8);
    pointLight.position.set(0, 0.8, 1);
    scene.add(pointLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // MATERIALS
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc99d42,
      metalness: 0.88,
      roughness: 0.22,
    });

    const darkGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0x86611f,
      metalness: 0.85,
      roughness: 0.35,
    });

    const navyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1d3a,
      metalness: 0.7,
      roughness: 0.3,
    });

    const parchmentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf9f6f0,
      metalness: 0.1,
      roughness: 0.6,
    });

    const flameMaterial = new THREE.MeshStandardMaterial({
      color: 0xb84a14,
      emissive: 0xc9581c,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2,
    });

    // 1. SCULPTURAL OPEN BOOK OF WISDOM
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, -0.4, 0);

    // Left Page Curve
    const leftPageGeo = new THREE.CylinderGeometry(1.6, 1.6, 1.8, 16, 1, true, Math.PI * 0.7, Math.PI * 0.28);
    const leftPage = new THREE.Mesh(leftPageGeo, parchmentMaterial);
    leftPage.rotation.z = Math.PI / 2;
    leftPage.position.set(-0.85, 0, 0);
    bookGroup.add(leftPage);

    // Right Page Curve
    const rightPageGeo = new THREE.CylinderGeometry(1.6, 1.6, 1.8, 16, 1, true, Math.PI * 0.02, Math.PI * 0.28);
    const rightPage = new THREE.Mesh(rightPageGeo, parchmentMaterial);
    rightPage.rotation.z = Math.PI / 2;
    rightPage.position.set(0.85, 0, 0);
    bookGroup.add(rightPage);

    // Spine and Gold Cover Edges
    const spineGeo = new THREE.BoxGeometry(0.3, 1.85, 0.3);
    const spine = new THREE.Mesh(spineGeo, goldMaterial);
    spine.position.set(0, 0, -0.2);
    bookGroup.add(spine);

    // Navy base plinth
    const plinthGeo = new THREE.CylinderGeometry(1.5, 1.7, 0.15, 32);
    const plinth = new THREE.Mesh(plinthGeo, navyMaterial);
    plinth.position.set(0, -0.7, 0);
    bookGroup.add(plinth);

    const plinthRim = new THREE.TorusGeometry(1.72, 0.05, 16, 64);
    const rimMesh = new THREE.Mesh(plinthRim, goldMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.set(0, -0.7, 0);
    bookGroup.add(rimMesh);

    rootGroup.add(bookGroup);

    // 2. SACRED LOTUS FLAME (CENTRAL JYOTI)
    const flameGeo = new THREE.ConeGeometry(0.32, 0.95, 16);
    const flameMesh = new THREE.Mesh(flameGeo, flameMaterial);
    flameMesh.position.set(0, 0.45, 0);
    rootGroup.add(flameMesh);

    const flameBaseGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const flameBase = new THREE.Mesh(flameBaseGeo, goldMaterial);
    flameBase.position.set(0, 0.15, 0);
    rootGroup.add(flameBase);

    // 3. CELESTIAL ARMILLARY RINGS
    const armillaryGroup = new THREE.Group();

    // Equatorial Ring
    const eqRingGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 64);
    const eqRing = new THREE.Mesh(eqRingGeo, goldMaterial);
    eqRing.rotation.x = Math.PI / 2;
    armillaryGroup.add(eqRing);

    // Meridian Ring
    const merRingGeo = new THREE.TorusGeometry(1.9, 0.035, 16, 64);
    const merRing = new THREE.Mesh(merRingGeo, darkGoldMaterial);
    merRing.rotation.y = Math.PI / 2;
    armillaryGroup.add(merRing);

    // Ecliptic Incline Ring (23.5 deg)
    const eclipticRingGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 64);
    const eclipticRing = new THREE.Mesh(eclipticRingGeo, goldMaterial);
    eclipticRing.rotation.x = (Math.PI / 180) * 23.5;
    eclipticRing.rotation.y = (Math.PI / 180) * 15;
    armillaryGroup.add(eclipticRing);

    rootGroup.add(armillaryGroup);

    // 4. SUSPENDED 4 ORBITAL MARKERS (THE 4 PILLARS)
    const orbitalRadius = 2.45;
    const orbitalNodes: THREE.Group[] = [];

    PILLARS.forEach((pillar, i) => {
      const angle = (i * Math.PI) / 2;
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(
        Math.cos(angle) * orbitalRadius,
        0.1 * Math.sin(i * 1.5),
        Math.sin(angle) * orbitalRadius
      );

      // Outer gold halo
      const haloGeo = new THREE.TorusGeometry(0.32, 0.03, 16, 32);
      const halo = new THREE.Mesh(haloGeo, goldMaterial);
      halo.rotation.x = Math.PI / 2;
      nodeGroup.add(halo);

      // Core Sphere
      const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: pillar.id === 1 ? 0xa67c2e : pillar.id === 2 ? 0x1a2e56 : pillar.id === 3 ? 0xb84a14 : 0x86611f,
        metalness: 0.8,
        roughness: 0.25,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      nodeGroup.add(sphere);

      // Fine connecting thin radial needle
      const needleGeo = new THREE.CylinderGeometry(0.012, 0.012, orbitalRadius - 1.9, 8);
      const needle = new THREE.Mesh(needleGeo, goldMaterial);
      needle.position.set(-Math.cos(angle) * 0.25, 0, -Math.sin(angle) * 0.25);
      needle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)));
      nodeGroup.add(needle);

      rootGroup.add(nodeGroup);
      orbitalNodes.push(nodeGroup);
    });

    // ANIMATION & RENDER LOOP
    let idleRotationSpeed = 0.002;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // If user is not dragging, apply smooth damping towards target rotation
      if (!isDraggingRef.current) {
        // Idle gentle float when reached target
        const diff = targetRotationRef.current - currentRotationRef.current;
        if (Math.abs(diff) < 0.001) {
          // Slow breathing idle oscillation
          targetRotationRef.current += idleRotationSpeed;
        }
        currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.055;
      }

      rootGroup.rotation.y = currentRotationRef.current;
      rootGroup.rotation.x = 0.12 + Math.sin(Date.now() * 0.0012) * 0.04;

      // Keep orbital node halos facing camera
      orbitalNodes.forEach((node) => {
        node.rotation.y = -rootGroup.rotation.y;
      });

      // Internal slow counter-spin of armillary ecliptic
      armillaryGroup.rotation.y += 0.003;

      // Gentle flame flicker
      flameMesh.scale.set(
        1 + Math.sin(Date.now() * 0.008) * 0.06,
        1 + Math.cos(Date.now() * 0.009) * 0.08,
        1 + Math.sin(Date.now() * 0.008) * 0.06
      );

      // Calculate current degrees for SVG compass sync
      const normDeg = ((rootGroup.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      setRotationDeg(Math.round((normDeg * 180) / Math.PI));

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE & CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // MOUSE & TOUCH INTERACTION HANDLERS FOR DRAGGING
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMouseXRef.current = e.clientX;
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMouseXRef.current;
    previousMouseXRef.current = e.clientX;

    // Apply rotation
    currentRotationRef.current += deltaX * 0.012;
    targetRotationRef.current = currentRotationRef.current;

    // Determine nearest pillar
    checkClosestPillar(currentRotationRef.current);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsInteracting(false);
  };

  const checkClosestPillar = (rotY: number) => {
    // Normalize rotY
    const angles = [0, -Math.PI / 2, -Math.PI, -Math.PI * 1.5];
    const norm = (rotY % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

    let closestPillar = 1;
    let minDiff = 999;

    [0, 1, 2, 3].forEach((idx) => {
      const target = ((angles[idx] % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const diff = Math.min(
        Math.abs(norm - target),
        Math.abs(norm - (target + Math.PI * 2)),
        Math.abs(norm - (target - Math.PI * 2))
      );
      if (diff < minDiff) {
        minDiff = diff;
        closestPillar = idx + 1;
      }
    });

    if (closestPillar !== activePillarRef.current) {
      onSelectPillar(closestPillar);
    }
  };

  const currentActivePillarData = PILLARS.find((p) => p.id === activePillar) || PILLARS[0];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Precision Astrolabe & Compass Degrees SVG Outer Frame */}
      <div className="relative w-[340px] sm:w-[420px] md:w-[460px] aspect-square flex items-center justify-center">
        {/* SVG Astrolabe Rotating Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 500"
          fill="none"
        >
          <defs>
            <linearGradient id="astrolabeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F4E7CA" />
              <stop offset="50%" stopColor="#A67C2E" />
              <stop offset="100%" stopColor="#785315" />
            </linearGradient>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="90%" stopColor="#A67C2E" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="250" cy="250" r="235" fill="url(#ringGlow)" />

          {/* Outermost Degree Markings Ring */}
          <circle
            cx="250"
            cy="250"
            r="238"
            stroke="#E2DBD0"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <circle
            cx="250"
            cy="250"
            r="228"
            stroke="url(#astrolabeGold)"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Rotating Compass Degrees Group (Synchronized with 3D Rotation) */}
          <g
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transformOrigin: '250px 250px',
              transition: isInteracting ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            {/* 360 Degree Ticks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const deg = i * 10;
              const rad = (deg * Math.PI) / 180;
              const isMajor = deg % 90 === 0;
              const isSemi = deg % 30 === 0;
              const r1 = 228;
              const r2 = isMajor ? 212 : isSemi ? 218 : 222;
              const x1 = 250 + Math.cos(rad) * r1;
              const y1 = 250 + Math.sin(rad) * r1;
              const x2 = 250 + Math.cos(rad) * r2;
              const y2 = 250 + Math.sin(rad) * r2;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? '#A67C2E' : '#B8A88E'}
                  strokeWidth={isMajor ? 2 : 1}
                  opacity={isMajor ? 1 : 0.6}
                />
              );
            })}

            {/* Beohari Geodetic Inscription Ring */}
            <circle cx="250" cy="250" r="202" stroke="#E2DBD0" strokeWidth="0.8" strokeDasharray="4 4" />
          </g>

          {/* 4 Quadrant Arcs - Illuminated for Active Pillar */}
          {/* Pillar 1 Arc: Top Right (0 - 90 deg) */}
          <path
            d="M 250 40 A 210 210 0 0 1 460 250"
            stroke={activePillar === 1 ? '#A67C2E' : '#E2DBD0'}
            strokeWidth={activePillar === 1 ? '3.5' : '1.2'}
            strokeDasharray={activePillar === 1 ? 'none' : '4 4'}
            className="transition-all duration-500"
          />
          {/* Pillar 2 Arc: Bottom Right (90 - 180 deg) */}
          <path
            d="M 460 250 A 210 210 0 0 1 250 460"
            stroke={activePillar === 2 ? '#0F1D3A' : '#E2DBD0'}
            strokeWidth={activePillar === 2 ? '3.5' : '1.2'}
            strokeDasharray={activePillar === 2 ? 'none' : '4 4'}
            className="transition-all duration-500"
          />
          {/* Pillar 3 Arc: Bottom Left (180 - 270 deg) */}
          <path
            d="M 250 460 A 210 210 0 0 1 40 250"
            stroke={activePillar === 3 ? '#B84A14' : '#E2DBD0'}
            strokeWidth={activePillar === 3 ? '3.5' : '1.2'}
            strokeDasharray={activePillar === 3 ? 'none' : '4 4'}
            className="transition-all duration-500"
          />
          {/* Pillar 4 Arc: Top Left (270 - 360 deg) */}
          <path
            d="M 40 250 A 210 210 0 0 1 250 40"
            stroke={activePillar === 4 ? '#86611F' : '#E2DBD0'}
            strokeWidth={activePillar === 4 ? '3.5' : '1.2'}
            strokeDasharray={activePillar === 4 ? 'none' : '4 4'}
            className="transition-all duration-500"
          />

          {/* Cardinal Coordinates Labels */}
          <text x="250" y="28" textAnchor="middle" fill="#A67C2E" fontSize="9" fontWeight="bold" letterSpacing="1.5">
            24° 03′ N • BEOHARI
          </text>
          <text x="472" y="254" textAnchor="start" fill="#785315" fontSize="8" fontWeight="600">
            EST. 2005
          </text>
          <text x="250" y="482" textAnchor="middle" fill="#A67C2E" fontSize="8" letterSpacing="1">
            81° 23′ E • SHAHDOL
          </text>
          <text x="28" y="254" textAnchor="end" fill="#785315" fontSize="8" fontWeight="600">
            MPBSE
          </text>
        </svg>

        {/* THREE.JS WebGL Canvas */}
        {webGLSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing z-10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            title="Click and drag to rotate the Horological Emblem"
          />
        ) : (
          /* Graceful WebGL Fallback */
          <div className="z-10 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-40 h-40 rounded-full border-4 border-gold-500 bg-navy-800 flex items-center justify-center shadow-gold-glow">
              <span className="font-serif text-3xl text-gold-400 font-bold">
                {currentActivePillarData.roman}
              </span>
            </div>
            <p className="mt-4 text-xs tracking-wider text-navy-800 font-medium">
              BHARTIYAM EMBLEM
            </p>
          </div>
        )}

        {/* Active Node Ping Indicator */}
        <div
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-gold-500/30 shadow-subtle backdrop-blur-sm cursor-pointer"
          onClick={() => onSelectPillar((activePillar % 4) + 1)}
        >
          <span className="w-2 h-2 rounded-full bg-vermilion-600 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-navy-800">
            Pillar {currentActivePillarData.roman} Synced
          </span>
        </div>
      </div>

      {/* Floating Caption Plaque Underneath Emblem */}
      <div className="mt-2 text-center max-w-sm px-4 py-2.5 rounded-lg bg-white/80 border border-hairline shadow-subtle backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-serif italic text-gold-600">Pillar {currentActivePillarData.roman}</span>
          <span className="text-xs text-navy-800 font-semibold">
            {language === 'hi' ? currentActivePillarData.titleHi : currentActivePillarData.titleEn}
          </span>
        </div>
        <p className="text-[11px] text-navy-700/80 mt-1 line-clamp-1">
          {language === 'hi' ? currentActivePillarData.descHi : currentActivePillarData.descEn}
        </p>
        <p className="text-[9px] uppercase tracking-wider text-gold-700/70 mt-1.5">
          ✦ Drag emblem or select tabs to inspect pillars
        </p>
      </div>
    </div>
  );
};
