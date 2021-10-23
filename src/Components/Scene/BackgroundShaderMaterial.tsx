import React from "react";
import { Texture } from "three";
import { fragmentShader, vertexShader } from "../glsl/fadeToBackgroundMaterial";

interface BackgroundShaderMaterialProps {
  shaderTexture: Texture;
  uOpacity?: number;
}

const BackgroundShaderMaterial: React.FC<BackgroundShaderMaterialProps> = ({
  shaderTexture,
  uOpacity,
}) => {
  return (
    <shaderMaterial
      attach="material"
      uniforms={{
        uTexture: { value: shaderTexture },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uOpacity: {
          value: uOpacity ? uOpacity : 1,
        },
      }}
      transparent={true}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  );
};

export default BackgroundShaderMaterial;
