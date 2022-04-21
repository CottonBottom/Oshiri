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
import { OshiriStats, Stories } from "./utils/constants";
import { getReadableOshiri } from "./utils/conversions";

const AppContainer = () => {
  const { i18n } = useTranslation();

  //! Next: Introductory flow => run contracts and register wallet

  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [oshiriStats, setOshiriStats] = useState<OshiriStats | null>(null);
  const [newOshiriStats, setNewOshiriStats] = useState<OshiriStats | null>(
    null
  );
  const [storyStage, setStoryStage] = useState<Stories>(Stories.none);
  const [customizing, setCustomizing] = useState<boolean>(false);

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

  useEffect(() => {
    if (newOshiriStats) {
      setStoryStage(Stories.wrappingIntro);
    }
  }, [newOshiriStats]);

  const connectWallet = async () => {
    try {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      setConnectedWallet(walletAddress);
      getOshiri();
    } catch (error) {
      console.error(error);
    }
  };

  const getOshiri = async () => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiri = new ethers.Contract(
      oshiriaddress,
      OshiriContract.abi,
      signer
    );
    try {
      const oshiriStats = await oshiri.getMyOshiri();
      const readableOshiri = getReadableOshiri(oshiriStats);
      setOshiriStats(readableOshiri);
    } catch (error) {
      console.error(error);
      setOshiriStats(null);
    }
  };
  //! Think: how to manage the urls for others oshiri???

  const makeOshiri = async () => {
    if (!newOshiriStats) {
      return;
    }
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiri = new ethers.Contract(
      oshiriaddress,
      OshiriContract.abi,
      signer
    );
    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    try {
      const transaction = await oshiri.createOshiri(
        newOshiriStats.color,
        newOshiriStats.size,
        newOshiriStats.name,
        newOshiriStats.tail,
        newOshiriStats.tailColor,
        { value: newOshiriPrice.toString() }
      );
      const tx = await transaction.wait();
      const event = tx.events[1];
      console.log("THE EVENT FROM CREATING OSHIRI", event);
      //TODO: Grab event??
      //TODO: If oshiri created correctly, send to /myoshiri?
    } catch (error) {
      console.error(error);
    }
  };

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
          {customizing && (
            <Route
              path="customization"
              element={<Customization setNewOshiriStats={setNewOshiriStats} />}
            />
          )}
          {connectedWallet && (
            <>
              {storyStage !== Stories.none && (
                <Route
                  path="story"
                  element={
                    <OnlyText
                      storyStage={storyStage}
                      setStoryStage={setStoryStage}
                      setCustomizing={setCustomizing}
                      makeOshiri={makeOshiri}
                    />
                  }
                />
              )}
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
