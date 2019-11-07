import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'
//import {updateProduct, updateProductThunk} from '../store/singleProduct'
//import {getProductThunk} from '../store/singleProduct'
import {Form, Container, Header} from 'semantic-ui-react'

class NewProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: [],
      description: '',
      quantity: '',
      //price: '',
      isAvailable: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.submitAddProduct(this.state)
    this.setState({
      name: '',
      imageUrl: [],
      description: '',
      quantity: '',
      //price: '',
      isAvailable: false
    })
    //this.props.history.push('/products')
  }

  render() {
    return (
      <Container>
        <Header size="medium" color="red">
          New Product
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
            {/* <Form.Group>
              <Form.Checkbox
                label="isAvailable"
                name="isAvailable"
                value={this.state.isAvailable}
                onChange={this.handleChange}
              />
            </Form.Group> */}
            <Form.Input
              label="isAvailable"
              name="isAvailable"
              value={this.state.isAvailable}
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
  //product: state.product
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  //updateInputField: product => dispatch(updateProduct(product)),
  submitAddProduct: product => dispatch(addProductThunk(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
