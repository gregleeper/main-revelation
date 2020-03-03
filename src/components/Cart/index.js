import React, { useContext, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { useMutation } from 'react-apollo'
import StoreContext from '../../context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
  const context = useContext(StoreContext)
  const { checkout } = context

  const [note, setNote] = useState('')

  useEffect(() => {
    checkForNote()
  }, [note])

  const checkForNote = () => {
    if (context.note !== '') {
      return context.note
    }
  }

  const handleNoteChange = event => {
    setNote(event.target.value)
  }

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const addNoteToCheckout = gql`
    mutation Add_Note($id: ID!, $note: String!) {
      checkoutAttributesUpdateV2(checkoutId: $id, input: { note: $note }) {
        checkout {
          id
          note
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  const [checkoutAttributesUpdateV2, { loading, data }] = useMutation(
    addNoteToCheckout
  )
  return (
    <div>
      {checkout.lineItems.length > 0 ? (
        line_items
      ) : (
        <h4>Your cart is empty!</h4>
      )}

      <Line />
      <div className="row">
        <div className="col-4">
          <h4>Subtotal</h4>
          <p>$ {checkout.subtotalPrice}</p>
        </div>
        <div className="col-4">
          <h4>Taxes</h4>
          <p>calculated at checkout</p>
        </div>
        <div className="col-4">
          <h4>Total</h4>
          <p>$ {checkout.totalPrice}</p>
        </div>
      </div>
      <Line />
      <div className="row justify-content-around">
        <form
          className="form-group col-md-5 col-sm-12"
          onSubmit={e => {
            e.preventDefault()
            checkoutAttributesUpdateV2({
              variables: { id: checkout.id, note: note },
            })
            context.setNote(checkout.id, note)
            setNote('')
          }}
        >
          <input
            className="form-control"
            type="text"
            id="note"
            name="note"
            placeholder="Add a note here..."
            onChange={handleNoteChange}
            value={note}
          />
          {line_items.length > 0 ? (
            <button
              className="btn btn-outline-dark mt-2"
              type="submit"
              disabled={loading || note === ''}
            >
              Add Note
            </button>
          ) : (
            <button
              className="btn btn-outline-dark mt-2"
              type="submit"
              disabled
            >
              Add Note
            </button>
          )}
        </form>

        <div
          className="alert alert-primary col-md-5 col-sm-12"
          style={{ width: '95%' }}
        >
          <h6>Order note:</h6>
          <p>
            {data
              ? data.checkoutAttributesUpdateV2.checkout.note
              : context.note}
          </p>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {line_items.length > 0 ? (
          <button className="btn-lg btn-primary " onClick={handleCheckout}>
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
    </div>
  )
}

const Line = styled.hr`
  margin: 25px 0;
  height: 1px;
  border: 0;
  background: #163372;
`

export default Cart
