import * as Actions from './actionTypes';
import loadPatients from '../../api/PatientAPI';


function loadPatientsSuccess(patients, total) {
    return { type: Actions.PATIENTS_LISTED_SUCCESS,
             patients,
             total
           };
}


export function changePageAction(pageNumber) {
    return { type: Actions.PATIENTS_CHANGE_PAGE,
             pageNumber};
}

export function loadPatientsAction(startPage, itemsOnPage) {

    console.log(`loadPatientsAction begins ${startPage} and ${itemsOnPage}`);
    const promise = loadPatients(startPage, itemsOnPage);

  return dispatch => { promise.then(
          ([patients,total]) => {
              console.log(`got it back ${Array.isArray(patients)}`);
              dispatch(loadPatientsSuccess(patients, total))
          })
  };
}
