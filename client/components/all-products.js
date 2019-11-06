import React from 'react'
import {connect} from 'react-redux'
import {ProductCard} from './'
// import {getProductsThunk} from '../store'

const dummyProducts = [
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

class AllProducts extends React.Component {
  componentDidMount() {
    // this.props.getProducts(search, category)
  }

  render() {
    const {products} = this.props

    return (
      <div>
        {products.map(product => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: dummyProducts
    // products: state.products,
  }
}

const mapDispatch = dispatch => {
  return {
    // getProducts: (search, category) => dispatch(getProductsThunk(search, category)),
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
