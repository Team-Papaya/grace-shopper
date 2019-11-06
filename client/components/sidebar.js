import React from 'react'
import Axios from 'axios'

const tempProps = {
  categories: [
    {id: 1, name: 'cat1'},

    {id: 2, name: 'cat2'},

    {id: 3, name: 'cat3'},

    {id: 4, name: 'cat4'}
  ],
  handleSubmit: event => {
    event.persist()
    event.preventDefault()
    const checkedCats = Array.from(event.target.childNodes)
      .filter(node => node.type === 'checkbox' && node.checked)
      .map(checked => checked.id)
    console.log(checkedCats)
    console.log(Array.from(event.target.childNodes))
    const queryString = `?name=${
      event.target.searchstring.value
    }&cat[]=${checkedCats.join('&cat[]=')}`
    console.log(queryString)
    Axios.get('http://localhost:8080/api/products' + queryString)
  }
}

const sidebar = () => {
  const props = tempProps
  return (
    <form onSubmit={props.handleSubmit}>
      <input name="searchstring" type="text" />
      {props.categories.map(cat => (
        <input type="checkbox" key={cat.id} id={cat.id} name={cat.name} />
      ))}
      <button type="submit" name="submit" value="submit" />
    </form>
  )
}

export default sidebar
