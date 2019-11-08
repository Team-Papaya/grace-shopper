import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
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
    event.persist()
    event.preventDefault()
    console.log(event)
    if (event.target.type === 'radio') {
      this.setState({selected: event.target.id})
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }
  handleSubmit(event) {
    console.log(this.state.selected)
    if (this.state.selected) {
      /*
          if this.state.selected, we must be using an existing pricing history


      */
      Axios.post(
        `/api/checkout/${this.props.cartId}/existingProfile/${
          this.state.selected
        }`
      )
    } else {
      //
    }
  }

  render() {
    const {purchaseProfiles, user} = this.props

    return (
      <form
        id="select-purchase-profile"
        onSubmit={event => {
          /*console.log(this.state.selected)
          event.preventDefault()
          event.persist()
          console.log(event)*/
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
                    <label htmlFor="shipTo">Ship To</label>
                    <input
                      type="text"
                      name="shipTo"
                      value={this.state.shipTo}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={this.state.email} />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="address1">Address 1</label>
                    <input
                      type="text"
                      name="address1"
                      value={this.state.address1}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="address2">Address 2</label>
                    <input
                      type="text"
                      name="address2"
                      value={this.state.address2}
                    />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value={this.state.city} />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="state">State</label>
                    <input type="text" name="state" value={this.state.state} />
                  </div>
                  <div className="add-pp-option-inputpair">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={this.state.postalCode}
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

        <button type="submit">Proceed to Checkout</button>
      </form>

      // <Container>
      //   <Segment>
      //     <Grid columns="one" centered>
      //       <Grid.Column>
      //         <Form>
      //           <Grid.Row>
      //             <Header as="h2">Enter shipping info:</Header>
      //             <div>
      //               <Form.Input
      //                 label="Name"
      //                 placeholder="Name"
      //                 name="name"
      //                 value="value"
      //                 onChange={this.handleChange}
      //               />
      //               <br />
      //               <Form.Input
      //                 label="ImageUrl"
      //                 placeholder="ImageUrl"
      //                 name="imageUrl"
      //                 value="value"
      //                 onChange={this.handleChange}
      //               />
      //               <br />
      //               <Form.Input
      //                 label="Description"
      //                 placeholder="Description"
      //                 name="description"
      //                 value="value"
      //                 onChange={this.handleChange}
      //               />
      //               <br />
      //             </div>
      //           </Grid.Row>
      //           {user.id ? (
      //             <Grid.Row>
      //               <Header as="h2">...or select from existing:</Header>
      //               <div>
      //                 {purchaseProfiles.map(purchaseProfile => {
      //                   return (
      //                     <PurchaseProfile
      //                       key={purchaseProfile.id}
      //                       purchaseProfile={purchaseProfile}
      //                     />
      //                   )
      //                 })}
      //               </div>
      //             </Grid.Row>
      //           ) : (
      //             <React.Fragment />
      //           )}
      //         </Form>
      //       </Grid.Column>
      //       <Grid.Row>
      //       <Form.Button type="submit">Proceed to Checkout</Form.Button>
      //       </Grid.Row>
      //     </Grid>
      //   </Segment>
      // </Container>
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
