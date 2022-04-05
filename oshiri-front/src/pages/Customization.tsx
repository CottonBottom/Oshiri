import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import spiral from "../assets/images/spiral.svg";
import OptionButton from "../components/OptionButton";

type Props = {};

const Customization: React.FC<Props> = (props: Props) => {
  const [selectedSkin, setSelectedSkin] = useState<string>("#ffffff");
  const [selectedTail, setSelectedTail] = useState<string>("#ffffff");
  const [selectedTailColor, setSelectedTailColor] = useState<string>("#ffffff");
  const [selectedSize, setSelectedSize] = useState<string>("1");

  const skinOptions = () => {
    const totalButtons = [
      "blue",
      "red",
      "green",
      "white",
      "salmon",
      "lime",
      "cyan",
      "crimson",
      "gray",
      "aquamarine",
      "azure",
      "bisque",
      "beige",
      "blueviolet",
      "brown",
      "chartreuse",
    ];

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedSkin}
        onClick={() => setSelectedSkin(button)}
      ></OptionButton>
    ));
  };

  const tailOptions = () => {
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
    const totalButtons = [
      "blue",
      "red",
      "green",
      "white",
      "salmon",
      "lime",
      "cyan",
      "crimson",
    ];

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedTailColor}
        isDisabled={selectedTail === "black"}
        onClick={() => setSelectedTailColor(button)}
      ></OptionButton>
    ));
  };

  return (
    <div className="main-background">
      <div className="main-container">
        <div
          className="main-image"
          style={{ backgroundImage: `url(${spiral})` }}
        >
          {/* <img className="main-image__background" src={spiral} alt="spiral" /> */}
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
                onChange={(e) => setSelectedSize(e.target.value)}
              ></input>
            </div>
            <h1>Tail</h1>
            <div className="option-buttons-container">{tailOptions()}</div>
            <h1>Tail Color</h1>
            <div className="option-buttons-container">{tailColors()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
