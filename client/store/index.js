import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import singleUser from './singleUser'
import products from './products'
import cart from './cart' //i think ok
import product from './singleProduct'
import categories from './categories'

import purchaseProfiles from './purchaseProfiles'

import reviews from './reviews'

const reducer = combineReducers({
  user: user,
  users: users,
  singleUser: singleUser,
  products: products,
  cart: cart,
  product: product,
  categories: categories,
  purchaseProfiles: purchaseProfiles,
  reviews: reviews
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
