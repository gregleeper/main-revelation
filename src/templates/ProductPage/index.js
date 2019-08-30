import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import ProductForm from '../../components/ProductForm'

const ProductPage = ({ data, location }) => {
  const product = data.shopifyProduct

  const [featuredImage, setFeaturedImage] = useState(null)

  useEffect(() => {
    const images = product.images
    setFeaturedImage(images[0].localFile.childImageSharp.fluid)
  }, [])

  const onImageSelect = index => {
    setFeaturedImage(product.images[index].localFile.childImageSharp.fluid)
  }

  return (
    <div className="row mt-5">
      <div className="col">
        {featuredImage ? (
          <Image className="img-fluid rounded" fluid={featuredImage} />
        ) : (
          <div>loading...</div>
        )}

        <div className="row justify-content-between mt-4">
          {product.images.map((image, index) => (
            <div className="col-lg-4 col-sm-6" key={image.id}>
              <button
                className="btn btn-link"
                href="#"
                onClick={() => onImageSelect(index)}
              >
                <Image fixed={image.localFile.childImageSharp.fixed} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="col">
        <div className="mt-3 mb-3">
          <div className="alert alert-info col-lg-8 col-md-8 col-sm-6">
            Use code <strong style={{ color: 'red' }}>PLAYERDELIVERY</strong>{' '}
            for free delivery {`(removes shipping charges)`} from a Hugoton
            Volleyball player.
          </div>
        </div>
        <ProductForm product={product} />
      </div>
    </div>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 150, height: 150, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export default ProductPage
