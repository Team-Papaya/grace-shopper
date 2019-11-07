import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const getProductsThunk = (queryString = '') => async dispatch => {
  try {
    const response = await axios.get(`/api/products` + queryString)
    const products = response.data
    dispatch(getProducts(products))
  } catch (error) {
    console.error(error)
  }
}

export const addProductThunk = product => async dispatch => {
  try {
    // REVIEW: discuss resources
    const response = await axios.post('/api/products/add', product)
    dispatch(addProduct(product))
    //dispatch(addProduct(response.data))
    //consider a .get here
  } catch (err) {
    console.error(err)
  }
}

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
export default productsReducer
