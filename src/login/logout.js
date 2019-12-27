import React,{useEffect} from 'react'

export default function Logout ({isLoggedIn,logoutHandler, ...props}) {

    useEffect(() => {
       console.log("Do the actual logging out here.");
       logoutHandler();
    },[]);

    const loggingOut ='Logging out';
    const loggedOut ='You have been logged out successfully.';

    let result =
            <>
                <h2>{isLoggedIn ? loggingOut: loggedOut}</h2>
            </>;

    return result;
}
