import axios from 'axios'

const GET_CART = 'GET_CART'

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const getCartThunk = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/cart`)
      const cart = response.data
      dispatch(getCart(cart))
    } catch (err) {
      console.log(err)
    }
  }
}

const ADD_TO_CART = 'ADD_TO_CART'
/*const addToCart=(assoc)=>{
  return {type: ADD_TO_CART, relation: assoc}
}*/
export const addToCartThunk = (productId, cartId, quantity) => {
  return dispatch => {
    axios.put(`/api/orders/${cartId}/contents`, {
      product: productId,
      quantity
    }) /*.then(res=>
          dispatch(addToCart(res.data))
      )*/
  }
}
export const makeCartThunk = (productId, quantity) => {
  return dispatch =>
    axios
      .post('/api/orders/', {productId, qty: quantity})
      .then(res => dispatch(getCart(res.data)))
}
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const removeFromCart = productId => ({type: REMOVE_FROM_CART, productId})

export const removeFromCartThunk = (cartId, productId) => {
  return dispatch =>
    axios
      .delete(`/api/orders/${cartId}/products/${productId}`)
      .then(() => dispatch(removeFromCart(productId)))
}

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return {...state, products: [...state.products, action.relation]}
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(prod => prod.id != action.productId)
      }
    default:
      return state
  }
}

export default cartReducer
