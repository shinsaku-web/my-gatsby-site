import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPost: React.FC<PageProps<GatsbyTypes.BlogDetailQueryQuery>> = ({
  data,
}) => {
  const image: any = getImage(data.mdx?.frontmatter?.hero_image);

  return (
    <Layout pageTitle={data.mdx?.frontmatter?.title}>
      <p>{data.mdx?.frontmatter?.date}</p>
      <GatsbyImage
        image={image}
        alt={data.mdx?.frontmatter?.hero_image_alt || ""}
      />
      <MDXRenderer>{data?.mdx?.body || "MyBodyIsUndefined"}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query BlogDetailQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`;

export default BlogPost;
