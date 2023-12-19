import { FC } from "react";
import "./index.css";

export enum ButtonSizes {
  "default",
  "lg",
  "md",
  "sm",
}

type ButtonPrimaryPropTypes = {
  text: string;
  size: ButtonSizes;
  onClick: (_: unknown) => void;
};

const ButtonPrimary: FC<ButtonPrimaryPropTypes> = ({
  text,
  size = "default",
  onClick,
}) => {
  return (
    <div onClick={onClick} className="button-primary">
      {text} {size}
    </div>
  );
};

export default ButtonPrimary;
