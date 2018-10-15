import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>You are on the home page</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/patients">Patients</Link></li>
        </ul>
      </div>)
  }
}

// <Router>
// </Router>);

