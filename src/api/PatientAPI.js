import {checkResponse, post, put} from './api-utils'

const urlPrefix = "/user/list";

function pageURL(pageToShow, itemsOnPage) {
  const pageURL = urlPrefix + `?page=${pageToShow}&pageSize=${itemsOnPage}`;
  return pageURL;
}

export async function loadPatients(pageToShow, itemsOnPage ) {
    const patientsURL = pageURL(pageToShow, itemsOnPage);

    const loadPatientsPromise = fetch(patientsURL);

    const patientsResponse = await loadPatientsPromise ;

    checkResponse(patientsResponse, patientsURL);

    let patients, total;
    try {
        let result  =  await patientsResponse.json();
        patients = result.users;
        //console.log(patients);
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

    let validationError = checkResponse(patientResponse, loadPatientURL);

    if (!validationError) {
        //isError = check images response (imagesResponse, loadImagesURL);
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

    let sendData = put;
    if (patient.id === undefined) {
       sendData = post;
    }

    let responsePromise = await sendData(saveURL, payload);

    let isError = checkResponse(responsePromise);

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
