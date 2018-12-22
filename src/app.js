import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {HomePage as MyHouse} from './homepage'
import {PatientTable} from './patient'
import {Navigation} from './navigation'
import {FuzzyBear} from './fuzzybear'
import {Auth} from './auth/auth'
import {Callback} from './callback'
import {Logout} from './logout'
import AuthenticatedRoute from './authenticatedroute'

import './index.css'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        console.log("App history " + this.props.history);
        this.auth = new Auth(props.history);
    }

    render() {
      return (
        <div>
            <Navigation auth={this.auth}/>
            <Switch>
                <Route exact path="/" render={props => <MyHouse auth={this.auth} {...props}/> } />
                <Route path="/callback" render={props => <Callback auth={this.auth} {...props}/> } />
                <AuthenticatedRoute path="/patients"  auth={this.auth} component={PatientTable} />
                <AuthenticatedRoute path="/fuzzybear" auth={this.auth} component={props => <FuzzyBear auth={this.auth} {...props} /> } />
                <Route path="/logout"     component={Logout} />
            </Switch>
        </div>
      );
    }
}
