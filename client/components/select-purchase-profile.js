import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getPurchaseProfilesThunk} from '../store/purchaseProfiles'

class SelectPurchaseProfile extends React.Component {
  componentDidMount() {
    this.props.fetchPurchaseProfiles(this.props.user.id)
  }

  render() {
    const {purchaseProfiles} = this.props

    return (
      <div>
        {purchaseProfiles.map(profile => {
          return (
            <div key={profile.id}>
              <div>Ship To: {profile.shipToName}</div>
              <div>Address 1: {profile.shipToAddress1}</div>
              <div>Address 2: {profile.shipToAddress2}</div>
              <div>City: {profile.shipToCity}</div>
              <div>State: {profile.shipToState}</div>
              <div>Postal Code: {profile.postalCode}</div>
              <div>Notification email: {profile.email}</div>
            </div>
          )
        })}
      </div>
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
