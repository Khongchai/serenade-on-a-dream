import { useEffect } from "react";

export default function usePlayWhenLoadingFinished(
  switchPlayState: Function,
  loadingProgress: number
) {
  useEffect(() => {
    if (loadingProgress === 100) {
      switchPlayState();
    }
  }, [loadingProgress]);
}
