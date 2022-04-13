import React from "react";
import Customization from "./Customization";
import { useTranslation } from "react-i18next";
import MyOshiri from "./MyOshiri";
import TheirOshiri from "./TheirOshiri";
import Entrance from "./Entrance";

const AppContainer = () => {
  const { i18n } = useTranslation();
  return (
    <div className={i18n.language === "jp" ? "japanese-fonts" : ""}>
      {/* <Customization /> */}
      {/* <MyOshiri /> */}
      <Entrance />
      {/* <TheirOshiri /> */}
    </div>
  );
};

export default AppContainer;
