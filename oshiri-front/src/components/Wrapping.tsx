import ipfsUrls from "../assets/ipfsUrls.json";
import { WrappingStats, wrappingTypes } from "../utils/constants";

type Props = {
  oshiriSize: string;
  wrappingStats: WrappingStats;
};

//TODO: Fix illustrations:
//1: Must be divided in three parts (same as Oshiri)???
//!2: Buttocks must be cleaned up of overlapping elements
//3: Variations must be divided into three parts (as neccesary)???

const Wrapping = ({ oshiriSize, wrappingStats }: Props) => {
  /**  TODO: Get urls with names */
  const baseName = wrappingTypes[wrappingStats.wType - 1].name;
  const variationName =
    wrappingTypes[wrappingStats.wType - 1].wSubType[wrappingStats.wSubType - 1]
      .name;
  /** */
  const baseColor =
    wrappingTypes[wrappingStats.wType - 1].wSubType[wrappingStats.wSubType - 1]
      .wBaseColor[wrappingStats.wBaseColor - 1].value;
  const secondaryColor =
    wrappingTypes[wrappingStats.wType - 1].wSubType[wrappingStats.wSubType - 1]
      .wSecondaryColor[wrappingStats.wSecondaryColor - 1].value;

  console.log("THE baseName", baseName);
  console.log("THE variationName", variationName);
  console.log("THE baseColor", baseColor);
  console.log("THE secondaryColor", secondaryColor);

  const makeWrapping = () => {
    const wrappingParts = [
      {
        url: ipfsUrls.wrappings.find((part) => part.name === "test")?.url,
        name: "base",
      },
      {
        url: ipfsUrls.oshiri.find((part) => part.name === "right")?.url,
        name: "right",
      },
      {
        url: ipfsUrls.oshiri.find((part) => part.name === "left")?.url,
        name: "left",
      },
      {
        url: ipfsUrls.wrappings.find((part) => part.name === "testvara")?.url,
        name: "variation",
      },
    ];
    return wrappingParts.map((part, index) => {
      const baseSrc =
        part.name === "variation"
          ? part.url
          : ipfsUrls.wrappings.find((part) => part.name === "test")?.url;

      const color = part.name === "variation" ? secondaryColor : baseColor;

      const size = oshiriSize;
      return (
        <div
          className="oshiri-wrapping-container"
          key={index}
          style={{
            transform: `scale(${size})`,
          }}
        >
          <img
            className={`oshiri-wrapping ${
              part.name === "base" ? "" : "displacement"
            }`}
            src={baseSrc}
            alt=""
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              //transform: `scale(${size})`,
            }}
          />
          <div
            className={`oshiri-wrapping-color oshiri-color--${part.name} ${
              part.name === "base" ? "" : "displacement"
            }`}
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              backgroundColor: color,
              //transform: `scale(${size})`,
            }}
          />
        </div>
      );
    });
  };
  return <>{makeWrapping()}</>;
};

export default Wrapping;
