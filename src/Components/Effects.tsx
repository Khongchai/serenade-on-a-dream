import React, { ForwardedRef, ForwardRefRenderFunction } from "react";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { useThree } from "react-three-fiber";
import { useAspect } from "@react-three/drei";

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
      </EffectComposer>
    );
  }
);

export default Effects;
