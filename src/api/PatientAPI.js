import {getDobString} from '../dateutils.js'
import {APIError, AuthenticationError} from './Errors';

const urlPrefix = "/rest/hospital/patients";
const totalURL = urlPrefix + "/total";

function pageURL(pageToShow, itemsOnPage) {
  let start = (pageToShow - 1) * itemsOnPage
  const pageURL = urlPrefix + `?start=${start}&max=${itemsOnPage}`;
  return pageURL;
}

function authenticationFailedCheck(response, url) {
    if (!response.ok && response.status === 401) {
        const message = `AuthenticationError for ${url} had error ${response.statusText}`;
        console.log(message);
        throw new AuthenticationError(message);
    }
}

function checkResponseOK(response, url) {

    authenticationFailedCheck(response, url);

    if (!response.ok) {
        throw new Error(message);
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
    return isError
}

export async function loadPatients(pageToShow, itemsOnPage ) {
    const patientsURL = pageURL(pageToShow, itemsOnPage);

    const loadPatientsPromise = fetch(patientsURL);
    const countPatients = fetch(totalURL);

    const patientsResponse = await loadPatientsPromise ;
    const countPatientsResponse = await countPatients;

    let isError = isErrorResponse(patientsResponse, patientsURL);
    isError = isError ? isError: isErrorResponse(countPatientsResponse, totalURL);

    let patients, total;
    try {
        patients = await patientsResponse.json();
        total = await countPatientsResponse.json();
    } catch(e) {
        console.log("There is no information in the body");
    }

    //console.log(`Got ${total} patients ${patients}`);
    //console.log(patients);
    return [patients,total];
}

export async function loadPatient(patientId) {

    const loadPatientURL = `/rest/hospital/patient/${patientId}`;
    const loadImagesURL = `/rest/hospital/patient/${patientId}/images`;


    const loadPatient = fetch(loadPatientURL);
    const loadImages = fetch(loadImagesURL);

    const patientResponse =  await loadPatient;
    const imagesResponse = await loadImages;

    let isError = isErrorResponse(patientResponse, loadPatientURL);
    isError = isError ? isError: isErrorResponse(imagesResponse, loadImagesURL);

    let patient;
    let images;

    try {
        patient = await patientResponse.json();
        images = await imagesResponse.json();
    } catch(e) {
        console.log("There is no information in the body");
    }

    patient.dob = getDobString(patient.dob);
    patient.images = images;

    return patient;
}

export async function savePatient(patient) {

    let payload = {...patient};
    payload.dob = payload.dob + "T00:00Z";
    const saveURL = '/rest/hospital/patient';
    console.log("saving...");

    const requestPromise = fetch(saveURL,{
                                method: 'post',
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
