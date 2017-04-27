import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink
        className='link'
        to='/home'
        activeClassName='active'>
        Home
      </NavLink>
      <NavLink
        className='link'
        to='/about'
        activeClassName='active'>
        About
      </NavLink>
    </div>
  )
}

export default NavBar
