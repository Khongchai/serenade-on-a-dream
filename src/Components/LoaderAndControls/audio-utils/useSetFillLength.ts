import { useEffect } from "react";

export default function useSetFillPosition(
  seekerFill: React.MutableRefObject<any>,
  widthInPercentage: number
) {
  useEffect(() => {
    seekerFill.current.style.width = widthInPercentage.toFixed(2) + "%";
  }, [widthInPercentage]);
}
