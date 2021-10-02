import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer as FiberEffectComposer,
} from "@react-three/postprocessing";
import React, { useEffect, useMemo, useRef } from "react";
import customFadeInFX from "../Components/glsl/customFadeInFX";
import {
  SMAAImageLoader,
  BlendFunction,
  KernelSize,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  GammaCorrectionEffect,
  BokehEffect,

  //@ts-ignore
} from "postprocessing";

let time = 0;

const Effects = React.forwardRef<
  any,
  {
    bgScale: [number, number, number];
  }
>(({ bgScale: _ }, dofRef) => {
  const {
    viewport: { width, height },
  } = useThree();

  const bloomRef = useRef<any>();
  const { gl, scene, camera } = useThree();
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    const gammaCorrection = new GammaCorrectionEffect();
    const bloom = new BloomEffect({
      blendFunction: BlendFunction.ADD,
      kernelSize: KernelSize.HUGE,
      luminanceThreshold: 0.1,
      height: 600,
    });
    bloom.blendMode.opacity.value = 2;
    const bokehEffect = new BokehEffect({
      focus: 0.8,
      dof: 0.05,
      aperture: 0.2,
      maxBlur: 0.015,
    });
    composer.addPass(new EffectPass(camera, bokehEffect));
    const effectPass = new EffectPass(camera, gammaCorrection, bloom);
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);
    return composer;
  }, []);

  useFrame((_, delta) => {
    // time += (delta % 2) * Math.PI;
    // bloomRef.current.blendMode.opacity.value = Math.sin(1.2 * time) / 7 + 0.7;
    composer.render(delta);
  });

  return (
    <>
      {/* <FiberEffectComposer ref={fxComposerRef} multisampling={0}>
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
      {/* <extendedEffectComposer>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass
          attachArray="passes"
          args={[customFadeInFX]}
          needsSwap={false}
        />
      </extendedEffectComposer> */}
    </>
  );
});

export default Effects;
