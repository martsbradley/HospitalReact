import * as Cookies from 'js-cookie'

export class UserDetails {
    constructor(history) {
        this.history = history;
        this.timerId = null;
    }

    isLoggedIn = () => {
        const userStatus = Cookies.get('userStatus');
        const result = userStatus === "loggedIn"
        console.log("isLoggedIn " + result);
        return result;
    }

    isAuthorized = (groupName) => {
        const isLoggedIn = this.isLoggedIn();
        const groups     = Cookies.get('auth0Groups');

        //console.log("userDetail isLoggedIn "+ isLoggedIn);
        //console.log("userDetail groups "+ groups);
        let result =  isLoggedIn && groups.includes(groupName);
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
        return this.isLoggedIn();
    }

    isAdministrator =() => {;
        return this.isAuthorized('adminGroup');
    }
}
