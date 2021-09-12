import { Plane, Stars } from "@react-three/drei";
import React from "react";

interface SparklesProps {
  scale: [number, number, number];
}

const Sparkles: React.FC<SparklesProps> = ({ scale }) => {
  return (
    <Plane args={[2, 2]} scale={scale} position-z={-19.5}>
      <meshBasicMaterial attach="material" transparent={true} />
    </Plane>
  );
};

export default Sparkles;
