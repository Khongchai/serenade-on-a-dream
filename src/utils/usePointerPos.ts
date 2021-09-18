import { useEffect, useState } from "react";

//Pointer position for both touchmove and mousemove
export default function usePointerPos() {
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    window.addEventListener("mousemove", setNormalize);
    window.addEventListener("touchmove", setNormalize);

    return () => {
      window.removeEventListener("mousemove", setNormalize);
      window.removeEventListener("touchmove", setNormalize);
    };
  }, []);

  function setNormalize(e: MouseEvent | TouchEvent) {
    if (e.type === "mousemove") {
      setPointerPos({
        x: ((e as MouseEvent).clientX / window.innerWidth) * 2 - 1,
        y: -((e as MouseEvent).clientY / window.innerHeight) * 2 + 1,
      });
    } else {
      setPointerPos({
        x: ((e as TouchEvent).touches[0].clientX / window.innerWidth) * 2 - 1,
        y: -((e as TouchEvent).touches[0].clientY / window.innerHeight) * 2 + 1,
      });
    }
  }

  return { pointerPos };
}
