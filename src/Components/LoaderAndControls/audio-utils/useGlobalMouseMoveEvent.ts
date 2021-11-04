import { useEffect, useRef } from "react";

export default function useGlobalMouseMoveEvent(
  onMove: (e: any) => any,
  onMouseUp: (e: any) => any,
  touchingFader: boolean
) {
  const mouseUpRef = useRef(onMouseUp);
  const mouseMoveRef = useRef(onMove);

  const addGlobalMouseMove = () => {
    window.addEventListener("mousemove", mouseMoveRef.current);
    window.addEventListener("mouseup", mouseUpRef.current);
  };

  useEffect(() => {
    if (!touchingFader) {
      window.removeEventListener("mouseup", mouseUpRef.current);
      window.removeEventListener("mousemove", mouseMoveRef.current);
    }
  }, [touchingFader]);

  useEffect(() => {
    return () => window.removeEventListener("mouseup", mouseUpRef.current);
  }, []);

  return { triggerMoveFunction: addGlobalMouseMove };
}
