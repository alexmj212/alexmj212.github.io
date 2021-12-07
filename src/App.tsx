import React from "react";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Panel from "./components/Panel";
import Button from "./components/Button";
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
  return (
    <div className={`app-container`}>
      <Navbar></Navbar>
      <Section fullScreen sectionId={Pages.HOME}>
        <Panel overrideWidth={`max-w-2xl`}>
          <Header>
            <h1 className={`text-8xl mb-8`}>Hey, my name is Alex</h1>
            <p className={`mb-8`}>I'm a front-end software engineer based in Lexington, KY and I specialize in building (and sometimes designing) experiences for the web.</p>
            <Link to={Pages.PORTFOLIO} smooth offset={scrollOffset} className={`hero-button`}>
              Check out my work
            </Link>
          </Header>
        </Panel>
      </Section>
      <Section sectionId={Pages.ABOUT}>
        <Panel header="About Me">
          <div className={`sm:block flex justify-center`}>
            <img className={`portrait`} alt="Alex Johnson portrait" src="/img/portrait.jpg" />
          </div>
          <p>Hey, my name is Alex!</p>
          <p>
            For 7 years, I have delivered great user experiences using a wide variety of technologies. I have coordinated teams to deliver feature-rich projects from idea to production. I focus on design, usability, and user experience to create
            products for all audiences using modern concepts and practices.
          </p>
          <Button className={`hero-button`}>Get in touch!</Button>
        </Panel>
      </Section>
      <Section sectionId={Pages.PORTFOLIO}>
        <Portfolio></Portfolio>
      </Section>
      <Section sectionId={Pages.SKILLS}>
        <Skills></Skills>
      </Section>
      <Section sectionId={Pages.EDUCATION}>
        <Panel header="Education">
          <h2>
            The University of Kentucky <img className="uk" alt="University of Kentucky" src="img/UK.png" />
          </h2>
          <h3>B.S. in Computer Science</h3>
          <p>
            I graduated in 2013. While I was there, I studied discrete mathmatics, web development, and compilers. I also picked up some helpful skills including regular expressions, databases, and object-oriented programming.
          </p>
        </Panel>
      </Section>
      <Section sectionId={Pages.EXPERIENCE}>
        <Experience></Experience>
      </Section>
    </div>
  );
};

export default App;
