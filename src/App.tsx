import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import Section from "./components/Section";
import Panel from "./components/Panel";
import { List, ListItem } from "./components/List";
import Anchor from "./components/Anchor";
import Button from "./components/Button";

const App = () => {
  return (
    <div className={`App h-full w-full flex flex-col justify-center items-center`}>
      <Section fullScreen>
        <h1>Alex Johnson</h1>
      </Section>
      <Section>
        <Panel>
          <h2>About Me</h2>
          {/* <div class="image-container">
          <img class="float-right" src="./img/portrait.jpg" />
        </div> */}
          <p>Hey, my name is Alex!</p>
          <p>
            For 7 years, I have delivered great user experiences using a wide variety of technologies. I have coordinated teams to deliver feature-rich projects from idea to production. I focus on design, usability, and user experience to create
            products for all audiences using modern concepts and practices.
          </p>
          <Button className="hero-button">Get in touch!</Button>
        </Panel>
      </Section>
      <Section>
        <Panel>
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate volutpat ligula eget dapibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec metus metus, sollicitudin a
            efficitur quis, aliquam eu tellus.{" "}
            <Anchor href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com">
              hello world
            </Anchor>{" "}
            Donec eu elit et lectus auctor mollis quis sit amet elit. Nunc sed ante elit. Mauris tristique gravida ipsum, quis posuere lectus convallis a. Mauris vel leo eu justo maximus congue. Curabitur congue tristique magna vitae euismod. Vivamus
            convallis leo sed sem venenatis, quis facilisis neque malesuada. Nullam tempus accumsan pellentesque.
          </p>
          <h2>Hello World</h2>
          <p>
            Curabitur in massa in quam ultricies faucibus non id justo. Nullam vel eros magna. Suspendisse tortor turpis, dignissim in auctor eu, sagittis vel diam. Suspendisse et porttitor arcu, et scelerisque dolor. Nulla nec blandit tortor.
            Vivamus eros risus, bibendum ut tristique a, gravida consectetur sapien.
          </p>{" "}
          <List>
            <ListItem>Nulla eget luctus diam. Etiam sit amet augue nec dui aliquet aliquam at vitae dolor.</ListItem>
            <ListItem>Nullam lacinia diam ut risus interdum rutrum.</ListItem>
            <ListItem>Etiam sit amet augue nec dui aliquet aliquam at vitae dolor. Pellentesque commodo rutrum est, non dictum nisi euismod quis.</ListItem>
          </List>
          <p>
            Nulla eget luctus diam. Nullam lacinia diam ut risus interdum rutrum. Duis magna ligula, commodo in pellentesque ac, consectetur et purus. Mauris ut auctor leo. Phasellus tristique elit vulputate arcu iaculis, a mollis dui commodo.
            Praesent massa turpis, molestie ac nibh in, pretium blandit eros. Nulla nec tincidunt mi. Etiam sit amet augue nec dui aliquet aliquam at vitae dolor. Pellentesque commodo rutrum est, non dictum nisi euismod quis. Phasellus odio elit,
            viverra quis lacus vitae, iaculis congue metus.
          </p>
          <h3>Hello World</h3>
          <p>
            In eleifend eros est, id tempus turpis lobortis et. Curabitur vel rhoncus odio, sed consectetur tortor. Curabitur cursus, nisl eu ultrices aliquet, lectus metus tincidunt est, ullamcorper condimentum urna libero quis metus. Curabitur ac
            feugiat diam, at varius eros. Fusce bibendum augue eros, aliquet finibus tellus facilisis ut. Cras tempus arcu vitae placerat ullamcorper. Ut elementum risus et porttitor scelerisque.
          </p>
          <h4>Hello World</h4>
          <p>
            Maecenas ac dapibus mi. Morbi posuere commodo risus, at congue nibh sodales vitae. Nam a porttitor massa. Mauris eu ipsum ac libero tincidunt pretium in sollicitudin odio. Cras tincidunt commodo magna, aliquet aliquam nulla ultricies ut.
            Donec turpis metus, sagittis vitae elementum ut, venenatis non dui. In blandit bibendum auctor. Duis dapibus nibh quis arcu luctus, eu viverra nunc vulputate. Nulla ut lectus eu neque dignissim convallis. Integer nisi nulla, molestie ut
            risus et, suscipit maximus ipsum. Aliquam purus mauris, porta in ultrices sed, congue ac enim. Nulla facilisi. Aliquam suscipit eros purus, a iaculis tellus tristique dictum.
          </p>
        </Panel>
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
