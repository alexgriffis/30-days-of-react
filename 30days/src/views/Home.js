import React from 'react'
import { connect } from 'react-redux'

const Home = ({ actions, currentTime }) => {
  return (
    <div className='content'>
      <h1>Hiiii Guysss</h1>
      <p>The time is {currentTime.currentTime.toString()}</p>
      <button onClick={actions.currentTime.updateTime}>Update</button>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    currentTime: state.currentTime
  }
}

export default connect(
  mapStateToProps
)(Home)
