import React from "react";

import Panel from "../Panel";
import { List, ListItem } from "../List";
import Badge from "../Badge";

import experienceData from "../experience/ExperienceData";

const Experience = () => {
  return (
    <Panel header="Experience">
      {experienceData.map((experienceItem) => {
        return (
          <div key={experienceItem.date+experienceItem.company}>
            <p className={`text-accent2 mb-0 font-semibold`}>{experienceItem.date}</p>
            <h2 className={`mb-0`}>{experienceItem.title}</h2>
            <h3>{experienceItem.company}</h3>
            <List>
              {experienceItem.summary && experienceItem.summary.map((bullet) => (
                <ListItem key={bullet}>{bullet}</ListItem>
              ))}
            </List>
            {experienceItem.projects && experienceItem.projects.map((project) => (
              <div key={project.name} className={`mb-4`}>
                <h4>{project.name}</h4>
                <List horizontal className={`no-style`}>
                  {project.skills.map((skill) => (
                    <ListItem key={skill}>
                      <Badge>{skill}</Badge>
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </div>
        );
      })}
    </Panel>
  );
};

export default Experience;
