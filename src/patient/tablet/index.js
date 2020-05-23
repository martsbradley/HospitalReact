import React,{useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tablet-select-container';
import PropTypes from 'prop-types';
import StartDate from './start-date';
import /*TabletWizardController,*/ {MyButtons,ButtonInfo} from './tablet-wizard-controller';
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD} from '../../dateutils.js'
 
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

    const dateChanged = dateName => value => {
        setState(state => ({...state, 
                            [dateName]: value }));
    }

    useEffect(() => {
        console.log("TabletWizard rerender");
        const buttonArr = makeButtonArray({...props, medId: state.selectedMedId, page: state.page});

        setState(state => ({...state, buttonArr}));
    }
    ,[state.selectedMedId, state.page]);
      

    function medicineSelectedFn(medicineSelected) {

        const {id, name } = medicineSelected;

        console.log(`medicineSelectedFn ${id}`);

        setState(state => ({...state,
                            selectedMedId: id,
                            medicineName : name, }));
        console.log(state);
    }

    function onNavigation(page) {
        console.log(`onNavigation to ${page}`);
        console.log(state);

        setState(state => ({...state,
                            page}));
    }

    const exitWizard = () =>{onNavigation('na');props.history.push("/patients/list");};
    const goPage1    = () =>{onNavigation('select');props.history.push(`${props.match.path}/select`);};
    const goPage2    = () =>{onNavigation('startDate');props.history.push(`${props.match.path}/startDate`);};
    const goPage3    = () =>{onNavigation('endDate');props.history.push(`${props.match.path}/endDate`);};

    const makeButtonArray = ({medId, page}) => {
        console.log(`makeButtonArray ${page} ... ${medId}`);

        const buttons = [];

        if (page === 'select') {

            let c = ButtonInfo('Back', false, exitWizard);
            buttons.push(c);
            let b = ButtonInfo('Next', false, goPage2);
            buttons.push(b);

            if (medId === -1) {
                //console.log(`make ${b.label} false`);
                b.isDisabled = true;
            }
        }
        else if (page === 'startDate') {
            let c = ButtonInfo('Back', false, goPage1);
            buttons.push(c);
            let b = ButtonInfo('Next', false, goPage3);
            buttons.push(b);
        }
        else if (page === 'endDate') {
            let c = ButtonInfo('Bakk', false, goPage2);
            buttons.push(c);
            let b = ButtonInfo('Next', false, goPage3);
            buttons.push(b);
        }
        //console.log("returning");
        //console.log(buttons);

        return buttons;
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
                               editEndDate={false} />
                </Route>
                <Route path={`${props.match.path}/endDate`}>
                    <StartDate medicineName={state.medicineName} 
                                 startDate={state.startDate}
                                 endDate={state.endDate}
                                 handleFormChange={dateChanged('endDate')} 
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


 // import {matchPath} from 'react-router-dom'
 // const subPages = ['select','startDate','endDate'];
 // const whichSubPage = (props, subPages) => 
 //     subPages.find(subPage => 
 //                          matchPath(props.location.pathname, 
 //                                    { path: `${props.match.path}/${subPage}`}) !== null);


