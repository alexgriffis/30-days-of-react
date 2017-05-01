import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'

class Index extends Component {
  render () {
    const { currentUser } = this.props
    return (
      <div className='app'>
        <NavBar currentUser={currentUser} />
      </div>
    )
  }
}

export default connect(state => ({
  currentUser: state.currentUser
}))(Index)
