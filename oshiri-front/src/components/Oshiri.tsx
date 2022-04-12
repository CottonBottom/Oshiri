import React from "react";
import spiral from "../assets/images/spiral.svg";
import left from "../assets/oshiri/left.png";
import right from "../assets/oshiri/right.png";
import base from "../assets/oshiri/base.png";
import Wrapping from "./Wrapping";

type Props = {
  oshiriSize: string;
  oshiriSkin: string;
};

const Oshiri = ({ oshiriSize, oshiriSkin }: Props) => {
  const makeOshiri = () => {
    const oshiriParts = [
      { url: base, name: "base" },
      { url: right, name: "right" },
      { url: left, name: "left" },
    ];

    return oshiriParts.map((part) => {
      const size = oshiriSize;
      return (
        <>
          <img
            className="oshiri"
            src={part.url}
            alt=""
            style={{
              transform: `scale(${size})`,
            }}
          />
          <div
            className={`oshiri-color oshiri-color--${part.name}`}
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              backgroundColor: oshiriSkin,
              transform: `scale(${size})`,
            }}
          />
        </>
      );
    });
  };
  return (
    <div
      className="oshiri-background"
      style={{ backgroundImage: `url(${spiral})` }}
    >
      {makeOshiri()}
      <Wrapping oshiriSize={oshiriSize}></Wrapping>
    </div>
  );
};

export default Oshiri;
