import React from 'react'
import {Navigation} from './navigation'

export class LoginFailure extends React.Component {

    render () { 
        let result = 
                <div>
                    <Navigation auth={this.props.auth} onLoginscreen={false}/> 
                    <h1>Login Failure</h1>
                    <hr/>
                    You could not be authenticated.
                </div>;

        return result;
    }
}
