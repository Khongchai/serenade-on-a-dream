import { Howl } from "howler";
import React from "react";
import "./volumeControl.css";

interface VolumeControlProps {
  player: Howl;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ player }) => {
  return (
    <div id="volume-control-container">
      <img alt="speaker-icon" src="icons/speaker-icon.png" id="speaker-icon" />
    </div>
  );
};

export default VolumeControl;
