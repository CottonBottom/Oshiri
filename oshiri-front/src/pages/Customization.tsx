import React, { useState } from "react";
//import { HexColorPicker } from "react-colorful";
import OptionButton from "../components/buttons/OptionButton";
import { skinTones, tailTones } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";

type Props = {};

const Customization: React.FC<Props> = (props: Props) => {
  const [oshiriSkin, setOshiriSkin] = useState<string>(skinTones[1]);
  const [selectedTail, setSelectedTail] = useState<string>("#ffffff");
  const [selectedTailColor, setSelectedTailColor] = useState<string>("#ffffff");
  const [selectedSize, setSelectedSize] = useState<string>("1");
  const [oshiriSize, setOshiriSize] = useState<string>("0.95,0.95");

  const { t } = useTranslation();

  const skinOptions = () => {
    const totalButtons = skinTones;

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === oshiriSkin}
        onClick={() => setOshiriSkin(button)}
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

  return (
    <div className="main-background">
      <div className="main-container">
        <ChangeLanguage />
        <Oshiri oshiriSize={oshiriSize} oshiriSkin={oshiriSkin}></Oshiri>
        <div className="main-settings">
          <input
            className="main-settings__name-input"
            maxLength={50}
            placeholder={t("name")}
          ></input>
          <div className="main-settings__stats">
            <h1>{t("skinTone")}</h1>
            <div className="option-buttons-container">{skinOptions()}</div>
            <h1>{t("size")}</h1>
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
            <h1>{t("tail")}</h1>
            <div className="option-buttons-container">{tailOptions()}</div>
            <h1>{t("tailColor")}</h1>
            <div className="option-buttons-container">{tailColors()}</div>
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => {
            console.log("Make Oshiri!");
          }}
        >
          {t("makeOshiri")}
        </Button>
      </div>
    </div>
  );
};

export default Customization;
