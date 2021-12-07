import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import Panel from "../Panel";

import skillsData from "../skills/SkillsData";

const Skills = () => {
  return (
    <Panel header="Skills">
      <div className={`grid md:grid-cols-3 grid-cols-1 gap-8 mb-8`}>
        {skillsData.map((skill) => (
          <div key={skill.name} className={`skill-grid`}>
            <div className={"text-6xl flex justify-center mr-4 text-accent1"}>
              <FontAwesomeIcon icon={skill.icon} />
            </div>
            <div>
              <h4>{skill.name}</h4>
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
