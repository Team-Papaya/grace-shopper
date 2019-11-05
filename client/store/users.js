import axios from 'axios'

const SET_USERS = 'SET_USERS'

const setUsers = users => ({
  type: SET_USERS,
  users
})

export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get('/api/users')
    const users = response.data
    dispatch(setUsers(users))
  } catch (error) {
    console.error(error)
  }
}

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}

export default usersReducer
