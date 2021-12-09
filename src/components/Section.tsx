import React from "react";
import { Pages } from "../App";

type SectionProps = {
  fullScreen?: boolean;
  children?: React.ReactNode;
  sectionId: Pages;
} & React.ComponentPropsWithRef<"section">;

const Section: React.FunctionComponent<SectionProps> = (props: SectionProps) => {
  const { fullScreen, sectionId, children, className } = props;

  return (
    <div id={sectionId} className={`container w-full max-w-full z-10 ${fullScreen ? "h-screen" : "md:section-container"} flex justify-center items-center flex-col ${className || ""}`}>
      {children}
    </div>
  );
};

export default Section;
