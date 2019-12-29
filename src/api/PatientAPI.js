import AuthenticationError from './Errors';
import {getDobString} from '../dateutils.js'
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

function checkResponseOK(response, url) {
    if (!response.ok) {
        const message = `Response for ${url} had error ${response.statusText}`;
        console.log(message);

        if (response.status === 401) {
            throw new AuthenticationError(message);
        }

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
    console.log(payload);

    const requestPromise = fetch(saveURL,{
                                method: 'post',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payload)
                            });

    const response = await requestPromise;

    checkResponseOK(response, saveURL);
    const patientSaved = await response.json();
    return patientSaved;
}
