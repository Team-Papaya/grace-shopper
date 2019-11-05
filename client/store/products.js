import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getProductsThunk = () => async dispatch => {
  try {
    const response = await axios.get(`/api/products`)
    const products = response.data
    dispatch(getProducts(products))
  } catch (error) {
    console.error(error)
  }
}

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
