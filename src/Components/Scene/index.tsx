import { Plane, useAspect } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "../glsl/sparklesMaterial";
import focusObjects0 from "../layers/0-focusObjects.png";
import sparkles1 from "../layers/1-sparkles.png";
import bigCloud2 from "../layers/2-bigCloud.png";
import clouds3 from "../layers/3-clouds.png";
import moon4 from "../layers/4-moon.png";
import bgElem5 from "../layers/5-bgElem.png";
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

  const [charactersCastle, _sparkles, bigCloud, clouds, moon, bg] = useLoader(
    THREE.TextureLoader,
    [focusObjects0, sparkles1, bigCloud2, clouds3, moon4, bgElem5]
  );

  useFrame(() => {
    //blur in
    dof.current.target = focusVector.lerp(focalPoint.current.position, 0.005);
  });

  return (
    <>
      <Plane args={[2, 2]} scale={extraLargeScale} position-z={-25}>
        <meshBasicMaterial attach="material" map={bg} transparent={true} />
      </Plane>
      <Sparkles ref={ref} scale={extraLargeScale} />
      <Plane args={[2, 2]} scale={extraLargeScale} position-z={-19}>
        <meshBasicMaterial attach="material" map={moon} transparent={true} />
      </Plane>

      <group>
        <Plane args={[1.7, 1.7]} scale={extraLargeScale} position-z={-18}>
          <meshBasicMaterial
            attach="material"
            map={bigCloud}
            transparent={true}
          />
        </Plane>
        <Plane args={[2, 2]} position-z={20} ref={focalPoint} scale={fullScale}>
          <meshBasicMaterial
            attach="material"
            map={charactersCastle}
            transparent={true}
          />
        </Plane>
      </group>
    </>
  );
});

export default Scene;
