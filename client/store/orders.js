import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})

export const getOrdersThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/orders/')
    dispatch(getOrders(data))
  }
}

export const updateOrderThunk = (value, order) => async dispatch => {
  try {
    const response = await axios.put(`/api/orders/${order}/status`, {
      status: value
    })
    dispatch(updateOrder(response.data))
  } catch (err) {
    console.error(err)
  }
}

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case UPDATE_ORDER:
      return state.map(
        order =>
          order.id === action.order.id ? {...order, ...action.order} : order
      )
    default:
      return state
  }
}

export default ordersReducer
