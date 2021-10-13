import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import returnMousePositionAsPercentageOfContainer from "../../utils/returnMousePositionAsPercentageOfContainer";
import secondsToMinuteWithSeconds from "../../utils/secondsToMinutesWithSeconds";
import "./audioSeeker.css";

interface AudioSeekerProps {
  player?: Howl;
}

const SeekerContainer: React.FC<AudioSeekerProps> = ({ player }) => {
  const duration = player
    ? secondsToMinuteWithSeconds(player.duration())
    : "0:00";
  const [seekPercentage, setSeekpercentage] = useState(0);

  const seek = () => {};

  return (
    <div id="seeker-wrapper">
      <p>0:00</p>
      <Seeker
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const percentage = returnMousePositionAsPercentageOfContainer(
            e.clientX,
            (e.target as HTMLElement).getBoundingClientRect().x,
            (e.target as HTMLElement).clientWidth
          );
          setSeekpercentage(percentage);
        }}
        position={seekPercentage}
      />
      <p>{duration}</p>
    </div>
  );
};

export default SeekerContainer;

const Seeker: React.FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  position: number;
}> = ({ onClick, position }) => {
  const fill = useRef<any>();
  useEffect(() => {
    fill.current.style.transform = `translateX(${-100 + position}%)`;
  }, [position]);

  return (
    <div id="seeker" onClick={(e) => onClick(e)}>
      <div id="seeker-fill" ref={fill} />
    </div>
  );
};
