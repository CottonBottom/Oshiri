import React from "react";

type Props = {
  color: string;
  onClick: () => void;
};

const OptionButton: React.FC<Props> = ({ color, onClick }: Props) => {
  return (
    <button
      className="option-button"
      onClick={onClick}
      style={{
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), ${color}`,
      }}
    ></button>
  );
};

export default OptionButton;
