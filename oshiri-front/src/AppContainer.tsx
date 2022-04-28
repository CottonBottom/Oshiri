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
import OshiriWrappingsContract from "./artifacts/contracts/OshiriWrappings.sol/OshiriWrappings.json";
import { oshiriaddress, oshiriwrappingsaddress } from "./config";
import { OshiriStats, Stories, WrappingStats } from "./utils/constants";
import {
  getOtherReadableOshiri,
  getReadableOshiri,
  getReadableWrapping,
} from "./utils/conversions";

const AppContainer = () => {
  const { i18n } = useTranslation();

  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [oshiriStats, setOshiriStats] = useState<OshiriStats | null>(null);
  const [newOshiriStats, setNewOshiriStats] = useState<OshiriStats | null>(
    null
  );

  const [wrappingStats, setWrappingStats] = useState<WrappingStats | null>(
    null
  );
  const [storyStage, setStoryStage] = useState<Stories>(Stories.none);
  const [customizing, setCustomizing] = useState<boolean>(false);

  const [firstTime, setFirstTime] = useState<boolean>(false);

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

  //TODO: Test losing wrapping
  // useEffect(() => {
  //   if (oshiriStats && !wrappingStats) {
  //     setStoryStage(Stories.noWrappingError);
  //   }
  // }, [oshiriStats, wrappingStats]);

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
    const oshiriWrappings = new ethers.Contract(
      oshiriwrappingsaddress,
      OshiriWrappingsContract.abi,
      signer
    );
    try {
      const oshiriStats = await oshiri.getMyOshiri();
      const readableOshiri = getReadableOshiri(oshiriStats);

      const wrappingStats = await oshiriWrappings.getWrapping(
        readableOshiri.wornWrapping
      );
      const readableWrapping = getReadableWrapping(wrappingStats);

      setOshiriStats(readableOshiri);
      setWrappingStats(readableWrapping);
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
      setFirstTime(true);
      getOshiri();
    } catch (error) {
      console.error(error);
    }
  };

  const updateOshiri = async () => {
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
    const updateOshiriPrice = await oshiri.getUpdateOshiriPrice();
    try {
      const transaction = await oshiri.updateOshiri(
        newOshiriStats.color,
        newOshiriStats.size,
        newOshiriStats.name,
        newOshiriStats.tail,
        newOshiriStats.tailColor,
        { value: updateOshiriPrice.toString() }
      );
      const tx = await transaction.wait();
      const event = tx.events[1];
      getOshiri();
    } catch (error) {
      console.error(error);
    }
  };

  const getOtherOshiri = async (address: string) => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    const oshiri = new ethers.Contract(
      oshiriaddress,
      OshiriContract.abi,
      signer
    );
    const oshiriWrappings = new ethers.Contract(
      oshiriwrappingsaddress,
      OshiriWrappingsContract.abi,
      signer
    );
    try {
      const oshiriStats = await oshiri.getOtherOshiri(address);
      const readableOshiri = getOtherReadableOshiri(oshiriStats);
      const wrappingStats = await oshiriWrappings.getWrapping(
        readableOshiri.wornWrapping
      );
      const readableWrapping = getReadableWrapping(wrappingStats);
      return { readableOshiri, readableWrapping, walletAddress };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  //! Next:
  //Give consent A -> B
  //Spend Consent -> Spank Animation + UI

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
                wrappingStats={wrappingStats}
              />
            }
          />
          {customizing && (
            <Route
              path="/customization"
              element={
                <Customization
                  setNewOshiriStats={setNewOshiriStats}
                  oshiriStats={oshiriStats}
                />
              }
            />
          )}
          {connectedWallet && (
            <>
              {storyStage !== Stories.none && (
                <Route
                  path="/story"
                  element={
                    <OnlyText
                      storyStage={storyStage}
                      setStoryStage={setStoryStage}
                      setCustomizing={setCustomizing}
                      makeOshiri={makeOshiri}
                      oshiriStats={oshiriStats}
                      wrappingStats={wrappingStats}
                    />
                  }
                />
              )}
              {oshiriStats && wrappingStats && (
                <>
                  <Route
                    path="/myoshiri"
                    element={
                      <MyOshiri
                        getOshiri={getOshiri}
                        oshiriStats={oshiriStats}
                        wrappingStats={wrappingStats}
                        firstTime={firstTime}
                      />
                    }
                  />
                </>
              )}
            </>
          )}
          <Route
            path="/:address"
            element={<TheirOshiri getOtherOshiri={getOtherOshiri} />}
          />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppContainer;
