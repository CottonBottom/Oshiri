import React from "react";

type Props = {
  showTutorial: boolean;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
};

const Tutorial: React.FC<Props> = ({
  setShowTutorial,
  showTutorial,
}: Props) => {
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    if (showTutorial) {
      setIsShow(true);
    } else {
      setTimeout(() => {
        setIsShow(false);
      }, 500);
    }
  }, [showTutorial]);

  function getDialogContainerClass() {
    const classList = ["modal-container modal-container--tutorial"];
    if (!showTutorial) {
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
        <div
          className={getDialogContainerClass()}
          onClick={() => setShowTutorial(false)}
        >
          <div className="modal-tutorial">
            <div>Explanation</div>
            <div>Explanation</div>
            <div>Explanation</div>
            <div>Explanation</div>
            <div>Explanation</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tutorial;
