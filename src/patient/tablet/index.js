import React,{useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tablet-select-container';
import PropTypes from 'prop-types';
import StartDate from './start-date';
import /*TabletWizardController,*/ {MyButtons,ButtonInfo} from './tablet-wizard-controller';
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD} from '../../dateutils.js'
import {matchPath} from 'react-router-dom'
 
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
                                          buttonArr: []});

    const dateChanged = dateName => value => {
        setState(state => ({...state, 
                            [dateName]: value }));
    }

    useEffect(() => {
        console.log("TabletWizard rerender");
        const buttonArr = makeButtonArray({...props, selectedMedId: state.selectedMedId});

        setState(state => ({...state, buttonArr}));
    }
    ,[]);
      

    function medicineSelectedFn(medicineSelected) {

        const {id, name } = medicineSelected;
        //console.log(`TabletWizard id ${id} name ${name}`);
        const buttonArr = makeButtonArray({...props, selectedMedId:id});
        setState(state => ({...state,
                            selectedMedId: id,
                            medicineName : name,
                            buttonArr}));
    }

    return <ErrorBoundary>
        <>
        name= {state.medicineName}

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

const subPages = ['select','startDate','endDate'];
const whichSubPage = (props, subPages) => 
    subPages.find(subPage => 
                         matchPath(props.location.pathname, 
                                   { path: `${props.match.path}/${subPage}`}) !== null);


const makeButtonArray = (props) => {
  const {selectedMedId} =  props;

  const exitWizard = () => props.history.push("/patients/list");
  const goPage1    = () => props.history.push(`${props.match.path}/select`);
  const goPage2    = () => props.history.push(`${props.match.path}/startDate`);
  const goPage3    = () => props.history.push(`${props.match.path}/endDate`);

  const page = whichSubPage(props, subPages);

  console.log(`Subpage is ${page} ${selectedMedId}`);
 /* console.log(`pathname = ${props.location.pathname}`);
  * console.log(`path = ${props.match.path}`);
  */

    const buttons = [];

    if (page === 'select') {

        let c = ButtonInfo('Back', false, exitWizard);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goPage2);
        buttons.push(b);

        if (selectedMedId === -1) {
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
    console.log("returning");
    console.log(buttons);

    return buttons;
}
