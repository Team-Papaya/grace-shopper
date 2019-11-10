import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Segment, Grid} from 'semantic-ui-react'

export class UserProfile extends Component {
  render() {
    const {user} = this.props
    return (
      <Container>
        <Segment>
          <Grid columns={2}>
            <Grid.Column>
              <img
                src={user.profilePicture}
                style={{width: 300, height: 300, marginTop: 30}}
              />
            </Grid.Column>
            <Grid.Column>
              <Grid rows={3}>
                <Grid.Row>{user.email}</Grid.Row>
                <Grid.Row>{user.firstName}</Grid.Row>
                <Grid.Row>{user.lastName}</Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfile)
