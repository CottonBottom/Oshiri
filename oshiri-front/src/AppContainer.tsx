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
import OshiriCurrencyContract from "./artifacts/contracts/OshiriCurrency.sol/OshiriCurrency.json";
import {
  oshiriAddress,
  oshiriWrappingsAddress,
  oshiriCurrencyAddress,
} from "./config";
import {
  mainPath,
  OshiriStats,
  Stories,
  WrappingStats,
} from "./utils/constants";
import {
  getOtherReadableOshiri,
  getReadableOshiri,
  getReadableWrapping,
} from "./utils/conversions";
import WrappingDisplay from "./pages/WrappingDisplay";

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
  const [nextWrappingStats, setNextWrappingStats] =
    useState<WrappingStats | null>(null);
  const [currencyBalance, setCurrencyBalance] = useState<string>("0");
  const [storyStage, setStoryStage] = useState<Stories>(Stories.none);
  const [customizing, setCustomizing] = useState<boolean>(false);
  const [awardedCurrency, setAwardedCurrency] = useState<string>("");
  const [ownedWrappings, setOwnedWrappings] = useState<any[]>([]);

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
    const walletAddress = await signer.getAddress();
    const oshiri = new ethers.Contract(
      oshiriAddress,
      OshiriContract.abi,
      signer
    );
    const oshiriWrappings = new ethers.Contract(
      oshiriWrappingsAddress,
      OshiriWrappingsContract.abi,
      signer
    );
    const oshiriCurrency = new ethers.Contract(
      oshiriCurrencyAddress,
      OshiriCurrencyContract.abi,
      signer
    );
    try {
      const oshiriStats = await oshiri.getMyOshiri();
      const readableOshiri = getReadableOshiri(oshiriStats);
      const wrappingStats = await oshiriWrappings.getWrapping(
        readableOshiri.wornWrapping
      );
      const readableWrapping = getReadableWrapping(wrappingStats);
      const balance = await oshiriCurrency.balanceOf(walletAddress);
      setOshiriStats(readableOshiri);
      setWrappingStats(readableWrapping);
      const newBalance = balance.toString();
      setCurrencyBalance(newBalance);
    } catch (error) {
      console.error(error);
      setOshiriStats(null);
    }
  };

  const makeOshiri = async () => {
    if (!newOshiriStats || !nextWrappingStats) {
      return;
    }
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiri = new ethers.Contract(
      oshiriAddress,
      OshiriContract.abi,
      signer
    );
    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    const wrappingUri = `${mainPath}/wrapping/${nextWrappingStats.wType}${nextWrappingStats.wSubType}${nextWrappingStats.wVariation}${nextWrappingStats.wBaseColor}${nextWrappingStats.wSecondaryColor}`;

    console.log("THE WRAPPING URI", wrappingUri);
    try {
      const transaction = await oshiri.createOshiri(
        newOshiriStats.color,
        newOshiriStats.size,
        newOshiriStats.name,
        newOshiriStats.tail,
        newOshiriStats.tailColor,
        wrappingUri,
        { value: newOshiriPrice.toString() }
      );
      const tx = await transaction.wait();
      const event = tx.events[1];
      getOshiri();
    } catch (error) {
      console.error(error);
    }
  };

  const getNextWrappingStats = async () => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiriWrappings = new ethers.Contract(
      oshiriWrappingsAddress,
      OshiriWrappingsContract.abi,
      signer
    );
    try {
      const nextWrapping = await oshiriWrappings.getNextWrappingStats();
      const readableNextWrapping = getReadableWrapping(nextWrapping);
      setNextWrappingStats(readableNextWrapping);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAllWrappingsOwned = async () => {
    //Get all numbers possible
    //Loop all of them checking for the owner with the current address tokenOfOwnerByIndex
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiriWrappings = new ethers.Contract(
      oshiriWrappingsAddress,
      OshiriWrappingsContract.abi,
      signer
    );
    try {
      const totalWrappings = await oshiriWrappings.checkTotalWrappings();
      const readableTotal = parseInt(totalWrappings.toString());
      console.log("THE TOTAL WRAPPINGS", readableTotal);
      //TODO: Loop and get all tokens in array
      //TODO: Add loader?
      // let ownedWrappings = [];
      // for (let index = 1; index < readableTotal; index++) {
      //   oshiriWrappings.
      // }
    } catch (error) {
      console.error(error);
    }
  };

  //TODO
  const updateOshiri = async () => {
    if (!newOshiriStats) {
      return;
    }
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiri = new ethers.Contract(
      oshiriAddress,
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
      oshiriAddress,
      OshiriContract.abi,
      signer
    );
    const oshiriWrappings = new ethers.Contract(
      oshiriWrappingsAddress,
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

  const sendConsent = async (receiver: string) => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiri = new ethers.Contract(
      oshiriAddress,
      OshiriContract.abi,
      signer
    );
    try {
      const transaction = await oshiri.sendConsent(receiver);
      const tx = await transaction.wait();
      const event = tx.events[1];
      getOshiri();
    } catch (error) {
      console.error(error);
    }
  };

  const smacked = async (consenter: string) => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const oshiri = new ethers.Contract(
      oshiriAddress,
      OshiriContract.abi,
      signer
    );
    const oshiriCurrency = new ethers.Contract(
      oshiriCurrencyAddress,
      OshiriCurrencyContract.abi,
      signer
    );
    const walletAddress = await signer.getAddress();
    try {
      const transaction = await oshiri.smack(consenter);
      const tx = await transaction.wait();
      const event = tx.events[1];
      const balance = await oshiriCurrency.balanceOf(walletAddress);
      const newBalance = balance.toString();
      setAwardedCurrency(newBalance);
    } catch (error) {
      console.error(error);
    }
  };

  //! Next:
  //Fix: Revisar numeros de OSH: Al crear el token, no ponerle decimales?
  //* Show Owned Wrappings
  //* Be able to buy new wrapping
  //* Be able to wear different wrapping

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
                      newOshiriStats={newOshiriStats}
                      nextWrappingStats={nextWrappingStats}
                      getNextWrappingStats={getNextWrappingStats}
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
                        sendConsent={sendConsent}
                        currencyBalance={currencyBalance}
                        ownedWrappings={ownedWrappings}
                        getAllWrappingsOwned={getAllWrappingsOwned}
                      />
                    }
                  />
                </>
              )}
            </>
          )}
          <Route
            path="/:address"
            element={
              <TheirOshiri
                getOtherOshiri={getOtherOshiri}
                smacked={smacked}
                awardedCurrency={awardedCurrency}
              />
            }
          />
          <Route path="/wrapping/:stats" element={<WrappingDisplay />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppContainer;
