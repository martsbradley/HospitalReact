import * as Cookies from 'js-cookie'

export class UserDetails {
    constructor(history) {
        this.history = history;
        this.timerId = null;
    }

    isAuthorized = (groupName) => {
        const userStatus = Cookies.get('userStatus');
        const groups     = Cookies.get('auth0Groups');

        let result = userStatus === "loggedIn" && groups.includes(groupName);
        //console.log("userStatus = " + userStatus);
        //console.log("groups     = " + groups);
        //console.log("isAuthorized " + result);
        return result;
    }


    startLogoutTimer = () => {
        const expiresAfterSeconds = Cookies.get('auth0ExpiresIn');
        console.log("Logout timer started " + expiresAfterSeconds);

        this.timerId = setInterval(() => 
                                    {   
                                        clearTimeout(this.timerId);
                                        this.timerId = null;
                                        this.logout();
                                    },
                                    1000*expiresAfterSeconds);
    }


    login = () => {
        console.log("redirect the page to the real log in");
        this.history.push('/login');
        console.log("pushed /login");
    }

    logout = () => {
        console.log("redirect to the real logout");
        this.history.push('/logout');
        console.log("pushed /loout");
    }


    // Needs removed.
    isAuthenticated = () => {
        return this.isAuthorized('adminGroup');
    }
}
