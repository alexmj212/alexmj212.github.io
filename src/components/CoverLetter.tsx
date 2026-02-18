import { useEffect, useState } from "react";
import DocumentHeader from "./DocumentHeader";
import "../styles/document.css";

const CoverLetter = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    positionTitle: "[Position Title]",
    companyName: "[Company Name]",
    hiringManager: "Hiring Manager",
    specificReason: "[specific reason related to company mission, products, or culture]",
  });

  useEffect(() => {
    document.title = "Alex Johnson - Cover Letter";

    // Force light mode for cover letter page
    const root = document.documentElement;
    const previousTheme = root.classList.contains("dark");
    root.classList.remove("dark");

    return () => {
      document.title = "Alex Johnson - Senior Frontend Engineer";
      // Restore previous theme when leaving
      if (previousTheme) {
        root.classList.add("dark");
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          {/* Toggle Form Button */}
          <div className="mb-4 no-print">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-accent2 text-white rounded-md hover:bg-accent2/90 transition-colors"
            >
              {showForm ? "Hide" : "Customize"} Letter
            </button>
          </div>

          {/* Customization Form */}
          {showForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Customize Your Cover Letter</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Position Title
                  </label>
                  <input
                    type="text"
                    id="positionTitle"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
                  />
                </div>

                <div>
                  <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">
                    Hiring Manager Name
                  </label>
                  <input
                    type="text"
                    id="hiringManager"
                    name="hiringManager"
                    value={formData.hiringManager}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
                  />
                </div>

                <div>
                  <label htmlFor="specificReason" className="block text-sm font-medium text-gray-700 mb-1">
                    What draws you to this company?
                  </label>
                  <textarea
                    id="specificReason"
                    name="specificReason"
                    value={formData.specificReason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
                  />
                </div>
              </form>
            </div>
          )}

          <div className="mb-8">
            <DocumentHeader />
          </div>

          {/* Date */}
          <time className="block mb-6 text-gray-700">{currentDate}</time>

          {/* Salutation */}
          <p className="mb-6 text-gray-700">
            Dear <span className="font-semibold">{formData.hiringManager}</span>,
          </p>

          {/* Letter body */}
          <section className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I am writing to express my interest in the <span className="font-semibold">{formData.positionTitle}</span> position at{" "}
              <span className="font-semibold">{formData.companyName}</span>. With over 11 years of experience in frontend development, I have
              built a career around creating scalable web applications and leading teams to deliver exceptional user experiences.
            </p>

            <p>
              Currently, as a Senior Software Engineer at Xometry, I lead frontend development for an enterprise manufacturing marketplace serving
              thousands of customers. I work primarily with React, TypeScript, and GraphQL to build production applications on AWS infrastructure.
              Beyond writing code, I mentor junior developers, establish testing practices with Jest and Storybook, and work closely with product
              and design teams to ship features that balance user needs with business objectives. The role has given me experience with modern
              tooling like Docker and Webpack, and taught me how to maintain performance and accessibility standards at scale.
            </p>

            <p>
              Before Xometry, I spent four years at Churchill Downs Incorporated working on the TwinSpires platform. I led several major frontend
              initiatives there, including implementing dark mode, improving mobile responsiveness, and bringing the application up to WCAG
              accessibility standards. I also coordinated with multiple development teams on site-wide projects and helped migrate parts of our
              legacy Angular codebase to more modern patterns.
            </p>

            <p>
              What draws me to <span className="font-semibold">{formData.companyName}</span> is {formData.specificReason}. I'm looking for
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
