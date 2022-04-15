import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  newDayModal: boolean;
  setNewDayModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewDay: React.FC<Props> = ({ newDayModal, setNewDayModal }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={newDayModal} setIsOpen={setNewDayModal}>
      <div className="title">
        <h1>{t("newDayTitle")}</h1>
      </div>
      <div className="list">
        <ul>
          <li>{t("newDayList1")}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setNewDayModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default NewDay;
