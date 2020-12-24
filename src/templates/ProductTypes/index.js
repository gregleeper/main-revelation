import React from 'react'
import ProductGrid from '../../components/ProductGrid/FilteredGrid'
import { graphql } from 'gatsby'

const ProductTypeTemplate = ({ data, location }) => {
  const products = data.allShopifyProduct.edges
  return <ProductGrid filteredProducts={products} location={location} />
}

export const query = graphql`
  query($name: String!) {
    allShopifyProduct(filter: { productType: { eq: $name } }) {
      edges {
        node {
          id
          title
          handle
          createdAt
          images {
            id
            originalSrc
            localFile {
              childImageSharp {
                fluid(maxWidth: 425, quality: 65) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          variants {
            price
          }
        }
      }
    }
  }
`

export default ProductTypeTemplate
