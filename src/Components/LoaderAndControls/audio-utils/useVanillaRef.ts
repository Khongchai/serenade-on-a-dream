import { useEffect, useRef } from "react";

export default function useVanillaRef<T>(stateToRef: T) {
  const ref = useRef(stateToRef);
  useEffect(() => {
    ref.current = stateToRef;
  }, [stateToRef]);

  return ref;
}
