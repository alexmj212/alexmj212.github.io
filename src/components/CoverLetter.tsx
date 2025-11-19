import { useEffect } from "react";
import DocumentHeader from "./DocumentHeader";
import "../styles/document.css";

const CoverLetter = () => {
  useEffect(() => {
    document.title = "Alex Johnson - Cover Letter";

    // Force light mode for cover letter page
    const root = document.documentElement;
    const previousTheme = root.classList.contains("dark");
    root.classList.remove("dark");

    return () => {
      document.title = "Alex Johnson - Senior Front-End Software Engineer";
      // Restore previous theme when leaving
      if (previousTheme) {
        root.classList.add("dark");
      }
    };
  }, []);

  // Get current date formatted as "Month Day, Year"
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="cover-letter-wrapper min-h-screen text-gray-900 font-sans">
      <article className="cover-letter-container mx-auto bg-white shadow-xl m-8 md:p-8 print:m-0">
        <div className="cover-letter-content flex flex-col m-8 print:m-0">
          <div className="mb-8">
            <DocumentHeader />
          </div>

          {/* Date */}
          <time className="block mb-6 text-gray-700">{currentDate}</time>

          {/* Recipient Address - Editable placeholder */}
          <address className="not-italic mb-6 text-gray-700 leading-relaxed">
            <div className="editable-field">
              <strong>Hiring Manager</strong>
            </div>
            <div className="editable-field">Company Name</div>
            <div className="editable-field">Street Address</div>
            <div className="editable-field">City, State ZIP</div>
          </address>

          {/* Salutation */}
          <p className="mb-6 text-gray-700">
            Dear <span className="editable-field font-semibold">Hiring Manager</span>,
          </p>

          {/* Letter body */}
          <section className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I am writing to express my strong interest in the{" "}
              <span className="editable-field font-semibold">[Position Title]</span> position at{" "}
              <span className="editable-field font-semibold">[Company Name]</span>. As a Senior Software Engineer with 11+ years of progressive
              experience in front-end development, I bring a proven track record of architecting scalable web applications, leading
              cross-functional teams, and delivering high-impact user experiences that drive business growth and customer satisfaction.
            </p>

            <p>
              In my current role as Senior Software Engineer at Xometry, Inc. (2021-Present), I spearhead frontend development for an
              enterprise B2B manufacturing marketplace platform serving thousands of active customers. I architect and implement production-grade
              React applications leveraging TypeScript, GraphQL, Node.js, and AWS cloud services. My technical leadership encompasses mentoring
              development teams, establishing CI/CD pipelines, implementing automated testing frameworks (Jest, Storybook), and optimizing
              application performance and Web Vitals metrics. I collaborate with product managers, UX designers, and backend engineers in an
              Agile environment to deliver responsive, accessible, and SEO-optimized interfaces. Key technologies include React, TypeScript,
              GraphQL, Node.js, AWS (Lambda, S3, CloudFront), Docker, Webpack, Git, and RESTful APIs.
            </p>

            <p>
              Previously, as Software Engineer at Churchill Downs Incorporated (2017-2021), I led frontend initiatives for the TwinSpires
              wagering platform, implementing dark mode theming, responsive mobile-first design, WCAG 2.1 AA accessibility compliance, and
              performance optimizations that improved page load times and user engagement metrics. I coordinated agile development teams,
              conducted code reviews, and maintained high code quality standards across Angular/AngularJS applications. I successfully migrated
              legacy systems to modern frameworks, integrated third-party APIs, and implemented A/B testing for feature validation.
            </p>

            <p>
              My technical expertise spans the complete frontend stack: HTML5, CSS3, JavaScript (ES6+), React, Angular, TypeScript, SASS/LESS,
              responsive design, mobile development, progressive web apps (PWA), state management (Redux, Context API), component libraries
              (Material-UI, Tailwind CSS), build tools (Webpack, Vite), version control (Git, GitHub), and modern development workflows.
            </p>

            <p>
              What particularly excites me about <span className="editable-field font-semibold">[Company Name]</span> is{" "}
              <span className="editable-field">[specific reason related to company mission, products, or culture]</span>. I am drawn to
              opportunities where I can leverage my technical expertise in React, TypeScript, and cloud architecture while collaborating with
              talented teams to solve complex engineering challenges and create scalable, user-centric solutions.
            </p>

            <p>
              I would welcome the opportunity to discuss how my experience architecting enterprise-scale React applications, leading frontend
              initiatives, and driving technical innovation aligns with your team's objectives. Thank you for considering my application. I look
              forward to contributing to <span className="editable-field font-semibold">[Company Name]</span>'s continued success.
            </p>
          </section>

          {/* Closing */}
          <div className="mt-8">
            <p className="mb-12 text-gray-700">Sincerely,</p>
            <p className="font-semibold text-gray-900">Alex Johnson</p>
          </div>
        </div>
      </article>
    </main>
  );
};

export default CoverLetter;
