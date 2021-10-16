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
      <button className="generic-button" style={{ padding: "2px 1rem" }}>
        <p>
          Follow Cursor: <b>{autoPan ? "Off" : "On"}</b>
        </p>
      </button>
    </div>
  );
};

export default SceneAutoRotateSwitch;
