import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { backgroundColor } from "./Components/const";
import Effects from "./Components/Effects";
import Scene from "./Components/Scene";

function App() {
  const dof = useRef<any>();
  const starsForSelectiveBloom = useRef<any>();
  const lightRef = useRef<any>();
  const bgScale: [number, number, number] = [3000, 3000, 0.3];

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 0, 500] }}
      linear={true}
    >
      <pointLight ref={lightRef} />
      <OrbitControls
        //prettier-ignore
        // minPolarAngle={Math.PI / 4}
        // maxPolarAngle={(3 * Math.PI) / 4}
        // minAzimuthAngle={(7 * Math.PI) / 4}
        // maxAzimuthAngle={Math.PI / 4}
        enablePan={false}
        enableZoom={true}
        minDistance={200}
        maxDistance={500}
        enableRotate={false}
      />
      <Suspense fallback={null}>
        <Scene ref={starsForSelectiveBloom} bgScale={bgScale} dof={dof} />
        <Effects
          ref={dof}
          bgScale={bgScale}
          lightRef={lightRef}
          starsForSelectiveBloom={starsForSelectiveBloom}
        />
      </Suspense>
      <color attach="background" args={[backgroundColor.hex]} />
    </Canvas>
  );
}

export default App;
