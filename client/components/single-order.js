import React from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import {NavLink} from 'react-router-dom'
import {getOrderThunk, updateOrderThunk} from '../store/singleOrder'
import {
  Header,
  Container,
  Image,
  Segment,
  List,
  Button,
  Form
} from 'semantic-ui-react'

class SingleOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      status: ''
    }
  }

  handleChange = event => {
    event.persist()
    console.log(event)
    this.setState({
      status: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    await this.props.updateOrderThunk(this.state, this.props.order.id)
    console.log(updateOrderThunk)
    //await updateOrderThunk(event.target.value, order)
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
                  {/* <Form onSubmit={this.handleSubmit}>
                    Status: {order.status} <h4>change status:</h4>
                    <select onChange={this.handleChange}>
                      <option value="no change">No Change</option>
                      <option value="pending">Pending</option>
                      <option value="purchased">Purchased</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="fulfilled">Fulfilled</option>
                    </select>
                    <Button type="submit">Change Status</Button>
                  </Form> */}
                  Status: {order.status}
                  <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange}>
                      <option value="no change">No Change</option>
                      <option value="pending">Pending</option>
                      <option value="purchased">Purchased</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="fulfilled">Fulfilled</option>
                    </select>
                    <Button type="submit">Change Status</Button>
                  </form>
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
  //order: state.order
})

const mapDispatchToProps = dispatch => ({
  getOrdersThunk: () => dispatch(getOrdersThunk()),
  updateOrderThunk: (value, order) => dispatch(updateOrderThunk(value, order))
  //getOrderThunk: () => dispatch(getOrderThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
