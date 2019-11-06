import React from 'react'

import {getCategoriesThunk} from '../store/categories'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

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
    if (event.target.type === 'checkbox') {
      const newCategories = this.state.categories.map(
        cat =>
          cat.id == event.target.id
            ? {...cat, selected: event.target.checked}
            : cat
      )

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
  fetchCats: () => dispatch(getCategoriesThunk())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
