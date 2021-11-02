import { useEffect, useState } from "react";

export default function useUpdateFaderPosition(
  position: number,
  allowUpdate: boolean,
  touchingFader: boolean
) {
  const [faderPosition, setFaderPosition] = useState(position);
  useEffect(() => {
    (allowUpdate || !touchingFader) && setFaderPosition(position);
  }, [position]);

  return faderPosition;
}
