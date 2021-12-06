import React from "react";

type SectionProps = {
  fullScreen?: boolean;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Section: React.FunctionComponent<SectionProps> = (props: SectionProps) => {
  const { fullScreen, children, className } = props;
  return <section className={`container ${fullScreen ? 'h-screen' : ''} flex justify-center items-center flex-col ${className || ""}`}>{children}</section>;
};

export default Section;
