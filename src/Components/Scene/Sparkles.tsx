import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useLoader } from "react-three-fiber";
import { fragmentShader, vertexShader } from "../glsl/sparklesMaterial";
import starShape from "../layers/star-shape.png";
import * as THREE from "three";

interface SparklesProps {
  scale: [number, number, number];
}

const Sparkles: React.FC<SparklesProps> = ({ scale }) => {
  const sparklesMaterialRef = useRef<any>();
  const [starTexture] = useLoader(THREE.TextureLoader, [starShape]);

  const count = 1000;
  //TODO => refactor to custom hook?
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  useEffect(() => {
    const mainYellowRGB = { r: 1, g: 244 / 255, b: 113 / 255 };
    for (let i = 0; i < count * 3; i++) {
      const i3 = i * 3;
      /**
       * Positions; Should => 1 = top, -1 = bottom (normalized)
       */
      positions[i3] = Math.random() * 2 - 1;
      positions[i3 + 1] = cubicDistribution();
      positions[i3 + 2] = Math.random() * 2 - 1;

      /**
       * Colors
       */
      const randValueZeroOrOne = Math.floor(Math.random() * 2);
      colors[i3] = randValueZeroOrOne || mainYellowRGB.r;
      colors[i3 + 1] = randValueZeroOrOne || mainYellowRGB.g;
      colors[i3 + 2] = randValueZeroOrOne || mainYellowRGB.b;
    }
  }, []);

  useFrame((_, delta) => {
    //time
    sparklesMaterialRef.current.uniforms.time.value = delta;
  });

  return (
    <points scale={scale} position-z={-19}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "aColor"]}
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          starTexture: { value: starTexture },
        }}
        ref={sparklesMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        attach="material"
      />
    </points>
  );
};

export default Sparkles;

//High is the densest area
function cubicDistribution(): number {
  const pow = 3;
  let random = Math.random() ** pow * 2 - 1;
  random *= -1;
  return random;
}
