"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";


const GlassObject = ({ geometry, position, color, rotationSpeed = 1 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * rotationSpeed;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    wireframeRef.current.rotation.x = t * 0.2;
    wireframeRef.current.rotation.y = t * 0.3;
  });

  const materialProps = {
    thickness: 2,
    roughness: 0.1,
    transmission: 1,
    ior: 1.5,
    chromaticAberration: 0.02,
    backside: true,
    transparent: true,
    opacity: 0.2,
    color: color,
  };

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      <mesh ref={wireframeRef} geometry={geometry} scale={1.1}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const FloatingObjects = () => {
  const objects = useMemo(() => {
    return [
      {
        geometry: new THREE.IcosahedronGeometry(3, 1),
        position: [-12, 8, -5],
        color: "#00f0ff",
        speed: 0.8,
      },
      {
        geometry: new THREE.TorusGeometry(2.5, 0.6, 16, 40),
        position: [14, -5, -8],
        color: "#a855f7",
        speed: 0.6,
      },
      {
        geometry: new THREE.TorusKnotGeometry(1.8, 0.5, 80, 16),
        position: [-15, -2, -10],
        color: "#10b981",
        speed: 0.5,
      },
      {
        geometry: new THREE.DodecahedronGeometry(2, 0),
        position: [10, 12, -6],
        color: "#f97316",
        speed: 0.7,
      },
      {
        geometry: new THREE.OctahedronGeometry(2, 0),
        position: [-8, -12, -3],
        color: "#ec4899",
        speed: 1.0,
      },
    ];
  }, []);

  return (
    <>
      {objects.map((obj, i) => (
        <Float
          key={i}
          speed={obj.speed * 2}
          rotationIntensity={2}
          floatIntensity={2}
          position={obj.position as [number, number, number]}
        >
          <GlassObject
            geometry={obj.geometry}
            position={[0, 0, 0]}
            color={obj.color}
            rotationSpeed={obj.speed}
          />
        </Float>
      ))}
    </>
  );
};

const Scene = () => {
  const { viewport } = useThree();
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={60} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-10, -10, 10]} intensity={1.5} color="#a855f7" />
      <pointLight position={[0, -10, 0]} intensity={1} color="#ec4899" />
      
      <FloatingObjects />
      
      {/* Background Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, -15]}>
        <torusGeometry args={[20, 0.05, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, -20]}>
        <torusGeometry args={[25, 0.05, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.05} />
      </mesh>
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
