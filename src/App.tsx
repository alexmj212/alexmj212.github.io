import React from "react";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Panel from "./components/Panel";
import Header from "./components/Header";
import Portfolio from "./components/portfoilo/Portfolio";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import { Link } from "react-scroll";
import ContactList from "./components/ContactList";

export type PageDefinition = {
  [key: string]: {
    id: string;
    name: string;
    href?: string;
    current?: boolean;
    disabled?: boolean;
  };
};

export const Pages: PageDefinition = {
  HOME: {
    id: "home",
    name: "Home",
    disabled: true,
  },
  ABOUT: {
    id: "about",
    name: "About",
  },
  PORTFOLIO: {
    id: "portfolio",
    name: "Portfolio",
  },
  SKILLS: {
    id: "skills",
    name: "Skills",
  },
  EDUCATION: {
    id: "education",
    name: "Education",
    disabled: true,
  },
  EXPERIENCE: {
    id: "experience",
    name: "Experience",
  },
  BLOG: {
    id: "blog",
    name: "Blog",
    href: "/blog"
  },
  FOOTER: {
    id: "footer",
    name: "Footer",
    disabled: true,
  },
};

const App = () => {
  return (
    <div className={`app-container`}>
      <Navbar></Navbar>
      <Section fullScreen sectionId={Pages.HOME.id} className={`-mt-8`}>
        <Panel overrideWidth={`max-w-4xl`}>
          <Header>
            <div className={`flex md:flex-row flex-col`}>
              <div className={`container flex justify-center m-0 mr-8 filter drop-shadow`}>
                <img className={`header-portrait`} alt="Alex Johnson portrait" src="/img/portrait.jpg" />
                <div className={`md:block hidden text-8xl hand-wave absolute`}>👋</div>
              </div>
              <div>
                <h1 className={`md:text-7xl text-4xl mb-8`}>Hey, my name is Alex</h1>
                <p className={`mb-8`}>
                  I'm a <strong className={`whitespace-nowrap`}>front-end software engineer</strong> based in <i className={`whitespace-nowrap font-light`}>Lexington, KY</i> and I specialize in building (and sometimes designing) experiences for the
                  web.
                </p>
                <Link to={Pages.PORTFOLIO.id} smooth offset={2} className={`hero-button`}>
                  Check out my work
                </Link>
              </div>
            </div>
          </Header>
        </Panel>
      </Section>
      <Section sectionId={Pages.ABOUT.id} className={`text-white bg-accent1 dark:bg-accent1-dark dark:text-white-dark`}>
        <Panel header="About Me">
          <p>
            For 7 years, I have delivered great user experiences using a wide variety of technologies. I have coordinated teams to deliver feature-rich projects from idea to production. I focus on design, usability, and user experience to create
            products for all audiences using modern concepts and practices.
          </p>
          <p>
            When I was young, I learned how to build basic web pages. This led to learning graphic design and creating images to use in layouts on my personal web pages. Even before finishing high school, I quickly decided that I wanted to pursue a
            career in front-end web development.
          </p>
          <p>
            Not long after, I graduated from the <strong>University of Kentucky</strong> in 2013 with a <i>B.S. in Computer Science</i>. While I was there, I studied discrete mathmatics, web development, and compilers. I also picked up some helpful
            skills including regular expressions, databases, and object-oriented programming.
          </p>
          <div className="flex justify-center items-center mt-8 mx-auto w-full max-w-screen-sm">
            <ContactList showLabel className={`light-link flex justify-evenly text-xl text-white dark:text-white-dark`}></ContactList>
          </div>
        </Panel>
      </Section>
      <Section sectionId={Pages.PORTFOLIO.id}>
        <Portfolio></Portfolio>
      </Section>
      <Section sectionId={Pages.SKILLS.id} className={`text-white bg-accent1 dark:bg-accent1-dark dark:text-white-dark`}>
        <Skills></Skills>
      </Section>
      <Section sectionId={Pages.EXPERIENCE.id}>
        <Experience></Experience>
      </Section>
      <Section sectionId={Pages.FOOTER.id} className={`text-white bg-accent1 dark:bg-accent1-dark dark:text-white-dark text-center`}>
        <Panel>
          <h1>Alex Johnson</h1>
          <ContactList className={`light-link flex justify-center w-full max-width-1/2 text-4xl text-white dark:text-white-dark`}></ContactList>
        </Panel>
      </Section>
    </div>
  );
};

export default App;
