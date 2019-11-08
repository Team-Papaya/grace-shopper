import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container, Grid} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Menu>
      <Container>
        <h1>TEAM PAPA</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              {/* <a href="#" onClick={handleClick}>
              Logout
            </a> */}
              <Menu.Item onClick={handleClick}>Logout</Menu.Item>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Grid>
                <Menu.Item as={Link} to="/login">
                  Login
                </Menu.Item>
                <Menu.Item as={Link} to="/signup">
                  Sign Up
                </Menu.Item>
              </Grid>
            </div>
          )}
        </nav>
        <Menu.Item as={Link} to="/cart">
          Cart
        </Menu.Item>
        <hr />
      </Container>
    </Menu>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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
