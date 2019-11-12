/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Segment, Container, Grid} from 'semantic-ui-react'

class SingleUserOrder extends React.Component {
  render() {
    console.log(this.props)
    const {user} = this.props
    const purchaseProfiles = user.purchaseProfiles
    let allOrders = []
    if (!this.props.user) {
      return <div />
    }
    if (Array.isArray(purchaseProfiles) && purchaseProfiles.length > 0) {
      if (Array.isArray(purchaseProfiles) && purchaseProfiles.length > 0) {
        purchaseProfiles.forEach(profile => {
          allOrders = [...allOrders, ...profile.orders]
        })
      }
      console.log(allOrders)
      const selectedOrder = allOrders.filter(order => {
        return order.id === Number(this.props.match.params.id)
      })[0]
      if (!selectedOrder) {
        return <div />
      }
      console.log(purchaseProfiles)
      const pProfile = purchaseProfiles.filter(profile => {
        return profile.id === selectedOrder.purchaseProfileId
      })[0]
      if (!pProfile) {
        return <div />
      }
      console.log(selectedOrder)
      console.log(pProfile)
      return (
        <Container>
          <Segment>
            <Grid rows={2}>
              <Grid.Row>
                <div>
                  <div>Order #{selectedOrder.id * 3333}</div>
                  <div>
                    Order purchased: {selectedOrder.purchasedAt.slice(0, 10)}
                  </div>
                  <div>Status: {selectedOrder.status}</div>
                </div>
                <Segment>
                  {pProfile.shipToName}
                  {'\n'}
                  {pProfile.shipToAddress1}
                  {'\n'}
                  {pProfile.shipToCity}
                  {'\n'}
                  {pProfile.shipToState}
                  {'\n'}
                  {pProfile.shipToPostalCode}
                  {'\n'}
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
