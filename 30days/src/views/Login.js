import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.currentUser.user
    }
  }

  handleFormSubmit (e, cb) {
    this.props.actions.currentUser.login(this.state.user)
  }
  handleEmailChange (e) {
    this.setState({ user: { email: e.target.value } })
  }
  render () {
    const { history } = this.props
    return (
      <div className='content' >
        <input type='email' placeholder='a@g.com' value={this.state.user.email} onChange={(e) => this.handleEmailChange(e)} />
        <input type='submit' onClick={(e) => { this.handleFormSubmit(e, history.push('/home')) }} />
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
)(Login))

