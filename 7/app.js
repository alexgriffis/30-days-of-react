/* global React, ReactDOM */
const activities =
  [
    {
      timestamp: new Date().getTime(),
      text: 'Nom Nom Nom',
      user: {
        id: 1,
        name: 'Nate',
        avatar: 'http://www.croop.cl/UI/twitter/images/doug.jpg'
      },
      comments: [
        { from: 'Ari', text: 'Me too!' },
        { from: 'Ari', text: 'Me too!' }
      ]
    },
    {
      timestamp: 'Just now',
      text: 'Ate lunch yo!',
      user: {
        id: 1,
        name: 'Nate',
        avatar: 'http://www.croop.cl/UI/twitter/images/doug.jpg'
      },
      comments: [
        { from: 'Ari', text: 'Me too!' },
        { from: 'Ari', text: 'Me too!' },
        { from: 'Ari', text: 'Me too!' },
        { from: 'Ari', text: 'Me too!' }
      ]
    },
    {
      timestamp: 'A week ago',
      text: 'I Love FOOD',
      user: {
        id: 1,
        name: 'Nate',
        avatar: 'http://www.croop.cl/UI/twitter/images/doug.jpg'
      },
      comments: [
        { from: 'Ari', text: 'Me too!' }
      ]
    }
  ]

class Clock extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.getTime()
  }
  componentDidMount () {
    this.setTimer()
  }
  componentWillUnmount () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  getTime () {
    let now = new Date()
    let theTime = {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    }

    if (theTime.hours === 24 || theTime.hours < 12) theTime.ampm = 'am'
    else theTime.ampm = 'pm'

    return theTime
  }
  setTimer () {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(this.updateClock.bind(this), 1000)
  }
  updateClock () {
    this.setState(this.getTime, this.setTimer)
  }
  render () {
    const { hours, minutes, seconds, ampm } = this.state
    return (
      <div className='clock'>
        {
          hours === 0
            ? 12
            : (hours > 12)
              ? hours - 12
              : hours
        }:{
          minutes > 9 ? minutes : `0${minutes}`
        }:{
          seconds > 9 ? seconds : `0${seconds}`
        } {ampm}
      </div>
    )
  }
}
class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }
  onComponentRefresh () {
    this.setState({ refreshing: false })
  }
  refresh () {
    this.setState({ refreshing: true })
  }
  render () {
    const { refreshing } = this.state
    return (
      <div className='panel'>
        <Header title='Heady' />
        <Content
          onComponentRefresh={(e) => this.onComponentRefresh(e)}
          requestRefresh={refreshing}
          /* fetchData={fetchEvents} */ />
        <Footer>
          <button onClick={(e) => this.refresh(e)}>
            <i className='fa fa-refresh' />
            Refresh
            </button>
        </Footer>
      </div>
    )
  }
}
class Footer extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class Content extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      activities: []
    }
  }
  componentDidMount () {
    this.updateData()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({ loading: true }, this.updateData)
    }
  }
  updateData () {
    this.setState({
      loading: false,
      activities
    }, this.props.onComponentRefresh)
  }
  render () {
    const { loading, activities } = this.state
    return (
      <div className='content'>
        <div className='line' />
        {loading && <div>Loading</div>}
        {activities.map((activity) => {
          return (
            <ActivityItem activity={activity} />
          )
        })}
      </div>
    )
  }
}

class ActivityItem extends React.Component {
  render () {
    const { activity } = this.props
    return (
      <div className='item'>
        <div className='avatar'>
          <img src={activity.user.avatar} />
        </div>
        <div className='text'>
          <span className='time'>{activity.timestamp}</span>
          <p>{activity.text}</p>
        </div>
        <div className='commentCount'>
          {activity.comments.length}&nbsp;<i className='fa fa-lrg fa-comments' aria-hidden='true' />
        </div>
      </div>
    )
  }
}

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchVisible: false
    }
  }
  showSearch () {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }
  render () {
    let searchInputClasses = ['searchInput']

    if (this.state.searchVisible) {
      searchInputClasses.push('active')
    }

    return (
      <div className='header'>
        <div className='fa fa-bars fa-2x menuBar' />
        <Clock />
        <span className='title'>{this.props.title}</span>
        <input type='text' className={searchInputClasses.join(' ')} placeholder='Search ...' />
        <div className='fa fa-search fa-2x searchIcon' onClick={(e) => this.showSearch(e)} />
      </div>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <div className='notificationsFrame'>
        <Container />
      </div>
    )
  }
}
var mount = document.querySelector('#app')
ReactDOM.render(<App />, mount)
