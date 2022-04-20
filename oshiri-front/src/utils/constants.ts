export const skinTones = [
  "#c58c85",
  "#ecbcb4",
  "#d1a3a4",
  "#a1665e",
  "#503335",
  "#592f2a",
];

export const tails = ["one", "two", "three", "four", "five"];

export const tailTones = [
  "lightpink",
  "powderblue",
  "palegreen",
  "plum",
  "peachpuff",
];

export enum Stories {
  none,
  //Intro
  oshiriIntro,
  wrappingIntro,
  //Errors
  noWrappingError,
}

export type OshiriStats = {
  color: number;
  size: number;
  name: string;
  tail: number;
  tailTone: number;
  availableConsent?: number;
  lastDayAccessed?: number;
  wronWrapping?: number;
};
