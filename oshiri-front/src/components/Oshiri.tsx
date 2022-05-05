import React, { Fragment, useState } from "react";
import spiral from "../assets/images/spiral.svg";
import ipfsUrls from "../assets/ipfsUrls.json";
import Wrapping from "./Wrapping";

type Props = {
  oshiriSize: string;
  oshiriSkin: string;
  isCustomizing?: boolean;
  isSmacking?: boolean;
  smacked?: () => void;
};

const Oshiri = ({
  oshiriSize,
  oshiriSkin,
  isCustomizing,
  isSmacking,
  smacked,
}: Props) => {
  const [smack, setSmack] = useState<string>("");
  const [smacking, setSmacking] = useState<boolean>(false);

  const onSmack = () => {
    setSmack("smack");
    setSmacking(true);
    setTimeout(function () {
      setSmack("");
      setSmacking(false);
      if (smacked) {
        smacked();
      }
    }, 2000);
  };

  //TODO: Smack sound effect
  //TODO: Corregir contacto visual entre left/right y base

  const makeOshiri = () => {
    const oshiriParts = [
      {
        url: ipfsUrls.oshiri.find((part) => part.name === "base")?.url,
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
    ];
    return oshiriParts.map((part, index) => {
      const size = oshiriSize;
      let ripplePosition = "";
      let blushPosition = "";
      switch (part.name) {
        case "left":
          ripplePosition = "ripple--left";
          blushPosition = "blush--left";
          break;
        case "right":
          ripplePosition = "ripple--right";
          blushPosition = "blush--right";
          break;
        default:
          break;
      }
      return (
        <div
          className="oshiri-container"
          key={index}
          style={{
            transform: `scale(${size})`,
          }}
        >
          <img
            className={`oshiri ${part.name === "base" ? "" : "displacement"}`}
            src={part.url}
            alt=""
          />
          <div
            className={`oshiri-color oshiri-color--${part.name} ${
              part.name === "base" ? "" : "displacement"
            }`}
            style={{
              mask: `url(${part.url}) 0px 0px / cover`,
              WebkitMask: `url(${part.url}) 0px 0px / cover`,
              backgroundColor: oshiriSkin,
              //transform: `scale(${size})`,
            }}
          >
            {ripplePosition && (
              <>
                <div className={`ripple ${ripplePosition}`}></div>
                <div className={`ripple-two ${ripplePosition}`}></div>
                <div className={`ripple-three ${ripplePosition}`}></div>
                <div className={`blush ${blushPosition}`}></div>
              </>
            )}
          </div>
        </div>
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
        <span className={`${smack}`}>
          {makeOshiri()}
          {!isCustomizing && <Wrapping oshiriSize={oshiriSize}></Wrapping>}
        </span>
        {isSmacking && (
          <button
            className="smack-button"
            onClick={() => onSmack()}
            disabled={smacking}
          ></button>
        )}
      </div>
    </>
  );
};

export default Oshiri;
