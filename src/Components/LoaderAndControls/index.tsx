import { useEffect, useState } from "react";
import { DelayedMouse } from "../../utils/delayedMouse";
import AudioControlsAndLoader from "./SceneControls";
import Progress from "./AllProgressDisplay";
import AnimationLoaderAndProgressDisplay from "./AnimationLoader";

//Moved here to prevent rerender when loadingFinished is set to true
export default function LoaderAndControls({
  delayedMouse,
}: {
  delayedMouse: React.MutableRefObject<DelayedMouse>;
}) {
  //Refactor to custom component
  const [animationLoadingProgress, setAnimationLoadingProgress] = useState(0);
  const [audioLoadingProgress, setAudioLoadingProgress] = useState(0);
  const [allLoadingProgress, setAllLoadingProgress] = useState(0);
  useEffect(() => {
    setAllLoadingProgress(
      (animationLoadingProgress + audioLoadingProgress) / 2
    );
  }, [animationLoadingProgress, audioLoadingProgress]);

  return (
    <>
      <AnimationLoaderAndProgressDisplay
        allLoadingProgress={allLoadingProgress}
        setAnimationLoadingProgress={setAnimationLoadingProgress}
      >
        <Progress progress={allLoadingProgress} />
      </AnimationLoaderAndProgressDisplay>
      <AudioControlsAndLoader
        setAudioLoadingProgress={setAudioLoadingProgress}
        delayedMouse={delayedMouse}
        allLoadingProgress={allLoadingProgress}
      />
    </>
  );
}
