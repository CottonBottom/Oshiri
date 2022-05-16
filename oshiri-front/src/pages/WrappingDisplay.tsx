import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import WrappingPreview from "../components/WrappingPreview";
import { WrappingStats } from "../utils/constants";
import { getWrappingName } from "../utils/conversions";

type Props = {};

const WrappingDisplay = ({}: Props) => {
  const { t } = useTranslation();

  const { stats } = useParams();

  const getWrappingStats = (): WrappingStats | null => {
    if (!stats || stats.length !== 5) {
      return null;
    }

    const wType = parseInt(stats[0]);
    const wSubType = parseInt(stats[1]);
    const wVariation = parseInt(stats[2]);
    const wBaseColor = parseInt(stats[3]);
    const wSecondaryColor = parseInt(stats[4]);

    console.log("wType: " + wType);

    if (!wType || !wSubType || !wVariation || !wBaseColor || !wSecondaryColor) {
      return null;
    }

    if (
      wType > 6 ||
      wSubType > 3 ||
      wVariation > 4 ||
      wBaseColor > 3 ||
      wSecondaryColor > 6
    ) {
      return null;
    }

    return {
      wType: parseInt(stats[0]),
      wSubType: parseInt(stats[1]),
      wVariation: parseInt(stats[2]),
      wBaseColor: parseInt(stats[3]),
      wSecondaryColor: parseInt(stats[4]),
      wSerialNumber: 0,
    };
  };

  const wrappingStats = getWrappingStats();

  return (
    <div className="main-background main-background--only-text">
      <div className="main-entrance">
        {wrappingStats ? (
          <>
            <WrappingPreview
              wrappingStats={wrappingStats}
              isLarge
            ></WrappingPreview>
            <div className="only-text only-text--bottom">
              <p>
                <mark>{getWrappingName(wrappingStats, t)}</mark>
              </p>
            </div>
          </>
        ) : (
          <div className="only-text">
            <p>{t("noWrappingFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrappingDisplay;
