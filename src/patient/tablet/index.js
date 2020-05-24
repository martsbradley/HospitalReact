import React,{useEffect, useState} from 'react'
import {Link,Route, Switch, useHistory,   useParams ,useRouteMatch/*,useLocation*/ } from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tablet-select-container';
import PropTypes from 'prop-types';
import StartDate,{pageIds} from './start-date';
import {MyButtons,ButtonInfo} from './tablet-wizard-controller';
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD, dateFormat} from '../../dateutils.js'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import differenceInDays from 'date-fns/difference_in_days'
 
function NoMatch() {
  return <h1> No match</h1>;
}

export default function TabletWizard({match})
{
    const [state, setState] = useState( { medicineName : '',
                                          startDate    : todayAsYYYYMMDD(),
                                          endDate      : tomorrowAsYYYYMMDD(),
                                          selectedMedId: -1,
                                          editPatientId: -1,
                                          validationMsg: '',
                                          page         :'select',
                                          buttonArr    : []});

    const [editPatientId, setPatientId] = useState(-1);

    const {patientId} = useParams()
    console.log(`run  patientId ${patientId}`);


 // useEffect(() => {
 //    /* 
 //     * When the startDate/endDate pages are loaded the patientId
 //     * gets lost so storing it in the state.
 //     * on first loading.
 //     */
 //     console.log(`editPatientId must have been set ${editPatientId}`);
 // },[editPatientId]);

    useEffect(() => {
        console.log(`First time load storing ${patientId}`);
        setPatientId(patientId);
    },[]);


    useEffect(() => {
        const buttonArr = makeButtonArray({medId: state.selectedMedId, page: state.page});

        setState(state => ({...state, buttonArr}));
    }
    ,[state.selectedMedId, 
      state.page,
      state.startDate,
      state.endDate,
      state.validationMsg ]);

//  function getBackURL() {
//      const backURL = '/patients/form/';
//      return backURL;
//  }
      

    function medicineSelectedFn({id, name }) {
        setState(state => ({...state,
                            selectedMedId: id,
                            medicineName : name, }));
    }

    const dateChanged = dateName => value => {
        setState(state => ({...state, 
                            validationMsg: "",
                            [dateName]: value }));
    }


    let history = useHistory();

    function onNavigation(page, url) {
        setState(state => ({...state,
                            validationMsg: "",
                            page}));
        console.log(`onNavigation hitting ${url}`);
        history.push(url);
    }

    let oldMatch = useRouteMatch();

//  console.log(oldMatch);
//  console.log(`match.url = ${match.url}`);
//  const location = useLocation();
//  console.log("Location is ");
//  console.log(location);
    //const exitWizard = () => onNavigation('',         getBackURL());
    const exitWizard = () => onNavigation('',         `/patients/form/${patientId}`);
    const goPage1    = () => onNavigation('select',   `${oldMatch.url}/select`);
    const goPage2    = () => onNavigation('startDate',`${oldMatch.url}/startDate`);
    const goPage3    = () => onNavigation('endDate',  `${oldMatch.url}/endDate`);

    const makeButtonArray = ({medId, page}) => {
        //console.log(`makeButtonArray ${page} ... ${medId}`);

        const buttons = [];

        if (page === 'select') {

            let c = ButtonInfo('Back', false, exitWizard);
            buttons.push(c);
            let b = ButtonInfo('Next', medId === -1, goPage2);
            buttons.push(b);
        }

        else if (page === 'startDate') {
            const startDisabled = !isStartDateValid();
            let c = ButtonInfo('Back', false, goPage1);
            buttons.push(c);
            let b = ButtonInfo('Next', startDisabled, goPage3);
            buttons.push(b);
        }
        else if (page === 'endDate') {
            const endDisabled = !isEndDateValid();
            let c = ButtonInfo('Back', false, goPage2);
            buttons.push(c);
            let b = ButtonInfo('Next', endDisabled, goPage3);
            buttons.push(b);
        }
        return buttons;
    }

    function isStartDateValid() {
        let startDateValid = false;
        try {
            const nowIs = new Date();

            const startDate = parse(state.startDate, 
                                    dateFormat(),
                                    new Date());

            //  Same day or after today
            startDateValid = differenceInDays (nowIs, startDate) === 0 || 
                             isBefore(nowIs, startDate);

          //console.log("startDate " + startDate);
          //console.log("now " + nowIs);
                             
        } catch (e) {
            console.log("Caught an error" + e);
        }

        if (!startDateValid) {
            setState(state => ({...state, 
                                validationMsg: "Start Date Invalid" }));
        }

        return startDateValid
    }

    function isEndDateValid() {
        let endDateValid = false;
        try {
            const startDate = parse(state.startDate, 
                                    dateFormat(),
                                    new Date());

            const endDate = parse(state.endDate, 
                                    dateFormat(),
                                    new Date());

            endDateValid = isBefore(startDate, endDate);
                             
        } catch (e) {
            console.log("Caught an error" + e);
        }

        if (!endDateValid) {
            setState(state => ({...state, 
                                validationMsg: "End Date Invalid" }));
        }

        console.log("endDateValid after now " + endDateValid);
        return endDateValid
    }

    console.log(match);
    return <ErrorBoundary>
        <>
            <Switch>
                <Route path={`${match.path}/select`}>
                    <TabletSelect selectedMedId={state.selectedMedId}
                                  medicineSelected= {medicineSelectedFn} />
                </Route>
                <Route path={`${match.path}/startDate`}>
                    <StartDate medicineName={state.medicineName} 
                               startDate={state.startDate}
                               endDate={state.endDate}
                               handleFormChange={dateChanged('startDate')} 
                               validationMsg={state.validationMsg} 
                               pageType={pageIds.START_PAGE} />
                </Route>
                <Route path={`${match.path}/endDate`}>
                    <StartDate medicineName={state.medicineName} 
                                 startDate={state.startDate}
                                 endDate={state.endDate}
                                 handleFormChange={dateChanged('endDate')} 
                                 validationMsg={state.validationMsg} 
                               pageType={pageIds.END_PAGE} />
                </Route>
                <Route component={NoMatch} />
            </Switch>
            <Link to={`/patients/form/${patientId}`}>Back to Edit{editPatientId}</Link>
            <MyButtons  buttons={state.buttonArr} />
        </>
    </ErrorBoundary>;
}

TabletWizard.propTypes = {
    match    : PropTypes.object,
}
