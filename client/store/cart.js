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
      const {data} = await axios.get(`/:${userId}`)
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
