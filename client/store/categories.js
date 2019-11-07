import Axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategories = categories => {
  return {type: GET_CATEGORIES, categories}
}
export const getCategoriesThunk = () => {
  return dispatch =>
    Axios.get('/api/categories')
      .then(res => dispatch(getCategories(res.data)))
      .catch(err => console.err(err))
}
const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
export default reducer
