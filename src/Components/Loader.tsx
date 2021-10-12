import React, { LegacyRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { backgroundColor } from "../const";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  const progressContainer = useRef<HTMLElement>();
  const [loadingProgress, setLoadingProgress] = useState("0");

  useEffect(() => {
    THREE.DefaultLoadingManager.onProgress = function (
      _,
      itemsLoaded,
      itemsTotal
    ) {
      const progress = (itemsLoaded / itemsTotal) * 100;

      setLoadingProgress(progress.toFixed(0));
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

    THREE.DefaultLoadingManager.onLoad = function () {
      if (progressContainer.current) {
        progressContainer.current.classList.add("slowly-fadeout-and-poof");
        progressContainer.current.onanimationend = () => {
          progressContainer.current!.style.opacity = "0";
          progressContainer.current!.style.display = "none";
        };
      }
    };
  }, []);

  return (
    <div id="progress-container" ref={progressContainer as any}>
      <div>
        <p id="progress">Loading: {loadingProgress}%</p>
      </div>
    </div>
  );
};

export default Loader;
