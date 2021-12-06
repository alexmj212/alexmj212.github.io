import React from "react";

type PanelProps = {
  header?: string;
  children?: React.ReactNode;
};

const Panel: React.FunctionComponent<PanelProps> = (props: PanelProps) => {
  const { header, children } = props;
  return (
    <div className={`w-full max-w-prose bg-panel dark:bg-panel-dark shadow-2xl rounded px-8 py-8 pt-8 mt-8`}>
      {header && <h1>{header}</h1>}
      {children}
    </div>
  );
};

export default Panel;
