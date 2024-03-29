import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="sm:px-4 px-2 border-b-2 pb-8 mb-8">
        <header>
          <h1 itemProp="headline" className="m-0">
            {post.frontmatter.title}
          </h1>
          <div className="text-neutral-400">{post.frontmatter.description}</div>
          <p>
            <small className="text-accent2 font-semibold">
              {post.frontmatter.date}
            </small>
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      <footer>
        <Bio />
      </footer>
      <nav className="px-2 md:px-4">
        <ul className="no-style flex flex-row justify-between">
          <li className="flex flex-col">
            {previous && (
              <>
                <Link
                  to={previous.fields.slug}
                  className="font-semibold"
                  rel="prev"
                >
                  <span className="pr-2">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                  {previous.frontmatter.title}
                </Link>
                <small className="text-neutral-400 ml-2 hidden md:inline">
                  {previous.frontmatter.date}
                </small>
              </>
            )}
          </li>
          <li className="flex flex-col">
            {next && (
              <>
                <Link
                  to={next.fields.slug}
                  className="font-semibold"
                  rel="next"
                >
                  {next.frontmatter.title}
                  <span className="pl-2">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </Link>
                <small className="text-neutral-400 mr-2 hidden md:inline text-right">
                  {next.frontmatter.date}
                </small>
              </>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
