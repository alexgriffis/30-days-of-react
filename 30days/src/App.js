import React, { Component } from 'react';
import './App.css';

const a = [1, 10, 100, 1000]

const App = (props) => {
  return (
    <ul>
      {React.Children.map(a, i => <li>{i}</li>)}
    </ul>
  )
}

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
      {React.Children.map(children, c => React.cloneElement(c, state))}
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
export default App;
