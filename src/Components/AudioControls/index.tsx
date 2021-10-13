import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { AudioProps } from "../../Types";
import AudioSeeker from "./AudioSeeker";
import CogButton from "./CogButton";
import Controls from "./Controls";
import "./index.css";
import PlayOrPauseButton from "./PlayOrPauseButton";
import SongSelector from "./SongSelector";

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
  const nextTrack = () => setTrack((cur) => (cur + 1) % audioProps.length);
  const prevTrack = () =>
    setTrack((cur) => (cur - 1 >= 0 ? cur - 1 : audioProps.length - 1));

  /*
    using useMemo is a bit buggy for some reason? 
  */
  const [player, setPlayer] = useState<Howl | undefined>(undefined);
  useEffect(() => {
    player && player.stop();
    setPlayer(
      new Howl({ src: audioProps[track].url, autoplay: playOrPause === "play" })
    );
  }, [track]);

  const [showControls, setShowControls] = useState(false);
  const [playOrPause, setPlayOrPause] = useState<"play" | "pause">("play");

  return (
    <>
      {showControls ? (
        <div id="controls-wrapper">
          <CogButton onClick={() => setShowControls((stat) => !stat)} />
          <Controls>
            <div
              style={{
                width: "fit-content",
                display: "grid",
                placeItems: "center",
                flex: "1",
              }}
            >
              <SongSelector
                onClickBackward={() => prevTrack()}
                onClickForward={() => nextTrack()}
                songName={audioProps[track].name}
              />
              <PlayOrPauseButton
                onClick={() => {
                  setPlayOrPause((state) =>
                    state === "play" ? "pause" : "play"
                  );
                  if (player) {
                    playOrPause === "play" ? player.pause() : player.play();
                  }
                }}
                playOrPause={playOrPause}
              />
            </div>
            <AudioSeeker player={player} />
          </Controls>
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
