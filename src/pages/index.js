import React from 'react'
import SEO from '../components/seo'
import ProductGrid from '../components/ProductGrid'

const IndexPage = props => (
  <>
    <SEO
      title="Home"
      keywords={[
        `clothing`,
        `fan`,
        `sports`,
        `eagles`,
        `hugoton`,
        `Kansnas`,
        `apparrel`,
      ]}
    />
    <h3>Main Revelation</h3>
    <p>
      Welcome to our store! We are just getting the online store started, so
      feel free to browse our products and support{' '}
      <strong style={{ color: 'blue' }}>Hugoton High School Volleyball</strong>.
    </p>
    <div className="d-flex justify-content-center">
      <div className="alert alert-info col-lg-8 col-md-8 col-sm-6">
        Use code <strong style={{ color: 'red' }}>PLAYERDELIVERY</strong> for
        free delivery {`(removes shipping charges)`} from a Hugoton Volleyball
        player.
      </div>
    </div>

    <ProductGrid location={props.location} />
  </>
)

export default IndexPage
