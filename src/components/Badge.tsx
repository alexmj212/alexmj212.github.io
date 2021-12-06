import React from "react";

type BadgeProps = {
  children?: React.ReactNode;
} & React.HTMLProps<HTMLSpanElement>;

const Badge: React.FunctionComponent<BadgeProps> = (props: BadgeProps) => {
  const { children, className } = props;
  return (
    <span className={`badge ${className || ""}`}>
      {children}
    </span>
  );
};

export default Badge;
