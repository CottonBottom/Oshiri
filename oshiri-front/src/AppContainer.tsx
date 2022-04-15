import React from "react";
import Customization from "./pages/Customization";
import { useTranslation } from "react-i18next";
import MyOshiri from "./pages/MyOshiri";
import TheirOshiri from "./pages/TheirOshiri";
import Entrance from "./pages/Entrance";
import OnlyText from "./pages/OnlyText";

const AppContainer = () => {
  const { i18n } = useTranslation();
  //! Next: Main flow and connecting to smart contracts
  //TODO: add Context for global state (info from conracts)
  //TODO: add Router for page transition

  return (
    <div className={i18n.language === "jp" ? "japanese-fonts" : ""}>
      <Entrance />
      {/* <Customization /> */}
      {/* <MyOshiri /> */}
      {/* <OnlyText /> */}
      {/* <TheirOshiri /> */}
    </div>
  );
};

export default AppContainer;
