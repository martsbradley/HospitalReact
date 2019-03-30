import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {HomePage as MyHouse} from './homepage'
import {PatientTable} from './patient'
import {Navigation} from './navigation'
import {Auth} from './auth/auth'
import {UserDetails} from './auth/userdetails'
import {Logout} from './logout'
import {LoginFailure} from './loginfailure.js'
import AuthenticatedRoute from './authenticatedroute'
import {LoginSessionExpired} from './loginsessionexpired.js'
//import PropTypes from 'prop-types';
import './index.css'
import ErrorBoundary from './errorboundary.js'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.auth = new Auth(props.history);
        this.userDetails = new UserDetails(props.history);
        console.log("App.this.auth " + this.auth);
    }

    myPatientTable = () => {
        return <ErrorBoundary><PatientTable auth={this.userDetails} {...this.props} /></ErrorBoundary>;
    }


    successfulLogin = () => {
        this.userDetails.startLogoutTimer();
        this.props.history.push('/');
        console.log("Starting login timer and moving user to front page.");
        return null;
    }

    render() {
      return (
        <div>
            <Navigation auth={this.userDetails}/>
            
            <div className="container">
                <Switch>
                    <Route exact path="/" render={props => <MyHouse auth={this.auth} {...props}/> }    />
                    <AuthenticatedRoute path="/patients"  auth={this.userDetails} component={this.myPatientTable}  />

                    <Route path="/logoutsuccess"      component={Logout} />
                    <Route path="/loginsuccess"       component={this.successfulLogin} />
                    <Route path="/loginfailure"       component={LoginFailure} />
                    <Route path="/loginsessionexpired" component={LoginSessionExpired} />

                    <Route path="/login"         component={() => { window.location = AUTH0_LOGIN_URL_ENV;    return null;} }/>
                    <Route path="/logout"        component={() => { window.location = AUTH0_LOGOUT_URL_ENV;    return null;} }/>
                    <Route path="/auth0callback" component={() => 
                                       { console.log("YEA SEEING THIS HERE RIGHT HERE");
                                         console.log("this.props.location" + Object.keys(this.props.location));
                                         console.log("this.props.location.pathname" +this.props.location.pathname);
                                         console.log("this.props.location.hash" +this.props.location.hash);
                                         console.log("this.props.location.search" +this.props.location.search);
                                         window.location = AUTH0_CALLBACK_ENV + this.props.location.search;
                                         return null;} }/>
                </Switch>
            </div>
        </div>
      );
    }
}
