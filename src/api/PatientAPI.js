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
    throw new Error(message);
  }
}
export default async function loadThePatients(pageToShow, itemsOnPage ) {
  //console.log(`callURLS running fetches`);

  const patientsURL = pageURL(pageToShow, itemsOnPage);

  const loadPatients = fetch(patientsURL);
  const countPatients = fetch(totalURL());

  const patientsResponse = await loadPatients;
  const countPatientsResponse = await countPatients;

  checkResponseOK(patientsResponse, patientsURL);
  checkResponseOK(countPatientsResponse, totalURL());

  const patients = await patientsResponse.json();

  const total = await countPatientsResponse.json();

  console.log(`Got ${total} patients ${patients}`);
  console.log(patients);
  return [patients,total];
}

