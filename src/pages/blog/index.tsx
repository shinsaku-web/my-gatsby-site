import * as React from "react";
import Layout from "../../components/layout";
import { Link, graphql, PageProps } from "gatsby";

const BlogPage: React.FC<PageProps<GatsbyTypes.MyBlogIndexQueryQuery>> = ({
  data,
}) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
      <ul>
        {data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={`/blog/${node.slug}`}>{node.frontmatter?.title}</Link>
              <p>Posted: {node.frontmatter?.date}</p>
            </h2>
          </article>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query MyBlogIndexQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
