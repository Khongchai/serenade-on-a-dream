import { useState, useEffect } from "react";

export default function useLoadingProgress() {
  const [animationLoadingProgress, setAnimationLoadingProgress] = useState(0);
  const [audioLoadingProgress, setAudioLoadingProgress] = useState(0);
  const [allLoadingProgress, setAllLoadingProgress] = useState(0);
  useEffect(() => {
    setAllLoadingProgress(
      (animationLoadingProgress + audioLoadingProgress) / 2
    );
  }, [animationLoadingProgress, audioLoadingProgress]);

  return {
    setAnimationLoadingProgress,
    setAudioLoadingProgress,
    allLoadingProgress,
  };
}
