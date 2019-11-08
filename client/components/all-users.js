import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Header, Image, List} from 'semantic-ui-react'
import {getUsersThunk} from '../store/users'

export class AllUsers extends React.Component {
  async componentDidMount() {
    await this.props.getUsersThunk()
  }
  render() {
    const {users} = this.props
    return (
      <div>
        <Header size="huge" color="orange">
          All Users
        </Header>
        <div>
          {users.map(user => {
            return (
              <li key={user.id}>
                <NavLink to={`users/${user.id}`}>
                  <List>
                    <List.Item>Email: {user.email}</List.Item>
                    <List.Item>Username: {user.username}</List.Item>
                    <List.Item>First Name: {user.firstname}</List.Item>
                    <List.Item>Last Name : {user.lastname}</List.Item>
                    <List.Item>Role: {user.role}</List.Item>
                  </List>
                </NavLink>
                <Image src={user.imageUrl} />
              </li>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getUsersThunk: () => dispatch(getUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
