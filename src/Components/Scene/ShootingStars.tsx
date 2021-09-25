import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const r = () => Math.random() + 0.01 * 1;

//Move along curve https://github.com/pmndrs/drei#curvemodifier


/**
 *
 * @param {{number, number, string}}
 * @returns
 */
 const Path= ({ curve, width: _, color }: {curve: THREE.Vector3[], width: number, color: THREE.Color | string }) => {

  const {viewport: {width}}= useThree();
  const scale = useMemo(() => {
    return width / 1920; 
  },[width]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve);
  const lineMaterial = new THREE.LineBasicMaterial({color: "white"});
  

  return (
      //For visual debug
      // @ts-ignore
        <line scale={scale} geometry={lineGeometry}  color="red" material={lineMaterial} />
  );
};

export default function Fireflies(
      { count, colors, radius = 200}:
     {count: number, colors: string | string[], radius?: number}) {
  const lines = useMemo(() => {
    let paths = [];
    const pathsCount = 6;
    const dotsCount = 20;

    for (let i = 0; i < pathsCount; i++){
        const randomAngle = Math.max(Math.random() * 3, 1); 

        const startingPos = new THREE.Vector3(Math.sin(0) * r() * radius, Math.cos(0) * r() * radius * 4 - 100, 0);
        const points: THREE.Vector3[] = [];
        
        for (let angle = 0; angle < (Math.PI * 2); angle += (Math.PI * 2) / dotsCount){
            const x = Math.sin(angle) * radius;
            const y = Math.sin(angle) * radius * 0.2 * randomAngle;
            const z = Math.cos(angle) * radius;

            points.push(startingPos.add(new THREE.Vector3(x, y, z)).clone());
        }
        const arcSegments = 100;
        const curve = new THREE.CatmullRomCurve3(points).getPoints(arcSegments);

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
    <group position={[-450, -250, -200]}>
      {lines.map((props, index) => (
        <Path key={index} {...props} />
      ))}
    </group>
  );
}
