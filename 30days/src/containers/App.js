import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import 'whatwg-fetch'
import TimePage from './TimePage'
import Index from './Index'
import Home from '../views/Home'
import About from '../views/About'
import './App.css'

class App extends Component {
  render () {
    const createElement = (Component, props) => {
      return <Component
        actions={this.props.actions}
        {...props} />
    }
    return (
      <HashRouter
        createElement={createElement}>
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
