import React from "react";
import "./index.css";

interface AudioWarningProps {
  onClick: () => any;
}

const AudioWarning: React.FC<AudioWarningProps> = ({ onClick }) => {
  return (
    <div id="audio-warning-wrapper">
      <div style={{ display: "grid" }}>
        <div style={{ color: "white" }}>This site contains audio</div>
        <button className="generic-button" onClick={onClick}>
          I Acknowledge
        </button>
      </div>
    </div>
  );
};

export default AudioWarning;
