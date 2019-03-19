
export default class Poster {

    constructor(successFunc, 
                showValidationFunc,
                showAuthorizationMessage, 
                showNetworkErrorMessage) 
    {
        this.successFunc = successFunc  
        this.showValidationFunc = showValidationFunc;
        this.showAuthorizationMessage = showAuthorizationMessage;
        this.showNetworkErrorMessage = showNetworkErrorMessage;
    }

    postData = (url, payload) => {

        //console.log("postData  " + Object.keys(payload));

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
                    console.log("Response was not ok");
                    if (response.status === 401)
                    {
                        this.showAuthorizationMessage();
                    }

                    let json_errors = response.json()
                    console.log(json_errors);
                    json_errors.then(data => {
                        this.showValidationFunc(data)
                    })
                    console.log("throwing");
                    throw Error(response.statusText)
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
