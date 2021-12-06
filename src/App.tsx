import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import Section from "./components/Section";
import Panel from "./components/Panel";
import { List, ListItem } from "./components/List";
import Anchor from "./components/Anchor";
import Button from "./components/Button";
import Header from "./components/Header";
import Portfolio from "./components/portfoilo/Portfolio";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";

const App = () => {
  return (
    <div className={`App h-full w-full flex flex-col justify-center items-center pb-8`}>
      <Section fullScreen className={`billboard`}>
        <Header>
          <h3>Hey, my name is</h3>
          <h1 className={`text-6xl`}>Alex Johnson</h1>
          <p>I'm a front-end software engineer based in Lexington, KY and I specialize in building (and sometimes designing) experiences for the web.</p>
          <Button className={`hero-button`}>Check out my work</Button>
        </Header>
      </Section>
      <Section>
        <Panel header="About Me">
          <div className={`sm:block flex justify-center`}>
            <img className={`portrait`} alt="Alex Johnson portrait" src="/img/portrait.jpg" />
          </div>
          <p>Hey, my name is Alex!</p>
          <p className={`text-sm`}>
            For 7 years, I have delivered great user experiences using a wide variety of technologies. I have coordinated teams to deliver feature-rich projects from idea to production. I focus on design, usability, and user experience to create
            products for all audiences using modern concepts and practices.
          </p>
          <Button className={`hero-button`}>Get in touch!</Button>
        </Panel>
      </Section>
      <Section>
        <Portfolio></Portfolio>
      </Section>
      <Section>
        <Skills></Skills>
      </Section>
      <Section>
        <Panel header="Education">
          <h2>
            The University of Kentucky <img className="uk" alt="University of Kentucky" src="img/UK.png" />
          </h2>
          <h3>B.S. in Computer Science</h3>
          <p>I graduated in 2013. While I was there, I studied discrete mathmatics, web development, and compilers. I also picked up some helpful skills including regular expressions, databases, and object-oriented programming.</p>
        </Panel>
      </Section>
      <Section>
        <Experience></Experience>
      </Section>
      <Section>
        <Panel>
          <List className={"text-4xl items-center no-style"} horizontal>
            <ListItem className={"flex-grow text-center"}>
              <Anchor href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com" icon={faEnvelope}></Anchor>
            </ListItem>
            <ListItem className={"flex-grow text-center"}>
              <Anchor href="tel:8596636843" title="Phone: 859-663-6843" icon={faPhoneAlt}></Anchor>
            </ListItem>
            <ListItem className={"flex-grow text-center"}>
              <Anchor href="https://www.linkedin.com/in/alex-johnson-077b3564/" title="LinkedIn: Alex Johnson" icon={faLinkedin}></Anchor>
            </ListItem>
            <ListItem className={"flex-grow text-center"}>
              <Anchor href="https://www.github.com/alexmj212" title="GitHub: alexmj212" icon={faGithub}></Anchor>
            </ListItem>
          </List>
        </Panel>
      </Section>
    </div>
  );
};

export default App;
