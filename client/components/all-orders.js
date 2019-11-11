import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {NavLink} from 'react-router-dom'
import {Header, Container, Image, Segment, List} from 'semantic-ui-react'

class AllOrders extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  async componentDidMount() {
    await this.props.getOrdersThunk()
  }
  handleChange = event => {
    this.setState({})
  }

  render() {
    const {orders} = this.props
    return (
      <div>
        <Container>
          <Header>All Orders</Header>
          <h2>Filter by status:</h2>
          <select onChange={this.handleChange}>
            <option value="All Orders">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Purchased">Purchased</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>
          {orders &&
            orders.length &&
            orders.map(order => {
              return (
                <Segment key={order.id}>
                  {order.purchaseProfile && order.purchaseProfile.user ? (
                    <Container>
                      <Image
                        size="small"
                        src={order.purchaseProfile.user.imageUrl}
                      />
                      <Container>
                        <Header>This Order's User:</Header>
                        <List>
                          {`${order.purchaseProfile.user.firstname} ${
                            order.purchaseProfile.user.lastname
                          }`}
                          <br />
                          Email: {order.purchaseProfile.user.email}
                          <br />
                          <List.Item>
                            Address: {order.purchaseProfile.shipToAddress1}{' '}
                            {order.purchaseProfile.shipToAddress2}{' '}
                            {order.purchaseProfile.shipToCity}
                            {', '}
                            {order.purchaseProfile.shipToState}{' '}
                            {order.purchaseProfile.shipToPostalCode} <br />
                          </List.Item>
                          {/* Total: ${order.total} */}
                          <br />
                          Status: {order.status}
                          <br />
                          <Segment>
                            This Order's Products:{' '}
                            {order.products.map(product => {
                              return (
                                <NavLink
                                  key={product.id}
                                  to={`products/${product.id}`}
                                >
                                  <li>
                                    {product.name}: {product.quantity}
                                  </li>
                                </NavLink>
                              )
                            })}
                          </Segment>
                        </List>
                      </Container>
                    </Container>
                  ) : (
                    'This order has no purchase profile'
                  )}
                </Segment>
              )
            })}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  //order: state.order,
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrdersThunk: () => dispatch(getOrdersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
