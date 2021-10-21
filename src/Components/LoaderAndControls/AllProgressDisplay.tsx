import React from "react";

interface progressProps {
  progress: number;
}

const Progress: React.FC<progressProps> = ({ progress }) => {
  return (
    <div>
      <p id="progress">Loading: {progress.toFixed(0)}%</p>
    </div>
  );
};

export default Progress;
