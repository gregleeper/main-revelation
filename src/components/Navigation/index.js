import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'

import StoreContext from '../../context/StoreContext'

const Wrapper = styled.div({
  background: `#2c6fdb`,
  marginBottom: `2rem`,
})

const CartCounter = styled.span({
  backgroundColor: `white`,
  marginTop: '-5px',
  color: `#663399`,
  borderRadius: `20px`,
  padding: `0 7px`,
  fontSize: `1.2rem`,
  float: `right`,
  zIndex: 999,
})

const H1 = props => (
  <h2
    style={{
      marginTop: '5px',
      marginLeft: '10px',
      marginBottom: '3px',
    }}
  >
    <Link
      {...props}
      style={{
        color: `white`,
        textDecoration: `none`,
      }}
    >
      {props.children}
    </Link>
  </h2>
)

const Container = props => (
  <Flex
    {...props}
    mx="auto"
    px={[`0.5rem`, null, null, 0]}
    py="0.5rem"
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
  const context = useContext(StoreContext)
  const { checkout } = context
  const [quantity, setQuantity] = useState(
    countQuantity(checkout ? checkout.lineItems : [])
  )

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []))
  }, [checkout])

  return (
    <Wrapper>
      <Container>
        {' '}
        <Box>
          <H1 to="/">Main Revelation</H1>
        </Box>
        <Box ml="auto" style={{ marginRight: '2rem' }}>
          <H1 to="/cart">
            {quantity !== 0 && <CartCounter>{quantity}</CartCounter>}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              style={{ marginRight: '-15px' }}
              width="50"
              height="50"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-shopping-cart"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </H1>
        </Box>
      </Container>
    </Wrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
