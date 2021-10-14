import { Howl } from "howler";
import React from "react";
import returnMousePositionAsPercentageOfContainer from "../../utils/returnMousePositionAsPercentageOfContainer";
import secondsToMinuteWithSeconds from "../../utils/secondsToMinutesWithSeconds";
import useGetSeekData from "../audio-utils/useGetSeekPos";
import "./audioSeeker.css";
import Fader from "./Fader";

interface AudioSeekerProps {
  player?: Howl;
}

const SeekerContainer: React.FC<AudioSeekerProps> = ({ player }) => {
  const duration = player
    ? secondsToMinuteWithSeconds(player.duration())
    : "0:00";

  const {
    seekPercentage,
    seekPos,
    setSeekPercentage,
    setSeekPos: _,
  } = useGetSeekData(player);

  return (
    <div id="audio-seeker-wrapper">
      <p>{seekPos}</p>
      <Fader
        action={(faderPercentage) => setSeekPercentage(faderPercentage)}
        position={seekPercentage}
      />
      <p>{duration}</p>
    </div>
  );
};

export default SeekerContainer;
