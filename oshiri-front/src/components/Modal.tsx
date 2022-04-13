import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ setIsOpen, isOpen, children }: Props) => {
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsShow(true);
    } else {
      setTimeout(() => {
        setIsShow(false);
      }, 500);
    }
  }, [isOpen]);

  function getDialogContainerClass() {
    const classList = ["modal-container"];
    if (!isOpen) {
      classList.push("modal-container--fade-out");
    }
    if (isShow) {
      classList.push("modal-container--fade-in");
    }
    return classList.join(" ");
  }
  return (
    <>
      {isShow && (
        <div className={getDialogContainerClass()}>
          <div className="modal">
            <button className="modal__close" onClick={() => setIsOpen(false)}>
              <span className="material-icons">cancel</span>
            </button>
            <div className="modal__contents">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
