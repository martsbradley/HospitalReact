import React,{useEffect, useState} from 'react'
import {/*Link,*/Route, Switch, useHistory,   useParams ,useRouteMatch/*,useLocation*/ } from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tablet-select-container';
import PropTypes from 'prop-types';
import StartDate,{pageIds} from './start-date';
import {MyButtons,ButtonInfo} from './tablet-wizard-controller';
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD, dateFormat} from '../../dateutils.js'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import differenceInDays from 'date-fns/difference_in_days'
import { connect } from "react-redux";
import {createPrescription} from '../../redux/actions/medicineActions';
 
TabletWizard.propTypes = {
    createPrescription: PropTypes.func
};

function TabletWizard({createPrescription})
{
    const [state, setState] = useState( { selectedMedId: -1,
                                          medicineName : '',
                                          startDate    : todayAsYYYYMMDD(),
                                          endDate      : tomorrowAsYYYYMMDD(),
                                          validationMsg: '',
                                          page         :'select',
                                          buttonArr    : []});
    const {patientId} = useParams()

    useEffect(() => {
        const buttonArr = makeButtonArray({medId: state.selectedMedId, page: state.page});

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


    let history = useHistory();

    function onNavigation(page, url) {
        setState(state => ({...state,
                            validationMsg: "",
                            page}));
        history.push(url);
    }

    let match = useRouteMatch();


    const exitWizard = () => onNavigation('',             `/patients/form/${patientId}`);
    const goPage1    = () => onNavigation('select',       `${match.url}/select`);
    const goPage2    = () => onNavigation('startDate',    `${match.url}/startDate`);
    const goPage3    = () => onNavigation('endDate',      `${match.url}/endDate`);
    const goPage4    = () => onNavigation('confirmation', `${match.url}/confirmation`);
    const goConfirm  = () => {
        console.log("Save into the database");
        
        console.log(`selectedMedId               ${state.selectedMedId}`);
        console.log(`medicineName                ${state.medicineName}`);
        console.log(`startDate                   ${state.startDate}`);
        console.log(`endDate                     ${state.endDate}`);
        
        onNavigation('',             `/patients/form/${patientId}`);

        createPrescription({patientId: patientId,                
                            prescription : 
                                  {
                                    startDate: state.startDate,
                                    endDate: state.endDate,
                                    amount: 'lots',
                                    medicine: {id: state.selectedMedId}
                                  }
                            }, 
                            () => console.log("Move now"))
    };

    const makeButtonArray = ({medId, page}) => {

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
            let b = ButtonInfo('Next', endDisabled, goPage4);
            buttons.push(b);
        }
        else if (page === 'confirmation') {
            let c = ButtonInfo('Back', false, goPage3);
            buttons.push(c);
            let b = ButtonInfo('Finish', false, goConfirm);
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
            <Switch>
                <Route path={`${match.path}/select`}>
                    <TabletSelect selectedMedId={state.selectedMedId}
                                  medicineSelected= {medicineSelectedFn} />
                </Route>
                <Route path={`${match.path}/startDate`}>
                    <StartDate title="Starting on Date"
                               medicineName={state.medicineName} 
                               startDate={state.startDate}
                               endDate={state.endDate}
                               handleFormChange={dateChanged('startDate')} 
                               validationMsg={state.validationMsg} 
                               pageType={pageIds.START_PAGE} />
                </Route>
                <Route path={`${match.path}/endDate`}>
                    <StartDate title="Ending on Date"
                               medicineName={state.medicineName} 
                               startDate={state.startDate}
                               endDate={state.endDate}
                               handleFormChange={dateChanged('endDate')} 
                               validationMsg={state.validationMsg} 
                               pageType={pageIds.END_PAGE} />
                </Route>
                <Route path={`${match.path}/confirmation`}>
                    <StartDate title="Confirmation"
                               medicineName={state.medicineName} 
                               startDate={state.startDate}
                               endDate={state.endDate}
                               handleFormChange={dateChanged('endDate')} 
                               validationMsg={state.validationMsg} 
                               pageType={pageIds.CONFIRM_PAGE} />
                </Route>
            </Switch>
            <MyButtons buttons={state.buttonArr} />
        </>
    </ErrorBoundary>;
}

const mapDispatchToProps = {
    createPrescription: createPrescription
};

export default connect(null, mapDispatchToProps)(TabletWizard);
