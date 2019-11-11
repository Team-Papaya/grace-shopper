import React from 'react'
import {connect} from 'react-redux'
import {getProductThunk, updateProductThunk} from '../store/singleProduct'
import {Form, Container, Header} from 'semantic-ui-react'

class UpdateProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      quantity: '',
      price: '',
      isAvailable: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /*
   I'm not certain if the isAvailable toggle is doing anything.
  */

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  componentDidUpdate(prevProps) {
    //console.log("My props are, ", this.props)
    if (!prevProps.product || this.props.product !== prevProps.product) {
      this.setState({
        name: this.props.product.name,
        imageUrl: this.props.product.imageUrl.length
          ? this.props.product.imageUrl[0]
          : 'No image found',
        description: this.props.product.description,
        quantity: this.props.product.quantity,
        price: this.props.product.pricingHistories.length
          ? this.props.product.pricingHistories[0].price
          : 'No Valid Price Found',
        isAvailable: Boolean(this.props.product.isAvailable)
      })
    }
  }

  handleChange(event) {
    event.persist()
    console.log(event)
    //For some reason, the semantic ui checkbox associates events with a label instead of the box itself
    //Consequently, we can't look at the checked value directly
    //And for some reason also can't seem to get a name property either.
    if (event.target.id && event.target.id === 'isAvailable') {
      this.setState({isAvailable: !this.state.isAvailable})
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }
  handleSubmit(event) {
    console.log('submit func:', this.props.submitUpdateProduct)
    event.preventDefault()
    this.props
      .submitUpdateProduct({
        ...this.state,
        id: this.props.match.params.id,
        imageUrl: [this.state.imageUrl],
        /*eslint-disable no-self-compare*/
        price:
          Number(this.state.price) === Number(this.state.price)
            ? Number(this.state.price)
            : null
      })
      .then(() =>
        /*this.setState({
      name: '',
      imageUrl: [],
      description: '',
      quantity: '',
      price: '',
      isAvailable: false
    })*/
        this.props.history.push('/products')
      )
  }

  render() {
    return (
      <Container>
        <Header size="medium" color="red">
          Update Product
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <Form.Input
              label="Name"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <Form.Input
              label="ImageUrl"
              placeholder="ImageUrl"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
            <br />
            <Form.Input
              label="Description"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <br />
            <Form.Input
              label="Quantity"
              placeholder="Quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            {/* Price */}
            <br />
            <Form.Input
              label="Price"
              placeholder="Price"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <br />
            {/* <Form.Group>
              <Form.Checkbox
                label="isAvailable"
                name="isAvailable"
                value={this.state.isAvailable}
                onChange={this.handleChange}
              />
            </Form.Group> */}
            <Form.Checkbox
              label="isAvailable"
              name="isAvailable"
              id="isAvailable"
              checked={this.state.isAvailable}
              onChange={this.handleChange}
            />
            <br />
            <span>
              <Form.Button type="submit">Submit</Form.Button>
            </span>
          </div>
        </Form>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  product: state.product,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: productId => dispatch(getProductThunk(productId)),
  //updateInputField: product => dispatch(updateProduct(product)),
  submitUpdateProduct: product => dispatch(updateProductThunk(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProductForm)
