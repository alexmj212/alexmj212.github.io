import { useEffect, Fragment } from "react";
import experienceData from "../data/experienceData";
import { skillsData } from "../data/skillsData";
import DocumentHeader from "./DocumentHeader";
import "../styles/document.css";

const Resume = () => {
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - 2013;

  useEffect(() => {
    document.title = "Alex Johnson - Resume";

    // Force light mode for resume page
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

  return (
    <main className="resume-wrapper min-h-screen text-gray-900 font-sans">
      <article className="resume-container mx-auto bg-white shadow-xl m-8 md:p-8 print:m-0">
        <div className="resume-content flex flex-col m-8 print:m-0">
          <DocumentHeader />

          {/* Professional Summary */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              Senior front-end software engineer with {yearsExperience} years of experience building exceptional user experiences and coordinating teams to deliver projects from concept to production. Specialized in modern web technologies with a
              focus on design, usability, and performance optimization. Proven track record of leading frontend initiatives and mentoring development teams in enterprise environments.
            </p>
          </section>

          <hr />

          {/* Technical Skills */}
          <section>
            <h3>Technical Skills</h3>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              {Object.entries(skillsData).map(([key, category]) => (
                <Fragment key={key}>
                  <dt className="font-semibold">{category.title}:</dt>
                  <dd className="leading-relaxed">{category.skills.map((skill) => skill.name).join(" • ")}</dd>
                </Fragment>
              ))}
            </dl>
          </section>

          <hr />

          {/* Professional Experience */}
          <section>
            <h3>Professional Experience</h3>
            <div className="space-y-6">
              {experienceData.map((exp, index) => (
                <article key={index} className="relative">
                  {/* Job Header */}
                  <header className="flex flex-col">
                    <hgroup>
                      <h4>{exp.title}</h4>
                      <span className="text-gray-700 font-medium">{exp.company}</span>
                    </hgroup>
                    <time className="text-gray-600 font-medium">{exp.date}</time>
                  </header>

                  {/* Job Summary */}
                  {exp.summary && exp.summary.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed m-0">
                      {exp.summary.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  {exp.projects && exp.projects[0]?.skills && exp.projects[0].skills.length > 0 && (
                    <aside className="text-gray-600">
                      <strong>Key Technologies:</strong> <span className="text-gray-500">{exp.projects[0].skills.join(", ")}</span>
                    </aside>
                  )}
                </article>
              ))}
            </div>
          </section>

          <hr />

          {/* Education */}
          <section>
            <h3>Education</h3>
            <article>
              <h4>Bachelor of Science in Computer Science</h4>
              <p className="text-gray-700">
                University of Kentucky • <time>2013</time>
              </p>
            </article>
          </section>
        </div>
      </article>
    </main>
  );
};

export default Resume;
