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

    <ProductGrid location={props.location} />
  </>
)

export default IndexPage
