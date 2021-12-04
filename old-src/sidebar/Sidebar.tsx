import { toggleTheme } from '../dark-mode';
import { SidebarContainer } from './Sidebar.styles';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <aside>
        <div className="me">
          <h2 id="header-page-nav" className="nav-item">
            Alex Johnson
          </h2>
        </div>
        <ul className="navigation no-style with-indicator">
          <li id="profile-page-nav" className="nav-item" onClick={() => null}>
            About Me
          </li>
          <li id="portfolio-page-nav" className="nav-item" onClick={() => null}>
            Portfolio
          </li>
          <li id="skills-page-nav" className="nav-item" onClick={() => null}>
            Skills
          </li>
          <li id="education-page-nav" className="nav-item" onClick={() => null}>
            Education
          </li>
          <li id="resume-page-nav" className="nav-item" onClick={() => null}>
            Experience
          </li>
        </ul>
        <ul className="summary no-style">
          <li>
            <a href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
          </li>
          <li>
            <a href="tel:8596636843" title="Phone: 859-663-6843">
              <i className="fas fa-phone-alt"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/alex-johnson-077b3564/" title="LinkedIn: Alex Johnson" target="_blank">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://www.github.com/alexmj212" title="GitHub: alexmj212" target="_blank">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a className="print" title="Print This Document" href="#" onClick={() => window.print()}>
              <i className="fas fa-print"></i>
            </a>
          </li>
          <li>
            <div title="Toggle theme" id="theme-control" className="theme-switch" onClick={() => toggleTheme()}>
              <i id="theme-toggle" className="fas fa-sun"></i>
            </div>
          </li>
        </ul>
      </aside>
    </SidebarContainer>
  );
};

export default Sidebar;
