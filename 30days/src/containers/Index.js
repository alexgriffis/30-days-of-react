import React, { Component } from 'react'
import NavBar from '../components/NavBar'

class Index extends Component {
  render () {
    return (
      <div className='app'>
        <NavBar />
        <h2>Container Goes Here</h2>
        <div className='page'>{this.props.children}</div>
      </div>
    )
  }
}

export default Index
