import {APIError, AuthenticationError} from './Errors';

export function pageURL(pageToShow, itemsOnPage) {
  const pageURL = `?page=${pageToShow}&pageSize=${itemsOnPage}`;
  return pageURL;
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
