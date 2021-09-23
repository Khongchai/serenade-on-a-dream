import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "../glsl/shootingStarMaterial";

interface ShootingStarProps {
  scale: [number, number, number];
}

const StarDome: React.FC<ShootingStarProps> = ({ scale }) => {
  const shootingStarMaterialRef = useRef<any>();
  const count = 100;
  const initialStarsPositions = new Float32Array(count * 3);

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      const i3 = i * 3;
      //formula => http://www.songho.ca/opengl/gl_sphere.html#example_sphere
      //But only half a circle to ensure that most of the shooting stars will happen where user can see them
      const radiusVariation = Math.random() * 0.9;
      const radius = 8 - radiusVariation;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      let x = 0;
      let y = 0;
      let z = 0;
      x = Math.cos(theta) * (radius * Math.cos(phi));
      y = Math.sin(theta) * (radius * Math.cos(phi));
      z = radius * Math.sin(phi);
      initialStarsPositions[i3] = x;
      initialStarsPositions[i3 + 1] = z;
      initialStarsPositions[i3 + 2] = y;
    }
  }, []);

  useFrame((_, delta) => {
    const shootingStarInterval = Math.sin(
      (shootingStarMaterialRef.current.uniforms.uTime.value += delta)
    );
    shootingStarMaterialRef.current.uniforms.shootingStarInterval.value =
      shootingStarInterval;
  });

  return (
    <>
      <points
        scale={new THREE.Vector3(120, 120, 120)}
        position-z={0}
        position-y={-100}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            array={initialStarsPositions}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={shootingStarMaterialRef}
          uniforms={{
            uTime: { value: 0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            shootingStarInterval: { value: 0 },
          }}
          attach="material"
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </points>
    </>
  );
};

export default StarDome;
