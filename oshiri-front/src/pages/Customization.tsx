import React, { useState } from "react";
//import { HexColorPicker } from "react-colorful";
import OptionButton from "../components/buttons/OptionButton";
import { OshiriStats, skinTones, tails, tailColors } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import { oshiriSizeDigitToScale } from "../utils/conversions";
import { useNavigate } from "react-router-dom";

type Props = {
  setNewOshiriStats: React.Dispatch<React.SetStateAction<OshiriStats | null>>;
};

const Customization: React.FC<Props> = ({ setNewOshiriStats }: Props) => {
  const [oshiriSize, setOshiriSize] = useState<string>("0.95,1.0");
  const [selectedSize, setSelectedSize] = useState<string>("1");
  const [selectedSkin, setSelectedSkin] = useState<string>(skinTones[1]);
  const [selectedTail, setSelectedTail] = useState<string>(tails[1]);
  const [selectedTailColor, setSelectedTailColor] = useState<string>(
    tailColors[1]
  );
  const [oshiriName, setOshiriName] = useState<string>("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const makeOshiriStats = () => {
    const newOshiriStats: OshiriStats = {
      color: skinTones.indexOf(selectedSkin),
      size: parseInt(selectedSize),
      name: oshiriName,
      tail: tails.indexOf(selectedTail),
      tailColor:
        tails.indexOf(selectedTail) === 0
          ? 0
          : tailColors.indexOf(selectedTailColor),
    };
    setNewOshiriStats(newOshiriStats);
    navigate("/story");
  };

  const skinOptions = () => {
    const totalButtons = skinTones.filter((tone) => tone !== "white");

    return totalButtons.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedSkin}
        onClick={() => setSelectedSkin(button)}
      ></OptionButton>
    ));
  };

  const getTailOptions = () => {
    //TODO: thumbnails for tails
    return tails.map((button) => (
      <OptionButton
        color={button}
        isSelected={button === selectedTail}
        onClick={() => setSelectedTail(button)}
      ></OptionButton>
    ));
  };

  const getTailColors = () => {
    return tailColors.map((button) => (
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
            <div className="option-buttons-container">{getTailOptions()}</div>
            <h1>{t("tailColor")}</h1>
            <div className="option-buttons-container">{getTailColors()}</div>
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => makeOshiriStats()}
          isDisabled={oshiriName === ""}
        >
          {t("makeOshiri")}
        </Button>
      </div>
    </div>
  );
};

export default Customization;
