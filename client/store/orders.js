import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const getOrdersThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/orders/')
    dispatch(getOrders(data))
  }
}

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default ordersReducer
