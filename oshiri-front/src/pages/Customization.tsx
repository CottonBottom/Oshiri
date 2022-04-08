import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import spiral from "../assets/images/spiral.svg";
import left from "../assets/oshiri/left.png";
import right from "../assets/oshiri/right.png";
import base from "../assets/oshiri/base.png";
import OptionButton from "../components/OptionButton";
import { skinTones, tailTones } from "../utils/constants";
import Button from "../components/Button";
import SmallButton from "../components/SmallButton";

type Props = {};

const Customization: React.FC<Props> = (props: Props) => {
  const [selectedSkin, setSelectedSkin] = useState<string>(skinTones[1]);
  const [selectedTail, setSelectedTail] = useState<string>("#ffffff");
  const [selectedTailColor, setSelectedTailColor] = useState<string>("#ffffff");
  const [selectedSize, setSelectedSize] = useState<string>("1");
  const [oshiriSize, setOshiriSize] = useState<string>("0.95,0.95");

  const skinOptions = () => {
    const totalButtons = skinTones;

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedSkin}
        onClick={() => setSelectedSkin(button)}
      ></OptionButton>
    ));
  };

  const tailOptions = () => {
    //TODO: thumbnails for tails
    const totalButtons = ["black", "red", "green", "white", "salmon"];

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedTail}
        onClick={() => setSelectedTail(button)}
      ></OptionButton>
    ));
  };

  const tailColors = () => {
    const totalButtons = tailTones;
    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedTailColor}
        isDisabled={selectedTail === "black"}
        onClick={() => setSelectedTailColor(button)}
      ></OptionButton>
    ));
  };

  const updateOshiriSize = (size: string) => {
    console.log("size", size);
    //Max 10-> 1.05,1.00
    //Min 1-> 0.95,0.95
    const scaledX = ((1.05 - 0.95) * (parseInt(size) - 1)) / (10 - 1) + 0.95;
    const scaledY = ((1.0 - 0.95) * (parseInt(size) - 1)) / (10 - 1) + 0.95;
    setSelectedSize(size);
    setOshiriSize(`${scaledX.toFixed(2)}, ${scaledY.toFixed(2)}`);
  };

  const makeOshiri = () => {
    const oshiriParts = [
      { url: base, name: "base" },
      { url: right, name: "right" },
      { url: left, name: "left" },
    ];

    return oshiriParts.map((part) => {
      const size = part.name == "base" ? 1 : oshiriSize;
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
              maskRepeat: "repeat",
              backgroundColor: selectedSkin,
              transform: `scale(${size})`,
            }}
          />
        </>
      );
    });
  };

  return (
    <div className="main-background">
      <div className="main-container">
        <div className="main-top">
          <SmallButton
            onClick={() => {
              console.log("English");
            }}
            isDisabled
          >
            EN
          </SmallButton>
          <SmallButton
            onClick={() => {
              console.log("Japanese");
            }}
          >
            JP
          </SmallButton>
          <SmallButton
            onClick={() => {
              console.log("Spanish");
            }}
          >
            ES
          </SmallButton>
        </div>
        <div
          className="oshiri-background"
          style={{ backgroundImage: `url(${spiral})` }}
        >
          {makeOshiri()}
        </div>
        <div className="main-settings">
          <input
            className="main-settings__name-input"
            maxLength={50}
            placeholder="Name"
          ></input>
          <div className="main-settings__stats">
            <h1>Skin Tone</h1>
            <div className="option-buttons-container">{skinOptions()}</div>
            <h1>Size</h1>
            <div className="main-settings__size-slider-container">
              <input
                className="main-settings__size-slider"
                type="range"
                min="1"
                max="10"
                value={selectedSize}
                onChange={(e) => updateOshiriSize(e.target.value)}
              ></input>
            </div>
            <h1>Tail</h1>
            <div className="option-buttons-container">{tailOptions()}</div>
            <h1>Tail Color</h1>
            <div className="option-buttons-container">{tailColors()}</div>
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => {
            console.log("Make Oshiri!");
          }}
        >
          Make Oshiri!
        </Button>
      </div>
    </div>
  );
};

export default Customization;
