import React from 'react'

import {fetchProducts} from '../store/products'
import {fetchCategories} from '../store/categories'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
//import {history} from 'history'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      searchstring: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchCats()
    /*this.setState({
      
    })*/
    console.log(this.props)
  }
  componentDidUpdate() {
    if (this.props.categories.length !== this.state.categories.length) {
      this.setState({
        categories: this.props.categories.map(cat => ({
          id: cat.id,
          selected: false
        }))
      })
    }
  }
  handleChange(event) {
    event.persist()
    //console.log(event)
    if (event.target.type === 'checkbox') {
      //console.log('updating a checkbox')
      const newCategories = this.state.categories.map(
        cat =>
          cat.id == event.target.id
            ? {...cat, selected: event.target.checked}
            : cat
      )
      //console.log(newCategories)
      this.setState({categories: newCategories})
    } else {
      this.setState({[event.target.name]: event.target.value})
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    const queryStr =
      '?name=' +
      this.state.searchstring +
      '&cat[]=' +
      this.state.categories
        .filter(cat => cat.selected)
        .map(cat => cat.id)
        .join('&cat[]=')
    this.props.history.push('/products/' + queryStr)
    //console.log(queryStr)

    // this.props
    //.submitSearch(queryStr)
    //.then(history.pushState(null, '', '/products/' + queryStr))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <input
          name="searchstring"
          type="text"
          value={this.state.searchstring}
        />
        {this.props.categories.map(cat => (
          <React.Fragment key={cat.id}>
            <label htmlFor={`category${cat.id}`}>{cat.name}</label>
            <input name={`category${cat.id}`} type="checkbox" id={cat.id} />
          </React.Fragment>
        ))}
        <button type="submit" name="submit" value="submit" />
      </form>
    )
  }
}

const mapStateToProps = state => ({categories: state.categories})
const mapDispatchToProps = dispatch => ({
  //submitSearch: queryStr => dispatch(fetchProducts(queryStr)),
  fetchCats: () => dispatch(fetchCategories())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
