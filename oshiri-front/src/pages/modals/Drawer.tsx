import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  drawerModal: boolean;
  setDrawerModal: React.Dispatch<React.SetStateAction<boolean>>;
  ownedWrappings: any[];
};

const Drawer: React.FC<Props> = ({
  drawerModal,
  setDrawerModal,
  ownedWrappings,
}: Props) => {
  const { t } = useTranslation();

  const getOwnedWrappings = () => {
    return ownedWrappings.map((wrapping, index) => {
      <div key={index}>{wrapping}</div>;
    });
  };

  return (
    <Modal isOpen={drawerModal} setIsOpen={setDrawerModal}>
      <div className="title">
        <h1>{t("drawerTitle")}</h1>
      </div>
      {getOwnedWrappings()}
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setDrawerModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default Drawer;
