import { useEffect, useRef } from "react";
import { DelayedMouse } from "../../../utils/delayedMouse";

export default function useDelayedMouse(sceneAutoRotate: boolean) {
  const delayedMouse = useRef(new DelayedMouse(0.03, sceneAutoRotate));
  useEffect(() => {
    delayedMouse.current.setAutoPan(sceneAutoRotate);
  }, [sceneAutoRotate]);
  return { delayedMouse };
}
