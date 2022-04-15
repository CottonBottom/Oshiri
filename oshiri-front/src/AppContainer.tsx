import React from "react";
import Customization from "./pages/Customization";
import { useTranslation } from "react-i18next";
import MyOshiri from "./pages/MyOshiri";
import TheirOshiri from "./pages/TheirOshiri";
import Entrance from "./pages/Entrance";
import OnlyText from "./pages/OnlyText";

const AppContainer = () => {
  const { i18n } = useTranslation();
  return (
    <div className={i18n.language === "jp" ? "japanese-fonts" : ""}>
      {/* <Customization /> */}
      <MyOshiri />
      {/* <Entrance /> */}
      {/* <OnlyText /> */}
      {/* <TheirOshiri /> */}
    </div>
  );
};

export default AppContainer;
