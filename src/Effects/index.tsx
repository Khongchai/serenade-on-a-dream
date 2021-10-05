import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer as FiberEffectComposer,
} from "@react-three/postprocessing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import customFadeInFX from "../Components/glsl/customFadeInFX";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { EffectComposer as EffectComposerType } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderMaterial } from "three";
import {
  RenderPass,
  EffectPass,
  ShaderPass,
  EffectComposer,
  DepthOfFieldEffect,
  BloomEffect,
  //@ts-ignore
} from "postprocessing";

extend({ ShaderPass });

let time = 0;

const Effects = React.forwardRef<
  any,
  {
    bgScale: [number, number, number];
  }
>(({ bgScale: _ }, dofRef) => {
  const {
    gl,
    scene,
    camera,
    size: { width, height },
  } = useThree();

  const [comp, dof, bloom] = useMemo(() => {
    const comp: EffectComposerType = new EffectComposer(gl);

    const renderPass = new RenderPass(scene, camera);

    const depthOfFieldEffect = new DepthOfFieldEffect({
      bokehScale: 9,
      focalLength: 0.08,
      width: width * 1.3,
      height: height * 1.3,
    });
    const bloomEffect = new BloomEffect({
      luminanceThreshold: 0.58,
      luminanceSmoothing: 0.5,
      height: 300,
      opacity: 0.8,
    });
    const effectPass = new EffectPass(camera, bloomEffect);
    const shaderPass = new ShaderPass(
      new ShaderMaterial(customFadeInFX),
      "tDiffuse"
    );

    comp.addPass(renderPass);
    comp.addPass(effectPass);
    comp.addPass(shaderPass);

    return [comp, depthOfFieldEffect, bloomEffect];
  }, []);

  useEffect(() => {
    comp.setSize(width, height);
  }, [width, height]);

  useFrame((_, delta) => {
    time += (delta % 2) * Math.PI;
    bloom.blendMode.opacity.value = Math.sin(1.2 * time) / 6 + 0.7;

    comp.render();
  }, 1);

  return null;
});

export default Effects;
