import React, { Fragment } from "react";
import spiral from "../assets/images/spiral.svg";
import left from "../assets/oshiri/left.png";
import right from "../assets/oshiri/right.png";
import base from "../assets/oshiri/base.png";
import Wrapping from "./Wrapping";

type Props = {
  oshiriSize: string;
  oshiriSkin: string;
  isCustomizing?: boolean;
  isSmacking?: boolean;
};

const Oshiri = ({
  oshiriSize,
  oshiriSkin,
  isCustomizing,
  isSmacking,
}: Props) => {
  const makeOshiri = () => {
    const oshiriParts = [
      { url: base, name: "base" },
      { url: right, name: "right" },
      { url: left, name: "left" },
    ];

    return oshiriParts.map((part, index) => {
      const size = oshiriSize;
      return (
        <Fragment key={index}>
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
        </Fragment>
      );
    });
  };
  return (
    <>
      {isSmacking && <div className="oshiri-smacking-background"></div>}
      <div
        className="oshiri-background"
        style={{ backgroundImage: `url(${spiral})` }}
      >
        {isSmacking && <div className="oshiri-smacking-mask">Smack!</div>}
        {makeOshiri()}
        {!isCustomizing && <Wrapping oshiriSize={oshiriSize}></Wrapping>}
      </div>
    </>
  );
};

export default Oshiri;
