import React from 'react'
import {connect} from 'react-redux'
import {Header, Image, List, Button} from 'semantic-ui-react'
import {removeUserThunk} from '../store/users'
import {getSingleUserThunk} from '../store/singleUser'

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getSingleUserThunk(this.props.match.params.id)
  }
  handleRemove = (event, id) => {
    event.preventDefault()
    this.props.removeUserThunk(id).then(() => this.props.history.push('/users'))
    //this.props.history.push('/users')
  }
  render() {
    const {user} = this.props
    console.log(user)
    return (
      <div>
        <Header>User</Header>
        <List>
          <Image size="large" src={user.profilePicture} />
          <List.Item>Email: {user.email}</List.Item>
          <List.Item>Username: {user.username}</List.Item>
          <List.Item>First Name: {user.firstname}</List.Item>
          <List.Item>Last Name: {user.lastname}</List.Item>
          <List.Item>Role: {user.role}</List.Item>
        </List>
        <Button
          color="red"
          onClick={event => this.handleRemove(event, user.id)}
        >
          REMOVE USER FROM EXISTENCE
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.singleUser
})

const mapDispatchToProps = dispatch => ({
  getSingleUserThunk: id => dispatch(getSingleUserThunk(id)),
  removeUserThunk: id => dispatch(removeUserThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
