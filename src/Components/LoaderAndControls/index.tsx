import { useEffect, useState } from "react";
import { DelayedMouse } from "../../utils/delayedMouse";
import AudioControlsAndAudioLoader from "./SceneControls";
import Progress from "./AllProgressDisplay";
import AnimationLoaderAndProgressDisplay from "./AnimationLoader";
import useLoadingProgress from "./audio-utils/useLoadingProgress";

//Moved here to prevent rerender when loadingFinished is set to true
export default function LoaderAndControls({
  delayedMouse,
}: {
  delayedMouse: React.MutableRefObject<DelayedMouse>;
}) {
  //Refactor to custom component
  const {
    allLoadingProgress,
    setAnimationLoadingProgress,
    setAudioLoadingProgress,
  } = useLoadingProgress();

  return (
    <>
      <AnimationLoaderAndProgressDisplay
        allLoadingProgress={allLoadingProgress}
        setAnimationLoadingProgress={setAnimationLoadingProgress}
      >
        <Progress progress={allLoadingProgress} />
      </AnimationLoaderAndProgressDisplay>
      <AudioControlsAndAudioLoader
        setAudioLoadingProgress={setAudioLoadingProgress}
        delayedMouse={delayedMouse}
        allLoadingProgress={allLoadingProgress}
      />
    </>
  );
}
