import axios from 'axios'

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

const getReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})

const addReview = review => ({
  type: ADD_REVIEW,
  review
})

/*
the entire getAllReviews might be unnecessary if we don't plan to make a display all reviews page
 */

export const getReviewsThunk = (queryString = '') => async dispatch => {
  try {
    const response = await axios.get(`/api/reviews` + queryString)
    const reviews = response.data
    dispatch(getReviews(reviews))
  } catch (error) {
    console.error(error)
  }
}

export const addReviewThunk = (form, productId, username) => async dispatch => {
  try {
    const response = await axios.post('/api/reviews/add', {
      ...form,
      productId: productId,
      username: username
    })
    dispatch(addReview(response.data))
  } catch (err) {
    console.error(err)
  }
}

const productReviewsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}

export default productReviewsReducer
