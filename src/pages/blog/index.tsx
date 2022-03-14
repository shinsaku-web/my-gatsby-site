import * as React from "react";
import Layout from "../../components/layout";
import { Link, graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

// type Props = {
//   data: any;
// };

type DataProps = {
  allMdx: {
    nodes: [
      {
        frontmatter: {
          date: string;
          title: string;
        };
        id: string;
        body: string;
      }
    ];
  };
};

type Node = {
  nodes: [
    {
      frontmatter: {
        date: string;
        title: string;
      };
      id: string;
      body: string;
    }
  ];
};

const BlogPage = ({ data }: PageProps<DataProps>) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
      <ul>
        {data.allMdx.nodes.map((node: any) => (
          <article key={node.id}>
            <h2>
              <Link to={`/blog/${node.slug}`}>{node.frontmatter.title}</Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
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
