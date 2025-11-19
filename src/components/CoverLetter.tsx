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
              <span className="editable-field font-semibold">[Company Name]</span>. With over a decade of experience in front-end software
              engineering and a proven track record of delivering exceptional user experiences, I am excited about the opportunity to contribute
              to your team's success.
            </p>

            <p>
              In my current role as Senior Software Engineer at Xometry, Inc., I lead frontend development for an enterprise manufacturing
              marketplace platform that serves thousands of customers. I architect and implement scalable React applications using TypeScript,
              GraphQL, and modern AWS infrastructure. My responsibilities extend beyond technical implementation to include mentoring junior
              developers, establishing engineering best practices, and driving initiatives that improve performance, accessibility, and overall
              user experience. Working with technologies such as Docker, Jest, Storybook, and Webpack, I collaborate closely with
              cross-functional teams to deliver both customer-facing features and internal tools that power our platform.
            </p>

            <p>
              Prior to Xometry, I spent four years at Churchill Downs Incorporated's TwinSpires platform, where I led critical frontend
              initiatives including dark mode implementation, responsive design overhauls, and accessibility improvements. During this time, I
              coordinated multiple delivery teams and organized developers across site-wide projects, gaining extensive experience in
              high-performance, user-focused development within a fast-paced, high-stakes environment.
            </p>

            <p>
              What particularly excites me about <span className="editable-field font-semibold">[Company Name]</span> is{" "}
              <span className="editable-field">[specific reason related to company mission, products, or culture]</span>. I am drawn to
              opportunities where I can leverage my technical expertise while collaborating with talented teams to solve complex challenges and
              create meaningful user experiences.
            </p>

            <p>
              I would welcome the opportunity to discuss how my experience leading enterprise-scale React applications and driving technical
              initiatives aligns with your team's needs. Thank you for considering my application. I look forward to the possibility of
              contributing to <span className="editable-field font-semibold">[Company Name]</span>'s continued success.
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
