import React from "react";
import Customization from "./Customization";
import { useTranslation } from "react-i18next";
import MyOshiri from "./MyOshiri";

const AppContainer = () => {
  const { i18n } = useTranslation();
  return (
    <div className={i18n.language === "jp" ? "japanese-fonts" : ""}>
      {/* <Customization /> */}
      <MyOshiri />
    </div>
  );
};

export default AppContainer;
