import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Button from "../components/buttons/Button";
import logo from "../assets/images/logo.png";
import { OshiriStats, Stories } from "../utils/constants";
import { useNavigate } from "react-router-dom";

type Props = {
  storyStage: Stories;
  setStoryStage: React.Dispatch<React.SetStateAction<Stories>>;
  setCustomizing: React.Dispatch<React.SetStateAction<boolean>>;
  makeOshiri: () => void;
  oshiriStats: OshiriStats | null;
};

const Entrance: React.FC<Props> = ({
  storyStage,
  setStoryStage,
  setCustomizing,
  makeOshiri,
  oshiriStats,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (oshiriStats) {
      navigate("/myoshiri");
    }
  }, [oshiriStats]);

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
        console.log("READY TO MAKE OSHIRI");
        makeOshiri();
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
        <div className="main-container main-container--only-text">
          <ChangeLanguage />
          <div className="main-entrance">
            <div className="only-text">
              <p>{t(getStoryFromStage(storyStage))}</p>
            </div>
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
