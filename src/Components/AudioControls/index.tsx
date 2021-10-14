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
      url: "./audio/audio-serenade-on-a-dream.mp3",
      name: "Serenade On a Dream",
    },
    {
      url: "./audio/audio-stitch.mp3",
      name: "Bobbie",
    },
    {
      url: "./audio/audio-bobbie.mp3",
      name: "Stitch",
    },
  ];

  const [track, setTrack] = useState(
    Math.floor(Math.random() * audioProps.length)
  );
  const nextTrack = () => {
    resetPlayerPos();
    setTrack((cur) => (cur + 1) % audioProps.length);
  };
  const prevTrack = () => {
    resetPlayerPos();
    setTrack((cur) => (cur - 1 >= 0 ? cur - 1 : audioProps.length - 1));
  };
  const resetPlayerPos = () => player && player.seek(0);

  /*
    using useMemo is a bit buggy for some reason? 
  */
  const [player, setPlayer] = useState<Howl | undefined>(undefined);
  useEffect(() => {
    player && player.stop();
    setPlayer(
      new Howl({
        src: audioProps[track].url,
        autoplay: playOrPause === "play",
        onend: () => nextTrack(),
      })
    );
  }, [track]);

  const [showControls, setShowControls] = useState(false);
  const [playOrPause, setPlayOrPause] = useState<"play" | "pause">("play");

  return (
    <>
      <div
        id="controls-wrapper"
        style={{
          background: showControls ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        }}
      >
        <CogButton onClick={() => setShowControls((stat) => !stat)} />
        <Controls showControls={showControls}>
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
    </>
  );
};

export default AudioControls;
