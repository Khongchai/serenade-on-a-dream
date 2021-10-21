import { useRef, useState } from "react";
import returnMousePositionAsPercentageOfContainer from "../../../utils/returnMousePositionAsPercentageOfContainer";
import useGlobalMouseMoveEvent from "../../audio-utils/useGlobalMouseMoveEvent";
import useSetFillPosition from "../../audio-utils/useSetFillLength";
import useVanillaRef from "../../audio-utils/useVanillaRef";
import "./fader.css";

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
}> = ({ position, action }) => {
  const fill = useRef<any>();
  useSetFillPosition(fill, position);

  const [touchingFader, setTouchingFader] = useState(false);

  //For vanilla js reference
  const touchingFaderRef = useVanillaRef(touchingFader);

  //This will allow the user to move the mouse anywhere while adjusting the knob
  const faderRef = useRef<any>();
  const adjust = (e: any) => {
    const percentage = returnMousePositionAsPercentageOfContainer(
      e.clientX || e.touches[0].clientX,
      faderRef.current.getBoundingClientRect().x,
      faderRef.current.clientWidth
    );
    const clampedPercentage = Math.min(Math.max(percentage, 0), 99);
    action(clampedPercentage);
  };

  const adjustIfFaderDown = (e: any) => touchingFaderRef.current && adjust(e);
  //prettier-ignore
  const { triggerMoveFunction } = useGlobalMouseMoveEvent(adjustIfFaderDown, () => setTouchingFader(false));

  return (
    <div
      className="fader"
      ref={faderRef}
      onMouseDown={() => triggerMoveFunction() && setTouchingFader(true)}
      onTouchStart={() => setTouchingFader(true)}
      onTouchEnd={() => setTouchingFader(false)}
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
