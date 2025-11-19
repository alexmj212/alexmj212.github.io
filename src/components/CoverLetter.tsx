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
              I am writing to express my interest in the{" "}
              <span className="editable-field font-semibold">[Position Title]</span> position at{" "}
              <span className="editable-field font-semibold">[Company Name]</span>. With over 11 years of experience in front-end development,
              I have built a career around creating scalable web applications and leading teams to deliver exceptional user experiences.
            </p>

            <p>
              Currently, as a Senior Software Engineer at Xometry, I lead frontend development for an enterprise manufacturing marketplace
              serving thousands of customers. I work primarily with React, TypeScript, and GraphQL to build production applications on AWS
              infrastructure. Beyond writing code, I mentor junior developers, establish testing practices with Jest and Storybook, and work
              closely with product and design teams to ship features that balance user needs with business objectives. The role has given me
              experience with modern tooling like Docker and Webpack, and taught me how to maintain performance and accessibility standards at
              scale.
            </p>

            <p>
              Before Xometry, I spent four years at Churchill Downs Incorporated working on the TwinSpires platform. I led several major
              frontend initiatives there, including implementing dark mode, improving mobile responsiveness, and bringing the application up to
              WCAG accessibility standards. I also coordinated with multiple development teams on site-wide projects and helped migrate parts of
              our legacy Angular codebase to more modern patterns.
            </p>

            <p>
              What draws me to <span className="editable-field font-semibold">[Company Name]</span> is{" "}
              <span className="editable-field">[specific reason related to company mission, products, or culture]</span>. I'm looking for
              opportunities to tackle interesting technical challenges while working with people who care about building quality software.
            </p>

            <p>
              I'd welcome the chance to discuss how my experience might fit with what your team is building. Thank you for considering my
              application.
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
