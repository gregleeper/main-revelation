import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
// import { Flex, Box } from '@rebass/grid/emotion'
// import { Img } from '../../utils/styles'
import Image from 'gatsby-image'

const ProductGrid = () => {
  const data = useStaticQuery(
    graphql`
      query {
        products: allShopifyProduct(
          sort: { fields: [createdAt], order: DESC }
        ) {
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
  )

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="row">
        {data.products.edges.map(({ node: product }) => (
          <div
            key={product.id}
            className="col-sm-6 col-md-4 col-lg-3 align-items-stretch mb-4"
          >
            <div className="card bg-light border-light shadow">
              <Link
                to={`/product/${product.handle}`}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                <div className="card-image">
                  <Image
                    fluid={product.images[0].localFile.childImageSharp.fluid}
                  />
                </div>
                <div className="card-body d-flex mt-auto flex-column pb-5">
                  <div className="card-title font-weight-bold">
                    <h6>{product.title}</h6>
                  </div>
                </div>
                <div
                  className="card-footer"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: '0',
                    marginTop: '2px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>${product.variants[0].price}</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    // <Flex flexWrap='wrap' mx={-2}>
    //   {data.allShopifyProduct.edges.map(x => (
    //     <Box
    //     width={[1, 1 / 2, 1 / 3]}
    //     px={2}
    //     key={x.node.id}
    //     >
    //       <Link to={`/product/${x.node.handle}/`}>
    //         <Img
    //           fluid={x.node.images[0].localFile.childImageSharp.fluid}
    //           alt={x.node.handle}
    //         />
    //       </Link>
    //       <p>{x.node.title}</p>
    //     </Box>
    //   ))}
    // </Flex>
  )
}

export default ProductGrid
