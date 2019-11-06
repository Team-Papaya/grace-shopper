import React from 'react'

export const Cart = props => {
  return (
    <div id="cart">
      <div className="cart-topbar">
        <div>
          <h1>Cart</h1>
        </div>
        <div>
          <h3>X Items in Cart</h3>
        </div>
      </div>
      <div className="cart-product-list">
        {/* {props.thing.map(product => {
            return <SingleProduct /> className of cart-single-product
        })} */}
      </div>
      <div className="cart-checkout-panel">
        <div>
          <h3>Total Amount: $MONEYSUM</h3>
        </div>
      </div>
    </div>
  )
}

export default Cart
