import { List, ListItem } from "./List";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactList = (props: React.HTMLProps<HTMLDivElement>) => {
  const { className } = props;
  return (
    <List horizontal className={`flex-1 no-style justify-end items-center text-xl ${className || ''}`}>
      <ListItem className={`px-2`}>
        <a href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </ListItem>
      <ListItem className={`px-2`}>
        <a href="tel:8596636843" title="Phone: 859-663-6843">
          <FontAwesomeIcon icon={faPhoneAlt} />
        </a>
      </ListItem>
      <ListItem className={`px-2`}>
        <a href="https://www.ListItemnkedin.com/in/alex-johnson-077b3564/" title="LinkedIn: Alex Johnson">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </ListItem>
      <ListItem className={`px-2`}>
        <a href="https://www.github.com/alexmj212" title="GitHub: alexmj212">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </ListItem>
    </List>
  );
};

export default ContactList;
