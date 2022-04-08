import React from "react";

type Props = {
  type: "primary" | "secondary";
  isDisabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  type,
  onClick,
  isDisabled,
  children,
}: Props) => {
  return (
    <button
      className={`button button--${type}`}
      onClick={onClick}
      disabled={isDisabled || false}
    >
      {children}
    </button>
  );
};

export default Button;
