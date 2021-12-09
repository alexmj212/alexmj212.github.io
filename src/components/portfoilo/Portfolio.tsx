import React from "react";

import Panel from "../Panel";

import portfolioData from "../portfoilo/PortfolioData";
import { List, ListItem } from "../List";
import Badge from "../Badge";

const Portfolio = () => {
  return (
    <Panel header="Portfolio">
      <p>
        I take great <strong>pride</strong> in the work that I do. I translate that into successful projects and initiatives. When a project is successful, it deserves to be shared. Here are just a few examples of projects of which I am most proud.
      </p>
      <div className={`flex flex-col my-16`}>
        {portfolioData.map((portfolioItem) => {
          return (
            <div key={portfolioItem.date + portfolioItem.project} className={`flex flex-col mb-8 w-full`}>
              <div className={`flex md:flex-row flex-col items-center w-full`}>
                <div className={`flex flex-1 justify-center w-full max-w-xs h-full m-8 filter drop-shadow`}>{portfolioItem.images && <img src={portfolioItem.images[0]} alt={portfolioItem.project} />}</div>
                <div className={`flex flex-1 flex-col`}>
                  <h2>{portfolioItem.project}</h2>
                  <p>{portfolioItem.caption}</p>
                  <p className={`text-sm text-gray-400`}>{portfolioItem.description}</p>
                  {/* <List className={`text-sm `}>
                    {portfolioItem.bullets && portfolioItem.bullets.map((bullet) => <ListItem key={bullet}>{bullet}</ListItem>)}
                  </List> */}
                  <List horizontal className={`no-style clear-both`}>
                    {portfolioItem.badges.map((badge) => (
                      <ListItem key={badge}>
                        <Badge>{badge}</Badge>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

export default Portfolio;
