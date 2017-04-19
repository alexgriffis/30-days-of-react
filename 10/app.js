/* global React, ReactDOM */
const posts =
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
JSON.stringify(posts)

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
class Panel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      activities: posts
    }
  }
  onComponentRefresh () {
    this.setState({ refreshing: false })
  }
  refresh () {
    this.setState({ refreshing: true })
  }
  handleSearch (val) {
    this.setState({
      searchFilter: val,
      refreshing: true
    })
  }
  updateData () {
    let jason = {}
    const { activities, searchFilter } = this.state

    const filter = searchFilter !== '' &&
      (e => e.user.name.match(new RegExp(searchFilter)))
    jason = activities.filter(filter)

    if (activities.length === 0) {
      this.setState({ activities: jason })
    }
    return jason
  }
  render () {
    const { refreshing } = this.state
    return (
      <div className='panel'>
        <Header
          onSearch={(val) => this.handleSearch(val)}
          title='Heady' />
        <Content
          onComponentRefresh={(e) => this.onComponentRefresh(e)}
          requestRefresh={refreshing}
          fetchData={() => this.updateData()} />
        <Footer>
          <button className='refresher' onClick={(e) => this.refresh(e)}>
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
      <div className='footer'>
        {this.props.children}
      </div>
    )
  }
}

class Content extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: []
    }
  }
  componentDidMount () {
    this.updateData()
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.requestRefresh !== this.props.requestRefresh) && nextProps.requestRefresh) {
      this.updateData()
    }
  }
  updateData () {
    this.setState({
      activities: this.props.fetchData()
    }, this.props.onComponentRefresh())
  }
  render () {
    const { loading } = this.props
    const { activities } = this.state
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
Content.propTypes = {
  requestRefresh: React.PropTypes.bool.isRequired,
  onComponentRefresh: React.PropTypes.func.isRequired
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
ActivityItem.propTypes = {
  activity: React.PropTypes.object.isRequired
}

class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }
  handleInput (e) {
    this.setState({
      searchText: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.searchText)
  }
  render () {
    let searchInputClasses = ['searchInput']

    if (this.props.searchVisible) {
      searchInputClasses.push('active')
    }
    return (
      <form className='searchForm' onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type='text'
          value={this.state.searchText}
          className={searchInputClasses.join(' ')}
          onChange={(e) => this.handleInput(e)}
          placeholder='Search ...' />
      </form>
    )
  }
}
SearchForm.propTypes = {
  searchVisible: React.PropTypes.bool,
  onSubmit: React.PropTypes.func.isRequired
}
SearchForm.defaultProps = {
  searchVisible: false,
  onSubmit: () => { }
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
  handleSubmit (val) {
    this.props.onSearch(val)
  }
  render () {
    return (
      <div className='header'>
        <div className='fa fa-bars fa-2x menuBar' />
        <Clock />
        <span className='title'>{this.props.title}</span>
        <SearchForm searchVisible={this.state.searchVisible} onSubmit={(val) => this.handleSubmit(val)} />
        <div className='fa fa-search fa-2x searchIcon' onClick={(e) => this.showSearch(e)} />
      </div>
    )
  }
}
Header.defaultProps = {
  title: 'Github activity',
  onSearch: () => { }
}
Header.propTypes = {
  title: React.PropTypes.string,
  onSearch: React.PropTypes.func
}

class App extends React.Component {
  render () {
    return (
      <div className='notificationsFrame'>
        <Panel />
      </div>
    )
  }
}
var mount = document.querySelector('#app')
ReactDOM.render(<App />, mount)
