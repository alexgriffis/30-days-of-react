import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
  return (
    <div className='content'>
      <h1>Hiiii Guysss</h1>
      <p>The time is {props.currentTime.toString()}</p>
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
