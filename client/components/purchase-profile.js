import React from 'react'
import {Container, Segment, Header, Grid} from 'semantic-ui-react'

const PurchaseProfile = props => {
  const {purchaseProfile} = props

  return (
    <Container>
      <Segment height="10px">
        <Grid>
          <div>
            <Header as="h2">Ship To: {purchaseProfile.shipToName}</Header>
            <div>Address 1: {purchaseProfile.shipToAddress1}</div>
            <div>Address 2: {purchaseProfile.shipToAddress2}</div>
            <div>City: {purchaseProfile.shipToCity}</div>
            <div>State: {purchaseProfile.shipToState}</div>
            <div>Postal Code: {purchaseProfile.postalCode}</div>
            <div>Notification email: {purchaseProfile.email}</div>
          </div>
        </Grid>
      </Segment>
    </Container>
  )
}

export default PurchaseProfile
