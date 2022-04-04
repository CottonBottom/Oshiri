import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
type Props = {};

const Customization: React.FC<Props> = (props: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const [selectedColorTail, setSelectedColorTail] = useState<string>("#ffffff");
  const [showColorPickerTail, setShowColorPickerTail] =
    useState<boolean>(false);

  return (
    <div className="main-background">
      <div className="main-container">
        <div className="main-image"></div>
        <div className="main-settings">
          <input className="main-settings__name"></input>
          <button
            className="main-settings__color"
            style={{ backgroundColor: selectedColor }}
            onClick={() => setShowColorPicker(true)}
          ></button>
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
          <input
            className="main-settings__size"
            type="range"
            min="1"
            max="10"
          ></input>
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
  );
};

export default Customization;
