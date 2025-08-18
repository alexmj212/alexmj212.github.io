
import experienceData from "../../data/experienceData";

const Experience = () => {
  return (
    <div className="w-full py-24">
      <div className="container-responsive">
        <h1 className="section-title">Experience</h1>
        <p className="mb-12">
          I've worked on teams of all shapes and sizes. My strengths are <strong>communication</strong> and <strong>team coordination</strong>. I've lead projects and initiatives across multiple teams. I accomplish this by using my strengths to
          translate project requirements into successful solutions.
        </p>

        <div className="experience-timeline">
          {experienceData.map((experienceItem) => (
            <article key={`${experienceItem.date}-${experienceItem.company}`} className="experience-card">
              <div className="experience-header">
                <div className="experience-date">{experienceItem.date}</div>
                <h2 className="experience-title">{experienceItem.title}</h2>
                <h3 className="experience-company">{experienceItem.company}</h3>
              </div>

              <div className="experience-content">
                {experienceItem.summary && experienceItem.summary.length > 0 && (
                  <ul className="list-disc ml-5 space-y-2">
                    {experienceItem.summary.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {experienceItem.projects &&
                experienceItem.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="experience-badges">
                    {project.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
