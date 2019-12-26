import AuthenticationError from './Errors';

const loginURL = '/auth/verifyuser';

function checkResponseOK(response, url) {
    if (!response.ok) {
        const message = `Response for ${url} had error ${response.statusText}`;
        console.log(message);
        throw new Error(message);
    }
}

function callAuthenticationEndpoint(userDetails) {
    const loginPromise = fetch(loginURL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    });

    return loginPromise;
}


export default async function login(username, password) {

    const userDetails = { username, password};

    const loginPromise = callAuthenticationEndpoint(userDetails);

    const loginResponse = await loginPromise;

    checkResponseOK(loginResponse, loginURL);

    const details = await loginResponse.json();

    return details;
}
