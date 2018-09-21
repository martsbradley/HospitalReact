import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './index.css';
import PatientTable from './patienttable.js';
import About from './About'
import Repos from './Repos'

const BasicExample = () => (
  <Router>
    <div>
        <div id="navbar">
          <ul>
            <li>
              <Link to="/">Repos</Link>
            </li>
            <li>
              <Link to="/patients">Patients</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </div>

        <div id="main">
          <Route exact path="/" component={Repos} />
          <Route path="/patients" component={PatientTable} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
    </div>
  </Router>
);

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
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

ReactDOM.render( <div className="container"><BasicExample/></div> , document.getElementById('root'));
