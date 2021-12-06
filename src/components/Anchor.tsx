import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AnchorProps = {
  icon?: IconDefinition;
  href: string;
  title: string;
  children?: React.ReactNode;
};

const Anchor: React.FunctionComponent<AnchorProps> = (props: AnchorProps) => {
  const { icon, title, href, children } = props;
  return (
    <a href={href} title={title}>
      {icon && (
        <span className={children ? 'mr-3' : ''}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {children}
    </a>
  );
};

export default Anchor;
