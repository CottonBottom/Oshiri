import React, { useState } from "react";
//import { HexColorPicker } from "react-colorful";
import OptionButton from "../components/buttons/OptionButton";
import { skinTones } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import IconButton from "../components/buttons/IconButton";

type Props = {};

const MyOshiri: React.FC<Props> = (props: Props) => {
  const oshiriSize = "0.95,0.95";
  const oshiriSkin = skinTones[1];
  const oshiriName = "MyOshiri";
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
          <div className="main-display__options">
            <IconButton
              icon="change_circle"
              onClick={() => console.log("Clicked")}
            >
              Drawer
            </IconButton>
            <IconButton
              icon="change_circle"
              onClick={() => console.log("Clicked")}
            >
              Change
            </IconButton>
            <IconButton
              icon="change_circle"
              onClick={() => console.log("Clicked")}
            >
              Tutorial
            </IconButton>
          </div>
        </div>
      </div>
      <div className="main-actions-area">
        <div className="main-actions-container">
          <div className="main-actions__set">
            <Button
              type="primary"
              onClick={() => {
                console.log("Get Wrappings");
              }}
            >
              {/* {t("makeOshiri")} */}
              Get Wrappings
            </Button>
            <div className="main-actions__value-container">
              <div className="main-actions__value">{totalOSH}</div>
              <div className="main-actions__currency">OSH</div>
            </div>
          </div>
          <div className="main-actions__set">
            <Button
              type="primary"
              onClick={() => {
                console.log("Get Wrappings");
              }}
            >
              {/* {t("makeOshiri")} */}
              Send Consent
            </Button>
            <div className="main-actions__value-container">
              <div className="main-actions__value">{totalConsent}</div>
              <div className="main-actions__currency">Consent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOshiri;
