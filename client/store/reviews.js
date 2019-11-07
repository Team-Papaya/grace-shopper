import axios from 'axios'

const ADD_REVIEW = 'ADD_REVIEW'

const addReview = review => ({
  type: ADD_REVIEW,
  review
})

export const addReviewThunk = (form, productId) => async dispatch => {
  try {
    const response = await axios.post('/api/reviews', {
      ...form,
      productId: productId
    })
    dispatch(addReview(response.data))
  } catch (err) {
    console.error(err)
  }
}

const productReviewsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}

export default productReviewsReducer
