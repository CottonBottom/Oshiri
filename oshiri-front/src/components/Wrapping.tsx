import React, { Fragment } from "react";
// import left from "../assets/oshiri/left.png";
// import right from "../assets/oshiri/right.png";
// import test from "../assets/wrappings/tests/test.png";
// import testvara from "../assets/wrappings/tests/testvara.png";
import ipfsUrls from "../assets/ipfsUrls.json";

type Props = {
  oshiriSize: string;
};

//TODO: Fix illustrations:
//1: Must be divided in three parts (same as Oshiri)
//2: Buttocks must be cleaned up of overlapping elements
//3: Variations must be divided into three parts (as neccesary)

const Wrapping = ({ oshiriSize }: Props) => {
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
      const color = part.name === "variation" ? "gray" : "#4169E1";
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
