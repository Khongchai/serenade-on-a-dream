import { Howl } from "howler";
import { useEffect, useState } from "react";
import secondsToMinuteWithSeconds from "../../utils/secondsToMinutesWithSeconds";

export default function useGetSeekData(player?: Howl) {
  const [seekPos, setSeekPos] = useState("0:00");
  const [seekPercentage, setSeekPercentage] = useState(0);

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      manageSeekPos();
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    manageSeekPos();
  }, [player ? player.seek() : null]);

  useEffect(() => {
    player?.seek((seekPercentage * player!.duration()) / 100);
  }, [seekPercentage]);

  function manageSeekPos() {
    if (player) {
      setSeekPos(() => secondsToMinuteWithSeconds(player.seek()));
      setSeekPercentage(() => {
        const total = player.seek() / player.duration();
        return total * 100;
      });
    }
  }

  return { seekPos, setSeekPos, seekPercentage, setSeekPercentage };
}
