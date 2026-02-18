export interface ExperienceProject {
  name: string;
  skills: string[];
}

export interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  summary: string[];
  projects?: ExperienceProject[];
}

export const experienceData: ExperienceItem[] = [
  {
    date: "2021 - Now",
    title: "Senior Software Engineer",
    company: "Xometry, Inc.",
    summary: [
      "Built core quoting interface and supplier management platform for B2B marketplace processing 2,000+ daily quotes, enabling seamless workflow for thousands of manufacturers and driving core revenue generation",
      "Architected enterprise design system adopted by 4+ product teams, training developers on component usage and establishing shared standards through documentation and code reviews",
      "Accelerated quote generation by 28% (25s to 18s) by redesigning frontend architecture to execute file upload and geometry analysis in parallel, eliminating sequential processing delays across 2,000+ daily quotes and improving conversion rates",
      "Orchestrated frontend delivery across cross-functional teams of 5-10 engineers, mentoring junior developers and establishing code quality standards through architecture reviews and pair programming",
    ],
    projects: [
      {
        name: "",
        skills: ["React", "TypeScript", "GraphQL", "Node.js", "AWS", "Docker", "Jest", "Storybook", "Webpack"],
      },
    ],
  },
  {
    date: "2017 - 2021",
    title: "Software Engineer",
    company: "TwinSpires.com",
    summary: [
      "Delivered dark mode to 200,000+ daily active users while reducing bundle size by 15% through CSS consolidation, improving both user experience and site-wide performance",
      "Spearheaded mobile-responsive redesign delivering 98% feature parity to the platform's second-largest user segment, increasing mobile engagement through adaptive component system",
      "Integrated live video streaming infrastructure supporting 10,000 daily active users during events, increasing engagement during peak wagering windows",
    ],
    projects: [
      {
        name: "",
        skills: ["Angular", "AngularJS", "TypeScript", "SASS", "CSS3", "HTML5", "Mobile", "Material", "Multimedia", "NodeJS", "NPM/Webpack", "AWS Lambda", "AWS DynamoDB"],
      },
    ],
  },
  {
    date: "2014 - 2017",
    title: "Software Engineer",
    company: "The Jockey Club Technology Services",
    summary: ["Developed full-stack web applications using AngularJS, Grails, and MS SQL Server for horse racing industry clients", "Led coordination of remote development teams and maintained Drupal-based content management systems"],
    projects: [
      {
        name: "",
        skills: ["AngularJS", "Grails", "Bootstrap", "MS SQL Server", "Drupal", "Responsive Design"],
      },
    ],
  },
  {
    date: "2013 - 2014",
    title: "System Administrator",
    company: "iEntry, Inc.",
    summary: [],
  },
];

export default experienceData;
