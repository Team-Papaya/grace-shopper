import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {PurchaseProfile} from './'
import {getPurchaseProfilesThunk} from '../store/purchaseProfiles'
import {Container, Segment, Grid, Button} from 'semantic-ui-react'

class SelectPurchaseProfile extends React.Component {
  componentDidMount() {
    this.props.fetchPurchaseProfiles(this.props.user.id)
  }

  render() {
    const {purchaseProfiles} = this.props

    return (
      <Container>
        <Segment>
          <Grid columns="one" centered>
            <Grid.Column>
              <div>
                {purchaseProfiles.map(purchaseProfile => {
                  return (
                    <PurchaseProfile
                      key={purchaseProfile.id}
                      purchaseProfile={purchaseProfile}
                    />
                  )
                })}
              </div>
            </Grid.Column>
            <Grid.Row>
              <Button animated color="blue">
                Proceed to Checkout
              </Button>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    purchaseProfiles: state.purchaseProfiles
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPurchaseProfiles: userId => dispatch(getPurchaseProfilesThunk(userId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SelectPurchaseProfile))
