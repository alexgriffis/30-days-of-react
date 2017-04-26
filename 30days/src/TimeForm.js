import React, { Component } from 'react'

const timezones = ['PST', 'MST', 'MDT', 'EST', 'UTC']

export default class TimeForm extends Component {
  constructor(props) {
    super(props)
    const { tz, msg } = props
    this.state = { tz, msg }
  }

  _handleChange(e) {
    typeof this.props.onFormChange === 'function' &&
      this.props.onFormChange(this.state)
  }

  _changeTimezone(e) {
    const tz = e.target.value
    this.setState({ tz }, this._handleChange)
  }

  _changeMsg(e) {
    const msg = encodeURIComponent(e.target.value).replace(/%20/, '+')
    this.setState({ msg }, this._handleChange)
  }

  _handleFormSubmit(e) {
    e.preventDefault()
    typeof this.props.onSubmit === 'function' &&
      this.props.onSubmit(this.state)
  }

  render() {
    const { tz } = this.state

    return (
      <form onSubmit={this._handleFormSubmit.bind(this)}>
        <select onChange={this._changeTimezone.bind(this)}
          defaultValue={tz}>
          {timezones.map((t) => {
            return <option value={t} key={t}>{t}</option>
          })}
        </select>
        <input type='text'
          placeholder='A chronic string message (such as 7 hours from now)'
          onChange={this._changeMsg.bind(this)} />
        <input type='submit' value='Update request' />
      </form>
    )
  }
}