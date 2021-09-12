import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import React from "react";
import { useThree } from "react-three-fiber";

const Effects = React.forwardRef<any, { bgScale: [number, number, number] }>(
  ({ bgScale }, ref) => {
    const {
      viewport: { width, height },
    } = useThree();

    return (
      <EffectComposer multisampling={0}>
        <DepthOfField
          ref={ref}
          bokehScale={10}
          focalLength={0.1}
          width={width / 2}
          height={height / 2}
        />
        <Bloom
          luminanceThreshold={0.5}
          //AE feathering
          luminanceSmoothing={0.5}
          height={300}
          opacity={0.8}
        />
      </EffectComposer>
    );
  }
);

export default Effects;
