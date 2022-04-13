import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  sendConsentModal: boolean;
  setSendConsentModal: React.Dispatch<React.SetStateAction<boolean>>;
  walletToSendConsent: string;
  setWalletToSendConsent: React.Dispatch<React.SetStateAction<string>>;
  onSendConsent: () => void;
};

const SendConsent: React.FC<Props> = ({
  sendConsentModal,
  setSendConsentModal,
  walletToSendConsent,
  setWalletToSendConsent,
  onSendConsent,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={sendConsentModal} setIsOpen={setSendConsentModal}>
      <div className="title">
        <h1>{t("inputAddress")}</h1>
      </div>
      <input
        className="text-input text-input--small"
        maxLength={42}
        placeholder={"0x0000000000000000000000000000000000000000"}
        type="text"
        value={walletToSendConsent}
        onChange={(e) => {
          setWalletToSendConsent(e.target.value);
        }}
      />
      <div className="list">
        <ul>
          <li>{t("sendConsentList1")}</li>
          <li>{t("sendConsentList2")}</li>
          <li>{t("sendConsentList3")}</li>
        </ul>
      </div>
      <Button
        type="primary"
        onClick={onSendConsent}
        isDisabled={walletToSendConsent.length !== 42}
      >
        Send Consent
      </Button>
    </Modal>
  );
};

export default SendConsent;
