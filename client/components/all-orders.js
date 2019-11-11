import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {NavLink} from 'react-router-dom'
import {Header, Container, Image} from 'semantic-ui-react'

class AllOrders extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  async componentDidMount() {
    await this.props.getOrdersThunk()
  }
  render() {
    const {orders} = this.props
    return (
      <div>
        <Header>All Orders</Header>
        {orders &&
          orders.length &&
          orders.map(order => {
            return (
              <li key={order.id}>
                {order.purchaseProfile && order.purchaseProfile.user ? (
                  <Container>
                    <Image
                      size="small"
                      src={order.purchaseProfile.user.imageUrl}
                    />
                    <Container>
                      <h3>
                        <Header>User:</Header>
                        {`${order.purchaseProfile.user.firstname} ${
                          order.purchaseProfile.user.lastname
                        }`}
                      </h3>
                      Email:{' '}
                      {order.purchaseProfile && order.purchaseProfile.user
                        ? order.purchaseProfile.user.email
                        : 'Order has no purchase profile'}
                      <br />
                      Address: {order.purchaseProfile.shipToAddress1}
                      <br />
                      {/* Total: {`$${order.total}`} */}
                      <br />
                      {/* Status: {order.status} */}
                      <br />
                      Products in Order:
                      {/* {order.products.map(product => {
                    return (
                      <NavLink key={product.id} to={`products/${product.id}`}>
                        <li>{product.name}</li>
                      </NavLink>
                    )
                  })} */}
                    </Container>
                  </Container>
                ) : (
                  'Order has no purchase profile'
                )}
              </li>
            )
          })}
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
