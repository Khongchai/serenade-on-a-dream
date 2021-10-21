import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { backgroundColor } from "../../const";

interface LoaderProps {
  setAnimationLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
  allLoadingProgress: number;
}

const AnimationLoader: React.FC<LoaderProps> = ({
  setAnimationLoadingProgress,
  allLoadingProgress,
  children,
}) => {
  const progressContainer = useRef<HTMLElement>();

  useEffect(() => {
    THREE.DefaultLoadingManager.onProgress = function (
      _,
      itemsLoaded,
      itemsTotal
    ) {
      const progress = (itemsLoaded / itemsTotal) * 100;

      setAnimationLoadingProgress(progress);
      if (progressContainer) {
        /**
         * use percentage make background color fade to backgroundColor from default (as of writing, white).
         */
        const prog = progress / 100;

        //target rgb
        const [r, g, b] = backgroundColor.rgb;

        //values to subtract from white
        const { vr, vg, vb } = {
          vr: (255 - r) * prog,
          vg: (255 - g) * prog,
          vb: (255 - b) * prog,
        };

        progressContainer.current!.style.backgroundColor = `rgb(${255 - vr}, ${
          255 - vg
        }, ${255 - vb})`;
      }
    };
  }, []);

  useEffect(() => {
    if (progressContainer.current && allLoadingProgress === 100) {
      progressContainer.current.classList.add("slowly-fadeout-and-poof");
      progressContainer.current.onanimationend = () => {
        progressContainer.current!.style.opacity = "0";
        progressContainer.current!.style.display = "none";
      };
    }
  }, [allLoadingProgress]);

  return (
    <div id="progress-container" ref={progressContainer as any}>
      <div>{children}</div>
    </div>
  );
};

export default AnimationLoader;
