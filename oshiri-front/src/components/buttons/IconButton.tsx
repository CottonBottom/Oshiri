import React from "react";

type Props = {
  isDisabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: string;
};

const IconButton: React.FC<Props> = ({
  onClick,
  isDisabled,
  children,
  icon,
}: Props) => {
  return (
    <button
      className={"icon-button"}
      onClick={onClick}
      disabled={isDisabled || false}
    >
      <span className="material-icons">{icon}</span>
      {children}
    </button>
  );
};

export default IconButton;
