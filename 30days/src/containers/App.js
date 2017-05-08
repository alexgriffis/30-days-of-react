import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import 'whatwg-fetch'
import TimePage from './TimePage'
import Index from './Index'
import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import Logout from '../views/Logout'
import '../App.css'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return (
    React.createElement(component, finalProps)
  )
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest)
    }} />
  )
}

class App extends Component {
  render () {
    return (
      <HashRouter>
        <div className='page'>
          <Index />
          <PropsRoute path='/home' component={Home} actions={this.props.actions} />
          <PropsRoute path='/about' component={About} actions={this.props.actions} />
          <PropsRoute path='/time' component={TimePage} actions={this.props.actions} />
          <PropsRoute path='/login' component={Login} actions={this.props.actions} />
          <PropsRoute path='/logout' component={Logout} actions={this.props.actions} />
        </div>
      </HashRouter>
    )
  }
}
export default App
