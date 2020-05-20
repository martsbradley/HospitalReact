import React,{/*useEffect,*/ useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tablet-select-container';
import PropTypes from 'prop-types';
import StartDate from './start-date';
import TabletWizardController from './tablet-wizard-controller';
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD} from '../../dateutils.js'
 
function NoMatch() {
  return <h1> No match</h1>;
}

export default function TabletWizard(props)
{
    const [state, setState] = useState( { medicineName : '',
                                          startDate    : todayAsYYYYMMDD(),
                                          endDate      : tomorrowAsYYYYMMDD(),
                                          selectedMedId: -1});

    const dateChanged = dateName => value => 
        setState(state => ({...state, 
                            [dateName]: value }));

    //useEffect(() => console.log("TabletWizard rerender"),[]);

    function medicineSelectedFn(medicineSelected) {

        const {id, name } = medicineSelected;
        //console.log(`TabletWizard id ${id} name ${name}`);
        setState(state => ({...state,
                            selectedMedId: id,
                            medicineName : name }));
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

            <TabletWizardController selectedMedId={state.selectedMedId} 
                                    startDate={state.startDate}
                                    endDate={state.endDate}
                                    {...props}/>
        </>
    </ErrorBoundary>;
}

TabletWizard.propTypes = {
    match          : PropTypes.object,
}
