import React from "react";

type PanelProps = {
  header?: string;
  overrideWidth?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Panel: React.FunctionComponent<PanelProps> = (props: PanelProps) => {
  const { header, overrideWidth, children, className } = props;
  return (
    <div className={`w-full ${overrideWidth || "max-w-4xl"} px-8 py-8 pt-8 mt-8 ${className || ""}`} >
      {header && <h1>{header}</h1>}
      {children}
    </div>
  );
};

export default Panel;
