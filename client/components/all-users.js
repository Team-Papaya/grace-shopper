import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
  Header,
  Image,
  List,
  Button,
  Container,
  Segment,
  Grid
} from 'semantic-ui-react'
import {getUsersThunk, removeUserThunk} from '../store/users'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsersThunk()
  }
  handleRemove = (event, id) => {
    event.preventDefault()
    this.props.removeUserThunk(id)
    //this.props.history.push('/users')
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <Container>
          <Segment>
            <Grid>
              <Grid.Column>
                <Header as="h">All Users</Header>
                <div>
                  {users.map(user => {
                    return (
                      <li key={user.id}>
                        <NavLink to={`users/${user.id}`}>
                          <List>
                            <Image size="small" src={user.profilePicture} />
                            <List.Item>Email: {user.email}</List.Item>
                            <List.Item>Username: {user.username}</List.Item>
                            <List.Item>First Name: {user.firstname}</List.Item>
                            <List.Item>Last Name: {user.lastname}</List.Item>
                            <List.Item>Role: {user.role}</List.Item>
                          </List>
                        </NavLink>
                        <Button
                          color="red"
                          onClick={event => this.handleRemove(event, user.id)}
                        >
                          REMOVE USER
                        </Button>
                      </li>
                    )
                  })}
                </div>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getUsersThunk: () => dispatch(getUsersThunk()),
  removeUserThunk: id => dispatch(removeUserThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
