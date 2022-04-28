import { useTranslation } from "react-i18next";
import { OshiriStats, WrappingStats, wrappingTypes } from "./constants";

export const oshiriSizeDigitToScale = (size: number) => {
  //Max 10-> 1.10,1.05
  //Min 1-> 0.95,0.95
  const scaledX = ((1.1 - 0.95) * (size - 1)) / (10 - 1) + 0.95;
  const scaledY = ((1.05 - 1.0) * (size - 1)) / (10 - 1) + 1.0;
  return `${scaledX.toFixed(2)}, ${scaledY.toFixed(2)}`;
};

export const getReadableOshiri = (myOshiri: any): OshiriStats => {
  const dateInSeconds = parseInt(myOshiri.lastDayAccessed.toString());
  const formattedDate = new Date(dateInSeconds * 1000).toISOString();
  return {
    color: myOshiri.color.toString(),
    size: myOshiri.size.toString(),
    name: myOshiri.name.toString(),
    tail: myOshiri.tail.toString(),
    tailColor: myOshiri.tailColor.toString(),
    availableConsent: myOshiri.availableConsent.toString(),
    lastDayAccessed: formattedDate,
    wornWrapping: myOshiri.wornWrapping.toString(),
  };
};

export const getOtherReadableOshiri = (response: any): OshiriStats => {
  return {
    color: response[0].color.toString(),
    size: response[0].size.toString(),
    name: response[0].name.toString(),
    tail: response[0].tail.toString(),
    tailColor: response[0].tailColor.toString(),
    wornWrapping: response[0].wornWrapping.toString(),
    currentConsent: response[1].toString(),
  };
};

export const getReadableWrapping = (wrapping: any): WrappingStats => {
  console.log("THE WRAPPING", wrapping);
  return {
    wType: wrapping.wType.toString(),
    wSubType: wrapping.wSubType.toString(),
    wVariation: wrapping.wVariation.toString(),
    wBaseColor: wrapping.wBaseColor.toString(),
    wSecondaryColor: wrapping.wSecondaryColor.toString(),
    wSerialNumber: wrapping.wSerialNumber.toString(),
  };
};

export const getWrappingName = (
  stats: WrappingStats,
  t: (key: string) => string
) => {
  //! Stats randomized for testing:
  // const stats = {
  //   wType: Math.floor(Math.random() * (6 - 1 + 1) + 1),
  //   wSubType: Math.floor(Math.random() * (3 - 1 + 1) + 1),
  //   wBaseColor: Math.floor(Math.random() * (3 - 1 + 1) + 1),
  //   wSecondaryColor: Math.floor(Math.random() * (6 - 1 + 1) + 1),
  //   wVariation: Math.floor(Math.random() * (4 - 1 + 1) + 1),
  // };
  //All the indexes are -1, since in Solidty zero is not existent
  const wType = t(wrappingTypes[stats.wType - 1].name);
  const wSubType = t(
    wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].name
  );
  const wBaseColor = t(
    wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].wBaseColor[
      stats.wBaseColor - 1
    ].name
  );
  const wSecondaryColor = t(
    wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].wSecondaryColor[
      stats.wSecondaryColor - 1
    ].name
  );
  const wVariation = t(
    wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].wVariation[
      stats.wVariation
    ]
  );

  //return `${wType} ${wSubType} ${wBaseColor} ${wSecondaryColor} ${wVariation}`;

  return `${wVariation} ${wSecondaryColor} ${wBaseColor} ${wSubType} ${wType}`;
};
