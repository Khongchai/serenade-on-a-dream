import { useEffect, useState } from "react";
import { AudioPlayer } from "../../Types";

/**
 * Controls track change and returns the current player
 */
export default function useGetTrackControls(audioPlayers: AudioPlayer[]) {
  const [track, setTrack] = useState(
    Math.floor(Math.random() * audioPlayers.length)
  );

  const nextTrack = () => {
    resetPlayerPos();
    audioPlayers[track].howl.stop();
    setTrack((cur) => (cur + 1) % audioPlayers.length);
  };

  const prevTrack = () => {
    resetPlayerPos();
    audioPlayers[track].howl.stop();
    setTrack((cur) => (cur - 1 >= 0 ? cur - 1 : audioPlayers.length - 1));
  };

  const resetPlayerPos = () => audioPlayers[track].howl.seek(0);

  return {
    nextTrack,
    prevTrack,
    currentPlayer: audioPlayers[track],
    currentTrack: track,
  };
}
