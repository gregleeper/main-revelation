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

    <ProductGrid location={props.location} />
  </>
)

export default IndexPage
