import { Plane, useAspect } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BufferAttribute } from "three";
import focusObjects0 from "../layers/0-focusObjects.png";
import sparkles1 from "../layers/1-sparkles.png";
import bigCloud2 from "../layers/2-bigCloud.png";
import clouds3 from "../layers/3-clouds.png";
import moon4 from "../layers/4-moon.png";
import bgElem5 from "../layers/5-bgElem.png";
import Sparkles from "./Sparkles";
import { vertexShader, fragmentShader } from "../glsl/sparklesMaterial";

interface SceneProps {
  bgScale: [number, number, number];
  dof: React.MutableRefObject<any>;
}

const Scene: React.FC<SceneProps> = ({ bgScale, dof }) => {
  const fullScale = useAspect(2000, 2000, 0.25);
  const extraLargeScale = useAspect(...bgScale);

  const focalPoint = useRef<any>();
  const [focusVector] = useState(() => new THREE.Vector3());

  const sparklesMaterialRef = useRef<any>();

  const [charactersCastle, sparkles, bigCloud, clouds, moon, bg] = useLoader(
    THREE.TextureLoader,
    [focusObjects0, sparkles1, bigCloud2, clouds3, moon4, bgElem5]
  );

  useFrame((_, delta) => {
    //blur in
    dof.current.target = focusVector.lerp(focalPoint.current.position, 0.01);

    //time
    sparklesMaterialRef.current.uniforms.time.value = delta;
  });

  const count = 1000;
  const positions = new Float32Array(count * 3);
  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2.05;
    }
  }, []);

  return (
    <>
      <Plane args={[2, 2]} scale={extraLargeScale} position-z={-25}>
        <meshBasicMaterial attach="material" map={bg} transparent={true} />
      </Plane>
      <points scale={extraLargeScale} position-z={-19}>
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
      {/* stars reference */}
      {/* <Plane args={[2, 2]} scale={extraLargeScale} position-z={-19.5}>
        <meshBasicMaterial
          attach="material"
          map={sparkles}
          transparent={true}
        />
      </Plane> */}
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
};

export default Scene;
