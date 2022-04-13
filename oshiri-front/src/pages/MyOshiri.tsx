import React, { useState } from "react";
//import { HexColorPicker } from "react-colorful";
import { skinTones } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import IconButton from "../components/buttons/IconButton";
import { oshiriSizeDigitToScale } from "../utils/conversions";
import Modal from "../components/Modal";
import SendConsent from "./modals/SendConsent";

type Props = {};

const MyOshiri: React.FC<Props> = (props: Props) => {
  const [sendConsentModal, setSendConsentModal] = useState<boolean>(false);
  const [walletToSendConsent, setWalletToSendConsent] = useState<string>("");

  const oshiriSize = oshiriSizeDigitToScale(5);
  const oshiriSkin = skinTones[1];
  const oshiriName = "MyOshiri";
  const wrappingName = "Description of current worn Wrapping";

  const totalOSH = "9999";
  const totalConsent = "99";

  const { t } = useTranslation();

  return (
    <>
      <SendConsent
        sendConsentModal={sendConsentModal}
        setSendConsentModal={setSendConsentModal}
        walletToSendConsent={walletToSendConsent}
        setWalletToSendConsent={setWalletToSendConsent}
        onSendConsent={() => setSendConsentModal(false)}
      />
      {/* TODO: Modals */}
      <div className="main-background">
        <div className="main-container">
          <ChangeLanguage />
          <Oshiri oshiriSize={oshiriSize} oshiriSkin={oshiriSkin}></Oshiri>
          <div className="main-display">
            <div className="main-display__name">{oshiriName}</div>
            <div className="main-display__wrapping">{wrappingName}</div>
            <div className="main-display__options">
              <IconButton
                icon="inventory"
                onClick={() => console.log("Clicked")}
              >
                {t("drawer")}
              </IconButton>
              <IconButton
                icon="change_circle"
                onClick={() => console.log("Clicked")}
              >
                {t("change")}
              </IconButton>
              <IconButton icon="help" onClick={() => console.log("Clicked")}>
                {t("tutorial")}
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
                {t("getWrappings")}
              </Button>
              <div className="main-actions__value-container">
                <div className="main-actions__value">{totalOSH}</div>
                <div className="main-actions__currency">{t("OSH")}</div>
              </div>
            </div>
            <div className="main-actions__set">
              <Button type="primary" onClick={() => setSendConsentModal(true)}>
                {t("sendConsent")}
              </Button>
              <div className="main-actions__value-container">
                <div className="main-actions__value">{totalConsent}</div>
                <div className="main-actions__currency">{t("Consent")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOshiri;
