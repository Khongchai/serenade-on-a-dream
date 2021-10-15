import React, { useState } from "react";
import { DelayedMouse } from "../../utils/delayedMouse";
import "./SceneAutoRotateSwitch.css";

interface SceneAutoRotateSwitchProps {
  delayedMouse: React.MutableRefObject<DelayedMouse>;
}

const SceneAutoRotateSwitch: React.FC<SceneAutoRotateSwitchProps> = ({
  delayedMouse,
}) => {
  const [autoPan, setAutoPan] = useState(delayedMouse.current.autopan);
  return (
    <div
      onClick={() => {
        delayedMouse.current.setAutoPan(!delayedMouse.current.autopan);
        setAutoPan(delayedMouse.current.autopan);
      }}
    >
      <p id="switch">
        Scene Auto Rotate: <b>{autoPan ? "On" : "Off"}</b>
      </p>
    </div>
  );
};

export default SceneAutoRotateSwitch;
