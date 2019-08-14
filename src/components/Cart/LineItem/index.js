import React, { useContext } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import StoreContext from '../../../context/StoreContext'

const LineItem = props => {
  const context = useContext(StoreContext)
  const { line_item } = props

  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
      height="60px"
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions ? (
    <>
      {line_item.variant.selectedOptions.map(option => (
        <>
          <h6>
            {option.name}: {option.value}
          </h6>
        </>
      ))}
    </>
  ) : null

  const handleRemove = () => {
    context.removeLineItem(context.client, context.checkout.id, line_item.id)
  }

  return (
    <Flex
      py={2}
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>{variantImage}</Box>
      <Box>
        <h5>
          {line_item.title}
          {`  `}
          {line_item.variant.title === !'Default Title'
            ? line_item.variant.title
            : ''}
        </h5>
      </Box>
      <Box>{selectedOptions}</Box>
      <Box>{`Qty: ${line_item.quantity}`}</Box>
      <Box>
        <button className="btn btn-secondary" onClick={handleRemove}>
          Remove
        </button>
      </Box>
    </Flex>
  )
}

export default LineItem
