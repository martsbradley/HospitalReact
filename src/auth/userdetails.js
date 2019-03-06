import {getCookie} from '../cookie.js'

export class UserDetails {
    isAuthorized = () => {

        const isLoggedin = getCookie('authOisLoggedIn');
        return isLoggedin;
    }

    logout = () => {
        return false;
    }

    login = () => {
        return false;
    }
}
