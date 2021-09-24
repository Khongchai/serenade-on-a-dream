import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from 'three.meshline'

//By extending a third-party library, you will be
//able to reference it in r3f declaratively.
extend({MeshLine, MeshLineMaterial});

const r = () => Math.max(0.2, Math.random());

/**
 *
 * @param {{number, number, string}}
 * @returns
 */
const Fatline = ({ curve, width, color }) => {
  const material = useRef();
  return (
    <mesh>
      {/* @ts-ignore */}
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        //Attach material means use this material
        attach="material"
        //useRef is so that we can reference the dashOffset above in the useFrame hook.
        ref={material}
        transparent
        lineWidth={width}
        color={color}
        //The length and spaces between dashes
        dashArray={0.1}
        //How much of a dash would you like to see? ratio of 0 = straight line
        //ratio of 1 = invisible
        dashRatio={0}
      />
    </mesh>
  );
};

export default function Fireflies({ count, colors, radius = 10 }) {
  const lines = useMemo(() => {
    let paths = [];
    const pathsCount = 10;
    const dotsCount = 20;

    for (let i = 0; i < pathsCount; i++){
        const startingPos = new THREE.Vector3(Math.sin(0) * r() * radius, Math.cos(0) * r() * radius, 0);
        const points = [];

        for (let angle = 0; angle < (Math.PI * 2); angle += (Math.PI * 2) / dotsCount){
            const x = Math.sin(angle) * radius * r();
            const y = Math.cos(angle) * radius * r();
            const z = 0;

            points.push(startingPos.add(new THREE.Vector3(x, y, z)).clone());
        }
        const arcSegments = 100;
        const curve = new THREE.CatmullRomCurve3(points).getPoints(arcSegments);

        const path = {
              color: colors[parseInt(colors.length * Math.random())],
              width: Math.max(1.6, (2 * i) / 10),
              curve,
            };

        paths.push(path);
    }
    return paths;
      
  }, [count, radius, colors]);

  return (
    //The position attribute is THREE.Vector3
    <group position={[-radius * 2, -radius, 0]}>
      {lines.map((props, index) => (
        <Fatline key={index} {...props} />
      ))}
    </group>
  );
}

//force push
