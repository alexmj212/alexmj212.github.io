import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, ListItem } from "../components/List";
import { Link } from "react-scroll";
import { Pages, scrollOffset } from "../App";

const Navbar = () => {
  return (
    <nav className={`sm:flex hidden w-full h-15 flex-row items-center sticky top-0 z-20 px-4 -mb-8 text-white bg-accent1 dark:bg-accent1-dark`}>
      <div className={`justify-start items-center`}>
        <h2 className={`m-0 mr-4`}>
          <Link to={Pages.HOME} smooth offset={scrollOffset}>
            Alex Johnson
          </Link>
        </h2>
      </div>
      <List horizontal className={`no-style items-center`}>
        <ListItem className={`nav-item`} onClick={() => null}>
          <Link className={`page-link`} to={Pages.ABOUT} smooth offset={scrollOffset}>
            About Me
          </Link>
        </ListItem>
        <ListItem className={`nav-item`} onClick={() => null}>
          <Link className={`page-link`} to={Pages.PORTFOLIO} smooth offset={scrollOffset}>
            Portfolio
          </Link>
        </ListItem>
        <ListItem className={`nav-item`} onClick={() => null}>
          <Link className={`page-link`} to={Pages.SKILLS} smooth offset={scrollOffset}>
            Skills
          </Link>
        </ListItem>
        <ListItem className={`nav-item`} onClick={() => null}>
          <Link className={`page-link`} to={Pages.EDUCATION} smooth offset={scrollOffset}>
            Education
          </Link>
        </ListItem>
        <ListItem className={`nav-item`} onClick={() => null}>
          <Link className={`page-link`} to={Pages.EXPERIENCE} smooth offset={scrollOffset}>
            Experience
          </Link>
        </ListItem>
      </List>
      <List horizontal className={`flex-1 no-style justify-end items-center text-xl`}>
        <ListItem className={`p-1`}>
          <a href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </ListItem>
        <ListItem className={`p-1`}>
          <a href="tel:8596636843" title="Phone: 859-663-6843">
            <FontAwesomeIcon icon={faPhoneAlt} />
          </a>
        </ListItem>
        <ListItem className={`p-1`}>
          <a href="https://www.ListItemnkedin.com/in/alex-johnson-077b3564/" title="LinkedIn: Alex Johnson">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </ListItem>
        <ListItem className={`p-1`}>
          <a href="https://www.github.com/alexmj212" title="GitHub: alexmj212">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </ListItem>
        {/* <ListItem className={`p-1`}>
          <a className="print" title="Print This Document" href="#" onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} />
          </a>
        </ListItem> */}
        {/* <ListItem className={`p-1`}>
          <div title="Toggle theme">
            <FontAwesomeIcon icon={faSun} />
          </div>
        </ListItem> */}
      </List>
    </nav>
  );
};

export default Navbar;
