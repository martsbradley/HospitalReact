import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {HomePage as MyHouse} from './homepage'
import {PatientTable} from './patient/patient'
import {Navigation} from './navigation'
import {UserDetails} from './auth/userdetails'
import {Logout} from './login/logout'
import {LoginFailure} from './login/loginfailure.js'
import {LoginScreen} from './login/loginscreen.js'
import AuthenticatedRoute from './authenticatedroute'
import {LoginSessionExpired} from './loginsessionexpired.js'
//import PropTypes from 'prop-types';
import './index.css'
import ErrorBoundary from './errorboundary.js'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.userDetails = new UserDetails(props.history);
    }

    myPatientTable = () => {
        return <ErrorBoundary><PatientTable auth={this.userDetails} {...this.props} /></ErrorBoundary>;
    }

    loginFailure = () => {
        return <ErrorBoundary><LoginFailure auth={this.userDetails} {...this.props} /></ErrorBoundary>;
    }

    logoutSuccess = () => {
        console.log("Now show logout success page");
        return <ErrorBoundary><Logout auth={this.userDetails} {...this.props} /></ErrorBoundary>; 
    }

    successfulLogin = () => {
        //this.userDetails.startLogoutTimer();
        console.log("Starting yes   login timer and moving user to front page.");
        this.props.history.push('/');
        return null;
    }

    saveDataToLocalStorage = (e) => {
        alert("hi there" + e);
        e.preventDefault();
    }

    render() {
        //console.log("Marty" + MARTY_KEY);

      return (
        <div>
            <div className="container">
                <Switch>

                    <Route exact path="/" 
                                render={props => <MyHouse {...props}
                                auth={this.userDetails}           /> }    />
                    <AuthenticatedRoute path="/patients"  
                                        auth={this.userDetails} 
                                        component={this.myPatientTable}  />

                    <Route path="/logoutsuccess"       component={this.logoutSuccess}/>

                    <Route path="/loginfailure"        component={this.loginFailure}/>
                    <Route path="/loginsessionexpired" component={LoginSessionExpired}/>
                    <Route path="/login"               component={
                                           () => <LoginScreen auth={this.userDetails} />}/>
                    <Route path="/logout"              component={this.logoutSuccess} />}/>

                </Switch>
            </div>
        </div>
      );
    }
}
