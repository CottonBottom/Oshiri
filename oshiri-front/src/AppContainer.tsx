import React, { useEffect, useState } from "react";
import Customization from "./pages/Customization";
import { useTranslation } from "react-i18next";
import MyOshiri from "./pages/MyOshiri";
import TheirOshiri from "./pages/TheirOshiri";
import Entrance from "./pages/Entrance";
import OnlyText from "./pages/OnlyText";
//Web3
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppContainer = () => {
  const { i18n } = useTranslation();
  //! Next: Main flow and connecting to smart contracts
  //TODO: add Context for global state (info from conracts)
  //TODO: add Router for page transition

  const [connectedWallet, setConnectedWallet] = useState<string>("");

  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    // providerOptions, // required
  });

  useEffect(() => {
    console.log("THE WALLET", connectedWallet);
  }, [connectedWallet]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER"))
        await connectWallet();
    })();
  }, []);

  const connectWallet = async () => {
    try {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      setConnectedWallet(walletAddress);
    } catch (error) {
      console.error(error);
    }
  };

  //! Think: how to anage the urls for others oshiri???

  return (
    <div className={i18n.language === "jp" ? "japanese-fonts" : ""}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Entrance
                connectWallet={connectWallet}
                walletConnected={connectedWallet ? true : false}
              />
            }
          />
          {connectedWallet && (
            <>
              <Route path="customization" element={<Customization />} />
              <Route path="story" element={<OnlyText />} />
              <Route path="myoshiri" element={<MyOshiri />} />
              <Route path="oshiri" element={<TheirOshiri />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppContainer;
