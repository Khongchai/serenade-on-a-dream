import React, { useEffect, useState } from "react";
import * as THREE from "three";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  useEffect(() => {
    THREE.DefaultLoadingManager.onProgress = function (
      _,
      itemsLoaded,
      itemsTotal
    ) {
      const progress = (itemsLoaded / itemsTotal) * 100;
      setLoadingProgress(progress);
    };
  }, []);
  return <div id="progress-bar">{loadingProgress}</div>;
};

export default Loader;
