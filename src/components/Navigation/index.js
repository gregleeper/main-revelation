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
  color: `#663399`,
  borderRadius: `20px`,
  padding: `0 10px`,
  fontSize: `1.2rem`,
  float: `right`,
  zIndex: 999,
})

const H1 = props => (
  <h2
    style={{
      marginTop: '10px',
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
    px={[`1.0875rem`, null, null, 0]}
    py="1.45rem"
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
        <Box>
          <H1 to="/">Main Revelation</H1>
        </Box>
        <Box ml="auto" style={{ marginRight: '4rem' }}>
          <H1 to="/cart">
            {quantity !== 0 && <CartCounter>{quantity}</CartCounter>}
            Cart 🛍
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
