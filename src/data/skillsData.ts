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
    title: "Frontend Technologies",
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
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS, responsive design, component styling",
      },
      {
        name: "Styled Components",
        description: "CSS-in-JS, dynamic styling, component-based styling",
      },
    ],
  },
  architecture: {
    title: "Architecture & Performance",
    icon: "fas fa-rocket",
    skills: [
      {
        name: "Design Systems",
        description: "Component libraries, design tokens, consistent UI/UX patterns",
      },
      {
        name: "Component Architecture",
        description: "Reusable patterns, composition, scalable component design",
      },
      {
        name: "Web Performance Optimization",
        description: "Core Web Vitals, Lighthouse optimization, performance monitoring",
      },
      {
        name: "Bundle Optimization",
        description: "Code splitting, tree shaking, lazy loading, bundle analysis, performance monitoring",
      },
      {
        name: "Responsive & Mobile-First Design",
        description: "Adaptive layouts, progressive enhancement, touch optimization, cross-device compatibility",
      },
      {
        name: "Micro-Frontends",
        description: "Module federation, independent deployments, scalable architecture",
      },
      {
        name: "SEO Optimization",
        description: "Meta tags, structured data, sitemap generation, performance",
      },
    ],
  },
  additional: {
    title: "Additional Skills",
    icon: "fas fa-plus-circle",
    skills: [
      {
        name: "Node.js",
        description: "Build tools, frontend tooling, development servers, npm scripts",
      },
      {
        name: "AWS (S3, DynamoDB)",
        description: "Cloud storage, static hosting, CDN integration, NoSQL integration",
      },
      {
        name: "Figma",
        description: "Design collaboration, prototyping, developer handoff",
      },
      {
        name: "Agile Methodologies",
        description: "SCRUM, sprint planning, retrospectives, story estimation",
      },
      {
        name: "Monorepo Management",
        description: "Yarn workspaces, Lerna, shared libraries, workspace optimization",
      },
    ],
  },
  tools: {
    title: "Development Tools",
    icon: "fas fa-tools",
    skills: [
      {
        name: "Vite",
        description: "Fast build tool, HMR, ESM-based dev server, production optimization",
      },
      {
        name: "Webpack",
        description: "Module bundling, code splitting, optimization, loaders, plugins",
      },
      {
        name: "Git / GitHub",
        description: "Version control, branching strategies, pull requests, code reviews",
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
        name: "CI/CD",
        description: "GitHub Actions, automated deployments, pipeline optimization",
      },
      {
        name: "Docker",
        description: "Containerization, multi-stage builds, compose, deployment",
      },
    ],
  },
};

export default skillsData;
