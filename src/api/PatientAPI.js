function urlPrefix() {
  const urlPrefix = "/rest/hospital/patients";
  return urlPrefix;
}

function totalURL() {
  const totalURL = urlPrefix() + "/total";
  return totalURL;
}

function pageURL() {
  const start = 1;
  const itemOnPage = 5;
  const pageURL = urlPrefix() + `?start=${start}&max=${itemOnPage}`;
  return pageURL;
}

function checkResponseOK(response, url) {
  if (!response.ok) {
    const message = `Response for ${url} had error ${response.statusText}`;
    console.log(message);
    throw new Error(message);
  }
}


async function callURLS() {
  console.log(`callURLS running fetches`);
  const loadPatients = fetch(pageURL());
  const countPatients = fetch(totalURL());

  const patientsResponse = await loadPatients;
  const countPatientsResponse = await countPatients;

  checkResponseOK(patientsResponse, pageURL());
  checkResponseOK(countPatientsResponse, totalURL());

  const patients = await patientsResponse.json();

  const total = await countPatientsResponse.json();

  console.log(`Got ${total} patients ${patients}`);
  console.log(patients);
  return [patients,total];
}


export default function loadThePatients() {
  let result = null;
  try {
    result = callURLS();
    console.log("after callURLS");
  } catch (e) {
    console.log("Problem" + e);
    throw e;
  }
  return result;
}
