import React from 'react'
import {connect} from 'react-redux'
import {ProductCard} from './'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'

/*const dummyProducts = [
  {
    id: 1,
    name: 'Super Machine Gun Guy',
    imageUrls: [
      'https://m.media-amazon.com/images/I/61SgsrlUAYL._AC_UL320_ML3_.jpg'
    ],
    reviews: 65443,
    rating: 4.5,
    price: 1299
  },
  {
    id: 2,
    name: 'Some Pans',
    imageUrls: [
      'https://m.media-amazon.com/images/I/81inilS32ZL._AC_UL320_ML3_.jpg'
    ],
    reviews: 5323,
    rating: 3.72,
    price: 36549
  },
  {
    id: 3,
    name: 'The Necronomicon',
    imageUrls: [
      'https://m.media-amazon.com/images/I/817T4J3dzhL._AC_UY218_ML3_.jpg'
    ],
    reviews: 612,
    rating: 4.5,
    price: 1299
  },
  {
    id: 4,
    name: 'Fun Kids Party Game',
    imageUrls: [
      'https://m.media-amazon.com/images/I/91Adw6xSMVL._AC_UL320_ML3_.jpg'
    ],
    reviews: 42312,
    rating: 2.2,
    price: 2398
  },
  {
    id: 5,
    name: 'Robin Williams',
    imageUrls: [
      'https://m.media-amazon.com/images/I/711NpEy90aL._AC_UY218_ML3_.jpg'
    ],
    reviews: 54211,
    rating: 4.9,
    price: 10495
  },
  {
    id: 6,
    name: 'Cool Tech Themed Coasters',
    imageUrls: [
      'https://m.media-amazon.com/images/I/819+GRVvlIL._AC_UY218_ML3_.jpg'
    ],
    reviews: 13570,
    rating: 4.23,
    price: 1599
  }
]
*/
class AllProducts extends React.Component {
  constructor() {
    super()
    this.page = this.page.bind(this)
  }
  componentDidMount() {
    console.log(this.props)
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
  prevPage() {}

  render() {
    const {products} = this.props

    return (
      <React.Fragment>
        <div>
          {products.map(product => {
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
        <button type="button" onClick={() => this.page(-1)}>
          prev page
        </button>
        <button type="button" onClick={() => this.page(1)}>
          next page
        </button>
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
    getProducts: queryString => dispatch(fetchProducts(queryString))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
