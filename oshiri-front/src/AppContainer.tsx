import React, { useEffect, useState } from "react";
import Customization from "./pages/Customization";
import { useTranslation } from "react-i18next";
import MyOshiri from "./pages/MyOshiri";
import TheirOshiri from "./pages/TheirOshiri";
import Entrance from "./pages/Entrance";
import OnlyText from "./pages/OnlyText";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//Web3
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import OshiriContract from "./artifacts/contracts/Oshiri.sol/Oshiri.json";
import { oshiriaddress } from "./config";
import { Stories } from "./utils/constants";

const AppContainer = () => {
  const { i18n } = useTranslation();

  //! Next: Introductory flow => run contracts and register wallet

  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [oshiriStats, setOshiriStats] = useState<string>("");
  const [storyStage, setStoryStage] = useState<Stories>(Stories.none);
  const [customizating, setCustomizating] = useState<boolean>(false);

  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    // providerOptions, // required
  });

  console.log("THE WALLET", connectedWallet);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER"))
        await connectWallet();
    })();
  }, []);

  useEffect(() => {
    if (!oshiriStats) {
      setStoryStage(Stories.oshiriIntro);
    } else {
      setStoryStage(Stories.none);
    }
  }, [oshiriStats]);

  //TODO: Add Context to mantain the global state

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

  const getOshiri = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const oshiri = new ethers.Contract(
      oshiriaddress,
      OshiriContract.abi,
      provider
    );
    try {
      const oshiriStats = await oshiri.getMyOshiri();
      setOshiriStats(oshiriStats);
    } catch (error) {
      console.error(error);
      setOshiriStats("");
    }
  };
  //! Think: how to manage the urls for others oshiri???

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
                oshiriStats={oshiriStats}
              />
            }
          />
          {connectedWallet && (
            <>
              {storyStage !== Stories.none && (
                <Route
                  path="story"
                  element={
                    <OnlyText
                      storyStage={storyStage}
                      setStoryStage={setStoryStage}
                      setCustomizating={setCustomizating}
                    />
                  }
                />
              )}
              <Route path="customization" element={<Customization />} />
              {oshiriStats && (
                <>
                  <Route
                    path="myoshiri"
                    element={
                      <MyOshiri
                        getOshiri={getOshiri}
                        oshiriStats={oshiriStats}
                      />
                    }
                  />
                  <Route path="oshiri" element={<TheirOshiri />} />
                </>
              )}
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppContainer;
