import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { fragmentShader, vertexShader } from "../glsl/sparklesMaterial";

interface SparklesProps {
  scale: [number, number, number];
}

const Sparkles: React.FC<SparklesProps> = ({ scale }) => {
  const sparklesMaterialRef = useRef<any>();

  const count = 1000;
  //TODO => refactor to custom hook.
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count);
  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2.05;
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
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
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
