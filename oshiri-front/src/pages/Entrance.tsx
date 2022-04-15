import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Button from "../components/buttons/Button";
import logo from "../assets/images/logo.png";
import ConnectWallet from "./modals/ConnectWallet";

type Props = {};

const Entrance: React.FC<Props> = (props: Props) => {
  const [connectWalletModal, setConnectWalletModal] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <ConnectWallet
        connectWalletModal={connectWalletModal}
        setConnectWalletModal={setConnectWalletModal}
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
            <Button
              type="secondary"
              onClick={() => setConnectWalletModal(true)}
            >
              {t("enter")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entrance;
