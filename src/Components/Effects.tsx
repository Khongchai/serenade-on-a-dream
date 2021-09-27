import {
  Bloom,
  DepthOfField,
  EffectComposer,
  SelectiveBloom,
} from "@react-three/postprocessing";
import React from "react";
import { useThree } from "@react-three/fiber"

const Effects = React.forwardRef<
  any,
  {
    bgScale: [number, number, number];
    starsForSelectiveBloom: React.MutableRefObject<any>;
    lightRef: React.MutableRefObject<any>;
  }
>(({ bgScale: _, starsForSelectiveBloom, lightRef }, ref) => {
  const {
    viewport: { width, height },
  } = useThree();

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        ref={ref}
        bokehScale={9}
        // disable bokeh
        // bokehScale={0}
        focalLength={0.1}
        width={width * 1.3}
        height={height * 1.3}
      />
      <Bloom
        luminanceThreshold={0.45}
        //AE feathering
        luminanceSmoothing={0.5}
        height={300}
        opacity={0.8}
      />
    </EffectComposer>
  );
});

export default Effects;
