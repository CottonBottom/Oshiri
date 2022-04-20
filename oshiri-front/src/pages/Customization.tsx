import React, { useState } from "react";
//import { HexColorPicker } from "react-colorful";
import OptionButton from "../components/buttons/OptionButton";
import { OshiriStats, skinTones, tails, tailTones } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import { oshiriSizeDigitToScale } from "../utils/conversions";

type Props = {};

const Customization: React.FC<Props> = (props: Props) => {
  const defaultStats: OshiriStats = {
    color: 1,
    size: 1,
    name: "",
    tail: 0,
    tailTone: 0,
  };
  const [oshiriStats, setOshiriStats] = useState<OshiriStats>(defaultStats);

  const [oshiriSize, setOshiriSize] = useState<string>("0.95,1.0");
  const [selectedSize, setSelectedSize] = useState<string>("1");

  const [selectedSkin, setSelectedSkin] = useState<string>(skinTones[1]);
  const [selectedTail, setSelectedTail] = useState<string>(tails[1]);
  const [selectedTailColor, setSelectedTailColor] = useState<string>(
    tailTones[1]
  );
  const [oshiriName, setOshiriName] = useState<string>("");

  const { t } = useTranslation();

  const makeOshiri = () => {
    const newOshiriStats: OshiriStats = {
      color: skinTones.indexOf(selectedSkin),
      size: parseInt(selectedSize),
      name: oshiriName,
      tail: tails.indexOf(selectedTail),
      tailTone: tailTones.indexOf(selectedTail),
    };
    console.log("TODO: SEND THE OSHIRI STATS", newOshiriStats);
  };

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
    setOshiriSize(oshiriSizeDigitToScale(parseInt(size)));
    setSelectedSize(size);
  };

  return (
    <div className="main-background">
      <div className="main-container">
        <ChangeLanguage />
        <Oshiri
          oshiriSize={oshiriSize}
          oshiriSkin={selectedSkin}
          isCustomizing
        ></Oshiri>
        <div className="main-settings">
          <input
            className="text-input"
            maxLength={50}
            placeholder={t("name")}
            value={oshiriName}
            onChange={(event) => setOshiriName(event.target.value)}
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
        <Button type="primary" onClick={() => makeOshiri()}>
          {t("makeOshiri")}
        </Button>
      </div>
    </div>
  );
};

export default Customization;
