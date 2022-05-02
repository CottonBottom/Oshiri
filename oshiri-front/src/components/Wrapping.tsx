import React, { Fragment } from "react";
import left from "../assets/oshiri/left.png";
import right from "../assets/oshiri/right.png";
import test from "../assets/wrappings/tests/test.png";
import testvara from "../assets/wrappings/tests/testvara.png";

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
      { url: test, name: "base" },
      { url: right, name: "right" },
      { url: left, name: "left" },
      { url: testvara, name: "variation" },
    ];
    return wrappingParts.map((part, index) => {
      const baseSrc = part.name === "variation" ? part.url : test;
      const color = part.name === "variation" ? "gray" : "#4169E1";
      const size = oshiriSize;
      return (
        <span
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
        </span>
      );
    });
  };
  return <>{makeWrapping()}</>;
};

export default Wrapping;
