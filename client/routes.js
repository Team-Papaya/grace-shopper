import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  SingleProduct,
  NewProductForm,
  UpdateProductForm,
  AllProducts,
  AllReviews,
  SidebarComponent,
  Cart,
  SelectPurchaseProfile,
  AllUsers,
  SingleUser,
  AllOrders,
  SingleUserOrder,
  OrderCompleteConfirm
} from './components'
import {me} from './store'
import {getCartThunk} from './store/cart.js'
import UserProfile from './components/user-profile'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/profile" component={UserProfile} />
        <Route exact path="/cart" component={Cart} />
        <Route
          exact
          path="/cart/checkout/shipping"
          render={renderProps => (
            <SelectPurchaseProfile key={isLoggedIn} {...renderProps} />
          )}
        />
        <Route exact path="/order/confirm" component={OrderCompleteConfirm} />
        <Route exact path="/products/add" component={NewProductForm} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route
          exact
          path="/products/:id/update"
          component={UpdateProductForm}
        />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/reviews" component={AllReviews} />
        <Route exact path="/orders" component={AllOrders} />
        <Route exact path="/orders/:id" component={SingleUserOrder} />
        <Route path="/sidebar" component={SidebarComponent} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/users/:id" component={SingleUser} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={AllProducts} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getCartThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
