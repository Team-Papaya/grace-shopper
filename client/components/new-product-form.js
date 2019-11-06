import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'
//import {updateProduct, updateProductThunk} from '../store/singleProduct'
//import {getProductThunk} from '../store/singleProduct'

class NewProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: {},
      description: '',
      quantity: 0,
      price: 0,
      available: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    // let inputField = {}
    // inputField[event.target.name] = event.target.value
    // this.props.updateInputField(inputField)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.submitAddProduct(this.state)
    // const productName = event.target.name.value
    // this.props.submitAddProduct({
    //   name: productName
    // })
    this.props.history.push('/products')
  }

  render() {
    const {product} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Product Form</h1>;
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            ImageUrl:
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              min="0"
              name="quantity"
              value={product.quantity}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              min="0"
              name="price"
              value={product.price}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Available Now?
            <input
              type="boolean"
              name="isAvailable"
              value={product.isAvailable}
              onChange={this.handleChange}
            />
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
  product: state.productReducer
})

const mapDispatchToProps = dispatch => ({
  //updateInputField: product => dispatch(updateProduct(product)),
  submitAddProduct: product => dispatch(addProductThunk(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
