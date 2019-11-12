import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
//const UPDATE_ORDER = 'UPDATE_ORDER'

const getOrder = order => ({
  type: GET_ORDER,
  order
})

// const updateOrder = order => ({
//   type: UPDATE_ORDER,
//   order
// })

export const getOrderThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(response.data))
  } catch (error) {
    console.error(error)
  }
}

// export const updateOrderThunk = (value, order) => async dispatch => {
//   try {
//     const response = await axios.put(`/api/orders/${order}/status`, {
//       status: value
//     })
//     dispatch(updateOrder(response.data))
//   } catch (err) {
//     console.error(err)
//   }
// }

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    // case UPDATE_ORDER:
    //   return {...state, ...action.order}
    default:
      return state
  }
}

export default orderReducer
