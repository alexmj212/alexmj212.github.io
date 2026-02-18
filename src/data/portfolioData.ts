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
  link?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    project: "Xometry Quoting Platform",
    date: "2023 - 2025",
    company: "Xometry, Inc.",
    caption: "Advanced Quoting Features for Manufacturing Marketplace",
    challenge: "Managing real-time pricing calculations across thousands of manufacturing partners while handling diverse material specifications and maintaining rapid response times for customer quote requests.",
    solution: "Built React-based quoting workflows with GraphQL data fetching and TypeScript type safety. Created reusable component libraries for manufacturing specifications and multi-step flows with validation.",
    impact: "Reduced quote generation time by 28% (25s to 18s) through asynchronous upload and geometry analysis, processing 2,000+ daily quotes and measurably improving conversion rates.",
    technical_highlights: [
      "Implemented asynchronous architecture for concurrent file upload and geometry analysis during form completion, eliminating sequential processing bottlenecks",
      "Designed form architecture handling 50+ manufacturing parameters with real-time validation",
      "Built reusable component system adopted by multiple product teams supporting thousands of daily quotes",
    ],
    badges: ["React", "TypeScript", "GraphQL"],
  },
  {
    project: "Loft Design System",
    date: "2022 - 2023",
    company: "Xometry, Inc.",
    caption: "Enterprise Design System for Manufacturing Platform",
    challenge: "Building flexible components that adapt to diverse product needs while maintaining consistent APIs and scaling across teams without tight coupling.",
    solution: "Architected composable React components with flexible prop APIs and TypeScript generics. Built comprehensive Storybook documentation and implemented design tokens for consistent theming.",
    impact: "Built enterprise design system with 30+ components and 100+ Storybook stories, adopted by multiple teams, significantly reducing duplicate code effort and accelerating feature development across the platform.",
    technical_highlights: [
      "Architected 30+ composable components with TypeScript generics supporting diverse product requirements",
      "Built extensive Storybook documentation with 100+ interactive examples and usage guidelines",
      "Implemented design token system ensuring visual consistency across platform",
      "Created reusable form and data display patterns that reduced development time and code duplication across multiple teams",
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
      "Built a unified dashboard combining existing transaction systems with new frontend architecture that presented financial data in an accessible interface for staff members. Offered tools to view, create, and download transactions associated with partner activity.",
    impact:
      "Consolidated multiple legacy systems into unified dashboard, significantly improving staff efficiency for partner financial inquiries and exposing previously unavailable transaction data across Xometry's partner network. Staff gained ability to quickly respond to partner needs and assess transaction totals and payouts.",
    technical_highlights: [
      "Built complex table component with pagination, filtering, and sorting supporting thousands of partner transactions",
      "Designed unique drilldown UX allowing staff to navigate from high-level summaries to individual transactions",
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
  {
    project: "TwinSpires Responsive",
    images: ["assets/img/twinspires/responsive/program-mobile-thumb.png", "assets/img/twinspires/responsive/program-light.png", "assets/img/twinspires/responsive/landing-light.png", "assets/img/twinspires/responsive/calendar-light.png"],
    date: "2018",
    company: "TwinSpires.com",
    caption: "Responsive Implementation of TwinSpires.com",
    challenge:
      "A redesigned TwinSpires.com was initially desktop-only and an aging mobile website needed to be replaced with a scalable single frontend. Complex betting interfaces and real-time data required complete reimagining for mobile without losing functionality.",
    solution: "Spearheaded mobile-first responsive redesign, creating adaptive component system that maintained full feature parity across all screen sizes. Implemented progressive enhancement strategy.",
    impact: "Delivered mobile-responsive experience to the platform's second-largest user segment, increasing mobile engagement and achieving 98% feature parity between desktop and mobile experiences.",
    technical_highlights: [
      "Architected responsive component library with breakpoint-specific behaviors",
      "Implemented touch-optimized betting interfaces for complex wagering",
      "Optimized mobile performance by reducing bundle sizes and compiled CSS",
      "Led rigorous cross-browser compatibility testing across 20+ device/OS combinations",
    ],
    badges: ["Angular", "TypeScript", "Mobile", "CSS3"],
  },
  {
    project: "Pixel Bot",
    date: "2025",
    company: "Personal",
    caption: "Full-Stack Twitch Stream Overlay with Real-Time Game System",
    link: "https://pixelbot.exogenesis.gg/",
    challenge: "Building a scalable system that manages real-time Twitch chat interactions, game state, and progressive reveal mechanics across multiple streams simultaneously while maintaining low latency and data persistence.",
    solution:
      "Architected a full-stack application deployed on Render.com with separate Twitch bot server and frontend overlay server. Built Twitch bot using Node.js to monitor chat and process commands, SQLite database for game state and statistics, and browser-source overlay with progressive pixel reveal animations. Designed as turnkey solution requiring zero streamer configuration.",
    impact: "Drives chat participation through competitive guessing while progressive reveal creates natural suspense. Enables streamers to add interactive elements to their streams with simple OBS browser source setup.",
    technical_highlights: [
      "Architected dual-server system on Render.com: Twitch bot and frontend overlay",
      "Implemented SQLite database for persistent game state and viewer statistics",
      "Built Node.js Twitch bot for real-time chat monitoring and command processing",
      "Designed browser-source overlay with real-time winner announcements and game feedback",
    ],
    badges: ["Node.js", "Twitch API", "SQLite"],
  },
  {
    project: "Word Guess",
    images: ["assets/img/word-guess/screenshot-2022-02-07-012424.png", "assets/img/word-guess/screenshot-2022-01-16-163037.png", "assets/img/word-guess/screenshot-2022-01-16-145020.png", "assets/img/word-guess/screenshot-2022-01-16-162606.png"],
    date: "2022",
    company: "Personal",
    caption: "A Wordle-Inspired Word Guessing Game Built with React and TypeScript",
    link: "https://alexmj212.dev/word-guess/",
    challenge:
      "Wordle's viral success demonstrated the appeal of simple, shareable word games. However, the original game's client-side architecture, limited daily puzzles, and validation logic presented opportunities for enhancement. The challenge was to recreate the core mechanics while adding features like difficulty modes, unlimited play options, and improved hint accuracy for duplicate letters.",
    solution:
      "Built a comprehensive React-based word game that reverse-engineered Wordle's mechanics through careful analysis. Implemented a sophisticated validation system handling edge cases like duplicate letters, created a dual-dictionary system (2,316 puzzle words + 10,000 valid guesses), and added features beyond the original including difficulty modes, dark/light themes, and both daily and random puzzle options. The architecture uses TypeScript for type safety and local storage for persistent game state.",
    impact:
      "Successfully deployed to 3,400+ unique users generating 180,000+ game interactions with 34,000+ puzzles solved. Achieved 20-35% user retention rate with 38 minutes average engagement time per active user, demonstrating strong product-market fit. The project served as a deep technical exploration documented in a 3-part blog series, showcasing expertise in React state management, complex string validation algorithms, and user experience design.",
    technical_highlights: [
      "Engineered dual-dictionary validation system with 12,000+ words for accurate guess validation",
      "Implemented complex letter hint algorithm handling duplicate letters and position matching with proper state management",
      "Built responsive keyboard component with visual hint preservation across guesses using TypeScript interfaces",
      "Created shareable emoji grid generation matching Wordle's viral sharing mechanism",
      "Designed persistent game state using local storage with statistics tracking and streak management",
    ],
    badges: ["React", "TypeScript", "Tailwind CSS", "Game Development", "Personal Project"],
  },
];

export default portfolioData;
