import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import Modal from "../../components/Modal";
import { WrappingStats } from "../../utils/constants";
import WrappingPreview from "../../components/WrappingPreview";

type Props = {
  drawerModal: boolean;
  setDrawerModal: React.Dispatch<React.SetStateAction<boolean>>;
  wrappingsOwned: WrappingStats[];
  wornWrapping?: string;
};

const Drawer: React.FC<Props> = ({
  drawerModal,
  setDrawerModal,
  wrappingsOwned,
  wornWrapping,
}: Props) => {
  const { t } = useTranslation();

  //TODO: Mark the worn wrapping, make it able to wear a different one

  const getOwnedWrappings = () => {
    return wrappingsOwned.map((wrapping, index) => (
      <>
        {wornWrapping}
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
        <WrappingPreview wrappingStats={wrapping} />
      </>
    ));
  };

  return (
    <Modal isOpen={drawerModal} setIsOpen={setDrawerModal}>
      <div className="title">
        <h1>{t("drawerTitle")}</h1>
      </div>
      <div className="modal-items-container">{getOwnedWrappings()}</div>
      <div className="modal-button-area">
        <Button type="secondary" onClick={() => setDrawerModal(false)}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default Drawer;
