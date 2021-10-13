import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import returnMousePositionAsPercentageOfContainer from "../../utils/returnMousePositionAsPercentageOfContainer";
import secondsToMinuteWithSeconds from "../../utils/secondsToMinutesWithSeconds";
import useGetSeekData from "../audio-utils/useGetSeekPos";
import "./audioSeeker.css";

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
    <div id="seeker-wrapper">
      <p>{seekPos}</p>
      <Seeker
        onClick={(clientX: number, boundingX: number, clientWidth: number) => {
          const percentage = returnMousePositionAsPercentageOfContainer(
            clientX,
            boundingX,
            clientWidth
          );
          setSeekPercentage(percentage);
        }}
        position={seekPercentage}
      />
      <p>{duration}</p>
    </div>
  );
};

export default SeekerContainer;

const Seeker: React.FC<{
  onClick: (clientX: number, boundingX: number, clientWidth: number) => any;
  position: number;
}> = ({ onClick, position }) => {
  const fill = useRef<any>();
  useEffect(() => {
    fill.current.style.width = position.toFixed(2) + "%";
  }, [position]);

  return (
    <div
      id="seeker"
      onClick={(e: any) => {
        onClick(
          e.clientX,
          e.target.getBoundingClientRect().x,
          e.target.clientWidth
        );
      }}
    >
      <div id="seeker-fill" style={{ pointerEvents: "none" }} ref={fill} />
    </div>
  );
};
