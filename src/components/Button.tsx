import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = {
  icon?: IconDefinition;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const { icon, children, className } = props;
  return (
    <button className={`${className || ""}`}>
      {icon && (
        <span className={children ? "mr-3" : ""}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
