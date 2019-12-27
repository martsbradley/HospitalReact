import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import {HomePage} from './homepage';
import PatientTable from './patient/patient';
import Navigation from './navigation/navigationContainer';
import {UserDetails} from './auth/userdetails';
import LogoutContainer from './login/logoutScreenContainer';

import {LoginFailure} from './login/loginfailure.js';
import LoginScreen from './login/loginScreenContainer';
import AuthenticatedRoute from './authenticatedroute';
import {LoginSessionExpired} from './loginsessionexpired.js';
import {GeneralError, AuthenticationError} from './common/errorPages';

import './index.css'
import ErrorBoundary from './errorboundary.js'
import DrawItComp from './counter/drawItContainer';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.userDetails = new UserDetails(props.history);
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

    render() {
        //console.log("Marty" + MARTY_KEY);

      return (
            <div className="container-fluid">
                <BrowserRouter basename='/'>
                    <>
                    <Navigation/>

                    <Switch>
                        <Route exact path="/" component={HomePage}    />

                        <Route path="/count"   component={DrawItComp} />
                        <Route path="/error/authentication"   component={AuthenticationError} />
                        <Route path="/error"   component={GeneralError} />

                        <AuthenticatedRoute path="/patients"
                                            auth={this.userDetails}
                                            component={PatientTable}  />


                        <Route path="/logoutsuccess"       component={this.logoutSuccess}/>

                        <Route path="/loginfailure"        component={this.loginFailure}/>
                        <Route path="/loginsessionexpired" component={LoginSessionExpired}/>
                        <Route path="/login"               component={LoginScreen}/>

                        <Route path="/logout"              component={LogoutContainer} />}/>

                    </Switch>
                    </>
                </BrowserRouter>
            </div>
      );
    }
}
//loginAction={this.doit}

//import PatientRedux from './patient/list/patientListContainer';
