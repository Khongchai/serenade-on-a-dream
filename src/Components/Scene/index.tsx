import { Plane, useAspect } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DelayedMouse } from "../../utils/delayedMouse";
import focusObjects0 from "../layers/0-focusObjects.png";
import sparkles1 from "../layers/1-sparkles.png";
import bigCloud2 from "../layers/2-bigCloud.png";
import clouds3 from "../layers/3-clouds.png";
import moon4 from "../layers/4-moon.png";
import bgElem5 from "../layers/5-bgElem.png";
import textSerenade from "../layers/text-serenade.png";
import textOnADream from "../layers/text-on-a-dream.png";
import BackgroundShaderMaterial from "./BackgroundShaderMaterial";
import StarDome from "./StarDome";
import Sparkles from "./Sparkles";
import ShootingStars from "./ShootingStars";

interface SceneProps {
  bgScale: [number, number, number];
  dof: React.MutableRefObject<any>;
}

//See notes for auto pan
const delayedMouse = new DelayedMouse(0.03, false);
/**
 * Out here to prevent rerender
 */
let pointerPos = { x: 0, y: 0 };

const Scene = React.forwardRef<any, SceneProps>(({ dof, bgScale }, ref) => {
  const fullScale = useAspect(2000, 2000, 0.25);
  const extraLargeScale = useAspect(...bgScale);

  const focalPoint = useRef<THREE.Mesh>();
  const [focusVector] = useState(() => new THREE.Vector3());

  const [charactersCastle, _, bigCloud, clouds, moon, bg, serenade, onADream] =
    useLoader(THREE.TextureLoader, [
      focusObjects0,
      sparkles1,
      bigCloud2,
      clouds3,
      moon4,
      bgElem5,
      textSerenade,
      textOnADream,
    ]);

  const allRef = useRef<any>();

  useEffect(() => {
    window.addEventListener("mousemove", setNormalize);
    window.addEventListener("touchmove", setNormalize);

    return () => {
      window.removeEventListener("mousemove", setNormalize);
      window.removeEventListener("touchmove", setNormalize);
    };
  }, []);
  function setNormalize(e: MouseEvent | TouchEvent) {
    if (e.type === "mousemove") {
      pointerPos = {
        x: ((e as MouseEvent).clientX / window.innerWidth) * 2 - 1,
        y: -((e as MouseEvent).clientY / window.innerHeight) * 2 + 1,
      };
    } else {
      pointerPos = {
        x: ((e as TouchEvent).touches[0].clientX / window.innerWidth) * 2 - 1,
        y: -((e as TouchEvent).touches[0].clientY / window.innerHeight) * 2 + 1,
      };
    }
  }

  useFrame((_, delta) => {
    const { x, y } = delayedMouse.updateMouse(
      pointerPos.x * 0.5,
      pointerPos.y * 0.5,
      delta
    );
    allRef.current.rotation.y = x;
    allRef.current.rotation.x = -y;

    dof.current.target = focusVector.lerp(focalPoint.current!.position, 0.005);
  });

  return (
    <>
      <group ref={allRef}>
        <ShootingStars colors={["red"]} count={10} />
        <StarDome scale={extraLargeScale} />
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

        <Plane
          args={[2, 2]}
          position-z={20.5}
          scale={extraLargeScale.map((num) => num * 0.9) as any}
        >
          <BackgroundShaderMaterial shaderTexture={clouds} uOpacity={0.65} />
        </Plane>
        {/* Not yet visible, ask artist what to do */}
        {/* <Plane args={[2, 2]} position-z={22} ref={focalPoint} scale={fullScale}>
          <BackgroundShaderMaterial shaderTexture={serenade} />
        </Plane>
        <Plane args={[2, 2]} position-z={22} ref={focalPoint} scale={fullScale}>
          <BackgroundShaderMaterial shaderTexture={onADream} />
        </Plane> */}
      </group>
    </>
  );
});

export default Scene;
