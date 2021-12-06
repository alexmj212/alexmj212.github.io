type Project = {
  name: string;
  skills: string[];
};

type Experience = {
  date: string;
  title: string;
  company: string;
  summary?: string[];
  projects?: Project[];
}[];

const experienceData: Experience = [
  {
    date: "2021 - Now",
    title: "Software Engineer",
    company: "Xometry",
    projects: [
      {
        name: "",
        skills: ["React", "TypeScript", "GraphQL"]
      }
    ],
  },
  {
    date: "2017 - 2021",
    title: "Software Engineer",
    company: "TwinSpires.com",
    summary: [
      "Work with multiple delivery teams focused on web-based products",
      "Coordinate design and implementation to meet project goals",
      "Organize developers and quality assurance team members for site-wide projects",
      "Support legacy products and administrative applications",
    ],
    projects: [
      {
        name: "",
        skills: ["Angular", "AngularJS", "TypeScript", "SASS", "CSS3", "HTML5", "Mobile", "Material", "Multimedia", "NodeJS", "NPM/Webpack", "AWS Lambda", "AWS DynamoDB"],
      },
      // {
      //   name: "Dark Mode Theme for TwinsSpires.com",
      //   skills: ["Angular", "SASS", "CSS3", "Mobile"],
      // },
      // {
      //   name: "Environment upgrade and migration to recent Angular versions",
      //   skills: ["Angular", "TypeScript", "NodeJS", "NPM / WebPack"],
      // },
      // {
      //   name: "Integrated Wagering Interface",
      //   skills: ["Angular", "TypeScript", "Mobile", "CSS3"],
      // },
      // {
      //   name: "Site menu system and administrative tools for management of site navigation",
      //   skills: ["AngularJS", "Angular", "Material"],
      // },
      // {
      //   name: "Historical Horse Racing Results",
      //   skills: ["AWS Lambda", "AWS DynamoDB", "NodeJS"],
      // },
      // {
      //   name: "TwinSpires.com Video features",
      //   skills: ["Angular", "HTML5", "Mobile", "Multimedia"],
      // },
      // {
      //   name: "Responsive Implementation of TwinSpires.com",
      //   skills: ["Angular", "TypeScript", "Mobile", "CSS3"],
      // },
    ],
  },
  {
    date: "2014 - 2017",
    title: "Software Engineer",
    company: "The Jockey Club Technology Services",
    summary: [
      "Created and deployed user interfaces and server infrastructure",
      "Lead the management of remote resources to achieve project goals",
      "Communicated proactively among team members and clients",
      "Supported and maintained existing applications and infrastructure",
    ],
    projects: [
      {
        name: "",
        skills: ["AngularJS", "Grails", "Bootstrap", "MS SQL Server", "Drupal", "Responsive Design"],
      },
      // {
      //   name: "Betting Transaction Reporting and Mathematical Modeling",
      //   skills: ["AngularJS", "Grails", "Bootstrap"],
      // },
      // {
      //   name: "Organizational System for Data Accountability",
      //   skills: ["MS SQL Server", "Grails"],
      // },
      // {
      //   name: "Extraction, Transformation, Loading of Transactional Betting Data",
      //   skills: ["MS SQL Server", "Grails"],
      // },
      // {
      //   name: "Mathematical Modeling for International Rankings of Thoroughbreds",
      //   skills: ["PHP", "Bootstrap"],
      // },
      // {
      //   name: "Education and Personnel Management System for Stewardship Accreditation",
      //   skills: ["Bootstrap", "Mobile", "Drupal"],
      // },
      // {
      //   name: "Education and Course System for Attaining Training Certifications",
      //   skills: ["Bootstrap", "Mobile", "Drupal"],
      // },
      // {
      //   name: "Outreach and Commentary Blog on Worldwide Thoroughbred Topics",
      //   skills: ["CSS", "Mobile", "Drupal"],
      // },
    ],
  },
  {
    date: "2013 - 2014",
    title: "System Administrator",
    company: "iEntry, Inc.",
    summary: ["Developed critical data and server infrastructure software", "Implemented marketing tools to identify subscriber audience"],
  },
  {
    date: "2011 - 2013",
    title: "Technical Desktop Support",
    company: "College of Arts and Sciences - University of Kentucky",
  },
];

export default experienceData;
