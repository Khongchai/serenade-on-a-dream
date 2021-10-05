import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import customFadeInFX from "../Components/glsl/customFadeInFX";
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
import * as THREE from "three";

extend({ ShaderPass });

let time = 0;

const Effects: React.FC<{
  depthOfField: any;
}> = ({ depthOfField }) => {
  const {
    gl,
    scene,
    camera,
    size: { width, height },
  } = useThree();

  const [comp, dof, bloom] = useMemo(() => {
    const comp: EffectComposerType = new EffectComposer(gl);

    const renderPass = new RenderPass(scene, camera);

    const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
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
    const effectPass = new EffectPass(camera, depthOfFieldEffect, bloomEffect);
    const shaderPass = new ShaderPass(
      new ShaderMaterial(customFadeInFX),
      "tDiffuse"
    );

    comp.addPass(renderPass);
    comp.addPass(effectPass);
    // comp.addPass(shaderPass);

    return [comp, depthOfFieldEffect, bloomEffect];
  }, []);

  useEffect(() => {
    depthOfField.current = dof;
    comp.setSize(width, height);
  }, [width, height]);

  useFrame((_, delta) => {
    time += (delta % 2) * Math.PI;
    bloom.blendMode.opacity.value = Math.sin(1.2 * time) / 5 + 0.7;

    comp.render();
  }, 1);

  return null;
};

export default Effects;
