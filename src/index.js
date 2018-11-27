import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './index.css'
import Patient from './patient.js'
import Repos from './Repos'

const BasicExample = () => (
  <Router>
    <div>
      <div>
        <Route exact path="/" component={Repos} />
        <Route path="/patients" component={Patient} />
      </div>
    </div>
  </Router>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

Topics.propTypes = {
    match : PropTypes.object,
}

Topic.propTypes = {
    match : PropTypes.object,
}

ReactDOM.render(<div><BasicExample/></div>, document.getElementById('root'))
