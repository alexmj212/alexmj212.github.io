import React from "react";
import { List, ListItem } from "./List";
import { faGithub, faLinkedin, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ContactListProps = {
  showLabel?: boolean;
  iconSize?: string;
  labelSize?: string;
  onDarkBG?: boolean;
  styleVariant?: "default" | "minimal" | "card" | "footer";
} & React.HTMLProps<HTMLDivElement>;

type ContactItem = {
  href: string;
  title: string;
  icon: IconDefinition;
  label: string;
};

const ContactItems: ContactItem[] = [
  {
    href: "mailto:alexmj212@gmail.com",
    title: "Email: alexmj212@gmail.com",
    icon: faEnvelope,
    label: "alexmj212@gmail.com",
  },
  {
    href: "https://www.linkedin.com/in/alexmj212",
    title: "LinkedIn: Alex Johnson",
    icon: faLinkedin,
    label: "LinkedIn",
  },
  { href: "https://www.github.com/alexmj212", title: "GitHub: alexmj212", icon: faGithub, label: "Github: alexmj212" },
];

const ContactList = (props: ContactListProps) => {
  const { showLabel = false, className, iconSize = "text-base", labelSize = "text-base", onDarkBG = false, styleVariant = "default" } = props;

  let colorStyle = "";

  switch (styleVariant) {
    case "card":
      colorStyle = "contact-link";
      break;
    case "footer":
      colorStyle = "contact-link-footer";
      break;
    case "minimal":
      colorStyle = "contact-link-minimal";
      break;
    default:
      if (onDarkBG) {
        colorStyle = "text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark";
      } else {
        colorStyle = "text-accent1 dark:text-accent1 hover:text-accent2 dark:hover:text-accent2 transition-colors duration-200";
      }
      colorStyle += ` ${iconSize}`;
      break;
  }
  return (
    <List horizontal className={`flex-1 no-style items-center space-x-2 ${className || ""}`}>
      {ContactItems.map((item) => (
        <ListItem key={item.href}>
          <a href={item.href} title={item.label} className={`${colorStyle} ${showLabel ? "flex items-center" : ""}`}>
            <FontAwesomeIcon icon={item.icon} />
            {showLabel && <div className={`${labelSize} ${styleVariant === "card" ? "" : "ml-2 leading-none"}`}>{item.label}</div>}
          </a>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
