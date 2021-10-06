import React, { LegacyRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { backgroundColor } from "./const";

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
        const [r, g, b] = backgroundColor.rgb;
        const currentColor = { r: prog * r, g: prog * g, b: prog * b };
        progressContainer.current!.style.backgroundColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
      }
    };

    THREE.DefaultLoadingManager.onLoad = function () {
      if (progressContainer.current) {
        progressContainer.current.classList.add("slowly-fadeout-and-poof");
        progressContainer.current.onanimationend = () => {
          progressContainer.current!.style.opacity = "0";
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
