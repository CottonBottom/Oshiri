import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";
import { WrappingStats } from "../../utils/constants";
import { getWrappingName } from "../../utils/conversions";

type Props = {
  wrappingPreviewModal: boolean;
  setWrappingPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  wrappingStats: WrappingStats;
};

const WrappingPreview: React.FC<Props> = ({
  wrappingPreviewModal,
  setWrappingPreviewModal,
  wrappingStats,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={wrappingPreviewModal} setIsOpen={setWrappingPreviewModal}>
      <div className="title">
        <h1>{t("gotWrappingTitle")}</h1>
      </div>
      <div className="modal-preview-area">
        <div className="wrapping-preview">
          {/* <img src={wrappingPreview} alt="" /> */}
          {/* TODO: Assemble Wrapping with data */}
        </div>
      </div>
      <div className="list">
        <ul>
          <li>
            <mark>{getWrappingName(wrappingStats, t)}</mark>
            {t("gotWrappingList1")}
          </li>
          <li>{t("gotWrappingList2")}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        {/* Check if enough OSH to enable/disable */}
        <Button
          type="secondary"
          onClick={() => console.log("Execute NFT Creation")}
        >
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default WrappingPreview;
