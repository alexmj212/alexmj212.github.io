import ContactList from "./ContactList";
import { Link } from "react-scroll";
import { Pages, scrollOffset } from "../App";

const Navbar = () => {
  return (
    <nav className={`w-full h-16 shadow-2xl flex flex-row justify-center items-center sticky top-0 z-20 px-4 -mb-8 text-white bg-accent1 dark:bg-accent1-dark`}>
      <div className={`w-full max-w-screen-lg flex flex-row justify-start items-center`}>
        <div className={`flex flex-row justify-start items-center`}>
          <h2 className={`m-0 mr-4 light-link`}>
            <Link to={Pages.HOME} smooth offset={scrollOffset}>
              Alex Johnson
            </Link>
          </h2>
        </div>
        <ContactList className={"light-link"}></ContactList>
      </div>
    </nav>
  );
};

export default Navbar;
