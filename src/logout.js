import React from 'react'
import {Navigation} from './navigation'

export class Logout extends React.Component {

    render () { 
        let result = 
                <div>
                    <Navigation auth={this.props.auth} onLoginscreen={true}/> 
                    <h1>Successful Log Out</h1>
                    <hr/>
                    You have been logged out successfully.
                </div>;

        return result;

    }
}
