import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Button from "../components/buttons/Button";
import logo from "../assets/images/logo.png";
import ConnectWallet from "./modals/ConnectWallet";
import { useNavigate } from "react-router-dom";
import { OshiriStats, WrappingStats } from "../utils/constants";

type Props = {
  connectWallet: () => void;
  walletConnected: boolean;
  oshiriStats: OshiriStats | null;
  wrappingStats: WrappingStats | null;
};

const Entrance: React.FC<Props> = ({
  connectWallet,
  walletConnected,
  oshiriStats,
  wrappingStats,
}: Props) => {
  const [connectWalletModal, setConnectWalletModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log("THE WALLET CONNECTED?", walletConnected);

  const onEnter = () => {
    if (walletConnected) {
      if (oshiriStats && wrappingStats) {
        navigate("/myoshiri");
      } else {
        navigate("/story");
      }
    } else {
      setConnectWalletModal(true);
    }
  };

  const onConfirm = () => {
    if (walletConnected) {
      if (oshiriStats && wrappingStats) {
        navigate("/myoshiri");
      } else {
        navigate("/story");
      }
    } else {
      connectWallet();
    }
  };

  return (
    <>
      <ConnectWallet
        connectWalletModal={connectWalletModal}
        setConnectWalletModal={setConnectWalletModal}
        confirm={onConfirm}
      />
      <div className="main-background">
        <div className="main-container main-container--entrance">
          <ChangeLanguage />
          <div className="main-entrance">
            <div className="main-logo">
              <img src={logo} alt="oshiri-logo" />
            </div>
            <div className="title">
              <h1>{t("enterTitle")}</h1>
            </div>
            <div className="list">
              <ul>
                <li>{t("enterList1")}</li>
                <li>{t("enterList2")}</li>
                <li>{t("enterList3")}</li>
              </ul>
            </div>
            <Button type="secondary" onClick={() => onEnter()}>
              {t("enter")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entrance;
