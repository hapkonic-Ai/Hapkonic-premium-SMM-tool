"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";

const GlassObject = ({ 
  geometry, 
  position, 
  color, 
  rotationSpeed = 1, 
  hasWireframe = true,
  baseY = 0,
  floatSpeed = 1,
  floatAmp = 1,
  rotSpeedData = { x: 0.003, y: 0.005 }
}: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotation
    meshRef.current.rotation.x += rotSpeedData.x;
    meshRef.current.rotation.y += rotSpeedData.y;
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += rotSpeedData.x;
      wireframeRef.current.rotation.y += rotSpeedData.y;
    }

    // Floating
    meshRef.current.position.y = baseY + Math.sin(t * floatSpeed) * floatAmp;
    if (wireframeRef.current) {
      wireframeRef.current.position.y = baseY + Math.sin(t * floatSpeed) * floatAmp;
    }
  });

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: color,
    transparent: true,
    opacity: 0.15,
    roughness: 0.1,
    metalness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
  }), [color]);

  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  }), [color]);

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} material={glassMaterial} />
      {hasWireframe && (
        <mesh 
          ref={wireframeRef} 
          geometry={geometry} 
          material={wireframeMaterial} 
          scale={1.1} 
        />
      )}
    </group>
  );
};

const BackgroundElements = () => {
  const objects = useMemo(() => {
    const colors = ["#00f0ff", "#a855f7", "#ec4899", "#f97316", "#10b981"];
    
    const spheres = Array.from({ length: 8 }).map((_, i) => ({
      type: 'sphere',
      geometry: new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 16, 16),
      position: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, -5 - Math.random() * 15] as [number, number, number],
      color: colors[Math.floor(Math.random() * 5)],
      floatSpeed: 0.3 + Math.random() * 0.7,
      floatAmp: 0.5 + Math.random() * 1,
      hasWireframe: false,
      rotSpeed: { x: 0.001, y: 0.001 }
    }));

    const mainObjects = [
      {
        geometry: new THREE.IcosahedronGeometry(3, 1),
        position: [-12, 8, -5],
        color: "#00f0ff",
        floatSpeed: 0.8,
        floatAmp: 1.5,
        hasWireframe: true,
        rotSpeed: { x: 0.003, y: 0.005 }
      },
      {
        geometry: new THREE.TorusGeometry(2.5, 0.6, 16, 40),
        position: [14, -5, -8],
        color: "#a855f7",
        floatSpeed: 0.6,
        floatAmp: 2,
        hasWireframe: true,
        rotSpeed: { x: 0.004, y: 0.002 }
      },
      {
        geometry: new THREE.OctahedronGeometry(2, 0),
        position: [-8, -12, -3],
        color: "#ec4899",
        floatSpeed: 1,
        floatAmp: 1.2,
        hasWireframe: false,
        rotSpeed: { x: 0.005, y: 0.003 }
      },
      {
        geometry: new THREE.DodecahedronGeometry(2, 0),
        position: [10, 12, -6],
        color: "#f97316",
        floatSpeed: 0.7,
        floatAmp: 1.8,
        hasWireframe: true,
        rotSpeed: { x: 0.002, y: 0.004 }
      },
      {
        geometry: new THREE.TorusKnotGeometry(1.8, 0.5, 80, 16),
        position: [-15, -2, -10],
        color: "#10b981",
        floatSpeed: 0.5,
        floatAmp: 2.5,
        hasWireframe: false,
        rotSpeed: { x: 0.003, y: 0.002 }
      },
      {
        geometry: new THREE.ConeGeometry(1.5, 3, 6),
        position: [18, 3, -7],
        color: "#00f0ff",
        floatSpeed: 0.9,
        floatAmp: 1.3,
        hasWireframe: false,
        rotSpeed: { x: 0.002, y: 0.004 }
      },
      {
        geometry: new THREE.TetrahedronGeometry(2, 0),
        position: [-18, 5, -4],
        color: "#ec4899",
        floatSpeed: 0.65,
        floatAmp: 1.7,
        hasWireframe: false,
        rotSpeed: { x: 0.004, y: 0.003 }
      },
      {
        geometry: new THREE.CylinderGeometry(0.8, 0.8, 4, 8),
        position: [6, -15, -6],
        color: "#a855f7",
        floatSpeed: 0.55,
        floatAmp: 1.4,
        hasWireframe: false,
        rotSpeed: { x: 0.003, y: 0.005 }
      }
    ];

    return [...spheres, ...mainObjects];
  }, []);

  return (
    <>
      {objects.map((obj, i) => (
        <GlassObject
          key={i}
          geometry={obj.geometry}
          position={obj.position as [number, number, number]}
          color={obj.color}
          baseY={obj.position[1]}
          floatSpeed={obj.floatSpeed}
          floatAmp={obj.floatAmp}
          hasWireframe={obj.hasWireframe}
          rotSpeedData={obj.rotSpeed}
        />
      ))}
    </>
  );
};

const Scene = () => {
  const { viewport, camera } = useThree();
  const pointLight1Ref = useRef<THREE.PointLight>(null!);
  const pointLight2Ref = useRef<THREE.PointLight>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Camera follow mouse and scroll
    camera.position.x += (mouse.current.x * 3 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 2 - scrollY.current * 0.005 - camera.position.y) * 0.02;
    camera.lookAt(0, -scrollY.current * 0.003, 0);

    // Orbiting lights
    pointLight1Ref.current.position.x = Math.sin(t * 0.3) * 15;
    pointLight1Ref.current.position.y = Math.cos(t * 0.2) * 10;
    pointLight2Ref.current.position.x = Math.cos(t * 0.4) * 12;
    pointLight2Ref.current.position.z = Math.sin(t * 0.3) * 15;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={60} />
      <ambientLight intensity={0.4} color="#222244" />
      
      <pointLight ref={pointLight1Ref} intensity={2} color="#00f0ff" distance={100} />
      <pointLight ref={pointLight2Ref} intensity={2} color="#a855f7" distance={100} />
      <pointLight position={[5, -20, 10]} intensity={1.5} color="#ec4899" distance={80} />
      
      <BackgroundElements />
      
      {/* Background Rings */}
      <group>
        <mesh rotation={[Math.PI * 0.4, 0, 0]} position={[0, 0, -12]}>
          <torusGeometry args={[4, 0.15, 8, 60]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.12} />
        </mesh>
        <mesh rotation={[Math.PI * 0.6, 0, Math.PI * 0.2]} position={[0, 0, -14]}>
          <torusGeometry args={[5, 0.1, 8, 80]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </>
  );
};

export const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
