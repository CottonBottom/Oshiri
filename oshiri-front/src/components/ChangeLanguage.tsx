import React from "react";
import SmallButton from "./SmallButton";

import { useTranslation } from "react-i18next";

type Props = {};

const ChangeLanguage: React.FC<Props> = (Props) => {
  const { i18n } = useTranslation();
  return (
    <div className="change-language">
      <SmallButton
        onClick={() => i18n.changeLanguage("en")}
        isDisabled={i18n.resolvedLanguage === "en"}
      >
        EN
      </SmallButton>
      <SmallButton
        onClick={() => i18n.changeLanguage("jp")}
        isDisabled={i18n.resolvedLanguage === "jp"}
      >
        JP
      </SmallButton>
      <SmallButton
        onClick={() => i18n.changeLanguage("es")}
        isDisabled={i18n.resolvedLanguage === "es"}
      >
        ES
      </SmallButton>
    </div>
  );
};

export default ChangeLanguage;
