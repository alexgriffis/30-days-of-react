import React, { Component } from 'react'

const Formatter = ({ format, state }) => {
  let children = format.split('').map((e) => {
    if (e === 'h') {
      return <Hour />
    }
    else if (e === 'm') {
      return <Minute />
    }
    else if (e === 's') {
      return <Second />
    }
    else if (e === 'p') {
      return <Ampm />
    }
    else if (e === ' ') {
      return <span> </span>
    }
    else {
      return <Separator separator={e} />
    }
  })
  return (
    <span>
      {React.Children.map(children, (c) => React.cloneElement(c, state))}
    </span>
  )
}
const Hour = ({ hours }) => {
  hours = hours === 0
    ? 12
    : (hours > 12)
      ? hours - 12
      : hours
  return (<span>{hours}</span>)
}
const Separator = ({ separator }) => (<span>{separator || ':'}</span>)
const Ampm = ({ hours }) => (<span>{hours >= 12 ? 'pm' : 'am'}</span>)
const Second = ({ seconds }) => (<span>{seconds > 9 ? seconds : `0${seconds}`}</span>)
const Minute = ({ minutes }) => (<span>{minutes > 9 ? minutes : `0${minutes}`}</span>)

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = this.getTime()
  }
  componentDidMount() {
    this.setTimer()
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }
  getTime() {
    let now = new Date()
    let theTime = {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    }
    return theTime
  }
  setTimer() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(this.updateClock.bind(this), 1000)
  }
  updateClock() {
    this.setState(this.getTime, this.setTimer)
  }
  render() {
    return (
      <div className="clock">
        <Formatter {...this.state} format='h.m.s p' />
      </div>
    )
  }
}

export default Clock