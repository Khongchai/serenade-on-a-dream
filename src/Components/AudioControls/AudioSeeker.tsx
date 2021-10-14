import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import returnMousePositionAsPercentageOfContainer from "../../utils/returnMousePositionAsPercentageOfContainer";
import secondsToMinuteWithSeconds from "../../utils/secondsToMinutesWithSeconds";
import useGetSeekData from "../audio-utils/useGetSeekPos";
import useGlobalMouseMoveEvent from "../audio-utils/useGlobalMouseMoveEvent";
import useSetFillPosition from "../audio-utils/useSetFillLength";
import useVanillaRef from "../audio-utils/useVanillaRef";
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

  const seekFn = (clientX: number, boundingX: number, clientWidth: number) => {
    const percentage = returnMousePositionAsPercentageOfContainer(
      clientX,
      boundingX,
      clientWidth
    );
    const clmapedPercentage = Math.min(Math.max(percentage, 0), 99);
    setSeekPercentage(clmapedPercentage);
  };

  return (
    <div id="seeker-wrapper">
      <p>{seekPos}</p>
      <Seeker seekFn={seekFn} position={seekPercentage} />
      <p>{duration}</p>
    </div>
  );
};

export default SeekerContainer;

const Seeker: React.FC<{
  seekFn: (clientX: number, boundingX: number, clientWidth: number) => any;
  position: number;
}> = ({ seekFn, position }) => {
  const fill = useRef<any>();
  useSetFillPosition(fill, position);

  const [touchingFader, setTouchingFader] = useState(false);

  //For vanilla js reference
  const touchingFaderRef = useVanillaRef(touchingFader);

  //This will allow the user to move the mouse anywhere while adjusting the knob
  const seekerRef = useRef<any>();
  const seek = (e: any) =>
    seekFn(
      e.clientX,
      seekerRef.current.getBoundingClientRect().x,
      seekerRef.current.clientWidth
    );
  const seekIfFaderDown = (e: any) => touchingFaderRef.current && seek(e);
  //prettier-ignore
  const { triggerMoveFunction } = useGlobalMouseMoveEvent(seekIfFaderDown, () => setTouchingFader(false));

  return (
    <div
      id="seeker"
      ref={seekerRef}
      onMouseDown={() => triggerMoveFunction() && setTouchingFader(true)}
      onTouchStart={() => setTouchingFader(true)}
      onTouchEnd={() => setTouchingFader(false)}
      onClick={(e) => {
        seek(e);
      }}
      onTouchMove={(e: any) => touchingFader && seek(e)}
    >
      <div id="seeker-fill" style={{ pointerEvents: "none" }} ref={fill}>
        <div id="seeker-knob" />
      </div>
    </div>
  );
};
