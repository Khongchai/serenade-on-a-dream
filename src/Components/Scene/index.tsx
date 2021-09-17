import { Plane, useAspect } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import focusObjects0 from "../layers/0-focusObjects.png";
import sparkles1 from "../layers/1-sparkles.png";
import bigCloud2 from "../layers/2-bigCloud.png";
import clouds3 from "../layers/3-clouds.png";
import moon4 from "../layers/4-moon.png";
import bgElem5 from "../layers/5-bgElem.png";
import BackgroundShaderMaterial from "./BackgroundShaderMaterial";
import Sparkles from "./Sparkles";

interface SceneProps {
  bgScale: [number, number, number];
  dof: React.MutableRefObject<any>;
}

const Scene = React.forwardRef<any, SceneProps>(({ dof, bgScale }, ref) => {
  const fullScale = useAspect(2000, 2000, 0.25);
  const extraLargeScale = useAspect(...bgScale);

  const focalPoint = useRef<any>();
  const [focusVector] = useState(() => new THREE.Vector3());

  const [charactersCastle, sparkles, bigCloud, clouds, moon, bg] = useLoader(
    THREE.TextureLoader,
    [focusObjects0, sparkles1, bigCloud2, clouds3, moon4, bgElem5]
  );

  const allRef = useRef<any>();

  useFrame((state, delta) => {
    //blur in
    allRef.current.rotation.y = state.mouse.x * 0.5;
    allRef.current.rotation.x = -state.mouse.y * 0.5;

    dof.current.target = focusVector.lerp(focalPoint.current.position, 0.005);
  });

  return (
    <group ref={allRef}>
      <Sparkles ref={ref} scale={extraLargeScale} />
      <Plane args={[2, 2]} scale={extraLargeScale} position-z={-25}>
        <BackgroundShaderMaterial shaderTexture={bg} />
      </Plane>
      <Plane args={[2, 2]} scale={extraLargeScale} position-z={-19}>
        <BackgroundShaderMaterial shaderTexture={moon} />
      </Plane>
      <Plane args={[1.7, 1.7]} scale={extraLargeScale} position-z={-18}>
        <BackgroundShaderMaterial shaderTexture={bigCloud} />
      </Plane>
      <Plane args={[2, 2]} position-z={20} ref={focalPoint} scale={fullScale}>
        <BackgroundShaderMaterial shaderTexture={charactersCastle} />
      </Plane>
    </group>
  );
});

export default Scene;
