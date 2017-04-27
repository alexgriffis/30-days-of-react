/* global fetch */
import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import 'whatwg-fetch'
import TimeForm from './components/TimeForm'
import Index from './containers/Index'
import Home from './views/Home'
import About from './views/About'
import './App.css'

class TimePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: null,
      msg: 'now',
      tz: 'PST'
    }
  }

  fetchCurrentTime () {
    fetch(this.getApiURL())
      .then(resp => resp.json())
      .then(resp => {
        const currentTime = resp.dateString
        this.setState({ currentTime })
      })
  }

  getApiURL () {
    const { tz, msg } = this.state
    const host = 'https://fullstacktime.herokuapp.com'
    return `${host}/${tz}/${msg}.json`
  }

  handleFormSubmit (e) {
    this.fetchCurrentTime()
  }

  handleChange (newState) {
    this.setState(newState)
  }
  render () {
    const { currentTime, tz, msg } = this.state
    const apiUrl = this.getApiURL()
    return (
      <div>
        {!currentTime &&
          <button onClick={this.fetchCurrentTime.bind(this)}>
            Get Current Time
          </button>
        }
        {currentTime && <div> The current time is: {currentTime}</div>}
        <TimeForm
          onFormChange={this.handleChange.bind(this)}
          onSubmit={this.handleFormSubmit.bind(this)}
          tz={tz}
          msg={msg}
        />
        <p>We'll be making a request from <code>{apiUrl}</code></p>
      </div>
    )
  }
}
class App extends Component {
  render () {
    return (
      <HashRouter>
        <div>
          <Index>
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/time' component={TimePage} />
          </Index>
        </div>
      </HashRouter>
    )
  }
}
export default App
