import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {HomePage as MyHouse} from './homepage'
import {PatientTable} from './patient'
import {Navigation} from './navigation'
import {UserDetails} from './auth/userdetails'
import {Logout} from './logout'
import {LoginFailure} from './loginfailure.js'
import {LoginScreen} from './loginscreen.js'
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

    login = () => {
        return <LoginScreen auth={this.userDetails} />;

    }

    render() {
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

                </Switch>
            </div>
        </div>
      );
    }
}

//                  <Route path="/loginsuccess"        component={this.successfulLogin}/>
//                  <Route path="/login"  component={() => { window.location = AUTH0_LOGIN_URL_ENV;  return null;} }/>
//                  <Route path="/logout" component={() => { window.location = AUTH0_LOGOUT_URL_ENV; return null;} }/> -->
