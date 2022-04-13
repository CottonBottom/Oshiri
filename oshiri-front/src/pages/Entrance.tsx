import React from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Button from "../components/buttons/Button";
import logo from "../assets/images/logo.png";

type Props = {};

const Entrance: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();

  return (
    <>
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
            <Button type="secondary" onClick={() => console.log("COntinue")}>
              {t("enter")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entrance;
