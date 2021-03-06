import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import Fader from "./Fader";
import "./volumeControl.css";

interface VolumeControlProps {
  player: Howl;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ player }) => {
  const [volumeLevel, setVolumeLevel] = useState(0.6);

  const adjustVolume = (faderPercentage: number) => {
    setVolumeLevel(faderPercentage / 100);
  };

  useEffect(() => {
    player.volume(volumeLevel);
  }, [player, volumeLevel]);

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
