export interface Skill {
  name: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillsData: Record<string, SkillCategory> = {
  frontend: {
    title: "Core Tech",
    icon: "fas fa-code",
    skills: [
      {
        name: "React",
        description: "Hooks, Context API, component architecture, performance optimization",
      },
      {
        name: "TypeScript",
        description: "Static typing, interfaces, generics, advanced type systems",
      },
      {
        name: "Angular",
        description: "Component-based architecture, RxJS, dependency injection",
      },
      {
        name: "JavaScript (ES6+)",
        description: "Modern JavaScript, async/await, modules, DOM APIs",
      },
      {
        name: "HTML5",
        description: "Semantic markup, forms, multimedia, canvas, web storage",
      },
      {
        name: "CSS3",
        description: "Flexbox, Grid, animations, transitions, custom properties",
      },
      {
        name: "GraphQL",
        description: "Query language, Apollo Client, schema design, resolvers",
      },
      {
        name: "TanStack Query / React Query",
        description: "Server state management, caching, synchronization, mutations",
      },
    ],
  },
  styling: {
    title: "Design Systems",
    icon: "fas fa-palette",
    skills: [
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS, responsive design, component styling",
      },
      {
        name: "Material UI",
        description: "React component library, Material Design, theming, accessibility",
      },
      {
        name: "Styled Components",
        description: "CSS-in-JS, dynamic styling, component-based styling",
      },
      {
        name: "Design Systems",
        description: "Component libraries, design tokens, consistent UI/UX patterns",
      },
      {
        name: "Figma",
        description: "Design collaboration, prototyping, developer handoff",
      },
    ],
  },
  tools: {
    title: "Tooling",
    icon: "fas fa-tools",
    skills: [
      {
        name: "Webpack",
        description: "Module bundling, code splitting, optimization, loaders, plugins",
      },
      {
        name: "Vite",
        description: "Fast build tool, HMR, ESM-based dev server, production optimization",
      },
      {
        name: "Jest",
        description: "Unit testing, snapshot testing, coverage reports, mocking",
      },
      {
        name: "React Testing Library",
        description: "Component testing, user interaction testing, accessibility queries",
      },
      {
        name: "Playwright",
        description: "E2E testing, cross-browser automation, visual regression",
      },
      {
        name: "Storybook",
        description: "Component documentation, visual testing, design system development",
      },
      {
        name: "Git / GitHub",
        description: "Version control, branching strategies, pull requests, code reviews",
      },
      {
        name: "CI/CD",
        description: "GitHub Actions, automated deployments, pipeline optimization",
      },
      {
        name: "Docker",
        description: "Containerization, multi-stage builds, compose, deployment",
      },
      {
        name: "ESLint",
        description: "Code linting, error detection, code quality enforcement",
      },
      {
        name: "Prettier",
        description: "Code formatting, style consistency, pre-commit hooks",
      },
      {
        name: "NPM / Yarn / PNPM",
        description: "Package management, workspaces, dependency management",
      },
      {
        name: "Agile Methodologies",
        description: "SCRUM, sprint planning, retrospectives, story estimation",
      },
    ],
  },
  concepts: {
    title: "Architecture",
    icon: "fas fa-rocket",
    skills: [
      {
        name: "Web Performance",
        description: "Core Web Vitals, Lighthouse optimization, lazy loading, bundle analysis",
      },
      {
        name: "Progressive Web Apps",
        description: "Service workers, offline functionality, app-like experiences",
      },
      {
        name: "Micro-Frontends",
        description: "Module federation, independent deployments, scalable architecture",
      },
      {
        name: "Monorepo Management",
        description: "Yarn workspaces, Lerna, shared libraries, workspace optimization",
      },
      {
        name: "Mobile-First Design",
        description: "Responsive layouts, cross-browser compatibility, platform browser testing",
      },
      {
        name: "API Architecture",
        description: "REST, GraphQL, real-time communication, WebSockets, error handling",
      },
      {
        name: "SEO Optimization",
        description: "Meta tags, structured data, sitemap generation, performance",
      },
      {
        name: "User Experience",
        description: "UX research implementation, user-centered design, usability testing",
      },
    ],
  },
  backend: {
    title: "Infrastructure",
    icon: "fas fa-server",
    skills: [
      {
        name: "AWS S3",
        description: "Object storage, static hosting, CDN integration, bucket policies",
      },
      {
        name: "AWS Lambda",
        description: "Frontend integrations, serverless functions for UI features",
      },
      {
        name: "AWS DynamoDB",
        description: "Frontend data integration, NoSQL queries, data fetching",
      },
      {
        name: "Node.js",
        description: "Build tools, frontend tooling, development servers, npm scripts",
      },
      {
        name: "Sentry",
        description: "Error tracking, performance monitoring, release tracking",
      },
      {
        name: "Authentication Integration",
        description: "JWT, OAuth, Auth0, frontend authentication flows, token management",
      },
      {
        name: "API Integration",
        description: "REST, GraphQL, webhooks, third-party services, data synchronization",
      },
      {
        name: "Content Management",
        description: "Headless CMS, Drupal, content APIs, structured content",
      },
    ],
  },
};

export default skillsData;
