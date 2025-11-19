export interface PortfolioItem {
  project: string;
  images?: string[];
  date: string;
  company: string;
  caption: string;
  challenge: string;
  solution: string;
  impact: string;
  technical_highlights: string[];
  badges: string[];
  demo_url?: string;
  github_url?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    project: "Xometry Quoting Platform",
    date: "2023 - 2025",
    company: "Xometry, Inc.",
    caption: "Advanced Quoting Features for Manufacturing Marketplace",
    challenge:
      "Building and maintaining sophisticated quoting features for a complex manufacturing marketplace required handling diverse material specifications, and manufacturing processes. The technical complexity involved managing real-time pricing calculations across thousands of manufacturing partners while maintaining rapid response times for customer-facing quote requests.",
    solution:
      "Architected and implemented React-based quoting workflows leveraging GraphQL for efficient data fetching and TypeScript for type-safe quote modeling. Built reusable component libraries for configuring manufacturing specifications and developed state management patterns to handle complex multi-step quoting flows with validation at each stage.",
    impact:
      "Improved quote generation speed and user experience, enabling customers to receive accurate pricing faster. Enhanced quote accuracy through better validation and specification capture, contributing to increased conversion rates and customer satisfaction across the platform's enterprise customer base.",
    technical_highlights: [
      "Designed complex form architecture handling 50+ manufacturing parameters with real-time validation",
      "Implemented GraphQL query optimization reducing quote load times by leveraging efficient data fetching patterns",
      "Built reusable component system for manufacturing specifications used across multiple product teams",
    ],
    badges: ["React", "TypeScript", "GraphQL"],
  },
  {
    project: "Loft Design System",
    date: "2022 - 2023",
    company: "Xometry, Inc.",
    caption: "Enterprise Design System for Manufacturing Platform",
    challenge: "Building flexible, reusable components that could adapt to diverse product needs across Xometry's platform required solving complex technical architecture challenges. Components needed to support multiple use cases while maintaining consistent APIs, handle varying data structures, and scale across teams without creating tight coupling or limiting future extensibility.",
    solution: "Enhanced and evolved the Loft design system by architecting highly composable React components with flexible prop APIs and TypeScript generics for type-safe reusability. Leveraged Storybook for comprehensive component documentation and visual testing, creating a robust development workflow. Implemented CSS-in-JS patterns and design tokens for consistent theming across all product surfaces.",
    impact: "Improved UI consistency across the entire Xometry platform and significantly increased component reuse, reducing duplicate code across product teams. The enhanced system enabled faster feature development through shared, well-tested components and established a single source of truth for design patterns.",
    technical_highlights: [
      "Architected composable component APIs supporting diverse product requirements with TypeScript generics",
      "Built comprehensive Storybook documentation with interactive examples and usage guidelines",
      "Implemented design token system ensuring visual consistency across platform",
      "Created reusable form components and data display patterns adopted by multiple product teams"
    ],
    badges: ["React", "TypeScript", "Storybook", "CSS3", "Design Systems"],
  },
  {
    project: "Xometry Partner Finance",
    date: "2021 - 2022",
    company: "Xometry, Inc.",
    caption: "Partner Financial Management System",
    challenge: "Provide a simple user experience that encapsulates all financial data for accounting and transaction recording.",
    solution:
      "This dashboard is a combination of existing transaction systems and a new frontend architecture that presented financial data in a unique and accessible interface for staff members. It offered tools to view, create, and downloads transactions associated with partner activity.",
    impact:
      "This dashbaord replaced a set of aging management systems and exposed new data previous unavailable for partner finance management across Xometry's partner network. Staff was able now able to quickly respond to partner needs and quickly assess transaction totals and payouts.",
    technical_highlights: [
      "A complex table component that included pagination, filtering, and sorting supporting thousands of transactions.",
      "A unique drilldown UX design that allowed staff to start at a high level and drill-down to singular transactions",
    ],
    badges: ["React", "TypeScript", "Tanstack Table", "Graphql"],
  },
  {
    project: "TwinSpires Dark Mode",
    images: [
      "assets/img/twinspires/program/program-dark-thumb.png",
      "assets/img/twinspires/program/program-mobile.png",
      "assets/img/twinspires/program/program-dark.png",
      "assets/img/twinspires/program/program-light.png",
      "assets/img/twinspires/program/calendar-mobile.png",
      "assets/img/twinspires/program/toteboard-dark.png",
      "assets/img/twinspires/program/toteboard-light.png",
    ],
    date: "2020 - 2021",
    company: "TwinSpires.com",
    caption: "Dark Mode Framework for TwinSpires.com",
    challenge:
      "The existing TwinSpires.com theming infrastructure lacked any dark-mode implementations, with hard-coded colors throughout 100+ components. Users were requesting dark mode options for extended viewing sessions and to compete with other sites with modern UX features.",
    solution: "Led cross-functional team to architect and implement a comprehensive CSS custom property-based theming system. Refactored component library to support dynamic theme switching while maintaining visual consistency.",
    impact: "Delivered dark mode to 200K+ daily active users, and improved overall site performance through CSS consolidation.",
    technical_highlights: [
      "Designed scalable CSS architecture using custom properties and SASS mixins",
      "Implemented real-time theme switching without page reloads",
      "Coordinated design system updates across multiple product teams",
      "Optimized bundle size by 15% through CSS consolidation",
    ],
    badges: ["Angular", "SASS", "Mobile", "CSS3"],
  },
  {
    project: "TwinSpires Responsive",
    images: ["assets/img/twinspires/responsive/program-mobile-thumb.png", "assets/img/twinspires/responsive/program-light.png", "assets/img/twinspires/responsive/landing-light.png", "assets/img/twinspires/responsive/calendar-light.png"],
    date: "2018",
    company: "TwinSpires.com",
    caption: "Responsive Implementation of TwinSpires.com",
    challenge:
      "A redesigned TwinSpires.com was initially desktop-only and an aging mobile website needed to be replaced with a scalable single frontend. Complex betting interfaces and real-time data required complete reimagining for mobile without losing functionality.",
    solution: "Spearheaded mobile-first responsive redesign, creating adaptive component system that maintained full feature parity across all screen sizes. Implemented progressive enhancement strategy.",
    impact: "Increased mobile user engagement by serving a mobile-focused presentation and achieved 98% feature parity between desktop and mobile experiences.",
    technical_highlights: [
      "Architected responsive component library with breakpoint-specific behaviors",
      "Implemented touch-optimized betting interfaces for complex wagering",
      "Optimized mobile performance by reducing bundle sizes and compiled CSS",
      "Led cross-browser compatibility testing across 20+ device/OS combinations",
    ],
    badges: ["Angular", "TypeScript", "Mobile", "CSS3"],
  },
  {
    project: "Word Guess",
    images: ["assets/img/word-guess/screenshot-2022-02-07-012424.png", "assets/img/word-guess/screenshot-2022-01-16-163037.png", "assets/img/word-guess/screenshot-2022-01-16-145020.png", "assets/img/word-guess/screenshot-2022-01-16-162606.png"],
    date: "2022",
    company: "Personal",
    caption: "A Wordle-Inspired Word Guessing Game Built with React and TypeScript",
    demo_url: "https://alexmj212.dev/word-guess",
    github_url: "https://github.com/alexmj212/word-guess",
    challenge:
      "Wordle's viral success demonstrated the appeal of simple, shareable word games. However, the original game's client-side architecture, limited daily puzzles, and validation logic presented opportunities for enhancement. The challenge was to recreate the core mechanics while adding features like difficulty modes, unlimited play options, and improved hint accuracy for duplicate letters.",
    solution:
      "Built a comprehensive React-based word game that reverse-engineered Wordle's mechanics through careful analysis. Implemented a sophisticated validation system handling edge cases like duplicate letters, created a dual-dictionary system (2,316 puzzle words + 10,000 valid guesses), and added features beyond the original including difficulty modes, dark/light themes, and both daily and random puzzle options. The architecture uses TypeScript for type safety and local storage for persistent game state.",
    impact:
      "Successfully deployed reaching 3,400+ unique users since launch. Generated 180,000+ game interactions with 34,000+ puzzles solved and an average of 72 guesses per active user. The project served as a deep technical exploration documented in a 3-part blog series, demonstrating expertise in React state management, complex string validation algorithms, and user experience design. User engagement metrics show strong retention with features like difficulty modes (300+ uses) and theme switching (300+ uses) being actively utilized.",
    technical_highlights: [
      "Engineered dual-dictionary validation system with 12,000+ words for accurate guess validation",
      "Implemented complex letter hint algorithm handling duplicate letters and position matching with proper state management",
      "Built responsive keyboard component with visual hint preservation across guesses using TypeScript interfaces",
      "Created shareable emoji grid generation matching Wordle's viral sharing mechanism",
      "Designed persistent game state using local storage with statistics tracking and streak management",
    ],
    badges: ["React", "TypeScript", "Tailwind CSS", "Game Development", "Personal Project"],
  },
  {
    project: "Pixel Bot",
    date: "2023",
    company: "Personal",
    caption: "PLACEHOLDER: Add caption for personal project",
    challenge: "PLACEHOLDER: Add details about the challenge or problem you solved",
    solution: "PLACEHOLDER: Add details about your solution and approach",
    impact: "PLACEHOLDER: Add measurable impact and results",
    technical_highlights: ["PLACEHOLDER: Add technical highlight 1", "PLACEHOLDER: Add technical highlight 2", "PLACEHOLDER: Add technical highlight 3"],
    badges: ["JavaScript", "CSS3", "HTML5", "Personal Project"],
  },
  {
    project: "TwinSpires Video",
    images: ["assets/img/twinspires/video/video-desktop-thumb.png", "assets/img/twinspires/video/video-desktop-light.png", "assets/img/twinspires/video/video-mobile-light.png"],
    date: "2018 - 2020",
    company: "TwinSpires.com",
    caption: "Live and Replayable Video of Racing Content",
    challenge: "Multiple third-party video providers with different APIs, inconsistent user experience, and complex requirements for live racing video with betting integration during events.",
    solution: "Built unified video frontend component layer supporting multiple providers and created seamless betting-while-watching experience with synchronized data overlays.",
    impact: "Increased user engagement during live events, and supported a video user experience for 10k daily active users.",
    technical_highlights: ["Architected provider-agnostic video component system", "Implemented real-time data synchronization with live video streams", "Built custom video controls optimized for racing content"],
    badges: ["Angular", "HTML5", "Mobile", "Multimedia"],
  },
];

export default portfolioData;
