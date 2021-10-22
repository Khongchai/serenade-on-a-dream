import { Howl, HowlCallback } from "howler";
import { useMemo } from "react";

export default function useGetAudioPlayers(
  audioDetails: {
    src: string;
    name: string;
  }[],
  onend: HowlCallback,
  onload: HowlCallback
) {
  const audioPlayers = useMemo(() => {
    return audioDetails.map((detail) => ({
      howl: new Howl({
        src: detail.src,
        /*
        Do this instead of passing the pointer to prevent the 
        function running before some necessary initializations.
      */
        onend,
        onload,
      }),
      name: detail.name,
    }));
  }, []);

  return audioPlayers;
}
