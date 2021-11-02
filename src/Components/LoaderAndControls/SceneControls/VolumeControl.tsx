import { Howl } from "howler";
import React, { useState } from "react";
import Fader from "./Fader";
import "./volumeControl.css";

interface VolumeControlProps {
  player: Howl;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ player }) => {
  const [volumeLevel, setVolumeLevel] = useState(player.volume());
  const adjustVolume = (faderPercentage: number) => {
    player.volume(faderPercentage / 100);
    setVolumeLevel(player.volume());
  };

  return (
    <div id="volume-control-container">
      <img alt="speaker-icon" src="icons/speaker-icon.png" id="speaker-icon" />
      <Fader
        waitTillPointerUp={false}
        position={volumeLevel * 100}
        action={adjustVolume}
      />
    </div>
  );
};

export default VolumeControl;
