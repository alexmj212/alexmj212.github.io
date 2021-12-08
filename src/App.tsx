import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Panel from "./components/Panel";
import Header from "./components/Header";
import Portfolio from "./components/portfoilo/Portfolio";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import { Link } from "react-scroll";

export enum Pages {
  HOME = "home",
  ABOUT = "about",
  PORTFOLIO = "portfolio",
  SKILLS = "skills",
  EDUCATION = "education",
  EXPERIENCE = "experience",
  FOOTER = "footer",
}

export const scrollOffset = -30;

const App = () => {
  const [navUsed, setNavUsed] = useState<boolean>(false);

  const disableAnimation = () => {
    console.log("navUsed", true);
    setNavUsed(true);
  }

  const enableAnimation = () => {
    console.log("navUsed", false);
    setNavUsed(false);
  }

  useEffect(() => {
    window.onscroll = () =>
      window.pageYOffset === 0 && enableAnimation();
  });

  return (
    <div className={`app-container`}>
      <Navbar disableAnimation={disableAnimation}></Navbar>
      <Section fullScreen sectionId={Pages.HOME} navUsed={navUsed}>
        <Panel overrideWidth={`max-w-4xl`}>
          <Header>
            <div className={`flex flex-row`}>
              <div className={`container md:block hidden`}>
                <img className={`header-portrait m-0 mr-8`} alt="Alex Johnson portrait" src="/img/portrait.jpg" />
                <div className={`text-8xl hand-wave absolute hover:animate-highfive animate-wiggle `}>👋</div>
              </div>
              <div>
                <h1 className={`md:text-8xl text-6xl mb-8`}>Hey, my name is Alex</h1>
                <p className={`mb-8`}>
                  I'm a <strong className={`whitespace-nowrap`}>front-end software engineer</strong> based in <i className={`whitespace-nowrap font-light`}>Lexington, KY</i> and I specialize in building (and sometimes designing) experiences for the
                  web.
                </p>
                <Link to={Pages.PORTFOLIO} smooth offset={scrollOffset} className={`hero-button`}>
                  Check out my work
                </Link>
              </div>
            </div>
          </Header>
        </Panel>
      </Section>
      <Section sectionId={Pages.ABOUT} navUsed={navUsed}>
        <Panel header="About Me">
          <p>
            For 7 years, I have delivered great user experiences using a wide variety of technologies. I have coordinated teams to deliver feature-rich projects from idea to production. I focus on design, usability, and user experience to create
            products for all audiences using modern concepts and practices.
          </p>
        </Panel>
      </Section>
      <Section sectionId={Pages.PORTFOLIO} navUsed={navUsed}>
        <Portfolio></Portfolio>
      </Section>
      <Section sectionId={Pages.SKILLS} navUsed={navUsed}>
        <Skills></Skills>
      </Section>
      <Section sectionId={Pages.EDUCATION} navUsed={navUsed}>
        <Panel header="Education">
          <h2>
            The University of Kentucky <img className="uk" alt="University of Kentucky" src="img/UK.png" />
          </h2>
          <h3>B.S. in Computer Science</h3>
          <p>I graduated in 2013. While I was there, I studied discrete mathmatics, web development, and compilers. I also picked up some helpful skills including regular expressions, databases, and object-oriented programming.</p>
        </Panel>
      </Section>
      <Section sectionId={Pages.EXPERIENCE} navUsed={navUsed}>
        <Experience></Experience>
      </Section>
    </div>
  );
};

export default App;
