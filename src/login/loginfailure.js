import React from 'react'

export class LoginFailure extends React.Component {

    render () { 
        let result = 
                <div>
                    <h1>Login Failure</h1>
                    <hr/>
                    You could not be authenticated.
                </div>;

        return result;
    }
}
