import React from "react";
import { Pages } from "../App";

type SectionProps = {
  fullScreen?: boolean;
  children?: React.ReactNode;
  sectionId: Pages;
} & React.HTMLProps<HTMLDivElement>;

const Section: React.FunctionComponent<SectionProps> = (props: SectionProps) => {
  const { fullScreen, sectionId, children, className } = props;
  return <section id={sectionId} className={`container w-full max-w-full z-10 ${fullScreen ? 'h-screen' : 'md:section-container'} flex justify-center items-center flex-col ${className || ""}`}>{children}</section>;
};

export default Section;
