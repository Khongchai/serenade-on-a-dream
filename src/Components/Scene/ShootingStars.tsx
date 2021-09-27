import { CurveModifier, useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const r = () => Math.random() + 0.01 * 1;

//Move along curve https://github.com/pmndrs/drei#curvemodifier

/**
 *
 * @param {{number, number, string}}
 * @returns
 */
const Path = ({
  curve,
  width: _,
  color,
}: {
  curve: THREE.CatmullRomCurve3;
  width: number;
  color: THREE.Color | string;
}) => {
  const curveSegments = 100;
  const lineGeometry = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(curveSegments)),
    []
  );
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "white" }),
    []
  );

  const curveRef = useRef<any>();
  const speed = useMemo(() => Math.max(0.0007, Math.random() * 0.005), []);

  useFrame(() => {
    if (curveRef.current) {
      curveRef.current.moveAlongCurve(speed);
    }
  });

  return (
    <>
      <CurveModifier ref={curveRef} curve={curve}>
        <mesh>
          <boxGeometry args={[20, 20, 20]} />
          <meshBasicMaterial />
        </mesh>
      </CurveModifier>
      {/* line is for visually debugging path */}
      <line
        //@ts-ignore
        geometry={lineGeometry}
        color="red"
        material={lineMaterial}
      />
    </>
  );
};

export default function Fireflies({
  count,
  colors,
  radius = 200,
}: {
  count: number;
  colors: string | string[];
  radius?: number;
}) {
  const lines = useMemo(() => {
    let paths = [];
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
      const curve = new THREE.CatmullRomCurve3(points);

      const path = {
        color: colors[colors.length * Math.random()],
        width: Math.max(1.6, (2 * i) / 10),
        curve,
      };

      paths.push(path);
    }
    return paths;
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
