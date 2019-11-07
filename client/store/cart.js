import axios from 'axios'

const GET_CART = 'GET_CART'

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/cart/${userId}`)
      const cart = response.data
      dispatch(getCart(cart))
    } catch (err) {
      console.log(err)
    }
  }
}

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
