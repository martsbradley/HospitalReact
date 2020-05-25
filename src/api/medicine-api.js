import {checkResponse, pageURL, filterParam, post} from './api-utils';
import {medicineURL, prescriptionURL} from './url-constants';

export async function loadMedicines(pageNumber, pageSize, filterText) {
    const query = pageURL(pageNumber, pageSize);
    const filter = filterParam(filterText)
    const medicinesURL = `${medicineURL}${query}${filter}`;

    const response = await fetch(medicinesURL);

    let isError = checkResponse(response, medicinesURL);

    let medicines, total, result;

    const json = await response.json();

    if (isError) {
        result = json;//Return the validation error
    } else {
        medicines = json.medicines;
        total     = json.pageInfo._dataSize;
        result = {medicines, total};
    }

    return { isError,
             data: result}
}

export const savePrescription = async (prescription) => {

    //console.log('savePrescription');
    let response = await post(prescriptionURL, prescription);

    //console.log('savePrescription post done');

    let isError  = checkResponse(response, prescriptionURL);

    //console.log(`savePrescription isError ${isError}`);

    let result = {};

    if (isError) {
        //  Only validation issues are expected back.
        result = await response.json();
    }

    //console.log(`savePrescription isError ${isError}`);

    return { isError,
             data: result}
}
