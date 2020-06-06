import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import {HomePage} from './homepage';
import PatientTable from './patient/patient';
import Navigation from './navigation/navigationContainer';
import Login from './login';
import AuthenticatedRoute from './authenticatedroute';
import {GeneralError, AuthenticationError} from './common/errorPages';

import './index.css'
import DrawItComp from './counter/drawItContainer';

export default function App(){

    //console.log("Marty" + MARTY_KEY);

    return (
        <div className="container-fluid">
            <BrowserRouter basename='/'>
                <>
                <Navigation/>

                <Switch>
                    <Route exact path="/" component={HomePage}    />
                    <Route path="/auth"     component={Login}/>

                    <Route path="/count"   component={DrawItComp} />

                    <AuthenticatedRoute path="/patient"
                                            component={PatientTable}  />

                    <Route path="/error/authentication"   component={AuthenticationError} />
                    <Route path="/error"   component={GeneralError} />
                </Switch>
                </>
            </BrowserRouter>
        </div>
    );
}
