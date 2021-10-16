import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "../glsl/sparklesMaterial";
import starShape from "../layers/star-shape.png";

interface SparklesProps {
  scale: React.MutableRefObject<[number, number, number]>;
}

const Sparkles: React.FC<SparklesProps> = ({ scale }) => {
  const sparklesMaterialRef = useRef<any>();
  const [starTexture] = useLoader(THREE.TextureLoader, [starShape]);

  /**
   * Initial
   */
  const count = 300;
  const initialStarsPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizeVariations = new Float32Array(count);

  useEffect(() => {
    const mainYellowRGB = { r: 1, g: 244 / 255, b: 40 / 255 };
    for (let i = 0; i < count * 3; i++) {
      const i3 = i * 3;
      /**
       * Positions; Should => 1 = top, -1 = bottom (normalized)
       */
      initialStarsPositions[i3] = Math.random() * 3 - 1.5;
      initialStarsPositions[i3 + 1] = unevenDistribution();
      initialStarsPositions[i3 + 2] = Math.random() * 2 * 200;

      const range = 4;
      sizeVariations[i] = Math.random() * range;

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
    sparklesMaterialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <points scale={scale.current} position-z={-19}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={initialStarsPositions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "aColor"]}
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "aScale"]}
          array={sizeVariations}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          starTexture: { value: starTexture },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          //1920 = ideal
          uWindowWidthRatio: { value: window.innerWidth / 1920 },
        }}
        ref={sparklesMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        attach="material"
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default React.memo(Sparkles);

//High is the densest area
function unevenDistribution(): number {
  const pow = 2.05;
  let random = Math.random() ** pow * 2 - 1;
  random *= -1;
  return random;
}
