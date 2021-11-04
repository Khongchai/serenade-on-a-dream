import { useRef, useState } from "react";
import useAdjust from "../audio-utils/useAdjust";
import useGlobalMouseMoveEvent from "../audio-utils/useGlobalMouseMoveEvent";
import useSetFillPosition from "../audio-utils/useSetFillLength";
import useUpdateFaderPosition from "../audio-utils/useUpdateFaderPosition";
import useVanillaRef from "../audio-utils/useVanillaRef";
import "./fader.css";

/*
  Note for better architecture: have a central state, faderPos state, and audioPos state.
*/
const Fader: React.FC<{
  /**
   * Action that should happen when fader is adjusted.
   * faderPercentage goes from 0 to 100
   */
  action: (faderPercentage: number) => any;

  /**
   * This will be used as the css's width percentage, so value should be in the range of 0 - 100
   */
  position: number;

  /*
    Wait until the pointer is released before performing an action.
    Example: avoid scrubbing sound when use as an audio seeker
  */
  waitTillPointerUp?: boolean;
}> = ({ position, action, waitTillPointerUp }) => {
  const [touchingFader, setTouchingFader] = useState(false);
  const allowUpdate = !waitTillPointerUp;

  const touchingFaderRef = useVanillaRef(touchingFader);
  const faderRef = useRef<any>();
  const fill = useRef<any>();

  const faderPosition = useUpdateFaderPosition(
    position,
    allowUpdate,
    touchingFader
  );

  useSetFillPosition(fill, faderPosition);

  const adjust = useAdjust(faderRef, fill, allowUpdate, action);

  const adjustIfFaderDown = (e: any) => touchingFaderRef.current && adjust(e);

  const { triggerMoveFunction } = useGlobalMouseMoveEvent(
    adjustIfFaderDown,
    (e: any) => {
      adjust(e);
      setTouchingFader(false);
    },
    touchingFader
  );

  return (
    <div
      className="fader"
      ref={faderRef}
      onMouseDown={() => {
        triggerMoveFunction();
        setTouchingFader(true);
      }}
      onTouchStart={() => setTouchingFader(true)}
      onTouchEnd={(e) => {
        adjust(e);
        setTouchingFader(false);
      }}
      onClick={(e) => {
        adjust(e);
      }}
      onTouchMove={(e: any) => touchingFader && adjust(e)}
    >
      <div className="fader-fill" style={{ pointerEvents: "none" }} ref={fill}>
        <div className="fader-knob" />
      </div>
    </div>
  );
};

export default Fader;
