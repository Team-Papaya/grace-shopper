import axios from 'axios'

const GET_USERS = 'GET_USERS'
const REMOVE_USER = 'REMOVE_USER'

const getUsers = users => ({
  type: GET_USERS,
  users
})
const removeUser = user => ({
  type: REMOVE_USER,
  user
})

export const getUsersThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/users')
    const users = response.data
    dispatch(getUsers(users))
  } catch (error) {
    console.error(error)
  }
}

export const removeUserThunk = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/users/${id}`)
    if (response.status === 202) {
      dispatch(removeUser(id))
    }
  } catch (error) {
    console.error(error)
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case REMOVE_USER:
      return [...state.filter(user => user.id !== action.id)]
    default:
      return state
  }
}

export default usersReducer
