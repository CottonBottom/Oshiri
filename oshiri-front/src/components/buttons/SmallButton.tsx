import React from "react";

type Props = {
  isDisabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const SmallButton: React.FC<Props> = ({
  onClick,
  isDisabled,
  children,
}: Props) => {
  return (
    <button
      className={`small-button`}
      onClick={onClick}
      disabled={isDisabled || false}
    >
      {children}
    </button>
  );
};

export default SmallButton;
