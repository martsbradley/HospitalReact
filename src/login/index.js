import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import { connect } from "react-redux";
import LoginScreen from './loginScreenContainer';
import LogoutContainer from './logoutScreenContainer';

function Login({errorInfo}) {

    if (errorInfo !== "") {
        console.log(`redirecting to ${errorInfo}`)
        console.log(errorInfo);
        return <Redirect to={errorInfo} />
    }

//  loginFailure = () => {
//      return <ErrorBoundary><LoginFailure auth={this.userDetails} {...this.props} /></ErrorBoundary>;
//  }

//  logoutSuccess = () => {
//      console.log("Now show logout success page");
//      return <ErrorBoundary><Logout auth={this.userDetails} {...this.props} /></ErrorBoundary>;
//  }

//  successfulLogin = () => {
//      //this.userDetails.startLogoutTimer();
//      console.log("Starting yes   login timer and moving user to front page.");
//      this.props.history.push('/');
//      return null;
//  }

    let render=  (
        <Switch>
            <Route path="/auth/login"   component={LoginScreen}/>
            <Route path="/auth/logout"  component={LogoutContainer} />

        </Switch>
      );
    return render;
}
///         <Route path="/auth/success" component={this.logoutSuccess}/>
///         <Route path="/auth/failure" component={this.loginFailure}/>
///         <Route path="/auth/expired" component={LoginSessionExpired}/>

function mapStateToProps(state) {

    const result = {
        errorInfo         : state.error
    };

    return result;
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
