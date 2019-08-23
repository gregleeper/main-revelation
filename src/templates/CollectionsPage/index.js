import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from '@emotion/styled'

const CollectionsPageTemplate = ({ data }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h1>{data.collection.title}</h1>
      </div>
      <div className="d-flex justify-content-center">
        <Image fixed={data.collection.image.localFile.childImageSharp.fixed} />
      </div>

      <div className="d-flex justify-content-center">
        <p>{data.collection.description}</p>
      </div>
      <Line style={{ marginBottom: '35px' }} />

      <div className="row">
        {data.collection.products.map(product => (
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
  )
}

export const query = graphql`
  query($handle: String!) {
    collection: shopifyCollection(handle: { eq: $handle }) {
      title
      id
      description
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 300) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
        }
      }
      products {
        id
        handle
        title
        images {
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
`
const Line = styled.hr`
  margin: 25px 0;
  height: 2px;
  border: 0;
  background: #163372;
  background: -webkit-gradient(
    linear,
    0 0,
    100% 0,
    from(white),
    to(white),
    color-stop(50%, blue)
  );
`
export default CollectionsPageTemplate
