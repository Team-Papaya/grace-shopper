import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container, Grid} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, userName}) => (
  <div>
    <Menu>
      <Container id="nav-container">
        <NavLink to="/home">
          <h1>PAPA'S ATTIC</h1>
        </NavLink>
        <nav>
          <Grid id="nav-grid" centered columns={isLoggedIn ? 3 : 4}>
            <Menu.Item>
              Welcome{isLoggedIn
                ? ` back, ${userName || 'friend'}!`
                : ', friend!'}
            </Menu.Item>
            {isLoggedIn ? (
              <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
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
              Cart
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
    isLoggedIn: !!state.user.id
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
  isLoggedIn: PropTypes.bool.isRequired
}
