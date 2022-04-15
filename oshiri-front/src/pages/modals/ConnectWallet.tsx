import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  connectWalletModal: boolean;
  setConnectWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConnectWallet: React.FC<Props> = ({
  connectWalletModal,
  setConnectWalletModal,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={connectWalletModal} setIsOpen={setConnectWalletModal}>
      <div className="title">
        <h1>{t("connectWalletTitle")}</h1>
      </div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setConnectWalletModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default ConnectWallet;
