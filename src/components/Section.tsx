import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Pages } from "../App";

type SectionProps = {
  fullScreen?: boolean;
  children?: React.ReactNode;
  sectionId: Pages;
  navUsed: boolean;
} & React.ComponentPropsWithRef<"section">;

const Section: React.FunctionComponent<SectionProps> = (props: SectionProps) => {
  const { fullScreen, sectionId, navUsed, children, className } = props;

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    initialInView: sectionId === Pages.HOME ,
    skip: navUsed,
    rootMargin: "-40%"
  });

  return (
    <div ref={ref} id={sectionId} className={`container w-full max-w-full z-10 ${fullScreen ? "h-screen" : "md:section-container"} flex justify-center items-center flex-col ${!navUsed && 'fade-in-section'} ${ inView ? 'is-visible' : '' } ${className || ""}`}>
      {children}
    </div>
  );
};

export default Section;
