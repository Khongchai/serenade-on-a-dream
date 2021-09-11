import { Plane, useAspect } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import focusObjects0 from "../layers/0-focusObjects.png";
import sparkles1 from "../layers/1-sparkles.png";
import bigCloud2 from "../layers/2-bigCloud.png";
import clouds3 from "../layers/3-clouds.png";
import moon4 from "../layers/4-Moon.png";
import bgElem5 from "../layers/5-bgElem.png";

interface SceneProps {}

const Scene: React.FC<SceneProps> = ({}) => {
  const scale = useAspect(3000, 3000, 1);
  return (
    // test plane, should be quite deep.
    <>
      <Plane args={[2, 2]} scale={scale}>
        <meshBasicMaterial attach="material" color="hotpink" />
      </Plane>
    </>
  );
};

export default Scene;
