import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const getProductThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateProductThunk = product => async dispatch => {
  try {
    const response = await axios.put(`api/products/${product.id}`, product)
    dispatch(updateProduct(response.data))
    //consider get Products
  } catch (err) {
    console.error(err)
  }
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return {...state, ...action.product}
    default:
      return state
  }
}
