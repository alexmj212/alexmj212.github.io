import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Panel from "../Panel";

import skillsData from "../skills/SkillsData";

const Skills = () => {
  return (
    <Panel header="Skills">
      <p>
        In my career, I've developed using many languages and frameworks. Experience in a wide variety of front-end technologies has sharpened my skills. It has also helped me maintain a <strong>strong foundation</strong> in the basics of front-end web development. I've
        even done a little work server-side.
      </p>
      <div className={`grid md:grid-cols-3 grid-cols-1 gap-4 my-16`}>
        {skillsData.map((skill) => (
          <div key={skill.name} className={`skill-grid`}>
            <div className={"text-6xl flex justify-center mr-4 text-white"}>
              <FontAwesomeIcon icon={skill.icon} />
            </div>
            <div>
              <h3 className="mt-0">{skill.name}</h3>
              <p className={`text-sm`}>{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
      <span className={`text-sm`}>
        <strong>Other skills:</strong> Agile, SCRUM, Jira, VSCode, macOS, Windows
      </span>
    </Panel>
  );
};

export default Skills;
