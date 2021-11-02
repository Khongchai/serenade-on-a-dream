import React, { useRef } from "react";
import returnMousePositionAsPercentageOfContainer from "../../../utils/returnMousePositionAsPercentageOfContainer";

export default function useAdjust(
  faderRef: React.MutableRefObject<any>,
  fillRef: React.MutableRefObject<any>,
  allowUpdate: boolean,
  action: (percentage: number) => void
) {
  const clampedPercentage = useRef<number>(0);

  const adjust = (e?: any) => {
    if (e.type !== "mouseup" && e.type !== "touchend") {
      const percentage = returnMousePositionAsPercentageOfContainer(
        e.clientX || e.touches[0].clientX,
        faderRef.current.getBoundingClientRect().x,
        faderRef.current.clientWidth
      );
      clampedPercentage.current = Math.min(Math.max(percentage, 0), 99);
    }

    if ((e.type === "mousemove" || e.type === "touchmove") && !allowUpdate) {
      fillRef.current.style.width = clampedPercentage.current.toFixed(2) + "%";
    } else {
      action(clampedPercentage.current);
    }
  };

  return adjust;
}
