//TODO: Data structure for Wrappings

export const skinTones = [
  "white",
  "#c58c85",
  "#ecbcb4",
  "#d1a3a4",
  "#a1665e",
  "#503335",
  "#592f2a",
];

export const tails = ["black", "red", "blue", "yellow", "orange", "green"];

export const tailColors = [
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
  tailColor: number;
  availableConsent?: number;
  lastDayAccessed?: string;
  wornWrapping?: string;
};

export type WrappingStats = {
  wType: number;
  wSubType: number;
  wVariation: string;
  wBaseColor: number;
  wVariationColor: number;
  wSerialNumber: number;
};
