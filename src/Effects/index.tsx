import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  BloomEffect,
  DepthOfFieldEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  ShaderPass,
  //@ts-ignore
} from "postprocessing";
import React, { useEffect, useMemo } from "react";
import { MathUtils, ShaderMaterial, TextureLoader } from "three";
import { EffectComposer as EffectComposerType } from "three/examples/jsm/postprocessing/EffectComposer";
import customFadeInFX from "../Components/glsl/customFadeInFX";
import displacementTexture from "../Components/layers/transition/displacement.jpg";
import solidColor from "../Components/layers/transition/solid-color.png";

let time = 0;

const Effects: React.FC<{
  everythingLoaded: React.MutableRefObject<boolean>;
  depthOfField: any;
}> = ({ depthOfField, everythingLoaded }) => {
  const {
    gl,
    scene,
    camera,
    size: { width, height },
  } = useThree();

  const [uDisplacementTexture, uSolidColor] = useLoader(TextureLoader, [
    displacementTexture,
    solidColor,
  ]);

  const [comp, dof, bloom, shaderMat] = useMemo(() => {
    const comp: EffectComposerType = new EffectComposer(gl);

    const renderPass = new RenderPass(scene, camera);

    const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
      //comment to disable bokeh
      bokehScale: 3.75,
      //comment to enable bokeh
      // bokehScale: 0,
      focalLength: 0.08,
    });
    const bloomEffect = new BloomEffect({
      luminanceThreshold: 0.58,
      luminanceSmoothing: 0.5,
      height: 300,
      opacity: 0.8,
    });
    const effectPass = new EffectPass(camera, depthOfFieldEffect, bloomEffect);
    const shaderMat = new ShaderMaterial({
      uniforms: {
        uDisplacementTexture: {
          value: uDisplacementTexture,
        },
        dispFactor: { value: 0 },
        uSolidColor: { value: uSolidColor },
        tDiffuse: { value: null },
      },
      ...customFadeInFX,
    });
    const shaderPass = new ShaderPass(shaderMat, "tDiffuse");

    comp.addPass(renderPass);
    comp.addPass(effectPass);
    comp.addPass(shaderPass);

    return [comp, depthOfFieldEffect, bloomEffect, shaderMat];
  }, []);

  useEffect(() => {
    depthOfField.current = dof;
    comp.setSize(width, height);
  }, [width, height]);

  useFrame((_, delta) => {
    time += (delta % 2) * Math.PI;
    bloom.blendMode.opacity.value = Math.sin(1.2 * time) / 5 + 0.7;

    shaderMat.uniforms.dispFactor.value = MathUtils.lerp(
      shaderMat.uniforms.dispFactor.value,
      1,
      /**
       * Wait for everything to load before doing the transition
       */
      everythingLoaded.current ? 0.1 : 0
    );

    comp.render();
  }, 1);

  return null;
};

export default Effects;
