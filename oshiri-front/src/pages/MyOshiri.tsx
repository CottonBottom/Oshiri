import React, { useEffect, useState } from "react";
//import { HexColorPicker } from "react-colorful";
import { OshiriStats, skinTones, WrappingStats } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import IconButton from "../components/buttons/IconButton";
import { oshiriSizeDigitToScale } from "../utils/conversions";
import SendConsent from "./modals/SendConsent";
import NewDay from "./modals/NewDay";
import GotWrapping from "./modals/GotWrapping";
import ConsentSent from "./modals/ConsentSent";
import ChangeStats from "./modals/ChangeStats";

type Props = {
  getOshiri: () => void;
  oshiriStats: OshiriStats;
  wrappingStats: WrappingStats | null;
};

const MyOshiri: React.FC<Props> = ({
  oshiriStats,
  wrappingStats,
  getOshiri,
}: Props) => {
  const [sendConsentModal, setSendConsentModal] = useState<boolean>(false);
  const [consentSentModal, setConsentSentModal] = useState<boolean>(false);
  const [newDayModal, setNewDayModal] = useState<boolean>(false);
  const [gotWrappingModal, setGotWrappingModal] = useState<boolean>(false);
  const [changeStatsModal, setChangeStatsModal] = useState<boolean>(false);

  const [walletToSendConsent, setWalletToSendConsent] = useState<string>("");

  useEffect(() => {
    getOshiri();
  }, []);

  console.log("My Oshiri Stats", oshiriStats);
  console.log("My Wrapping Stats", wrappingStats);

  const oshiriSize = oshiriSizeDigitToScale(oshiriStats.size);
  const oshiriSkin = skinTones[oshiriStats.color];
  const oshiriName = oshiriStats.name;
  const wrappingName = "Description of current worn Wrapping";

  const totalOSH = "9999";
  const totalConsent = oshiriStats.availableConsent;

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
      <ConsentSent
        consentSentModal={consentSentModal}
        setConsentSentModal={setConsentSentModal}
        walletToSendConsent={walletToSendConsent}
      />
      <NewDay newDayModal={newDayModal} setNewDayModal={setNewDayModal} />
      <ChangeStats
        changeStatsModal={changeStatsModal}
        setChangeStatsModal={setChangeStatsModal}
        changeStatsFee={"001"}
      ></ChangeStats>
      <GotWrapping
        gotWrappingModal={gotWrappingModal}
        setGotWrappingModal={setGotWrappingModal}
      ></GotWrapping>
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
                onClick={() => setChangeStatsModal(true)}
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
              <Button type="primary" onClick={() => setGotWrappingModal(true)}>
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
                <div className="main-actions__value">{`0${totalConsent}`}</div>
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
