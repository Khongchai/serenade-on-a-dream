import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import "./app.css";
import AudioWarning from "./Components/AudioWarning";
import LoaderAndControls from "./Components/LoaderAndControls";
import Scene from "./Components/Scene";
import { backgroundColor } from "./const";
import Effects from "./Effects";
import { DelayedMouse } from "./utils/delayedMouse";

function App() {
  const bgScale: [number, number, number] = [3000, 3000, 0.3];
  const depthOfField = useRef();

  const [soundWarningShown, setSoundWarningShown] = useState(false);

  const delayedMouse = useRef(new DelayedMouse(0.03, true));

  const everthingLoaded = useRef(false);

  return soundWarningShown ? (
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
          <Scene
            bgScale={bgScale}
            delayedMouse={delayedMouse}
            depthOfField={depthOfField}
          />
          <Effects
            everythingLoaded={everthingLoaded}
            depthOfField={depthOfField}
          />
        </Suspense>
        <color attach="background" args={[backgroundColor.hex]} />
      </Canvas>
      <LoaderAndControls
        everythingLoaded={everthingLoaded}
        delayedMouse={delayedMouse}
      />
    </>
  ) : (
    <AudioWarning onClick={() => setSoundWarningShown(true)} />
  );
}

export default App;
