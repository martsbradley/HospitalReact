import React,{useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tablet-select-container';
import PropTypes from 'prop-types';
import StartDate from './start-date';
import /*TabletWizardController,*/ {MyButtons,ButtonInfo} from './tablet-wizard-controller';
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD, dateFormat} from '../../dateutils.js'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import differenceInDays from 'date-fns/difference_in_days'
 
function NoMatch() {
  return <h1> No match</h1>;
}

export default function TabletWizard(props)
{
    const [state, setState] = useState( { medicineName : '',
                                          startDate    : todayAsYYYYMMDD(),
                                          endDate      : tomorrowAsYYYYMMDD(),
                                          selectedMedId: -1,
                                          validationMsg: '',
                                          page         :'select',
                                          buttonArr    : []});


    useEffect(() => {
        //console.log("TabletWizard rerender");
        const buttonArr = makeButtonArray({...props, medId: state.selectedMedId, page: state.page});

        setState(state => ({...state, buttonArr}));
    }
    ,[state.selectedMedId, 
      state.page,
      state.startDate,
      state.endDate,
      state.validationMsg ]);
      

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

    function onNavigation(page, url) {
        setState(state => ({...state,
                            validationMsg: "",
                            page}));
        props.history.push(url);
    }

    const exitWizard = () => onNavigation('',       "/patients/list");
    const goPage1    = () => onNavigation('select', `${props.match.path}/select`);
    const goPage2    = () => onNavigation('startDate', `${props.match.path}/startDate`);
    const goPage3    = () => onNavigation('endDate', `${props.match.path}/endDate`);

    const makeButtonArray = ({medId, page}) => {
        console.log(`makeButtonArray ${page} ... ${medId}`);

        const buttons = [];
        const endDisabled = !isEndDateValid();
        const startDisabled = !isStartDateValid();

        if (page === 'select') {

            let c = ButtonInfo('Back', false, exitWizard);
            buttons.push(c);
            let b = ButtonInfo('Next', medId === -1, goPage2);
            buttons.push(b);
        }

        else if (page === 'startDate') {
            let c = ButtonInfo('Back', false, goPage1);
            buttons.push(c);
            let b = ButtonInfo('Next', startDisabled, goPage3);
            buttons.push(b);
        }
        else if (page === 'endDate') {
            let c = ButtonInfo('Bakk', false, goPage2);
            buttons.push(c);
            let b = ButtonInfo('Next', endDisabled, goPage3);
            buttons.push(b);
        }
        //console.log("returning");
        //console.log(buttons);

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

            console.log("startDate " + startDate);
            console.log("now " + nowIs);
                             
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

    return <ErrorBoundary>
        <>
            name= {state.medicineName}
            name= {state.selectedMedId}

            <Switch>
                <Route path={`${props.match.path}/select`}>
                    <TabletSelect selectedMedId={state.selectedMedId}
                                  medicineSelected= {medicineSelectedFn} />
                </Route>
                <Route path={`${props.match.path}/startDate`}>
                    <StartDate medicineName={state.medicineName} 
                               startDate={state.startDate}
                               endDate={state.endDate}
                               handleFormChange={dateChanged('startDate')} 
                               validationMsg={state.validationMsg} 
                               editEndDate={false} />
                </Route>
                <Route path={`${props.match.path}/endDate`}>
                    <StartDate medicineName={state.medicineName} 
                                 startDate={state.startDate}
                                 endDate={state.endDate}
                                 handleFormChange={dateChanged('endDate')} 
                                 validationMsg={state.validationMsg} 
                                 editEndDate={true} />
                </Route>
                <Route component={NoMatch} />
            </Switch>

            <MyButtons buttons={state.buttonArr} />
        </>
    </ErrorBoundary>;
}

TabletWizard.propTypes = {
    match          : PropTypes.object,
    history          : PropTypes.object,
}






