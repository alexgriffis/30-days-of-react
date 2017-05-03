import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { connect } from 'react-redux'

class Index extends Component {
  render () {
    const { currentUser } = this.props
    return (
      <div className='app'>
        <Navbar currentUser={currentUser} />
      </div>
    )
  }
}

export default connect(state => ({
  currentUser: state.currentUser
}))(Index)
