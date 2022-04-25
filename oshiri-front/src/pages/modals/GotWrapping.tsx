import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  gotWrappingModal: boolean;
  setGotWrappingModal: React.Dispatch<React.SetStateAction<boolean>>;
  newWrappingName: string;
  wrappingPreview?: string;
};

const GotWrapping: React.FC<Props> = ({
  gotWrappingModal,
  setGotWrappingModal,
  newWrappingName,
  wrappingPreview,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={gotWrappingModal} setIsOpen={setGotWrappingModal}>
      <div className="title">
        <h1>{t("gotWrappingTitle")}</h1>
      </div>
      <div className="modal-preview-area">
        <div className="wrapping-preview">
          <img src={wrappingPreview} alt="" />
        </div>
      </div>
      <div className="list">
        <ul>
          <li>
            <mark>{newWrappingName}</mark>
            {t("gotWrappingList1")}
          </li>
          <li>{t("gotWrappingList2")}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setGotWrappingModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default GotWrapping;
