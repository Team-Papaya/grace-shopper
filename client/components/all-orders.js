import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {SingleOrder} from './'
import {NavLink} from 'react-router-dom'
import {Header, Container, Segment} from 'semantic-ui-react'

class AllOrders extends React.Component {
  constructor() {
    super()
    this.state = {
      chosenOption: 'all orders'
    }
  }
  componentDidMount() {
    this.props.getOrdersThunk()
  }
  handleChange = event => {
    this.setState({
      chosenOption: event.target.value
    })
  }
  handleOrderStatus = (allOrders, status) => {
    const orderStatus = allOrders.filter(order => {
      if (status === 'all orders') {
        return allOrders
      }
      return order.status === status
    })
    return orderStatus.filter(order => {
      return order.user !== null
    })
  }

  // handleOrderStatus = orders => {
  //   const purchasedStatus = orders.filter(order => {
  //     return order.status === 'purchased'
  //   })
  //   const fulfilledStatus = orders.filter(order => {
  //     return order.status === 'fulfilled'
  //   })
  // }

  render() {
    const {orders} = this.props
    const ordersWithStatus = this.handleOrderStatus(
      orders,
      this.state.chosenOption
    )
    return (
      <div>
        <Container>
          <Header>All Orders</Header>
          <h3>Order status:</h3>
          <select onChange={this.handleChange}>
            <option value="all orders">All Orders</option>
            <option value="pending">Pending</option>
            <option value="purchased">Purchased</option>
            <option value="cancelled">Cancelled</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
          {ordersWithStatus &&
            ordersWithStatus.length &&
            ordersWithStatus.map(order => {
              return (
                // <NavLink key={order.id} to={`orders/${order.id}`}>
                <div key={order.id} to={`orders/${order.id}`}>
                  <SingleOrder order={order} />
                  {/* </NavLink> */}
                </div>
              )
            })}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrdersThunk: () => dispatch(getOrdersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
