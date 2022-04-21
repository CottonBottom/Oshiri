import { OshiriStats } from "./constants";

export const oshiriSizeDigitToScale = (size: number) => {
  //Max 10-> 1.10,1.05
  //Min 1-> 0.95,0.95
  const scaledX = ((1.1 - 0.95) * (size - 1)) / (10 - 1) + 0.95;
  const scaledY = ((1.05 - 1.0) * (size - 1)) / (10 - 1) + 1.0;
  return `${scaledX.toFixed(2)}, ${scaledY.toFixed(2)}`;
};

export const getReadableOshiri = (createdOshiri: any): OshiriStats => {
  const dateInSeconds = parseInt(createdOshiri.lastDayAccessed.toString());
  const formattedDate = new Date(dateInSeconds * 1000).toISOString();
  return {
    color: createdOshiri.color.toString(),
    size: createdOshiri.size.toString(),
    name: createdOshiri.name.toString(),
    tail: createdOshiri.tail.toString(),
    tailColor: createdOshiri.tailColor.toString(),
    availableConsent: createdOshiri.availableConsent.toString(),
    lastDayAccessed: formattedDate,
    wornWrapping: createdOshiri.wornWrapping.toString(),
  };
};
