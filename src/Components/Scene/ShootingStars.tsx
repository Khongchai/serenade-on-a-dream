import {extend} from "@react-three/fiber";
//@ts-ignore
import * as meshline from "threejs-meshline";
import * as THREE from "three";
import { useMemo } from "react";

extend(meshline);

const r = () => Math.random() * 0.2;

const ShootingStars: React.FC<{radius?: number}> = ({radius = 5}) => {
    /**
     * 1. Get a circular path around the album cover
     */
    const paths = useMemo(() => {
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

            paths.push(curve);
        }
        return paths;
    }, [])

    

   return (
       <group position={[radius * 2, -radius, 0]}>
        {paths.map((_, i) => {
            <mesh key={i}>
                {/* @ts-ignore */}
                <meshLine attach="geometry" vertices={paths}/>
                {/* @ts-ignore */}
                    <meshlineMaterial
                        attach="material" 
                        depthTest={false}
                        dashArray={0.05}
                        dashRatio={0.95}
                        color={new THREE.Color("red")}
                        lineWidth={5}
                    />
            </mesh>
        })}
       </group>
   ) 
}

export default ShootingStars;