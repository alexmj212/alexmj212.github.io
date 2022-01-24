import React from "react";

type PanelProps = {
  header?: string;
  overrideWidth?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Panel: React.FunctionComponent<PanelProps> = (props: PanelProps) => {
  const { header, overrideWidth, children, className } = props;
  return (
    <div className={`w-full ${overrideWidth || "max-w-3xl"} ${className || ""}`} >
      {header && <h1>{header}</h1>}
      {children}
    </div>
  );
};

export default Panel;
