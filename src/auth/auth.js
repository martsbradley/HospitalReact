import auth0 from 'auth0-js';
//import {getCookie} from '../cookie.js'

export class Auth {
    constructor(history) {
        console.log("constructor of Auth" + history);
        this.history = history;
        this.userProfile = null;

        console.log("Later => " + REACT_APP_AUTH0_DOMAIN);

        this.auth0 = new auth0.WebAuth({
            domain      : REACT_APP_AUTH0_DOMAIN,
            clientID    : REACT_APP_AUTH0_CLIENT_ID,
            redirectUri : REACT_APP_AUTH0_CALLBACK_URL,
            audience    : REACT_APP_AUTH0_AUDIENCE,
            responseType: "token",
            scope       : "openid profile email"
         });
        console.log("Created " + this.auth0);
    }

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
      //this.auth0.parseHash((err, authResult) => {
      //    if (authResult && authResult.accessToken) {
      //        this.setSession(authResult);
      //        this.history.push("/");
      //    } else if (err) {
      //        this.history.push("/");
      //        alert(`Error: ${err.error}. Check the console for further details.`);
      //        console.log(err);
      //    }
      //});
    }
    
    setSession = authResult => {
    /// console.log(authResult);
    /// // set the time that the access token will expire
    /// const expiresAt = JSON.stringify(
    ///   authResult.expiresIn * 1000 + new Date().getTime()
    /// );

    /// //document.cookie = `mytoken=${authResult.accessToken};secure`;
    /// setCookie('mytoken',authResult.accessToken);

    /// localStorage.setItem("access_token", authResult.accessToken);
    /// localStorage.setItem("expires_at", expiresAt);

    /// const groups = this.getGroups(authResult.accessToken);
    /// localStorage.setItem("groups", groups);
    /// console.log("Saving into storage groups type "   + typeof(groups));
    /// console.log("Saving into storage groups length " + groups.length);
    /// const gotback = localStorage.getItem("groups");
    /// console.log("got back" + gotback);
    };

    isAuthenticated() {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout = () => {
    //  var foundCookie = getCookie('mytoken');
    //  console.log("I found " + foundCookie);
    //  //console.log("I found " + document.cookie['mytoken']);

    //  localStorage.removeItem("access_token");
    //  localStorage.removeItem("expires_at");
    //  localStorage.removeItem("groups");
    //  this.userProfile = null;

    //  this.auth0.logout({
    //      clientID    : REACT_APP_AUTH0_CLIENT_ID});
    };

    getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("No access token found.");
        }
        return accessToken;
    };

    /* cb is a function that can accept variable arguments.
     */
    getProfile = cb => {
        if (this.userProfile) { 
            return cb(this.userProfile);
        }

        const accessToken = this.getAccessToken();

        this.auth0.client.userInfo(accessToken,
            (err, profile) => 
            {
                if (profile) {
                    this.userProfile = profile;
                }
                cb(profile, err);
            }
        );
    };

    getGroups = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        const obj = JSON.parse(window.atob(base64));
        var groups = [];

        if (obj != null && 
            obj.hasOwnProperty(REACT_APP_AUTH0_AUTHORIZATION) &&
            obj[REACT_APP_AUTH0_AUTHORIZATION].hasOwnProperty("groups")) {

            groups = obj[REACT_APP_AUTH0_AUTHORIZATION].groups;
        }

        console.log("Groups type "   + typeof(groups));
        console.log("Groups length " + groups.length);
        return groups;
    }

    userInGroup = (groupName) => {
        const groups = localStorage.getItem("groups");
        return groups != null && groups.includes(groupName);
    }

    isAuthorized = (groupName) => {

        const authenticated = this.isAuthenticated();

        let inGroup = groupName == null || this.userInGroup(groupName);

        let result = false;

        if (authenticated && inGroup) {
            result = true;
        }
        return result;
    }

    isAdministrator = () => {
        return this.isAuthorized("adminGroup");
    }
}
