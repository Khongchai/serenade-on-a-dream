import { Howl } from "howler";

export type AudioProps = {
  url: string;
  name: string;
};

export type AudioPlayer = {
  howl: Howl;
  name: string;
};
