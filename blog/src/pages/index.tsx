import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="blog" />
      <div className="sm:px-4 px-2">
        <Bio />
      </div>

      <ol className="no-style flex flex-wrap w-full">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug} className="p-2 w-full">
              <Link to={post.fields.slug}>
                <article className="post-list-item rounded-md shadow-md bg-white dark:bg-neutral-800 p-4">
                  <header>
                    <h2 className="m-0 dark:text-white-dark text-accent1">
                      {title}
                    </h2>
                    <small className="text-accent2 font-semibold">
                      {post.frontmatter.date}
                    </small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                      className="text-sm text-neutral-500 dark:text-neutral-400"
                    />
                  </section>
                  {post.frontmatter.tags.map((tag, index) => (
                    <div key={tag + index} className="badge">
                      {tag}
                    </div>
                  ))}
                  <footer className="pt-2 text-accent1 dark:text-white-dark cursor-pointer text-sm font-semibold">
                    Read More...
                  </footer>
                </article>
              </Link>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`;
