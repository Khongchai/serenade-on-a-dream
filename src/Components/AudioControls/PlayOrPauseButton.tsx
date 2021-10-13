import React from "react";
import "./PlayOrPauseButton.css";

interface PlayOrPauseButtonProps {
  playOrPause: "play" | "pause";
  onClick: () => any;
}

const PlayOrPauseButton: React.FC<PlayOrPauseButtonProps> = ({
  playOrPause,
  onClick,
}) => {
  return (
    <div id="play-pause-wrapper" onClick={onClick}>
      {playOrPause === "play" ? (
        <img
          alt="pause-button"
          src="icons/pause.svg"
          className="play-pause-buttons"
        />
      ) : (
        <img
          alt="play-button"
          src="icons/play.svg"
          className="play-pause-buttons"
        />
      )}
    </div>
  );
};

export default PlayOrPauseButton;
