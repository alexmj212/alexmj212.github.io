import React from "react";

type SectionProps = {
  fullScreen?: boolean;
  children?: React.ReactNode;
  sectionId: string;
} & React.ComponentPropsWithRef<"div">;

const Section: React.FunctionComponent<SectionProps> = (props: SectionProps) => {
  const { fullScreen, sectionId, children, className } = props;

  return (
    <div id={sectionId} className={`container w-full max-w-full z-10 ${fullScreen ? "h-screen" : "md:section-container"} flex justify-center items-center flex-col ${className || ""}`}>
      {children}
    </div>
  );
};

export default Section;
