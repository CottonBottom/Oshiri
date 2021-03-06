import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Button from "../components/buttons/Button";
import { OshiriStats, Stories, WrappingStats } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import WrappingPreview from "../components/WrappingPreview";
import { getWrappingName } from "../utils/conversions";

type Props = {
  storyStage: Stories;
  setStoryStage: React.Dispatch<React.SetStateAction<Stories>>;
  setCustomizing: React.Dispatch<React.SetStateAction<boolean>>;
  makeOshiri: () => void;
  newOshiriStats: OshiriStats | null;
  nextWrappingStats: WrappingStats | null;
  getNextWrappingStats: () => void;
};

const Entrance: React.FC<Props> = ({
  storyStage,
  setStoryStage,
  setCustomizing,
  makeOshiri,
  newOshiriStats,
  nextWrappingStats,
  getNextWrappingStats,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (oshiriStats && wrappingStats && storyStage === Stories.wrappingIntro) {
  //     navigate("/myoshiri");
  //   }
  // }, [oshiriStats, wrappingStats]);

  useEffect(() => {
    if (storyStage === Stories.wrappingIntro) {
      getNextWrappingStats();
    }
  }, [storyStage]);

  const getStoryFromStage = (stage: number) => {
    switch (stage) {
      case Stories.oshiriIntro:
        return "oshiriIntro";
      case Stories.wrappingIntro:
        return "wrappingIntro";
      case Stories.noWrappingError:
        return "noWrappingError";
      default:
        return "oshiriIntro";
    }
  };

  const advanceStory = () => {
    switch (storyStage) {
      case Stories.oshiriIntro:
        setCustomizing(true);
        navigate("/customization");
        break;
      case Stories.wrappingIntro:
        makeOshiri();
        setStoryStage(Stories.none);
        break;
      case Stories.noWrappingError:
        navigate("/");
        setStoryStage(Stories.none);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="main-background main-background--only-text">
        <ChangeLanguage />
        <div className="main-container main-container--only-text">
          <div className="main-entrance">
            <div className="only-text">
              <p>{t(getStoryFromStage(storyStage))}</p>
            </div>
            {storyStage === Stories.wrappingIntro &&
              newOshiriStats &&
              nextWrappingStats && (
                <>
                  <WrappingPreview wrappingStats={nextWrappingStats} />
                  <div className="only-text only-text--bottom">
                    <p>
                      <mark>{getWrappingName(nextWrappingStats, t)}</mark>
                    </p>
                    <p>{t("wrappingIntro2")}</p>
                  </div>
                </>
              )}
            <Button type="primary" onClick={() => advanceStory()}>
              {t("next")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entrance;
