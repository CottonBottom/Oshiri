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
  //For Other Oshiri
  currentConsent?: string;
};

export type WrappingStats = {
  wType: number;
  wSubType: number;
  wVariation: number;
  wBaseColor: number;
  wSecondaryColor: number;
  wSerialNumber: number;
};

/** Wrappings */
//TODO: Check wVariation when drawings done
//TODO: name secondary colors when done

export const wrappingTypes = [
  {
    name: "chewingGum",
    wSubType: [
      {
        name: "ball",
        wBaseColor: [
          { name: "blue", value: "#383ad2" },
          { name: "red", value: "#ca3f53" },
          { name: "green", value: "green" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "gray" },
          { name: "TODO", value: "gray" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "tallWaist", "flames", "pocket"],
      },
      {
        name: "bubble",
        wBaseColor: [
          { name: "blue", value: "blue" },
          { name: "red", value: "red" },
          { name: "pink", value: "pink" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "singleStripe", "doubleStripe", "tag"],
      },
      {
        name: "stick",
        wBaseColor: [
          { name: "green", value: "black" },
          { name: "blue", value: "black" },
          { name: "black", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
    ],
  },
  {
    name: "gummies",
    wSubType: [
      {
        name: "nutty",
        wBaseColor: [
          { name: "almond", value: "black" },
          { name: "hazelnut", value: "black" },
          { name: "peanut", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "stripes", "tartan", "dots"],
      },
      {
        name: "fruity",
        wBaseColor: [
          { name: "pineapple", value: "black" },
          { name: "lime", value: "black" },
          { name: "cherry", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "stripes", "dots", "ribbons"],
      },
      {
        name: "milky",
        wBaseColor: [
          { name: "strawberry", value: "black" },
          { name: "coffee", value: "black" },
          { name: "banana", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "panda", "polar", "grizzly"],
      },
    ],
  },
  {
    name: "cottonCandy",
    wSubType: [
      {
        name: "pals",
        wBaseColor: [
          { name: "white", value: "black" },
          { name: "pink", value: "black" },
          { name: "blue", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["cat", "rabbit", "dog", "hamster"],
      },
      {
        name: "patterns",
        wBaseColor: [
          { name: "purple", value: "black" },
          { name: "yellow", value: "black" },
          { name: "green", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "puffy",
        wBaseColor: [
          { name: "cyan", value: "black" },
          { name: "magenta", value: "black" },
          { name: "white", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "ribbons", "dots", "stripes"],
      },
    ],
  },
  {
    name: "licorice",
    wSubType: [
      {
        name: "salty",
        wBaseColor: [
          { name: "black", value: "black" },
          { name: "pink", value: "black" },
          { name: "purple", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "sideTied", "ribbon", "lace"],
      },
      {
        name: "sweet",
        wBaseColor: [
          { name: "red", value: "black" },
          { name: "black", value: "black" },
          { name: "white", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "sour",
        wBaseColor: [
          { name: "red", value: "black" },
          { name: "green", value: "black" },
          { name: "blue", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "stars", "ribbon", "dots"],
      },
    ],
  },
  {
    name: "chewable",
    wSubType: [
      {
        name: "marshmallow",
        wBaseColor: [
          { name: "classic", value: "black" },
          { name: "colorful", value: "black" },
          { name: "dehydrated", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "sours",
        wBaseColor: [
          { name: "lemon", value: "black" },
          { name: "cherry", value: "black" },
          { name: "grapefruit", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "taffy",
        wBaseColor: [
          { name: "fruity", value: "black" },
          { name: "molasses", value: "black" },
          { name: "classic", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
    ],
  },
  {
    name: "caramel",
    wSubType: [
      {
        name: "blackTea",
        wBaseColor: [
          { name: "cream", value: "black" },
          { name: "straight", value: "black" },
          { name: "lemon", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "greenTea",
        wBaseColor: [
          { name: "matcha", value: "black" },
          { name: "hojicha", value: "black" },
          { name: "genmaicha", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "milk",
        wBaseColor: [
          { name: "sweet", value: "black" },
          { name: "salty", value: "black" },
          { name: "burnt", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
    ],
  },
];
