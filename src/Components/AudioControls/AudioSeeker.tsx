import { Howl } from "howler";
import React, { TouchEvent, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    fill.current.style.width = position.toFixed(2) + "%";
  }, [position]);

  const [touchingFader, setTouchingFader] = useState(false);
  //For vanilla js reference
  const touchingFaderRef = useRef(touchingFader);
  useEffect(() => {
    touchingFaderRef.current = touchingFader;
  }, [touchingFader]);

  const seek = (e: any) =>
    touchingFader &&
    seekFn(
      e.clientX || e.touches[0].clientX,
      e.target.getBoundingClientRect().x,
      e.target.clientWidth
    );

  /**
   * This will allow the user to move the mouse anywhere while adjusting the knob
   */
  const seekerRef = useRef<any>();
  const globalMouseMove = (e: any) => {
    if (touchingFaderRef.current) {
      seekFn(
        e.clientX,
        seekerRef.current.getBoundingClientRect().x,
        seekerRef.current.clientWidth
      );
    }
  };

  const addGlobalMouseMove = () => {
    window.addEventListener("mousemove", globalMouseMove);
    return true;
  };
  const removeGlobalMouseMove = () => {
    setTouchingFader(false);
  };
  useEffect(() => {
    window.addEventListener("mouseup", removeGlobalMouseMove);
    return () => window.removeEventListener("mouseup", removeGlobalMouseMove);
  }, []);

  return (
    <div
      id="seeker"
      ref={seekerRef}
      onMouseDown={() => addGlobalMouseMove() && setTouchingFader(true)}
      onTouchStart={() => setTouchingFader(true)}
      onTouchEnd={() => setTouchingFader(false)}
      onTouchMove={seek}
    >
      <div id="seeker-fill" style={{ pointerEvents: "none" }} ref={fill}>
        <div id="seeker-knob" />
      </div>
    </div>
  );
};
