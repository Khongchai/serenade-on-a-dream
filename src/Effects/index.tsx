import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer as FiberEffectComposer,
} from "@react-three/postprocessing";
import React, { useEffect, useMemo, useRef } from "react";
import customFadeInFX from "../Components/glsl/customFadeInFX";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderMaterial } from "three";

let time = 0;

const Effects = React.forwardRef<
  any,
  {
    bgScale: [number, number, number];
  }
>(({ bgScale: _ }, dofRef) => {
  const {
    viewport: { width, height },
    gl,
    scene,
    camera,
  } = useThree();

  const bloomRef = useRef<any>();
  const finalEffectComposer = useMemo(() => {
    const comp = new EffectComposer(gl);

    const renderScene = new RenderPass(scene, camera);
    comp.addPass(renderScene);

    const finalPass = new ShaderPass(new ShaderMaterial(customFadeInFX));
    comp.addPass(finalPass);
    comp.renderToScreen = true;
    return comp;
  }, []);

  useEffect(() => {
    finalEffectComposer.setSize(width, height);
  }, [width, height]);

  useFrame((_, delta) => {
    // time += (delta % 2) * Math.PI;
    // bloomRef.current.blendMode.opacity.value = Math.sin(1.2 * time) / 7 + 0.7;

    //testing below
    finalEffectComposer.render();
  }, 1);

  return (
    <>
      {/* <FiberEffectComposer multisampling={0}>
        <DepthOfField
          ref={dofRef}
          bokehScale={9}
          // disable bokeh
          // bokehScale={0}
          focalLength={0.08}
          width={width * 1.3}
          height={height * 1.3}
        />
        <Bloom
          ref={bloomRef}
          luminanceThreshold={0.58}
          //AE feathering
          luminanceSmoothing={0.5}
          height={300}
          opacity={0.8}
        />
      </FiberEffectComposer> */}
    </>
  );
});

export default Effects;
