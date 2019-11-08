import axios from 'axios'

const GET_SINGLE_USER = 'GET_SINGLE_USER'

const getSingleUser = user => ({
  type: GET_SINGLE_USER,
  user
})

export const getSingleUserThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${id}`)
    const user = response.data
    dispatch(getSingleUser(user))
  } catch (error) {
    console.error(error)
  }
}

export const singleUserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user
    default:
      return state
  }
}

export default singleUserReducer
