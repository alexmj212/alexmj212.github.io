import React from "react";

import Panel from "../Panel";

import portfolioData from "../portfoilo/PortfolioData";
import { List, ListItem } from "../List";
import Badge from "../Badge";

const Portfolio = () => {
  return (
    <Panel header="Portfolio">
      {portfolioData.map((portfolioItem) => {
        return (
          <div key={portfolioItem.date + portfolioItem.project} className={`flex flex-col mb-8`}>
            <h2>{portfolioItem.project}</h2>
            <div className={`flex justify-center`}>{portfolioItem.images && <img className={`half-width m-8`} src={portfolioItem.images[0]} alt={portfolioItem.project} />}</div>
            <List>{portfolioItem.bullets && portfolioItem.bullets.map((bullet) => <ListItem key={bullet}>{bullet}</ListItem>)}</List>
            <List horizontal className={`justify-center no-style clear-both`}>
              {portfolioItem.badges.map((badge) => (
                <ListItem key={badge}>
                  <Badge>{badge}</Badge>
                </ListItem>
              ))}
            </List>
          </div>
        );
      })}
    </Panel>
  );
};

export default Portfolio;
