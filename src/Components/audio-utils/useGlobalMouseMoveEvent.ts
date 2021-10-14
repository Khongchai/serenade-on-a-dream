import { useEffect } from "react";

type WhateverFn = (...args: any) => any;

export default function useGlobalMouseMoveEvent(
  onMove: (e: any) => any,
  onMouseUp: WhateverFn
) {
  const addGlobalMouseMove = () => {
    window.addEventListener("mousemove", onMove);
    return true;
  };
  const removeGlobalMouseMove = () => onMouseUp();
  useEffect(() => {
    window.addEventListener("mouseup", removeGlobalMouseMove);
    return () => window.removeEventListener("mouseup", removeGlobalMouseMove);
  }, []);

  return { triggerMoveFunction: addGlobalMouseMove };
}
