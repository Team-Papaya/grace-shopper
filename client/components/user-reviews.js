import React from 'react'
import {Rating, Grid} from 'semantic-ui-react'

const UserReviews = props => {
  console.log('rendering')
  const review = props.review
  return (
    <Grid.Row style={{marginLeft: 15}}>
      <h4>
        <Rating defaultRating={review.rating} icon="star" maxRating={10} />
      </h4>
      {review.content}
      <hr />
    </Grid.Row>
  )
}

export default UserReviews
