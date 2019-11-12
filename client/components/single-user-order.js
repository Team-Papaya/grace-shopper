/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Segment, Container, Grid} from 'semantic-ui-react'

class SingleUserOrder extends React.Component {
  render() {
    const {user} = this.props
    const purchaseProfiles = user.purchaseProfiles
    let allOrders = []
    if (!this.props.user) {
      return <div />
    }
    if (Array.isArray(purchaseProfiles) && purchaseProfiles.length > 0) {
      purchaseProfiles.forEach(profile => {
        allOrders = [...allOrders, ...profile.orders]
      })
      const selectedOrder = allOrders.filter(order => {
        return order.id === Number(this.props.match.params.id)
      })[0]
      if (!selectedOrder) {
        return <div />
      }
      const pProfile = purchaseProfiles.filter(profile => {
        return profile.id === selectedOrder.purchaseProfileId
      })[0]
      if (!pProfile) {
        return <div />
      }
      return (
        <Container>
          <Segment>
            <Grid rows={2}>
              <Grid.Row>
                <div>
                  <div>Order #{selectedOrder.id}</div>
                  <div>
                    Order purchased: {selectedOrder.purchasedAt.slice(0, 10)}
                  </div>
                  <div>Status: {selectedOrder.status}</div>
                </div>
                <Segment>
                  Shipping Information:
                  <br />
                  {pProfile.shipToName}
                  <br />
                  {pProfile.shipToAddress1}
                  <br />
                  {pProfile.shipToCity}
                  <br />
                  {pProfile.shipToState}
                  <br />
                  {pProfile.shipToPostalCode}
                  <br />
                </Segment>
              </Grid.Row>
              <Segment>
                <Grid.Row />
              </Segment>
            </Grid>
          </Segment>
        </Container>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SingleUserOrder)
