//client/components/allReviews
import React from 'react'
import {Header, Rating} from 'semantic-ui-react'

const AllReviews = props => {
  const {reviews} = props
  return (
    <div>
      <Header as="h3">Reviews</Header>
      <div>
        {reviews.map(review => {
          return (
            <li key={review.id}>
              <h4>
                <Rating
                  defaultRating={review.rating}
                  icon="star"
                  maxRating={10}
                />
              </h4>
              {review.content}
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default AllReviews
