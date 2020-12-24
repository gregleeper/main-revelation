import React from 'react'
import SEO from '../components/seo'
import ProductGrid from '../components/ProductGrid'
import { Link } from 'gatsby'
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
    <div></div>
    <ProductGrid location={props.location} />
  </>
)

export default IndexPage
