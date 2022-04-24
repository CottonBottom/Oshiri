import React, { useEffect, useState } from "react";
//import { HexColorPicker } from "react-colorful";
import {
  OshiriStats,
  skinTones,
  WrappingStats,
  wrappingTypes,
} from "../utils/constants";
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
  wrappingStats: WrappingStats;
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
  const { t } = useTranslation();

  const getWrappingName = (stats: WrappingStats) => {
    //! Stats randomized for testing:
    // const stats = {
    //   wType: Math.floor(Math.random() * (6 - 1 + 1) + 1),
    //   wSubType: Math.floor(Math.random() * (3 - 1 + 1) + 1),
    //   wBaseColor: Math.floor(Math.random() * (3 - 1 + 1) + 1),
    //   wSecondaryColor: Math.floor(Math.random() * (6 - 1 + 1) + 1),
    //   wVariation: Math.floor(Math.random() * (4 - 1 + 1) + 1),
    // };

    //All the indexes are -1, since in Solidty zero is not existent
    const wType = t(wrappingTypes[stats.wType - 1].name);
    const wSubType = t(
      wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].name
    );
    const wBaseColor = t(
      wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].wBaseColor[
        stats.wBaseColor - 1
      ].name
    );
    const wSecondaryColor = t(
      wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1]
        .wSecondaryColor[stats.wSecondaryColor - 1].name
    );
    const wVariation = t(
      wrappingTypes[stats.wType - 1].wSubType[stats.wSubType - 1].wVariation[
        stats.wVariation
      ]
    );

    //return `${wType} ${wSubType} ${wBaseColor} ${wSecondaryColor} ${wVariation}`;

    return `${wVariation} ${wSecondaryColor} ${wBaseColor} ${wSubType} ${wType}`;
  };

  const oshiriSize = oshiriSizeDigitToScale(oshiriStats.size);
  const oshiriSkin = skinTones[oshiriStats.color];
  const oshiriName = oshiriStats.name;
  const wrappingName = getWrappingName(wrappingStats);

  const totalOSH = "9999";
  const totalConsent = oshiriStats.availableConsent;

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
