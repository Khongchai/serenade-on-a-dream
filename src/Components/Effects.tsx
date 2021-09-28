import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import React, { useRef } from "react";

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

  useFrame((_, delta) => {
    time += (delta % 2) * Math.PI;
    bloomRef.current.blendMode.opacity.value = Math.sin(1.2 * time) / 10 + 0.5;
  });
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        ref={dofRef}
        bokehScale={9}
        // disable bokeh
        // bokehScale={0}
        focalLength={0.1}
        width={width * 1.3}
        height={height * 1.3}
      />
      <Bloom
        ref={bloomRef}
        luminanceThreshold={0.25}
        //AE feathering
        luminanceSmoothing={0.5}
        height={300}
        opacity={0.8}
      />
    </EffectComposer>
  );
});

export default Effects;
