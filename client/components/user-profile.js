import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Profile extends Component {
  render() {
    return <div>Email: {this.props.user.email}</div>
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)
