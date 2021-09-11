import { Canvas } from "@react-three/fiber";
import Scene from "./Components/Scene";

function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 0, 10] }}
    >
      <Scene />
    </Canvas>
  );
}

export default App;
