import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import spiral from "../assets/images/spiral.svg";
import OptionButton from "../components/OptionButton";

type Props = {};

const Customization: React.FC<Props> = (props: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const [selectedColorTail, setSelectedColorTail] = useState<string>("#ffffff");
  const [showColorPickerTail, setShowColorPickerTail] =
    useState<boolean>(false);

  const skinOptions = () => {
    const totalButtons = [
      "blue",
      "red",
      "green",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
    ];

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        onClick={() => console.log("click")}
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
            <input
              className="main-settings__size"
              type="range"
              min="1"
              max="10"
            ></input>
            <h1>Tail</h1>
            <h1>Tail Color</h1>
            {/* <button
              className="main-settings__color"
              style={{ backgroundColor: selectedColor }}
              onClick={() => setShowColorPicker(true)}
            ></button> */}
            <div className="color-picker-component">
              {showColorPicker && (
                <>
                  <div
                    className="color-picker-component__cover"
                    onClick={() => setShowColorPicker(false)}
                  ></div>
                  <HexColorPicker
                    color={selectedColor}
                    onChange={(color) => setSelectedColor(color)}
                  />
                </>
              )}
            </div>

            <div className="main-settings__tail">
              <button>None</button>
              <button>Style 1</button>
              <button>Style 2</button>
              <button>Style 3</button>
              <button>Style 4</button>
              <button>Style 5</button>
            </div>
            <button
              className="main-settings__color"
              style={{ backgroundColor: selectedColorTail }}
              onClick={() => setShowColorPickerTail(true)}
            ></button>
            <div className="color-picker-component">
              {showColorPickerTail && (
                <>
                  <div
                    className="color-picker-component__cover"
                    onClick={() => setShowColorPickerTail(false)}
                  ></div>
                  <HexColorPicker
                    color={selectedColorTail}
                    onChange={(color) => setSelectedColorTail(color)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
