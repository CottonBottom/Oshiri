import React, { useEffect, useState } from "react";
import {
  OshiriStats,
  skinTones,
  WrappingStats,
  //wrappingTypes,
} from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import IconButton from "../components/buttons/IconButton";
import { getWrappingName, oshiriSizeDigitToScale } from "../utils/conversions";
import SendConsent from "./modals/SendConsent";
import NewDay from "./modals/NewDay";
import GotWrapping from "./modals/WrappingGet";
import ConsentSent from "./modals/ConsentSent";
import ChangeStats from "./modals/ChangeStats";
import Tutorial from "../components/Tutorial";
import Drawer from "./modals/Drawer";

type Props = {
  getOshiri: () => void;
  oshiriStats: OshiriStats;
  wrappingStats: WrappingStats;
  sendConsent: (receiver: string) => void;
  currencyBalance: string;
  getAllWrappingsOwned: () => Promise<WrappingStats[] | null>;
  getNextWrappingAndPrice: () => Promise<{
    nextWrappingStats: WrappingStats;
    price: string;
  } | null>;
};

const MyOshiri: React.FC<Props> = ({
  oshiriStats,
  wrappingStats,
  getOshiri,
  sendConsent,
  currencyBalance,
  getAllWrappingsOwned,
  getNextWrappingAndPrice,
}: Props) => {
  const [sendConsentModal, setSendConsentModal] = useState<boolean>(false);
  const [consentSentModal, setConsentSentModal] = useState<boolean>(false);
  const [newDayModal, setNewDayModal] = useState<boolean>(false);
  const [wrappingGetModal, setWrappingGetModal] = useState<boolean>(false);
  const [changeStatsModal, setChangeStatsModal] = useState<boolean>(false);
  const [drawerModal, setDrawerModal] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  const [walletToSendConsent, setWalletToSendConsent] = useState<string>("");
  const [wrappingsOwned, setWrappingsOwned] = useState<WrappingStats[]>([]);

  const [nextWrappingStats, setNextWrappingStats] =
    useState<WrappingStats | null>(null);
  const [wrappingPrice, setWrappingPrice] = useState<number | null>(null);

  useEffect(() => {
    getOshiri();
  }, []);

  console.log("My Oshiri Stats", oshiriStats);
  console.log("My Wrapping Stats", wrappingStats);
  const { t } = useTranslation();

  const oshiriSize = oshiriSizeDigitToScale(oshiriStats.size);
  const oshiriSkin = skinTones[oshiriStats.color];
  const oshiriName = oshiriStats.name;
  const wrappingName = getWrappingName(wrappingStats, t);

  const totalOSH = currencyBalance;
  const totalConsent = oshiriStats.availableConsent;

  const onSendConsent = () => {
    sendConsent(walletToSendConsent);
    setSendConsentModal(false);
    //TODO answer to response, errors/sent () return on try/catch and show modal?
  };

  const onOpenDrawer = () => {
    setDrawerModal(true);
    getAllWrappingsOwned().then((ownedWrappings) => {
      if (!ownedWrappings) {
        console.log("error");
        return;
      }
      setWrappingsOwned(ownedWrappings);
    });
  };

  const onOpenGetWrappings = () => {
    setWrappingGetModal(true);
    getNextWrappingAndPrice().then((nextWrappingAndPrice) => {
      if (!nextWrappingAndPrice) {
        console.log("error");
        return;
      }
      setNextWrappingStats(nextWrappingAndPrice.nextWrappingStats);
      setWrappingPrice(parseInt(nextWrappingAndPrice.price));
    });
  };

  return (
    <>
      <SendConsent
        sendConsentModal={sendConsentModal}
        setSendConsentModal={setSendConsentModal}
        walletToSendConsent={walletToSendConsent}
        setWalletToSendConsent={setWalletToSendConsent}
        onSendConsent={onSendConsent}
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
        wrappingGetModal={wrappingGetModal}
        setWrappingGetModal={setWrappingGetModal}
        nextWrappingStats={nextWrappingStats}
        totalOSH={totalOSH}
        wrappingPrice={wrappingPrice}
      ></GotWrapping>
      <Drawer
        drawerModal={drawerModal}
        setDrawerModal={setDrawerModal}
        wrappingsOwned={wrappingsOwned}
        wornWrapping={oshiriStats.wornWrapping}
      ></Drawer>
      <Tutorial
        showTutorial={showTutorial}
        setShowTutorial={setShowTutorial}
      ></Tutorial>
      <div className="main-background">
        <ChangeLanguage />
        <div className="main-container">
          <Oshiri
            oshiriSize={oshiriSize}
            oshiriSkin={oshiriSkin}
            wrappingStats={wrappingStats}
          ></Oshiri>
          <div className="main-display">
            <div className="main-display__name">{oshiriName}</div>
            <div className="main-display__wrapping">{wrappingName}</div>
            <div className="main-display__options">
              <IconButton icon="inventory" onClick={() => onOpenDrawer()}>
                {t("drawer")}
              </IconButton>
              <IconButton
                icon="change_circle"
                onClick={() => setChangeStatsModal(true)}
              >
                {t("change")}
              </IconButton>
              <IconButton icon="help" onClick={() => setShowTutorial(true)}>
                {t("tutorial")}
              </IconButton>
            </div>
          </div>
        </div>
        <div className="main-actions-area">
          <div className="main-actions-container">
            <div className="main-actions__set">
              <Button type="primary" onClick={() => onOpenGetWrappings()}>
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
