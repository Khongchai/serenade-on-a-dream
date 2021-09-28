import { Box } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "../glsl/shootingStarMaterial";
import starShape from "../layers/star-shape.png";

//Move along curve https://github.com/pmndrs/drei#curvemodifier
//Spline examples: https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_extrude_splines.html

const r = () => Math.random() + 0.01 * 1;

/**
 *
 * @param {{number, number, string}}
 * @returns
 */
const Path = ({
  curve,
  width: _,
  color: __,
  starTexture,
}: {
  curve: THREE.CatmullRomCurve3;
  width: number;
  color: THREE.Color | string;
  starTexture: THREE.Texture;
}) => {
  const minVal = 0.1;
  const valInsteadOfZero = minVal;
  const speed = useMemo(
    () => Math.max(Math.random() * 0.35 || valInsteadOfZero, minVal),
    []
  );

  const boxRef = useRef<any>();
  const shaderRef = useRef<any>();
  useFrame((_, delta) => {
    const pointInCurve =
      (shaderRef.current.uniforms.position.value += delta * speed) % 1;
    const nextPosition = curve.getPointAt(pointInCurve);
    boxRef.current.position.copy(nextPosition);
  });

  return (
    <Box args={[20, 20, 20]} ref={boxRef}>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        ref={shaderRef}
        uniforms={{
          position: { value: 0 },
          starTexture: { value: starTexture },
        }}
      />
    </Box>
  );
};

export default function Fireflies({
  count: _,
  colors,
  radius = 200,
}: {
  count: number;
  colors: string | string[];
  radius?: number;
}) {
  const [starTexture] = useLoader(THREE.TextureLoader, [starShape]);

  const lines = useMemo(() => {
    let pathProps = [];
    const pathsCount = 6;
    const dotsCount = 20;

    for (let i = 0; i < pathsCount; i++) {
      const randomAngle = Math.max(Math.random() * 3, 1);

      const startingPos = new THREE.Vector3(
        Math.sin(0) * r() * radius - 600,
        Math.cos(0) * r() * radius * 4 - 600,
        -300
      );
      const points: THREE.Vector3[] = [];

      for (
        let angle = 0;
        angle < Math.PI * 2;
        angle += (Math.PI * 2) / dotsCount
      ) {
        const x = Math.sin(angle) * radius;
        const y = Math.sin(angle) * radius * 0.2 * randomAngle;
        const z = Math.cos(angle) * radius;

        points.push(startingPos.add(new THREE.Vector3(x, y, z)).clone());
      }
      const curve = new THREE.CatmullRomCurve3(points, true);
      // const frames = curve.computeFrenetFrames(100, true);
      // frames.tangents.length;

      pathProps.push({
        color: colors[colors.length * Math.random()],
        width: Math.max(1.6, (2 * i) / 10),
        starTexture,
        curve,
      });
    }
    return pathProps;
  }, []);

  return (
    //The position attribute is THREE.Vector3
    // @ts-ignore
    <group>
      {lines.map((props, index) => (
        <Path key={index} {...props} />
      ))}
    </group>
  );
}
