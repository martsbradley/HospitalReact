import React  from 'react'

const SignInOutButton = ({auth}) => {

    let signInOutButton = '';

    if (auth.isAuthenticated()) {
        signInOutButton = <button onClick={auth.logout}>Log Off</button>;
    } else {
        signInOutButton = <button onClick={auth.login}>Log In</button>;
    }
    return signInOutButton;
};

export default SignInOutButton;
