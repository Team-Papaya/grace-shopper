import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Segment, Grid, Header} from 'semantic-ui-react'
import UserReviews from './user-reviews'

export class UserProfile extends Component {
  render() {
    const {user} = this.props
    return (
      <Container>
        <Header as="h1" style={{margin: 20}}>
          Your Profile
        </Header>
        <Segment>
          <Grid columns={3} stretched>
            <Grid.Column>
              <img
                src={user.profilePicture}
                style={{width: 225, height: 225, marginTop: 30}}
              />
            </Grid.Column>
            <Grid.Column>
              <Grid rows={2}>
                <Grid.Row>
                  First Name: {user.firstname}
                  <br />
                  Last Name: {user.lastname}
                  <br />
                  Username: {user.username}
                  <br />
                  Email: {user.email}
                  <br />
                </Grid.Row>
                <Grid.Row>Primary Address: </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>yay</Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Header as="h1">Your Reviews</Header>
          <Segment>
            <Grid rows={Array.isArray(user.reviews) ? user.reviews.length : 0}>
              {Array.isArray(user.reviews) && user.reviews.length > 0
                ? user.reviews.map(review => {
                    console.log(review)
                    return <UserReviews key={review.id} review={review} />
                  })
                : 'No reviews'}
            </Grid>
          </Segment>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfile)
