//client/components/allReviews
import React from 'react'
import {Header, Rating, Image} from 'semantic-ui-react'

const AllReviews = props => {
  const {reviews} = props
  console.log(reviews)
  return (
    <div>
      <Header as="h3">Reviews</Header>
      <div>
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <Image src={review.user.profilePicture} size="tiny" />
              <Header>{review.user.username}</Header>
              <h4>
                <Rating
                  defaultRating={review.rating}
                  icon="star"
                  maxRating={10}
                />
              </h4>
              {review.content}
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllReviews
