/* global jest, describe, it, expect */
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'

jest.unmock('../Navbar')
import Navbar from '../Navbar'

class TestWrapper extends React.Component {
  render () {
    return (<MemoryRouter initialEntries={['/home']}>{this.props.children}</MemoryRouter>)
  }
}

describe('Navbar', () => {
  const currentUser = { loggedIn: false }
  it('wraps content in a div with .navbar class', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <TestWrapper><Navbar currentUser={currentUser} /></TestWrapper>
    )
    const node = TestUtils.findRenderedDOMComponentWithClass(wrapper, 'navbar')
    expect(node).toBeDefined()
  })
})
