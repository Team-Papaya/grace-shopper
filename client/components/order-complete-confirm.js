import React from 'react'
import {Container, Segment, Button} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const OrderCompleteConfirm = props => {
  return (
    <div>
      <br />
      <Container>
        <Segment>
          <div className="cart-topbar">
            <div>
              <h1>Purchase successful- check your email for confirmation!</h1>
            </div>
          </div>
          <br />
          <NavLink to="/home">
            <Button type="button" color="blue">
              Browse All Products
            </Button>
          </NavLink>
        </Segment>
      </Container>
    </div>
  )
}

export default OrderCompleteConfirm
