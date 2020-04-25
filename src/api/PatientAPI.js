//import {getDobString} from '../dateutils.js'
import {APIError, AuthenticationError} from './Errors';

const urlPrefix = "/user/list";

function pageURL(pageToShow, itemsOnPage) {
  const pageURL = urlPrefix + `?page=${pageToShow}&pageSize=${itemsOnPage}`;
  return pageURL;
}

function authenticationFailedCheck(response, url) {
    if (!response.ok && response.status === 401) {
        const message = `AuthenticationError for ${url} had error ${response.statusText}`;
        console.log(message);
        throw new AuthenticationError(message);
    }
}

function isErrorResponse(responsePromise, url) {

    console.log(`ok=${responsePromise.ok} status=${responsePromise.status}`);

    const isError = !responsePromise.ok;

    // Errors other than validation problems are rejected so are
    // handled by the promise.catch in calling code.
    if (isError && responsePromise.status !== 400) {

        const message = `Response for ${url} had error ${responsePromise.statusText}`;

        authenticationFailedCheck(responsePromise, url);

        throw new APIError(responsePromise.status, message)
    }
    console.log("Returning ...");
    console.log(isError);
    return isError
}

export async function loadPatients(pageToShow, itemsOnPage ) {
    const patientsURL = pageURL(pageToShow, itemsOnPage);

    const loadPatientsPromise = fetch(patientsURL);

    const patientsResponse = await loadPatientsPromise ;

    isErrorResponse(patientsResponse, patientsURL);


    let patients, total;
    try {
        let result  =  await patientsResponse.json();
        patients = result.users;
        console.log(patients);
        total = result.pageInfo._dataSize;
    } catch(e) {
        console.log("There is no information in the body");
    }

    //console.log(`Got ${total} patients ${patients}`);
    //console.log(patients);
    return [patients,total];
}

export async function loadPatient(patientId) {

    const loadPatientURL = `/user?id=${patientId}`;
    //const loadImagesURL = `/rest/hospital/patient/${patientId}/images`;


    const loadPatient = fetch(loadPatientURL);
    //const loadImages = fetch(loadImagesURL);

    let patientResponse =  await loadPatient;
    //const imagesResponse = await loadImages;

    let isError = isErrorResponse(patientResponse, loadPatientURL);

    if (!isError) {
        //isError = isErrorResponse(imagesResponse, loadImagesURL);
    }

    let patient;
    //let images;

    try {
        patient = await patientResponse.json();

        //images = await imagesResponse.json();
    } catch(e) {
        console.log("There is no information in the body");
    }

    patient.images = []

    return patient;
}

export async function savePatient(patient) {

    let payload = {...patient};
    //payload.dob = payload.dob + "T00:00Z";
    const saveURL = '/user/';
    console.log("saving...");

    let methodName = 'put';
    if (patient.id === undefined) {
       methodName = 'post';
    }

    const requestPromise = fetch(saveURL,{
                                method: methodName,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payload)
                            });

    let responsePromise = await requestPromise;

    let isError = isErrorResponse(responsePromise);

    //let responseData = getResponseData(responsePromise);
    let responseData = [];

    // Only here for successful calls or failed validations
    // So get the result or the validation errors.
    try {
        responseData = await responsePromise.json();
    } catch(e) {
        console.log("There is no information in the body");
    }

    return { isError,
             data: responseData}
}
