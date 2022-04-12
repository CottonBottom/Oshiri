import React from "react";
import left from "../assets/oshiri/left.png";
import right from "../assets/oshiri/right.png";
import test from "../assets/wrappings/tests/test.png";
import testvara from "../assets/wrappings/tests/testvara.png";

type Props = {
  oshiriSize: string;
};

const Wrapping = ({ oshiriSize }: Props) => {
  const makeWrapping = () => {
    const wrappingParts = [
      { url: test, name: "base" },
      { url: right, name: "right" },
      { url: left, name: "left" },
      { url: testvara, name: "variation" },
    ];
    return wrappingParts.map((part) => {
      const baseSrc = part.name === "variation" ? part.url : test;
      const color = part.name === "variation" ? "gray" : "#4169E1";
      const size = oshiriSize;
      return (
        <>
          <img
            className="oshiri-wrapping"
            src={baseSrc}
            alt=""
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              transform: `scale(${size})`,
            }}
          />
          <div
            className={`oshiri-wrapping-color oshiri-color--${part.name}`}
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              backgroundColor: color,
              transform: `scale(${size})`,
            }}
          />
        </>
      );
    });
  };
  return <>{makeWrapping()}</>;
};

export default Wrapping;
