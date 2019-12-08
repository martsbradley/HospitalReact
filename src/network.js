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
        this.method = 'post';
    }

    deleteMethod = () => {
        this.method = 'delete';
    }

    postData = (url, payload) => {

        console.log("postData  " + Object.keys(payload));

        fetch(url, {
            method: this.method,
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
                    console.log("json_errors is " + json_errors);
                    json_errors.then(data => {
                        console.log("is ... " + data);
                        this.showValidationFunc(data)
                    })
                    console.log("throwing error ");
                    //throw Error("Unknown error had response status " + response.statusText)
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

    goFetch = (url, payload) => {

        console.log("postData  " + Object.keys(payload));

        let request = fetch(url,{
                                    method: this.method,
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(payload)
                                })
        return request;
    }

 ///handleResponse = (response) => {
 ///    if (response.ok) {
 ///        return response.json()
 ///    } else {
 ///        console.log("Response had status " + response.status);
 ///        if (response.status === 401)
 ///        {
 ///            this.showAuthorizationMessage();
 ///            throw Error("Authorization failed");
 ///        }

 ///        let json_errors = response.json()

 ///        json_errors.then(data => {
 ///            this.showValidationFunc(data)
 ///        })
 ///        throw Error("Unknown error had response status " + response.statusText)
 ///    }
 ///}
}

export async function postGeneric(info){
    try {

        const poster  = new Poster (()  =>{},
                                    ()  =>{},
                                    ()  =>{});

        const response = await poster.goFetch(info.url, info.payload);

        if (response.ok) {
            let json = response.json();
            console.log("response.ok is " + json);

            info.success(json);
        }
        else {
            console.log("response status is " + response.status);
            if (response.status === 401) {
                info.failureAuthentication();
            }
            else {
                let json = await response.json()
                console.log("Got the json");
                if (json) {
                    info.failure(json);
                }
            }
        }
    }catch (e) {
        info.error();
    }
}
