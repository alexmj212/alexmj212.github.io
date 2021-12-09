import React from "react";

import Panel from "../Panel";
import { List, ListItem } from "../List";
import Badge from "../Badge";

import experienceData from "../experience/ExperienceData";

const Experience = () => {
  return (
    <Panel header="Experience">
      <p>
        I've worked on teams of all shapes and sizes. My strengths are <strong>communication</strong> and <strong>team coordination</strong>. I've lead projects and initiatives across multiple teams. I accomplish this by using my strengths to translate project requirements into successful solutions.
      </p>
      {experienceData.map((experienceItem) => {
        return (
          <div key={experienceItem.date + experienceItem.company} className={`flex md:flex-row flex-col my-16`}>
            <div className={`date-column mt-1 mr-8 whitespace-nowrap`}>
              <p className={`text-accent2 mb-0 font-semibold`}>{experienceItem.date}</p>
            </div>
            <div className={``}>
              <h2 className={`mb-0`}>{experienceItem.title}</h2>
              <h3>{experienceItem.company}</h3>
              <List>{experienceItem.summary && experienceItem.summary.map((bullet) => <ListItem key={bullet}>{bullet}</ListItem>)}</List>
              {experienceItem.projects &&
                experienceItem.projects.map((project) => (
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
          </div>
        );
      })}
    </Panel>
  );
};

export default Experience;
