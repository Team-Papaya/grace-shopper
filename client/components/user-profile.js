/* eslint-disable complexity */
/* eslint-disable no-undef */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Segment, Grid, Header} from 'semantic-ui-react'
import UserReviews from './user-reviews'
import UserOrders from './user-orders'

export class UserProfile extends Component {
  render() {
    const {user} = this.props
    let purchaseProfiles = user.purchaseProfiles
    let allOrders = []
    if (Array.isArray(purchaseProfiles) && purchaseProfiles.length > 0) {
      purchaseProfiles.forEach(profile => {
        allOrders = [...allOrders, ...profile.orders]
      })
    }
    const purchasedOrders = allOrders.filter(
      order => order.status === 'purchased'
    )
    const fulfilledOrders = allOrders.filter(
      order => order.status === 'fulfilled'
    )
    console.log(allOrders)
    console.log(user)
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
              <Grid rows={1}>
                <Grid.Row>
                  <Grid columns={1}>
                    <Grid.Column>
                      <h2>User Info</h2>
                      <hr />
                      <h4>First Name: {user.firstname}</h4>
                      <hr />
                      <h4>Last Name: {user.lastname}</h4>
                      <hr />
                      <h4>Username: {user.username}</h4>
                      <hr />
                      <h4>Email: {user.email}</h4>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>Address Information</Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Header as="h1">Your Reviews</Header>
          <Segment>
            <Grid rows={Array.isArray(user.reviews) ? user.reviews.length : 0}>
              {Array.isArray(user.reviews) && user.reviews.length > 0
                ? user.reviews.map(review => {
                    return <UserReviews key={review.id} review={review} />
                  })
                : 'No reviews'}
            </Grid>
          </Segment>
        </Segment>
        <Segment>
          <Header as="h1">Your Past Orders</Header>
          <Segment>
            {Array.isArray(user.purchaseProfiles) ? (
              <UserOrders
                user={user}
                allOrders={allOrders}
                purchasedOrders={purchasedOrders}
                fulfilledOrders={fulfilledOrders}
              />
            ) : (
              'No Past Orders'
            )}
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
