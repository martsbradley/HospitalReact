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
//import PropTypes from 'prop-types';
import './index.css'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.auth = new Auth(props.history);
        console.log("App.this.auth " + this.auth);
    }

    myPatientTable = () => {
        return <PatientTable auth={this.auth} />;
    }

    myFuzzyBear = () => {
        return <FuzzyBear auth={this.auth} />;
    }

    render() {
      return (
        <div>
            <Navigation auth={this.auth}/>
            
            <Switch>
                <Route exact path="/" render={props => <MyHouse auth={this.auth} {...props}/> }    />
                <Route path="/callback" render={props => <Callback auth={this.auth} {...props}/> } />
                <AuthenticatedRoute path="/patients"  auth={this.auth} component={this.myPatientTable}  />
                <AuthenticatedRoute path="/profile" auth={this.auth} component={this.myFuzzyBear}     />
                <Route path="/logout"     component={Logout} />
            </Switch>
            <button onClick={this.auth.checkGroups}>CheckIt Right</button>
        </div>
      );
    }
}
