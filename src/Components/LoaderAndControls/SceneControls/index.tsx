import { Howl } from "howler";
import React, { useMemo, useState } from "react";
import { AudioPlayer } from "../../../Types";
import { DelayedMouse } from "../../../utils/delayedMouse";
import useGetAudioPlayers from "../audio-utils/useGetHowl";
import usePlayOrPauseCurrentTrack from "../audio-utils/usePlayOrPauseCurrentTrack";
import usePlayWhenLoadingFinished from "../audio-utils/usePlayWhenLoadingFinished";
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
  allLoadingProgress: number;
  setAudioLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  delayedMouse,
  allLoadingProgress,
  setAudioLoadingProgress,
}) => {
  const [showControls, setShowControls] = useState(true);

  const audioPlayers = useGetAudioPlayers(
    [
      {
        name: "Bobbie",
        src: "./audio/audio-stitch.mp3",
      },
      {
        name: "Serenade On a Dream",
        src: "./audio/audio-serenade-on-a-dream.mp3",
      },
      {
        name: "Stitch",
        src: "./audio/audio-bobbie.mp3",
      },
      {
        name: "Andromeda",
        src: "./audio/audio-andromeda.mp3",
      },
    ],
    () => nextTrack(),
    () => updateAudioLoadingProgress()
  );

  const updateAudioLoadingProgress = () => {
    setAudioLoadingProgress((prog) => {
      return Math.min(prog + 100 / audioPlayers.length, 100);
    });
  };

  const { nextTrack, prevTrack, currentPlayer, currentTrack } =
    useTrackControls(audioPlayers);

  const { playState, switchPlayState } = usePlayOrPauseCurrentTrack(
    currentPlayer,
    currentTrack
  );

  usePlayWhenLoadingFinished(switchPlayState, allLoadingProgress);

  return (
    <>
      <div
        id="controls-wrapper"
        style={{
          background: showControls ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
          opacity: allLoadingProgress === 100 ? "1" : "0",
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
