import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Effects from "./Components/Effects";
import Scene from "./Components/Scene";

function App() {
  const dof = useRef<any>();
  const bgScale: [number, number, number] = [3000, 3000, 0.3];

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 0, 500] }}
      linear={true}
    >
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Suspense fallback={null}>
        <Scene bgScale={bgScale} dof={dof} />
      </Suspense>
      <Effects ref={dof} bgScale={bgScale} />
    </Canvas>
  );
}

export default App;
