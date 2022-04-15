import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  changeStatsModal: boolean;
  setChangeStatsModal: React.Dispatch<React.SetStateAction<boolean>>;
  changeStatsFee: string;
};

const ChangeStats: React.FC<Props> = ({
  changeStatsModal,
  setChangeStatsModal,
  changeStatsFee,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={changeStatsModal} setIsOpen={setChangeStatsModal}>
      <div className="title">
        <h1>{t("changeStatsTitle")}</h1>
      </div>
      <div className="list">
        <ul>
          <li>{t("changeStatsList1", { fee: changeStatsFee })}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setChangeStatsModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeStats;
