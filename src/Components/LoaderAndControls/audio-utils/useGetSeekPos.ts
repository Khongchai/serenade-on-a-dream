import { Howl } from "howler";
import { useEffect, useState } from "react";
import secondsToMinuteWithSeconds from "../../../utils/secondsToMinutesWithSeconds";

export default function useGetSeekData(player?: Howl) {
  const [seekPos, setSeekPos] = useState("0:00");
  const [seekPercentage, setSeekPercentage] = useState(0);

  const reflectChangeInAudio = () =>
    player?.seek((seekPercentage * player!.duration()) / 100);

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      setSeekPosition();
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    setSeekPosition();
  }, [player ? player.seek() : null]);

  function setSeekPosition() {
    if (player) {
      setSeekPos(() => secondsToMinuteWithSeconds(player.seek()));
      setSeekPercentage(() => {
        const total = player.seek() / player.duration();

        return total * 100;
      });
    }
  }

  useEffect(() => {
    reflectChangeInAudio();
  }, [seekPercentage]);

  return { seekPos, setSeekPos, seekPercentage, setSeekPercentage };
}
