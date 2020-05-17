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
    //const {medicinesPaged, medicines, activePage, itemsPerPage, totalItemsCount} = props;

    const [state, setState] = useState( { medicineName : '',
                                          startDate    : todayAsYYYYMMDD(),
                                          endDate      : tomorrowAsYYYYMMDD(),
                                          selectedMedId: -1});

    const dateChanged = dateName => value => 
        setState(state => ({...state, 
                            [dateName]: value }));

    function medicineSelected(medicineSelected) {

        const {id, name } = medicineSelected;
        console.log(`id ${id} name ${name}`);
        setState(state => ({...state,
                            medicineName : id,
                            selectedMedId: name }));
    }

    function Selection() {
        return <TabletSelect selectedMedId   = {state.selectedMedId}
                             medicineSelected= {medicineSelected}  />
    }
    function StartPage() {
        return <StartDate medicineName={state.medicineName} 
                          startDate={state.startDate}
                          endDate={state.endDate}
                          handleFormChange={dateChanged('startDate')} 
                          editEndDate={false} />;
    }
    function EndPage() {
        return <StartDate medicineName={state.medicineName} 
                          startDate={state.startDate}
                          endDate={state.endDate}
                          handleFormChange={dateChanged('endDate')} 
                          editEndDate={true} />;
    }

    return <ErrorBoundary>
        <>
            <Switch>
                <Route path={`${props.match.path}/select`}    exact component={Selection} />
                <Route path={`${props.match.path}/startDate`} component={StartPage} />
                <Route path={`${props.match.path}/endDate`}   component={EndPage} />
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
