import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import Panel from "../Panel";

import skillsData from "../skills/SkillsData";

const Skills = () => {
  return (
    <Panel header="Skills">
      <div className={`flex flex-row flex-wrap justify-center`}>
        {skillsData.map((skill) => (
          <div key={skill.name} className={`half-width p-2`}>
            <div className={"text-6xl flex flex-1 justify-center mb-4 text-accent1"}>
                <FontAwesomeIcon  icon={skill.icon} />
            </div>
            <h4>{skill.name}</h4>
            <p className={`text-sm`}>{skill.description}</p>
          </div>
        ))}
      </div>
      <span>
        <strong>Other skills:</strong> Agile, SCRUM, Jira, VSCode, macOS, Windows
      </span>
    </Panel>
  );
};

export default Skills;
