import {APIError} from './Errors';
import {getDobString} from '../dateutils.js'
import {AuthenticationError} from './Errors';

function urlPrefix() {
  const urlPrefix = "/rest/hospital/patients";
  return urlPrefix;
}

function totalURL() {
  const totalURL = urlPrefix() + "/total";
  return totalURL;
}

function pageURL(pageToShow, itemsOnPage) {
  let start = (pageToShow - 1) * itemsOnPage
  const pageURL = urlPrefix() + `?start=${start}&max=${itemsOnPage}`;
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
export async function loadPatients(pageToShow, itemsOnPage ) {
  //console.log(`callURLS running fetches`);

  const patientsURL = pageURL(pageToShow, itemsOnPage);

  const loadPatientsPromise = fetch(patientsURL);
  const countPatients = fetch(totalURL());

  const patientsResponse = await loadPatientsPromise ;
  const countPatientsResponse = await countPatients;

  checkResponseOK(patientsResponse, patientsURL);
  checkResponseOK(countPatientsResponse, totalURL());

  const patients = await patientsResponse.json();

  const total = await countPatientsResponse.json();

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

    checkResponseOK(patientResponse, loadPatientURL);
    checkResponseOK(imagesResponse, loadImagesURL);

    const patient = await patientResponse.json();
    const images = await imagesResponse.json();

    patient.dob = getDobString(patient.dob);
    patient.images = images;

    return patient;
}
export async function savePatient(patient) {

    let payload = {...patient};
    payload.dob = payload.dob + "T00:00Z";
    const saveURL = '/rest/hospital/patient';
    console.log("saving...");
    //console.log(payload);

    const requestPromise = fetch(saveURL,{
                                method: 'post',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payload)
                            });

    let responsePromise = await requestPromise;

    let responseData = []

    try {
       responseData = await responsePromise.json();
    } catch(e) {
        console.log("There is no information in the body");
    }

    console.log(`ok=${responsePromise.ok} status=${responsePromise.status}`);

    let isError = !responsePromise.ok;

    // Errors other than validation problems are rejected so are
    // handled by the promise.catch in calling code.
    if (isError && responsePromise.status !== 400) {

        const message = `Response for ${saveURL} had error ${responsePromise.statusText}`;

        authenticationFailedCheck(responsePromise, saveURL);

        throw new APIError(responsePromise.status, message, responseData)
    }

    return { isError,
             data: responseData}
}
