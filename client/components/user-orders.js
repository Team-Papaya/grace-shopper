import React from 'react'
import {Grid} from 'semantic-ui-react'

const UserOrders = props => {
  console.log('rendering')
  const {purchasedOrders, fulfilledOrders, allOrders} = props
  return (
    <Grid rows={allOrders.length}>
      {purchasedOrders.map(order => {
        return (
          <Grid.Row
            key={order.id}
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
        )
      })}
      {fulfilledOrders.map(order => {
        return (
          <Grid.Row
            key={order.id}
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
        )
      })}
    </Grid>
  )
}

export default UserOrders
