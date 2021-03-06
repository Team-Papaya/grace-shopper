import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {PurchaseProfile} from './'
import {getPurchaseProfilesThunk} from '../store/purchaseProfiles'
import {Container, Segment, Grid, Header, Form} from 'semantic-ui-react'
import Axios from 'axios'

class SelectPurchaseProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchPurchaseProfiles(this.props.user.id)
  }

  handleChange(event) {
    if (event.target.type === 'radio') {
      this.setState({selected: event.target.id})
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }
  handleSubmit() {
    const applyPurchaseProfile = async () => {
      if (this.state.selected) {
        /*
            if this.state.selected, we must be using an existing purchase profile
        */
        try {
          await Axios.post(
            `/api/checkout/${this.props.cartId}/existingProfile/${
              this.state.selected
            }`
          )
          this.props.history.push('/cart')
        } catch (err) {
          console.error(err)
        }
      } else {
        /*
            ...otherwise, we must create a new purchase profile and apply it to the cart
        */
        try {
          await Axios.put(
            `/api/checkout/${this.props.cartId}/newProfile`,
            this.state
          )
          this.props.history.push('/cart')
        } catch (err) {
          console.error(err)
        }
      }
    }

    applyPurchaseProfile()
  }

  render() {
    const {purchaseProfiles, user} = this.props

    return (
      <form
        id="select-purchase-profile"
        onSubmit={event => {
          event.preventDefault()
          this.handleSubmit(event)
        }}
        onChange={this.handleChange}
      >
        <h2>Enter Shipping Information</h2>
        <div className="add-pp-option">
          <input
            type="radio"
            id="0"
            name="purchase-profile-select"
            checked="checked"
          />
          <form id="add-purchase-profile" /*onChange={this.handleChange}*/>
            <div id="add-pp-new">
              <div>
                <div className="add-pp-option-details">
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="shipToName">Ship To</label>
                    <input
                      type="text"
                      name="shipToName"
                      value={this.state.shipToName}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={this.state.email} />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="shipToAddress1">Address 1</label>
                    <input
                      type="text"
                      name="shipToAddress1"
                      value={this.state.shipToAddress1}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="shipToAddress2">Address 2</label>
                    <input
                      type="text"
                      name="shipToAddress2"
                      value={this.state.shipToAddress2}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="shipToCity">City</label>
                    <input
                      type="text"
                      name="shipToCity"
                      value={this.state.shipToCity}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="shipToState">State</label>
                    <input
                      type="text"
                      name="shipToState"
                      value={this.state.shipToState}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="shipToPostalCode">Postal Code</label>
                    <input
                      type="text"
                      name="shipToPostalCode"
                      value={this.state.shipToPostalCode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {user.id ? (
          <div id="add-pp-select-existing">
            <h2>...or Select Existing</h2>
            {purchaseProfiles.map(purchaseProfile => {
              return (
                <div key={purchaseProfile.id} className="add-pp-option">
                  <input
                    type="radio"
                    id={purchaseProfile.id}
                    name="purchase-profile-select"
                  />
                  <PurchaseProfile purchaseProfile={purchaseProfile} />
                </div>
              )
            })}
          </div>
        ) : (
          <div />
        )}
        <button type="submit">Use This Address</button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    purchaseProfiles: state.purchaseProfiles,
    cartId: state.cart.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPurchaseProfiles: userId => dispatch(getPurchaseProfilesThunk(userId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SelectPurchaseProfile))
