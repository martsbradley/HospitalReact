import {APIError, AuthenticationError} from './Errors';

export const pageURL = (pageToShow, itemsOnPage) => 
{
    const page=encodeURIComponent(pageToShow);
    const items=encodeURIComponent(itemsOnPage);
    return `?page=${page}&pageSize=${items}`;
}

export const filterParam = (txt) => {
    let encodedText= encodeURIComponent(txt);

    return `&filter=${encodedText}`;
}

function authenticationFailedCheck(response, url) {
    if (!response.ok && response.status === 401) {
        const message = `AuthenticationError for ${url} had error ${response.statusText}`;
        console.log(message);
        throw new AuthenticationError(message);
    }
}

export function checkResponse(response, url) {

    //console.log(`ok=${response.ok} status=${response.status}`);

    const isError = !response.ok;

    // Errors other than validation problems are rejected so are
    // handled by the promise.catch in calling code.
    if (isError && response.status !== 400) {

        const message = `Response for ${url} had error ${response.statusText}`;

        authenticationFailedCheck(response, url);

        throw new APIError(response.status, message)
    }

  //if (isError) {
  //    //console.log(`Error calling: ${url}`);
  //}
    return isError;
}


export function post(url, object,) {
    return sendData(url, 'post', object);
}

export function put(url, object,) {
    return sendData(url, 'put', object);
}

function sendData(url, method, object,) {

    return fetch(url,
                 {
                      method,
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(object)
                  });
}
