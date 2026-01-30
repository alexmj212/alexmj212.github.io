import React from "react";

import skillsData from "../../data/skillsData";

const Skills = () => {
  return (
    <div className="section-bg-alt w-full py-24">
      <div className="container-responsive">
        <div className="section-grid">
          <article className="skills-card lg:col-span-2 xl:col-span-3">
            <div className="skills-header">
              <h2 className="section-title text-gray-900 dark:text-white">Skills</h2>
              <p className="text-gray-700 dark:text-gray-300">
                In my career, I've developed using many languages and frameworks. Experience in a wide variety of front-end technologies has sharpened my skills. It has also helped me maintain a <strong>strong foundation</strong> in the basics of
                front-end web development. I've even done a little work server-side.
              </p>
            </div>

            <div className="skills-content">
              {Object.entries(skillsData).map(([key, category]) => (
                <div key={key} className="skills-category-card">
                  <div className="skills-category-header">
                    <i className={`${category.icon} skills-category-icon text-accent1 dark:text-accent1-dark`}></i>
                    <h3 className="skills-category-title text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <div className="skills-list">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <h4 className="skill-name text-gray-900 dark:text-white">{skill.name}</h4>
                        <p className="skill-description text-gray-600 dark:text-gray-400">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="skills-additional">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  <strong>Additional:</strong> Jira, VSCode, macOS, Windows, Figma
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Skills;
