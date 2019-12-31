import {AuthenticationError,APIError} from './Errors';

const loginURL = '/auth/verifyuser';

function checkResponseOK(response, url) {
    if (!response.ok) {
        const message = `Response for ${url} had error ${response.statusText}`;
        console.log(message);
        throw new APIError(response.status, message);
    }
}

function callEndPoint(userDetails, method) {
    const loginPromise = fetch(loginURL, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    });

    return loginPromise;
}
function callLoginEndpoint(userDetails) {
     return callEndPoint(userDetails, 'post');
}

function callLogoutEndpoint(userDetails) {
     return callEndPoint(userDetails, 'delete');
}

export async function login(username, password) {

    const userDetails = { username, password};

    const loginPromise = callLoginEndpoint(userDetails);

    const loginResponse = await loginPromise;

    checkResponseOK(loginResponse, loginURL);

    const details = await loginResponse.json();

    return details;
}

export async function logout() {
    const userDetails = {};

    const loginPromise = callLogoutEndpoint(userDetails);

    const loginResponse = await loginPromise;

    checkResponseOK(loginResponse, details, loginURL);

    const details = await loginResponse.json();

    return details;
}
