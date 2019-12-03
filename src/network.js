import {showValidationMessages} from './validationmessage'

export default class Poster {

    constructor(successFunc, 
                showAuthorizationMessage, 
                showNetworkErrorMessage) 
    {
        this.successFunc = successFunc;
        this.showValidationFunc = showValidationMessages;
        this.showAuthorizationMessage = showAuthorizationMessage;
        this.showNetworkErrorMessage = showNetworkErrorMessage;
    }

    postData = (url, payload) => {

        console.log("postData  " + Object.keys(payload));

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(
            response => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Response had status " + response.status);
                    if (response.status === 401)
                    {
                        this.showAuthorizationMessage();
                        throw Error("Authorization failed");
                    }

                    let json_errors = response.json()

                    json_errors.then(data => {
                        this.showValidationFunc(data)
                    })
                    throw Error("Unknown error had response status " + response.statusText)
                }
            },
            networkError => {
                this.showNetworkErrorMessage();
                throw Error(networkError);
            }
        )
        .then((json) => {
            this.successFunc();
        })
        .catch((e) => {
            console.log("Catch there was an error" + e);
        })
    }
}
