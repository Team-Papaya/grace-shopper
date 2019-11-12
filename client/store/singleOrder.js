import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

export const getOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

export const getOrderThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(response.data))
  } catch (err) {
    console.log(err)
  }
}

const initialState = {}

const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}

export default singleOrderReducer
