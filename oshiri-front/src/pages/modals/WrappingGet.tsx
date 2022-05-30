import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";
import WrappingPreview from "../../components/WrappingPreview";
import { WrappingStats } from "../../utils/constants";
import { getWrappingName } from "../../utils/conversions";

type Props = {
  wrappingGetModal: boolean;
  setWrappingGetModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalOSH: string;
  nextWrappingStats: WrappingStats | null;
  wrappingPrice: number | null;
};

const WrappingGet: React.FC<Props> = ({
  wrappingGetModal,
  setWrappingGetModal,
  nextWrappingStats,
  totalOSH,
  wrappingPrice,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={wrappingGetModal} setIsOpen={setWrappingGetModal}>
      <div className="title">
        <h1>{t("gotWrappingTitle")}</h1>
      </div>
      <div className="modal-preview-area">
        {nextWrappingStats && (
          <WrappingPreview wrappingStats={nextWrappingStats} />
        )}
      </div>
      <div className="list">
        <ul>
          <li>
            {nextWrappingStats && (
              <mark>{getWrappingName(nextWrappingStats, t)}</mark>
            )}
            {t("gotWrappingList1")}
          </li>
          <li>{t("gotWrappingList2")}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        {/* Check if enough OSH to enable/disable */}
        {wrappingPrice && (
          <Button
            type="primary"
            onClick={() => console.log("Execute NFT Creation")}
            isDisabled={parseInt(totalOSH) < wrappingPrice}
          >
            {t("spendOSH")}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default WrappingGet;
