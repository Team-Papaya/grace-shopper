import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container, Grid, Dropdown} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, userName, role}) => (
  <div>
    <Menu>
      <Container id="nav-container">
        <NavLink to="/home">
          <h1>PAPA'S ATTIC</h1>
        </NavLink>
        <nav>
          <Grid id="nav-grid" centered columns={4}>
            <Menu.Item>
              Welcome
              {isLoggedIn ? ` back, ${userName || 'friend'}!` : ', friend!'}
            </Menu.Item>
            <Menu.Item>
              {role === 'Admin' ? (
                <React.Fragment>
                  <Dropdown text="Admin">
                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/products/add">
                        Add New Product
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/users">
                        All Users
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/orders">
                        Orders
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </React.Fragment>
              ) : (
                <div />
              )}
            </Menu.Item>
            {isLoggedIn ? (
              <React.Fragment>
                <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
                <Menu.Item as={NavLink} to="/profile">
                  Profile
                </Menu.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Menu.Item as={NavLink} to="/login">
                  Log In
                </Menu.Item>
                <Menu.Item as={NavLink} to="/signup">
                  Sign Up
                </Menu.Item>
              </React.Fragment>
            )}
            <Menu.Item as={NavLink} to="/cart">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDztMQBIQIDyL7smsHwS8fRUOz21EnhBLDvMW6qSMd84-lWoqB&s"
                style={{
                  width: 28,
                  height: 28
                }}
              />
            </Menu.Item>
          </Grid>
        </nav>
      </Container>
    </Menu>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userName: state.user.firstname,
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  role: PropTypes.string
}
