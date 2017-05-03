/* global jest, describe, it, expect, beforeEach */
import React from 'react'
import { shallow } from 'enzyme'

jest.unmock('../Navbar')
import Navbar from '../Navbar'

describe('Navbar', () => {
  let currentUser = { loggedIn: false }
  let wrapper = shallow(<Navbar currentUser={currentUser} />)

  it('wraps content in a div with .navbar class', () => {
    expect(wrapper.find('.navbar').length).toEqual(1)
  })

  describe('links', () => {
    let Links
    beforeEach(() => {
      wrapper = shallow(<Navbar currentUser={currentUser} />)
      Links = wrapper.find('.link')
    })

    it('renders a home link', () => {
      const link = Links.first()
      expect(link).toBeDefined()
      expect(link.childAt(0).text()).toBe('Home')
      expect(link.props().to).toBe('/home')
    })

    it('renders an about link', () => {
      const link = Links.findWhere(n => n.props().to === '/about')
      expect(link).toBeDefined()
      expect(link.childAt(0).text()).toBe('About')
    })
  })

  describe('with a current user', () => {
    describe('that is not logged in', () => {
      beforeEach(() => {
        currentUser = { loggedIn: false }
        wrapper = shallow(<Navbar currentUser={currentUser} />)
      })
      it('renders a login link', () => {
        const link = wrapper.find({ to: '/login' })
        expect(link.length).toEqual(1)
        expect(link.childAt(0).text()).toBe('Login')
      })
    })
    describe('that is logged in', () => {
      beforeEach(() => {
        currentUser = { loggedIn: true }
        wrapper = shallow(<Navbar currentUser={currentUser} />)
      })
      it('renders a logout link', () => {
        const link = wrapper.find({ to: '/logout' })
        expect(link.length).toEqual(1)
        expect(link.childAt(0).text()).toBe('Logout')
      })
    })
  })
})
