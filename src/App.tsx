import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { backgroundColor } from "./Components/const";
import Scene from "./Components/Scene";
import Effects from "./Effects";

function App() {
  const bgScale: [number, number, number] = [3000, 3000, 0.3];
  const depthOfField = useRef();

  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 0, 500] }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false,
        }}
        linear={true}
      >
        <OrbitControls
          // test
          // minPolarAngle={Math.PI / 4}
          // maxPolarAngle={(3 * Math.PI) / 4}
          // minAzimuthAngle={(7 * Math.PI) / 4}
          // maxAzimuthAngle={Math.PI / 4}

          // prod
          enableZoom={true}
          minDistance={200}
          maxDistance={500}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <Scene bgScale={bgScale} depthOfField={depthOfField} />
          <Effects depthOfField={depthOfField} />
        </Suspense>
        <color attach="background" args={[backgroundColor.hex]} />
      </Canvas>
      {/* <Loader /> */}
    </>
  );
}

export default App;
