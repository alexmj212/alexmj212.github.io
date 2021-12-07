import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { children } = props;
  return <div className={`w-full max-w-screen-md`}>{children}</div>;
};

export default Header;
