import React from 'react'
import {connect} from 'react-redux'
import {addReviewThunk} from '../store/reviews'
import {List, Input, Rating, Button, Header} from 'semantic-ui-react'

class NewReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      rating: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addReviewThunk(
      this.state,
      this.props.productId,
      this.props.username
    )
    this.setState({
      rating: '',
      content: ''
    })
  }
  render() {
    const {rating, content} = this.state
    return (
      <div>
        <Header>Add a review</Header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <List>
              <List.Item>
                What did you like or dislike about this product?
                <br />
                <Input
                  name="content"
                  type="text"
                  value={content}
                  onChange={this.handleChange}
                />
              </List.Item>
              <List.Item>
                Please rate it from 0 to 10 stars.
                <br />
                <Input
                  min="0"
                  max="10"
                  name="rating"
                  type="number"
                  value={rating}
                  onChange={this.handleChange}
                />
                {/* <Rating
                  defaultRating={rating}
                  icon="star"
                  maxRating={10}
                  value={rating}
                  onChange={this.handleChange}
                /> */}
              </List.Item>
              <Button type="submit" color="green">
                Submit
              </Button>
            </List>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addReviewThunk: (form, productId, username) =>
    dispatch(addReviewThunk(form, productId, username))
})
export default connect(null, mapDispatchToProps)(NewReviewForm)
