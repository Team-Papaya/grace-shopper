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
    if (event.target.type === 'radio') {
      this.setState({selected: event.target.id})
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }
  handleSubmit(event) {
    if (this.state.selected) {
      /*
          if this.state.selected, we must be using an existing purchase profile


      */
      try {
        Axios.post(
          `/api/checkout/${this.props.cartId}/existingProfile/${
            this.state.selected
          }`
        )
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        Axios.put(`/api/checkout/${this.props.cartId}/newProfile`, this.state)
      } catch (err) {
        console.error(err)
      }
    }
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
