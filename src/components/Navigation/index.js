import React, { useContext, useState, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'

import StoreContext from '../../context/StoreContext'
import CollectionsSubMenu from './collectionsSubMenu'

const Wrapper = styled.div({
  background: `white`,
  borderBottom: '1.5px solid #32a8a8',
  marginBottom: `2rem`,
})

const CartCounter = styled.span({
  backgroundColor: `#32a8a8`,
  marginTop: '-5px',
  color: `white`,
  borderRadius: `20px`,
  padding: `0 7px`,
  fontSize: `1.2rem`,
  float: `right`,
  zIndex: 999,
})

const UL = styled.ul`
  color: #32a8a8;
  > ul {
    margin: 0 auto;
    width: 80%;
  }
  li {
    display: block;
    position: relative;

    width: 180px;
    padding: 10px 20px;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    color: #32a8a8;
    box-sizing: content-box;
    :focus {
      outline-style: none;
    }
  }
`

const BrandLink = styled(props => <Link {...props} />)`
  font-size: 1.3rem;
  text-decoration: none;
  color: #32a8a8;
  margin-top: 10px;
  :hover {
    text-decoration: none;
    color: #32a8a8;
  }
  @media (min-width: 768px) {
    font-size: 1.9rem;
    margin-top: -10px;
  }
`

const H1 = props => (
  <h3
    style={{
      marginTop: '1px',
      marginLeft: '10px',
      marginBottom: '1px',
    }}
  >
    <Link
      {...props}
      style={{
        color: `#32a8a8`,
        textDecoration: `none`,
      }}
    >
      {props.children}
    </Link>
  </h3>
)

const Container = props => (
  <Flex
    {...props}
    mb="-5px"
    mx="auto"
    px={[`0.2rem`, null, null, 0]}
    css={{
      margin: `0 auto`,
      maxWidth: 960,
    }}
  />
)

const countQuantity = lineItems => {
  let quantity = 0

  lineItems.forEach(item => {
    quantity = quantity + item.quantity
  })

  return quantity
}

const Navigation = ({ siteTitle }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allShopifyCollection {
          nodes {
            id
            title
            handle
          }
        }
      }
    `
  )
  const context = useContext(StoreContext)
  const { checkout } = context
  const [quantity, setQuantity] = useState(
    countQuantity(checkout ? checkout.lineItems : [])
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []))
  }, [checkout])

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav>
      <Wrapper>
        <Container>
          {' '}
          <Box mt={3} ml={2}>
            <BrandLink to="/">Main Revelation</BrandLink>
          </Box>
          <Box
            ml="auto"
            style={{
              marginTop: '7px',
              marginRight: '10px',
            }}
          >
            <UL>
              <li style={{ fontSize: '1.3rem' }}>
                <button onClick={handleMenuOpen} style={{}}>
                  Collections
                </button>
                <CollectionsSubMenu
                  isMenuOpen={isMenuOpen}
                  toggleMenu={handleMenuOpen}
                />
              </li>
            </UL>
          </Box>
          <Box style={{ marginRight: '1.3rem' }} mt={3}>
            <H1 to="/cart">
              {quantity !== 0 && <CartCounter>{quantity}</CartCounter>}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                style={{ marginRight: '-15px' }}
                width="50"
                height="50"
                fill="none"
                stroke="#32a8a8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </H1>
          </Box>
        </Container>
      </Wrapper>
    </nav>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
