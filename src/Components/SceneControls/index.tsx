import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { AudioProps } from "../../Types";
import { DelayedMouse } from "../../utils/delayedMouse";
import AudioSeeker from "./AudioSeeker";
import CogButton from "./CogButton";
import Controls from "./Controls";
import "./index.css";
import PlayOrPauseButton from "./PlayOrPauseButton";
import SceneAutoRotateSwitch from "./SceneAutoRotateSwitch";
import SongSelector from "./SongSelector";
import VolumeControl from "./VolumeControl";

interface AudioControlsProps {
  delayedMouse: React.MutableRefObject<DelayedMouse>;
}
const AudioControls: React.FC<AudioControlsProps> = ({ delayedMouse }) => {
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
        <div></div>
        <CogButton onClick={() => setShowControls((stat) => !stat)} />
        <Controls showControls={showControls}>
          <div
            className="double-component-container"
            style={{
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
          <div
            style={{ flex: 0.4, width: "100%" }}
            className="double-component-container"
          >
            {player ? <VolumeControl player={player} /> : null}
            <SceneAutoRotateSwitch delayedMouse={delayedMouse} />
          </div>
        </Controls>
      </div>
    </>
  );
};

export default AudioControls;