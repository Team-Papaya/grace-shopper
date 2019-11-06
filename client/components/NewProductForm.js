import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/products'

export class NewProductForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitAddProduct(this.props.product)
    this.props.history.push('/products')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Product Form</h1>;
        <div>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            ImageUrl:
            <input type="text" name="imageUrl" />
          </label>
          <br />
          <label>
            Rating:
            <input type="text" name="rating" />
          </label>
          <br />
          <label>
            Price:
            <input type="text" name="price" />
          </label>
          <br />
          <span>
            <button type="submit">Submit</button>
          </span>
        </div>
      </form>
    )
  }
}
const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  submitAddProduct: product => dispatch(addProduct(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
