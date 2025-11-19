import { useEffect } from "react";
import "../styles/cover-letter.css";

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
          {/* Header */}
          <header className="relative mb-8">
            {/* Gradient accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent1 to-accent2 print:hidden"></div>

            <hgroup className="pt-2">
              {/* Name and title */}
              <h1>Alex Johnson</h1>

              <h2>Senior Front-End Software Engineer</h2>
            </hgroup>

            {/* Contact info */}
            <address className="not-italic">
              <ul className="flex flex-wrap list-none items-center m-0">
                <li>
                  <a href="mailto:alexmj212@gmail.com" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
                    <span className="block mr-2">
                      <i className="fas fa-envelope text-blue-500" aria-hidden="true"></i>
                    </span>
                    <span className="font-medium">alexmj212@gmail.com</span>
                  </a>
                </li>

                <li>
                  <a href="https://alexmj212.dev" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
                    <span className="block mr-2">
                      <i className="fas fa-globe text-green-500" aria-hidden="true"></i>
                    </span>
                    <span className="font-medium">alexmj212.dev</span>
                  </a>
                </li>

                <li>
                  <a href="https://linkedin.com/in/alexmj212" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
                    <span className="block mr-2">
                      <i className="fab fa-linkedin text-blue-600" aria-hidden="true"></i>
                    </span>
                    <span className="font-medium">linkedin.com/in/alexmj212</span>
                  </a>
                </li>

                <li>
                  <a href="https://github.com/alexmj212" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
                    <span className="block mr-2">
                      <i className="fab fa-github text-gray-800" aria-hidden="true"></i>
                    </span>
                    <span className="font-medium">github.com/alexmj212</span>
                  </a>
                </li>
              </ul>
            </address>
          </header>

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
              Throughout my career, I have specialized in building modern, scalable web applications using React, TypeScript, and cutting-edge
              front-end technologies. At Churchill Downs Incorporated, I have led critical frontend initiatives including dark mode
              implementation, responsive design overhauls, and accessibility improvements that have directly enhanced user engagement and
              satisfaction. My work on the TwinSpires platform has given me extensive experience in high-performance, user-focused development
              in a fast-paced environment.
            </p>

            <p>
              What particularly excites me about <span className="editable-field font-semibold">[Company Name]</span> is{" "}
              <span className="editable-field">[specific reason related to company mission, products, or culture]</span>. I am drawn to
              opportunities where I can leverage my technical expertise while collaborating with talented teams to solve complex challenges and
              create meaningful user experiences.
            </p>

            <p>
              Beyond my technical skills, I bring strong leadership capabilities, having mentored junior developers and coordinated
              cross-functional teams to deliver projects from concept to production. I am passionate about code quality, design systems, and
              creating maintainable, accessible interfaces that delight users while meeting business objectives.
            </p>

            <p>
              I would welcome the opportunity to discuss how my experience and skills align with your team's needs. Thank you for considering my
              application. I look forward to the possibility of contributing to{" "}
              <span className="editable-field font-semibold">[Company Name]</span>'s continued success.
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
