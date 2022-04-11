import React from "react";
import left from "../assets/oshiri/left.png";
import right from "../assets/oshiri/right.png";
import test from "../assets/wrappings/tests/test.png";
import testvara from "../assets/wrappings/tests/testvara.png";

type Props = {};

const Wrapping = (props: Props) => {
  const makeWrapping = () => {
    const wrappingParts = [
      { url: testvara, name: "base" },
      { url: test, name: "base" },
      { url: right, name: "right" },
      { url: left, name: "left" },
    ];

    return wrappingParts.map((part) => {
      return (
        <>
          <img
            className="oshiri"
            src={test}
            alt=""
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
            }}
          />
          <div
            className={`oshiri-color oshiri-color--${part.name}`}
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              backgroundColor: "#6495ED",
            }}
          />
        </>
      );
    });
  };
  return <>{makeWrapping()}</>;
};

export default Wrapping;
