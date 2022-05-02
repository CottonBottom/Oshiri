import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";

type Props = {
  smackedAwardsModal: boolean;
  setSmackedAwardsModal: React.Dispatch<React.SetStateAction<boolean>>;
  oshiriName: string;
  awardedCurrency: string;
};

const SmackedAwards: React.FC<Props> = ({
  smackedAwardsModal,
  setSmackedAwardsModal,
  oshiriName,
  awardedCurrency,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={smackedAwardsModal} setIsOpen={setSmackedAwardsModal}>
      <div className="title">
        <h1>{t("smackedOshiri", { oshiriName: oshiriName })}</h1>
      </div>
      <div className="list">
        <ul>
          <li>{t("smackedAwards", { awardedCurrency: awardedCurrency })}</li>
        </ul>
      </div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setSmackedAwardsModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default SmackedAwards;
