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
    const lines = useMemo(() => {
        let paths = [];
        const count = 10;
        const dots = 20;
        for (let i = 0; i < count; i++){
            const startingPos = new THREE.Vector3(Math.sin(0) * r() * radius, Math.cos(0) * r() * radius, 0);
            for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) /dots){
                startingPos.add(new THREE.Vector3(Math.cos(i) * radius * r(), Math.sin(i) * radius * r(), 0)).clone();
            }
        }
        

    }, [])
   return (
        <></>
   ) 
}

export default ShootingStars;