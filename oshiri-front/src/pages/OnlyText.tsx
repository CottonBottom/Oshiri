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
      <div className="main-background main-background--only-text">
        <div className="main-container main-container--only-text">
          <ChangeLanguage />
          <div className="main-entrance">
            <div className="only-text">
              <p>{t("messageStory")}</p>
            </div>
            <Button type="primary" onClick={() => console.log("COntinue")}>
              {t("next")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entrance;
