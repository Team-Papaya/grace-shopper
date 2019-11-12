import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {SingleOrder} from './'
import {NavLink} from 'react-router-dom'
import {Header, Container, Form} from 'semantic-ui-react'

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
  handleOrderStatus = (orders, status) => {
    return orders.filter(order => {
      if (status === 'all orders') {
        return order.user !== null
      }
      return order.status === status && order.user !== null
    })
  }
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
          <Form>
            <select onChange={this.handleChange}>
              <option value="all orders">All Orders</option>
              <option value="pending">Pending</option>
              <option value="purchased">Purchased</option>
              <option value="cancelled">Cancelled</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </Form>
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
