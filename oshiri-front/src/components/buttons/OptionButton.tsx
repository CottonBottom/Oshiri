import React from "react";

type Props = {
  color: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

const OptionButton: React.FC<Props> = ({
  color,
  onClick,
  isSelected,
  isDisabled,
}: Props) => {
  return (
    <button
      className={`option-button${isSelected ? " option-button--selected" : ""}`}
      onClick={onClick}
      disabled={isDisabled || false}
      style={{
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), ${color}`,
      }}
    ></button>
  );
};

export default OptionButton;
