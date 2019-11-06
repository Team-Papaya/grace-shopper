import Axios from 'axios'

const SET_CATEGORIES = 'SET_CATEGORIES'

const setCategories = categories => {
  return {type: SET_CATEGORIES, categories}
}
export const fetchCategories = () => {
  Axios.get('/api/categories').then(res => setCategories(res.data))
}
const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
export default reducer
