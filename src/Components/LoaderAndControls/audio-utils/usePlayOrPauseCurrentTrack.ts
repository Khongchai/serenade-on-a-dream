import { useEffect, useState } from "react";
import { AudioPlayer } from "../../../Types";

export default function usePlayOrPauseCurrentTrack(
  currentPlayer: AudioPlayer,
  currentTrack: number
) {
  const [playState, setPlayState] = useState<"play" | "pause">("pause");

  useEffect(() => {
    playState === "play"
      ? currentPlayer.howl.play()
      : currentPlayer.howl.pause();
  }, [playState, currentTrack]);

  const switchPlayState = () =>
    setPlayState((state) => (state === "play" ? "pause" : "play"));

  return { switchPlayState, playState };
}
