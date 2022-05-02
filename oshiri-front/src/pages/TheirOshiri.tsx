import React, { useEffect, useState } from "react";
import { OshiriStats, skinTones, WrappingStats } from "../utils/constants";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Oshiri from "../components/Oshiri";
import IconButton from "../components/buttons/IconButton";
import { getWrappingName, oshiriSizeDigitToScale } from "../utils/conversions";
import { useNavigate, useParams } from "react-router-dom";
import SmackedAwards from "./modals/SmackedAwards";

type Props = {
  getOtherOshiri: (address: string) => Promise<{
    readableOshiri: OshiriStats;
    readableWrapping: WrappingStats;
    walletAddress: string;
  } | null>;
  smacked: (address: string) => void;
  awardedCurrency: string;
};

const TheirOshiri: React.FC<Props> = ({
  getOtherOshiri,
  smacked,
  awardedCurrency,
}: Props) => {
  const [oshiriStats, setOshiriStats] = useState<OshiriStats | null>(null);
  const [wrappingStats, setWrappingStats] = useState<WrappingStats | null>(
    null
  );
  const [isSmacking, setIsSmacking] = useState<boolean>(false);
  const [smackedAwardsModal, setSmackedAwardsModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const { address } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOtherOshiri(address || "").then((stats) => {
      if (!stats) {
        navigate("/");
        return;
        //TODO: if there is not oshiri with the address, send to story warning
      }
      if (stats.walletAddress === address) {
        navigate("/");
        return;
        //TODO: if there is not oshiri with the address, send warning that its the same address
      }
      setOshiriStats(stats.readableOshiri);
      setWrappingStats(stats.readableWrapping);
    });
  }, [address, awardedCurrency]);

  useEffect(() => {
    if (awardedCurrency) {
      setSmackedAwardsModal(true);
    }
  }, [awardedCurrency]);

  const onSmacked = () => {
    setIsSmacking(false);
    smacked(address ? address : "");
  };

  const oshiriSize = oshiriSizeDigitToScale(oshiriStats ? oshiriStats.size : 1);
  const oshiriSkin = skinTones[oshiriStats ? oshiriStats.color : 1];
  const oshiriName = oshiriStats ? oshiriStats.name : "";
  const wrappingName = wrappingStats ? getWrappingName(wrappingStats, t) : "";
  const availableConsent = parseInt(oshiriStats?.currentConsent || "0");

  return (
    <>
      <SmackedAwards
        smackedAwardsModal={smackedAwardsModal}
        setSmackedAwardsModal={setSmackedAwardsModal}
        oshiriName={oshiriName}
        awardedCurrency={awardedCurrency}
      />
      <div className="main-background">
        <ChangeLanguage />
        {oshiriStats && wrappingStats && (
          <>
            <div className="main-container">
              <Oshiri
                oshiriSize={oshiriSize}
                oshiriSkin={oshiriSkin}
                isSmacking={isSmacking}
                smacked={() => onSmacked()}
              ></Oshiri>
              <div className="main-display">
                <div className="main-display__name">{oshiriName}</div>
                <div className="main-display__wrapping">{wrappingName}</div>
                <div className="main-display__options main-display__options--their-oshiri">
                  <IconButton
                    icon="help"
                    onClick={() => console.log("Clicked")}
                  >
                    {t("tutorial")}
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="main-actions-area">
              <div className="main-actions-container main-actions-container--their-oshiri">
                <div className="main-actions__set">
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsSmacking(true);
                    }}
                    isDisabled={availableConsent && !isSmacking ? false : true}
                  >
                    {t("spendConsent")}
                  </Button>
                  <div className="main-actions__value-container">
                    <div className="main-actions__value">
                      {availableConsent.toString().length < 2
                        ? `0${availableConsent}`
                        : availableConsent}
                    </div>
                    <div className="main-actions__currency">{t("Consent")}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TheirOshiri;
