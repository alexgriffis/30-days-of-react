import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ currentUser }) => {
  return (
    <div className='navbar'>
      <NavLink
        className='link'
        to='/home'
        activeClassName='active'>
        Home
      </NavLink>
      <NavLink
        to='/about'
        className='link'
        activeClassName='active'>
        About
      </NavLink>
      {currentUser.loggedIn
        ? <NavLink
          to='/logout'
          className='link'
          activeClassName='active'>
          Logout
          </NavLink>
        : <NavLink
          to='/login'
          className='link'
          activeClassName='active'>Login
          </NavLink>
      }
    </div>
  )
}

export default NavBar
