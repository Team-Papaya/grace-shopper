import React from 'react'
import {connect} from 'react-redux'
import {ProductCard} from './'
import {withRouter} from 'react-router-dom'
import {getProductsThunk} from '../store/products'
import {Container, Segment, Grid, Button} from 'semantic-ui-react'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.page = this.page.bind(this)
  }
  componentDidMount() {
    this.props.getProducts(this.props.location.search)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.props.getProducts(this.props.location.search)
    }
  }
  page(int) {
    let nextQueryStr = this.props.location.search.split('&page=')
    if (nextQueryStr.length === 1) {
      nextQueryStr = nextQueryStr[0] + `&page=${1 + int}`
    } else {
      const temp = nextQueryStr[1].split('&')
      temp[0] = String(Number(temp[0]) + int)
      nextQueryStr[1] = temp.join('&')
      nextQueryStr = nextQueryStr.join('&page=')
    }
    if (nextQueryStr[0] !== '?') nextQueryStr = '?' + nextQueryStr

    this.props.history.push(nextQueryStr)
  }

  render() {
    const {products} = this.props

    return (
      <React.Fragment>
        <Container>
          <Segment>
            <Grid columns="one">
              <Grid.Column>
                <div>
                  {products.map(product => {
                    return <ProductCard key={product.id} product={product} />
                  })}
                </div>
                <Button
                  type="button"
                  onClick={() => this.page(-1)}
                  color="green"
                >
                  prev page
                </Button>
                <Button
                  type="button"
                  onClick={() => this.page(1)}
                  color="green"
                >
                  next page
                </Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: queryString => dispatch(getProductsThunk(queryString))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
