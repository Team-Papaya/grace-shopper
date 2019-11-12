import React from 'react'
import {Grid} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const UserOrders = props => {
  console.log('rendering')
  const {purchasedOrders, fulfilledOrders, allOrders} = props
  return (
    <Grid rows={allOrders.length}>
      {purchasedOrders.map(order => {
        return (
          <NavLink to={`/orders/${order.id}`} key={order.id}>
            <Grid.Row
              style={{
                margin: 20,
                border: '1px solid gray',
                padding: 10,
                borderRadius: 10
              }}
            >
              Status: {order.status} <hr />
              Purchased: {order.purchasedAt.slice(0, 10)} <hr />
            </Grid.Row>
          </NavLink>
        )
      })}
      {fulfilledOrders.map(order => {
        return (
          <NavLink to={`/orders/${order.id}`} key={order.id}>
            <Grid.Row
              style={{
                margin: 20,
                border: '1px solid gray',
                padding: 10,
                borderRadius: 10
              }}
            >
              {' '}
              Status: {order.status} <hr />
              Fulfilled: {order.fulfilledAt.slice(0, 10)} <hr />
            </Grid.Row>
          </NavLink>
        )
      })}
    </Grid>
  )
}

export default UserOrders
