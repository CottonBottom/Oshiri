import React from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../components/ChangeLanguage";
import Button from "../components/buttons/Button";
import logo from "../assets/images/logo.png";
import { Stories } from "../utils/constants";
import { useNavigate } from "react-router-dom";

type Props = {
  storyStage: Stories;
  setStoryStage: React.Dispatch<React.SetStateAction<Stories>>;
  setCustomizating: React.Dispatch<React.SetStateAction<boolean>>;
};

const Entrance: React.FC<Props> = ({
  storyStage,
  setStoryStage,
  setCustomizating,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        setCustomizating(true);
        setStoryStage(Stories.wrappingIntro);
        navigate("customization");
        break;
      case Stories.wrappingIntro:
        navigate("myoshiri");
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
