import React, { useState } from "react";
//import { HexColorPicker } from "react-colorful";
import OptionButton from "../components/buttons/OptionButton";
import { skinTones } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import IconButton from "../components/buttons/IconButton";
import { oshiriSizeDigitToScale } from "../utils/conversions";

type Props = {};

const TheirOshiri: React.FC<Props> = (props: Props) => {
  const oshiriSize = oshiriSizeDigitToScale(5);
  const oshiriSkin = skinTones[1];
  const oshiriName = "TheirOshiri";
  const wrappingName = "Description of current worn Wrapping";

  const totalOSH = "9999";
  const totalConsent = "99";

  const { t } = useTranslation();

  return (
    <div className="main-background">
      <div className="main-container">
        <ChangeLanguage />
        <Oshiri oshiriSize={oshiriSize} oshiriSkin={oshiriSkin}></Oshiri>
        <div className="main-display">
          <div className="main-display__name">{oshiriName}</div>
          <div className="main-display__wrapping">{wrappingName}</div>
          <div className="main-display__options main-display__options--their-oshiri">
            <IconButton icon="help" onClick={() => console.log("Clicked")}>
              {t("tutorial")}
            </IconButton>
          </div>
        </div>
      </div>
      <div className="main-actions-area">
        <div className="main-actions-container main-actions-container--their-oshiri">
          <div className="main-actions__set">
            <Button
              type="primary"
              onClick={() => {
                console.log("Get Wrappings");
              }}
            >
              {t("spendConsent")}
            </Button>
            <div className="main-actions__value-container">
              <div className="main-actions__value">{totalConsent}</div>
              <div className="main-actions__currency">{t("Consent")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheirOshiri;
