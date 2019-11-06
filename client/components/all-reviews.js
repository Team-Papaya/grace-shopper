//client/components/allReviews
import React from 'react'

const AllReviews = props => {
  const {reviews} = props
  return (
    <div>
      {reviews.map(review => {
        return (
          <li key={review.id}>
            <h4>{review.rating}</h4>
            {review.details}
          </li>
        )
      })}
    </div>
  )
}

export default AllReviews
