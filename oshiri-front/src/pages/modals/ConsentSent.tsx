import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  consentSentModal: boolean;
  setConsentSentModal: React.Dispatch<React.SetStateAction<boolean>>;
  walletToSendConsent: string;
};

const ConsentSent: React.FC<Props> = ({
  consentSentModal,
  setConsentSentModal,
  walletToSendConsent,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={consentSentModal} setIsOpen={setConsentSentModal}>
      <div className="title">
        <h1>{t("consentSentTitle")}</h1>
      </div>
      <div className="list">
        <ul>
          <li>{t("consentSentList1", { address: walletToSendConsent })}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setConsentSentModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default ConsentSent;
