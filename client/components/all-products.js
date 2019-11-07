import React from 'react'
import {connect} from 'react-redux'
import {ProductCard} from './'
import {withRouter} from 'react-router-dom'
import {getProductsThunk} from '../store/products'
import {Container, Segment, Grid, Button, Icon} from 'semantic-ui-react'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.page = this.page.bind(this)
  }
  componentDidMount() {
    this.props.getProductsThunk(this.props.location.search)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.props.getProductsThunk(this.props.location.search)
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
            <Grid columns="one" centered>
              <Grid.Column>
                <div>
                  {products.map(product => {
                    return <ProductCard key={product.id} product={product} />
                  })}
                </div>
              </Grid.Column>
              <Grid.Row centered>
                <Button animated color="green" onClick={() => this.page(-1)}>
                  <Button.Content hidden>
                    <Icon name="arrow left" />
                  </Button.Content>
                  <Button.Content visible>prev page</Button.Content>
                </Button>
                <Button animated color="green" onClick={() => this.page(1)}>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                  <Button.Content visible>next page</Button.Content>
                </Button>
              </Grid.Row>
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

const mapDispatch = { getProductsThunk, coolAwesomeThunk }

//const mapDispatch = dispatch => {
//  return {
//    handleSubmit: (event) => { event.preventDefault() },
//    coolAwesomeThunk: (a, b) => dispatch(coolAwesomeThunk(a, b)),
//    getProductsThunk: queryString => dispatch(getProductsThunk(queryString))
//  }
//}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
