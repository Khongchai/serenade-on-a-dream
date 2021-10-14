import React from "react";
import "./SceneAutoRotateSwitch.css";

interface SceneAutoRotateSwitchProps {
  sceneAutoRotate: boolean;
  setSceneAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
}

const SceneAutoRotateSwitch: React.FC<SceneAutoRotateSwitchProps> = ({
  sceneAutoRotate,
  setSceneAutoRotate,
}) => {
  return (
    <div onClick={() => setSceneAutoRotate((state) => !state)}>
      <p id="switch">
        Scene Auto Rotate: <b>{sceneAutoRotate ? "On" : "Off"}</b>
      </p>
    </div>
  );
};

export default SceneAutoRotateSwitch;
