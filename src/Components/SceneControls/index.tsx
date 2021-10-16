import { Howl } from "howler";
import React, { useMemo, useState } from "react";
import { AudioPlayer } from "../../Types";
import { DelayedMouse } from "../../utils/delayedMouse";
import usePlayOrPauseCurrentTrack from "../audio-utils/usePlayOrPauseCurrentTrack";
import useTrackControls from "../audio-utils/useTrackControls";
import AudioSeeker from "./AudioSeeker";
import CogButton from "./CogButton";
import Hideable from "./Hideable";
import "./index.css";
import PlayOrPauseButton from "./PlayOrPauseButton";
import SceneAutoRotateSwitch from "./SceneAutoRotateSwitch";
import SongSelector from "./SongSelector";
import VolumeControl from "./VolumeControl";

interface AudioControlsProps {
  delayedMouse: React.MutableRefObject<DelayedMouse>;
  loadingFinished: boolean;
}
const AudioControls: React.FC<AudioControlsProps> = ({
  delayedMouse,
  loadingFinished,
}) => {
  const [showControls, setShowControls] = useState(true);

  const audioPlayers: AudioPlayer[] = useMemo(() => {
    return [
      {
        howl: new Howl({
          src: "./audio/audio-serenade-on-a-dream.mp3",
          onend: () => nextTrack(),
        }),
        name: "Serenade On a Dream",
      },
      {
        howl: new Howl({
          src: "./audio/audio-stitch.mp3",
          onend: () => nextTrack(),
        }),
        name: "Stitch",
      },
      {
        howl: new Howl({
          src: "./audio/audio-bobbie.mp3",
          onend: () => nextTrack(),
        }),
        name: "Bobbie",
      },
      {
        howl: new Howl({
          src: "./audio/audio-andromeda.mp3",
          onend: () => nextTrack(),
        }),
        name: "Andromeda",
      },
    ];
  }, []);

  const { nextTrack, prevTrack, currentPlayer, currentTrack } =
    useTrackControls(audioPlayers);

  const { playState, switchPlayState } = usePlayOrPauseCurrentTrack(
    currentPlayer,
    currentTrack
  );

  return (
    <>
      <div
        id="controls-wrapper"
        style={{
          background: showControls ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
          opacity: loadingFinished ? "1" : "0",
        }}
      >
        <div id="left-flex">
          <CogButton onClick={() => setShowControls((stat) => !stat)} />
          <Hideable
            showControls={showControls}
            divProps={{ id: "left-flex-hideable" }}
          >
            <div className="double-component-container">
              <SongSelector
                onClickBackward={() => prevTrack()}
                onClickForward={() => nextTrack()}
                songName={currentPlayer.name}
              />
              <PlayOrPauseButton
                onClick={() => {
                  switchPlayState();
                }}
                playOrPause={playState}
              />
            </div>
          </Hideable>
        </div>
        <Hideable showControls={showControls} divProps={{ id: "mid-flex" }}>
          <AudioSeeker player={currentPlayer.howl} />
        </Hideable>
        <Hideable showControls={showControls} divProps={{ id: "right-flex" }}>
          <div className="double-component-container">
            <VolumeControl player={currentPlayer.howl} />
            <SceneAutoRotateSwitch delayedMouse={delayedMouse} />
          </div>
        </Hideable>
      </div>
    </>
  );
};

export default AudioControls;
