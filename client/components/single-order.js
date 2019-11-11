import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {NavLink} from 'react-router-dom'
import {Header, Container, Image, Segment, List} from 'semantic-ui-react'

class SingleOrder extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const {order} = this.props
    return (
      <div>
        <Segment key={order.id}>
          {order.purchaseProfile && order.purchaseProfile.user ? (
            <Container>
              <Image size="small" src={order.purchaseProfile.user.imageUrl} />
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
                        <NavLink key={product.id} to={`products/${product.id}`}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
