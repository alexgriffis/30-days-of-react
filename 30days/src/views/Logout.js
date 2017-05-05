import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Logout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.currentUser.user
    }
  }

  handleFormSubmit (e, cb) {
    this.props.actions.currentUser.logout()
  }

  render () {
    const { history } = this.props
    return (
      <div className='content' >
        <button type='submit' onClick={(e) => { this.handleFormSubmit(e, history.push('/home')) }}>Are You Sure?</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(
  mapStateToProps
)(Logout))

