import * as Cookies from 'js-cookie'
import Poster from '../network';

export class UserDetails {
    constructor(history) {
        this.history = history;
        this.timerId = null;
    }

    isLoggedIn = () => {
        const userStatus = Cookies.get('userStatus');
        const result = userStatus === "loggedIn"
        //console.log("isLoggedIn " + result);
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

    loginSuccess = () => {
        console.log("redirect to homepage.");
        this.history.push('/');
        console.log("pushed /");
    }

    loginfailure = () => {
        this.history.push('/loginfailure');
    }

    logout = () => {
        var poster = new Poster(() => {},
                                () => {alert("fail1");},
                                () => {alert("fail2")});
        poster.deleteMethod();

        let user = { username: '', password:  ''};

        poster.postData('/auth/verifyuser',user);
        console.log("Called logout on server");
    }


    // Needs removed.
    isAuthenticated = () => {
        return this.isLoggedIn();
    }

    isAdministrator =() => {;
        return this.isAuthorized('adminGroup');
    }
}
