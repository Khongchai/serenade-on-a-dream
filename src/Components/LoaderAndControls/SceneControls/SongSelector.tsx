import React from "react";
import "./SongSelector.css";

interface SongSelectorProps {
  onClickForward: () => any;
  onClickBackward: () => any;
  songName: string;
}

const SongSelector: React.FC<SongSelectorProps> = ({
  onClickBackward,
  onClickForward,
  songName,
}) => {
  return (
    <div id="song-selector-wrapper">
      <img
        src="icons/chevron-left.svg"
        width="20px"
        height="20px"
        onClick={onClickBackward}
        className="chevrons"
      />
      <p>
        Now playing: <b>{songName}</b>
      </p>
      <img
        src="icons/chevron-right.svg"
        width="20px"
        height="20px"
        onClick={onClickForward}
        className="chevrons"
      />
    </div>
  );
};

export default SongSelector;
