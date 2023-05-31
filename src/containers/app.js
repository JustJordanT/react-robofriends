import React, { Component } from 'react'
import Cardlist from '../components/Cardlist'
// import { robots } from './robots'
import SearchBox from '../components/SearchBox'
import './app.css'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrBoundry'

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }))
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    console.log(this.state.searchfield)
  }

  render() {
    const { robots, searchfield } = this.state
    const filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return (!robots.length === 0) ?
      <h1>Loading...</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )
  }
}

export default App