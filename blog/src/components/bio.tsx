/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import ContactList from "../../../src/components/ContactList";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;

  return (
    <div className="p-4 mb-4">
      {author?.name && (
        <div className="flex flex-0 flex-row">
          <StaticImage
            className="bio-avatar rounded-full mr-4 shadow"
            layout="fixed"
            objectFit="cover"
            formats={["auto", "webp", "avif"]}
            src="../images/portrait.jpg"
            width={100}
            height={100}
            alt="Profile picture"
          />
          <div className="flex flex-1 flex-col">
            <span>
              <strong>{author.name}</strong>{" "}
              <small className="text-neutral-400">alexmj212@gmail.com</small>
            </span>
            <p className="leading-0 text-sm mb-1">
              I'm a front-end software engineer based in Lexington, KY and I
              specialize in building (and sometimes designing) experiences for
              the web. You can find out more about me{" "}
              <a href="https://alexmj212.dev" title="homepage">
                here.
              </a>
            </p>
            <ContactList iconSize="text-2xl" className="mr-4"></ContactList>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
