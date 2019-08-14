import React, { useContext } from 'react'

import StoreContext from '../../context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
  const context = useContext(StoreContext)
  const { checkout } = context

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  return (
    <div>
      {line_items}
      <div className="row mt-5">
        <div className="col-4">
          <h4>Subtotal</h4>
          <p>$ {checkout.subtotalPrice}</p>
        </div>
        <div className="col-4">
          <h4>Taxes</h4>
          <p>$ {checkout.totalTax}</p>
        </div>
        <div className="col-4">
          <h4>Total</h4>
          <p>$ {checkout.totalPrice}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6">
          {line_items.length > 0 ? (
            <button className="btn btn-primary" onClick={handleCheckout}>
              Check out
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={true}
            >
              Check out
            </button>
          )}
        </div>
        <div className="alert alert-info col-lg-8 col-md-8 col-sm-6">
          Use code <strong>PLAYERDELIVERY</strong> for free delivery{' '}
          {`(removes shipping charges)`}from a Hugoton Volleyball player.
        </div>
      </div>
    </div>
  )
}

export default Cart
