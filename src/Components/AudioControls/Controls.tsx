import React from "react";
import "./controls.css";

const Controls: React.FC<{ showControls: boolean }> = ({
  children,
  showControls,
}) => {
  return (
    <div id="controls" style={{ opacity: showControls ? "1" : "0" }}>
      {children}
    </div>
  );
};

export default Controls;
