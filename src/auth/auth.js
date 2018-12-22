import auth0 from 'auth0-js';

export class Auth {
    constructor(history) {
        console.log("constructor of Auth" + history);
        this.history = history;
        this.userProfile = null;
        this.auth0 = new auth0.WebAuth({
            domain      : process.env.REACT_APP_AUTH0_DOMAIN,
            clientID    : process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri : process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: "token id_token",
            scope       : "openid profile email"
         });
    }

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.history.push("/");
            } else if (err) {
                this.history.push("/");
                alert(`Error: ${err.error}. Check the console for further details.`);
                console.log(err);
            }
        });
    }
    
    setSession = authResult => {
        console.log(authResult);
        // set the time that the access token will expire
        const expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
    };

    isAuthenticated() {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        this.userProfile = null;

        this.auth0.logout({
            clientID    : process.env.REACT_APP_AUTH0_CLIENT_ID});
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

}
