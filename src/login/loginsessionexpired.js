import React from 'react'

export class LoginSessionExpired extends React.Component {

    render () { 
        let result = 
                <div>
                    <h1>Your Logged In Session Expired</h1>
                    <hr/>
                    Please log in again if you need to continue.
                </div>;

        return result;
    }
}
