import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { AudioProps } from "../../Types";
import CogButton from "./CogButton";
import Controls from "./Controls";
import "./index.css";

const AudioControls: React.FC = ({}) => {
  const audioProps: AudioProps[] = [
    {
      url: "./audio/audio-stitch.mp3",
      name: "Bobbie",
    },
    {
      url: "./audio/audio-bobbie.mp3",
      name: "Stitch",
    },
  ];

  const [track, setTrack] = useState(1);
  function cycleThroughTrack() {
    setTrack((cur) => (cur + 1) % audioProps.length);
  }

  /*
    using useMemo is a bit buggy for some reason? 
  */
  const [player, setPlayer] = useState<Howl>();
  useEffect(() => {
    setPlayer(new Howl({ src: audioProps[track].url, autoplay: true }));
  }, []);

  const [showControls, setShowControls] = useState(false);

  return (
    <>
      {showControls ? (
        <div id="controls-wrapper">
          <CogButton onClick={() => setShowControls((stat) => !stat)} />
          <div>
            <Controls></Controls>
          </div>
        </div>
      ) : (
        <div id="controls-wrapper-invisible">
          <CogButton onClick={() => setShowControls((stat) => !stat)} />
        </div>
      )}
    </>
  );
};

export default AudioControls;
