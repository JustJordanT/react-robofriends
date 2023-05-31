import React, { useState, useEffect } from 'react'
import Cardlist from '../components/Cardlist'
// import { robots } from './robots'
import SearchBox from '../components/SearchBox'
import './app.css'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrBoundry'

function App() {
  const [robots, setRobots] = useState([])
  const [searchfield, setSeachfield] = useState('')
  const [count, setCount] = useState(0)


  useEffect(() => {
     fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => setRobots(users))
      console.log(count)
  },[count])

  const onSearchChange = (event) => {
    setSeachfield(event.target.value)
  }

    const filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return (!robots.length === 0) ?
      <h1>Loading...</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <button onClick={() => setCount(count+1)}>Click Me!</button>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )
  }

export default App