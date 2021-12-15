import React from "react";
import { List, ListItem } from "./List";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ContactListProps = {
  showLabel?: boolean;
} & React.HTMLProps<HTMLDivElement>;

const ContactList = (props: ContactListProps) => {
  const { showLabel = false, className } = props;
  return (
    <List horizontal className={`flex-1 no-style justify-end items-center text-xl text-white dark:text-white-dark space-x-2 ${className || ""}`}>
      <ListItem>
        <a href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com" className={`text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark ${className || ""}`}>
          <FontAwesomeIcon icon={faEnvelope} /> 
          {showLabel && (
            <div className="ml-2 leading-none">
              {" "}
              <small>alexmj212@gmail.com</small>
            </div>
          )}
        </a>
      </ListItem>
      {/* <ListItem>
        <a href="tel:8596636843" title="Phone: 859-663-6843" className={`text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark ${className || ""}`}>
          <FontAwesomeIcon icon={faPhoneAlt} />
          {showLabel && (
            <>
              {" "}
              <small>859-663-6843</small>
            </>
          )}
        </a>
      </ListItem> */}
      <ListItem className="flex">
        <a href="https://www.linkedin.com/in/alex-johnson-077b3564/" title="LinkedIn: Alex Johnson" className={`text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark ${className || ""}`}>
          <FontAwesomeIcon icon={faLinkedin} /> 
          {showLabel && (
            <div className="ml-2 leading-none">
              {" "}
              <small>LinkedIn</small>
            </div>
          )}
        </a>
      </ListItem>
      <ListItem>
        <a href="https://www.github.com/alexmj212" title="GitHub: alexmj212" className={`text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark ${className || ""}`}>
          <FontAwesomeIcon icon={faGithub} /> 
          {showLabel && (
            <div className="ml-2 leading-none">
              {" "}
              <small>Github: alexmj212</small>
            </div>
          )}
        </a>
      </ListItem>
    </List>
  );
};

export default ContactList;
