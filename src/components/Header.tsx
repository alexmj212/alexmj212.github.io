import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { children } = props;
  return <div className={`w-full max-w-screen-md px-8 py-8 pt-8 mt-8`}>{children}</div>;
};

export default Header;
