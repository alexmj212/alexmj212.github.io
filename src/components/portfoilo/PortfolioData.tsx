type PortfolioType = {
  project: string;
  images: string[];
  date: string;
  company: string;
  caption: string;
  badges: string[];
  bullets?: string[];
  description?: string;
  caseStudy?: string;
}[];

const portfolioData: PortfolioType = [
  {
    project: "TwinSpires Dark Mode",
    images: [
      "img/twinspires/program/program-dark-thumb.png",
      "img/twinspires/program/program-mobile.png",
      "img/twinspires/program/program-dark.png",
      "img/twinspires/program/program-light.png",
      "img/twinspires/program/calendar-mobile.png",
      "img/twinspires/program/toteboard-dark.png",
      "img/twinspires/program/toteboard-light.png",
    ],
    date: "2020 - 2021",
    company: "TwinSpires.com",
    caption: "Dark Mode Framework for TwinSpires.com",
    badges: ["Angular", "SASS", "Mobile", "CSS3"],
    bullets: [
      "Created a feature-rich theming system using modern CSS techniques",
      "Implemented controls for users to adjust their experience",
      "Integrated all components to automatically react to theme changes",
      "Optimized and consolidated page elements for performant user experience",
    ],
    description: `I led the initiative to add dark mode functionality to the existing TwinSpires.com website. 
      This involved a coordinated effort between our design and quality assurance teams. 
      I modified our style library to support theming and optimized the theme system. 
      We improved the overall performance of the site in addition to the user experience.
    `,
    caseStudy: `
          <h2>Summary</h2>
          <ul class="description">
              <li>Created a feature-rich theming system using modern CSS techniques</li>
              <li>Implemented controls for users to adjust their experience</li>
              <li>Integrated all components to automatically react to theme changes</li>
              <li>Optimized and consolidated page elements for performant user experience</li>
          </ul>
          <h3>Case Study</h3>
              <p>I proposed a Dark Mode implementation as a part of a company "Hack-a-thon" event.
              The purpose of the event was to promote creative and innovative ideas that might become candidates for future features.
              I put together a presentation on a dark mode implementation and coordinated with a few other team members.
              I established the goals and the plan for how Dark Mode could be created and adapted to our existing framework.
              Together with a small team, we designed and tested a proof-of-concept of dark mode and presented it to the company.
              </p><p>
              After the event, Dark Mode was selected and approved to become a fully-realized feature.
              I was responsible for the implementation plan and coordinating the team to design, develop, and test this feature.
              </p>
          <h3>Implementation</h3>
              <p>
              In addition to the implementation of Dark Mode, we performed a consolidation of colors used across the site.
              This consolidation greatly simplified the process of choosing colors while designing Dark Mode.
              Additionally, I unified the styles for interactive elements (buttons, form fields, dropdowns, etc) across the site. This ensured
              that not only were they Dark Mode aware, but also ensured we had consistent user experiences regardless of theme.
              </p><p>
              During development, I discovered that we could further optimize our theme system. In order to reduce the size of our style library,
              I reorganized our global style sheets and SASS framework to reduce compiled styles by about 20% pre-minification.
              By optimizing global styles, we were also able to improve overall performance of the application with reduced overhead
              and less data transferred on initial load.
              </p>
          <h3>Regression Testing</h3>
              <p>
              After the design and implementation, I coordinated a testing plan which outlined the breadth of testing required to
              cover regressions that might arise from the implementation. I developed a testing plan for the QA team which outlined critical areas to focus testing.
              I worked with the QA team to resolve issues through a long testing and review process.
              This process was enlightening as QA was able to provide me with constructive feedback about functional and design choices.
              Through this process we were able to refine the design further.
              </p><p>
              In addition to testing amongst our team members, our team proposed an internal "Test Bash" where many volunteers
              from various departments across the company were given access to a preview of Dark Mode.
              They were asked to provide feedback to further improve the feature.
              I provided structure to this process to ensure all feedback was addressed.
              Afterward, I made the necessary adjustments to ensure that
              all feedback and regressions were addressed and we were able to sign-off on the project.
              </p>`,
  },
  {
    project: "TwinSpires Responsive",
    images: ["img/twinspires/responsive/program-mobile-thumb.png", "img/twinspires/responsive/program-light.png", "img/twinspires/responsive/landing-light.png", "img/twinspires/responsive/calendar-light.png"],
    date: "2018",
    company: "TwinSpires.com",
    caption: "Responsive Implementation of TwinSpires.com",
    bullets: [
      "Added support for dynamically sized content viewports",
      "Supporting all mobile platforms including iOS, iPadOS, and Android",
      "Created mobile-specific elements including navigation, modals, and lists",
      "Full parity in mobile vs. desktop functionality",
    ],
    badges: ["Angular", "TypeScript", "Mobile", "CSS3"],
    description: `I worked with a talented front-end-focused team to add a responsive implementation to TwinSpires.com. 
      We added support for dynamically sized components for a range of medium and small glass devices. 
      We included support for all mobile platforms including iOS and Android. 
      We achieved the goal of full feature parity between the large and small glass views.
    `,
  },
  {
    project: "TwinSpires Video",
    images: ["img/twinspires/video/video-desktop-thumb.png", "img/twinspires/video/video-desktop-light.png", "img/twinspires/video/video-mobile-light.png"],
    date: "2018 - 2020",
    company: "TwinSpires.com",
    caption: "Live and Replayable Video of Racing Content",
    bullets: [
      "Integrated front-end libraries from multiple video providers to create a seamless experience",
      "Created site-wide video components that support a wide variety of views and formats",
      "Dynamic controls for viewing and interacting with video content",
      "Support for desktop and mobile video experiences",
    ],
    badges: ["Angular", "HTML5", "Mobile", "Multimedia"],
    description: `
      One my roles was maintaining the video multimedia features on TwinSpires.com. 
      I integrated front-end libraries from multiple vendors to create a seamless video experience for desktop and mobile. 
      I helped implement dynamic video controls that enhanced the user experience.
    `,
  },
];

export default portfolioData;
