import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faAngular, faMicrosoft, faJsSquare, faNodeJs, faCss3, faHtml5, faNpm, faGithub, faReact } from "@fortawesome/free-brands-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";

type Skills = {
  name: string;
  icon: IconDefinition;
  description: string;
}[];

const skills: Skills = [

  {
    name: "TypeScript",
    icon: faMicrosoft,
    description: "Typing, classes, inheritance, interfaces, generics, compiler configuration",
  },
  {
    name: "React",
    icon: faReact,
    description: "Lifecycle hooks, hoisting state, component abstraction, JSX, GraphQL",
  },
  {
    name: "Angular (v2+)",
    icon: faAngular,
    description: "Modules, components, services, routing, NG tooling, Material",
  },
  {
    name: "JavaScript (ES5+)",
    icon: faJsSquare,
    description: "Classes, objects, JSON, event-based programming, ECMA modules, web components",
  },
  {
    name: "NodeJS",
    icon: faNodeJs,
    description: "Server-level Javascript development, environment configuration",
  },
  {
    name: "Responsive Design",
    icon: faMobileAlt,
    description: "Browser and operating system testing, media queries, responsive layouts, mobile-focused design",
  },
  {
    name: "SASS / CSS3",
    icon: faCss3,
    description: "Styling frameworks, reusability, precedence, pseudo-selectors, media queries, inheritence, flex box",
  },
  {
    name: "HTML5",
    icon: faHtml5,
    description: "Semantic document elements, multimedia content and controls",
  },
  {
    name: "NPM, Yarn, Grunt, Webpack",
    icon: faNpm,
    description: "Implementing toolchains for building and testing complex front-end frameworks",
  },
  {
    name: "Git / GitHub",
    icon: faGithub,
    description: "Branching strategy, merge conflict resolution, tagging, pull requests",
  },
];

export default skills;
