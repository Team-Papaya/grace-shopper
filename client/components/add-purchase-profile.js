import React from 'react'
import {Container, Segment, Header, Grid} from 'semantic-ui-react'

const AddPurchaseProfile = props => {
  return (
    <div>
      <Container>
        <Segment height="10px">
          <Grid>
            <div>
              <Header as="h2">Ship To: _____</Header>
              <div>Address 1: _____</div>
              <div>Address 2: _____</div>
              <div>City: _____</div>
              <div>State: _____</div>
              <div>Postal Code: _____</div>
              <div>Notification email: _____</div>
            </div>
          </Grid>
        </Segment>
      </Container>
    </div>
  )
}

export default AddPurchaseProfile
