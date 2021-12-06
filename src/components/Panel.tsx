import React from "react";

type PanelProps = {
  children: React.ReactNode;
};

const Panel: React.FunctionComponent<PanelProps> = (props: PanelProps) => {
  const { children } = props;
  return <div className={`container max-w-prose bg-panel dark:bg-panel-dark shadow-md rounded px-8 py-8 pt-8 mt-8`}>{children}</div>;
};

export default Panel;
