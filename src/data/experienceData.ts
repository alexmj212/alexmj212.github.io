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
      "Led frontend development for B2B manufacturing marketplace serving thousands of manufacturers processing 2,000+ daily quotes",
      "Architected enterprise design system adopted by multiple product teams, significantly reducing duplicate code and accelerating feature development",
      "Delivered performance optimizations improving quote generation speed by 28% through architectural improvements",
      "Collaborated with cross-functional teams of 5-10 engineers to ship customer-facing features and internal tools on agile cycles",
      "Drove technical initiatives including component library standards, TypeScript migration, and GraphQL optimization"
    ],
    projects: [
      {
        name: "",
        skills: ["React", "TypeScript", "GraphQL", "Node.js", "AWS", "Docker", "Jest", "Storybook", "Webpack"]
      }
    ]
  },
  {
    date: "2017 - 2021",
    title: "Software Engineer",
    company: "TwinSpires.com",
    summary: [
      "Built features for online wagering platform serving 200,000+ daily active users",
      "Led cross-functional teams through major platform initiatives: dark mode implementation, responsive redesign (98% feature parity), and live video integration",
      "Coordinated design and implementation across multiple product teams, organizing developers and QA for site-wide releases",
      "Optimized frontend performance through CSS consolidation, reducing bundle sizes by 15% and improving page load times",
      "Maintained and enhanced legacy AngularJS applications while modernizing to Angular with TypeScript"
    ],
    projects: [
      {
        name: "",
        skills: ["Angular", "AngularJS", "TypeScript", "SASS", "CSS3", "HTML5", "Mobile", "Material", "Multimedia", "NodeJS", "NPM/Webpack", "AWS Lambda", "AWS DynamoDB"]
      }
    ]
  },
  {
    date: "2014 - 2017",
    title: "Software Engineer",
    company: "The Jockey Club Technology Services",
    summary: [
      "Developed full-stack web applications using AngularJS, Grails, and MS SQL Server for horse racing industry clients",
      "Led coordination of remote development teams and maintained Drupal-based content management systems"
    ],
    projects: [
      {
        name: "",
        skills: ["AngularJS", "Grails", "Bootstrap", "MS SQL Server", "Drupal", "Responsive Design"]
      }
    ]
  },
  {
    date: "2013 - 2014",
    title: "System Administrator",
    company: "iEntry, Inc.",
    summary: [
      "Developed server infrastructure software and marketing tools for subscriber analytics"
    ]
  }
];

export default experienceData;