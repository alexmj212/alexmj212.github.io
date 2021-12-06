import React from "react";

type ListProps = {
  horizontal?: boolean;
  children: React.ReactNode;
} & React.HTMLProps<HTMLUListElement>;

type ListItemProps = {
  children: React.ReactNode;
} & React.HTMLProps<HTMLLIElement>;

export const List: React.FunctionComponent<ListProps> = (props: ListProps) => {
  const { horizontal = false, children, className } = props;
  return <ul className={`${horizontal ? "flex flex-row flex-wrap" : ""} ${className || ""}`}>{children}</ul>;
};

export const ListItem: React.FunctionComponent<ListItemProps> = (props: ListItemProps) => {
  const { children, className } = props;
  return (
    <li className={`${className || ""}`}>
      {children}
    </li>
  );
};

export default List;
