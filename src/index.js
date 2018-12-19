import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css'
import Repos from './Repos'
import Patient from './patient.js'

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

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)


Topic.propTypes = {
    match : PropTypes.object,
}

ReactDOM.render(<div><BasicExample/></div>, document.getElementById('root'))
