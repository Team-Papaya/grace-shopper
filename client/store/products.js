import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get(`/api/products`)
    const products = response.data
    dispatch(setProducts(products))
  } catch (error) {
    console.error(error)
  }
}

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
