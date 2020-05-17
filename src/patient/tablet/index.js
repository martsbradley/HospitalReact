import React,{useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tabletSelect'
import PropTypes from 'prop-types';
import StartDate from './start-date';
import TabletWizardController from './tablet-wizard-controller';
//import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD, dateFormat} from '../../dateutils.js'
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

//  useEffect(() => {
//      console.log("useEffect1 ..");
//      medicinesPaged(activePage, itemsPerPage, '');
//  }, []);

    function medicineSelected(medicineId) {
        // Deselect if clicked twice.
        medicineId = state.selectedMedId === medicineId? -1 : medicineId;

        let name = '???'
//      if (medicineId !== -1) {
//          const med = medicines.find(e => e.id === medicineId);

//          if (med !== null) {
//              name = med.name;
//          }
//      }

        //console.log(`medicineId=${medicineId}  name='${name}'`);
        setState(state => ({...state,
                            medicineName : name,
                            selectedMedId: medicineId }));
    }

//  const pagingHelper = (activePage) => 
//                medicinesPaged(activePage, itemsPerPage, state.filter);


    function Selection() {
        return  <TabletSelect selectedMedId   = {state.selectedMedId}
                              medicineClicked = {medicineSelected}  />

                              
                           // medicineClicked = {medicineSelected}
                           // totalItemsCount = {totalItemsCount}/>
                           // activePage      = {activePage}
                           // itemsPerPage    = {itemsPerPage}
                           // pageChanged     = {medicinesPaged}
                           // totalItemsCount = {totalItemsCount}/>
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

  /*activePage     : PropTypes.number,
    medicines      : PropTypes.array,
    itemsPerPage   : PropTypes.number,
    totalItemsCount: PropTypes.number,
    medicinesPaged : PropTypes.func,
    pageChanged    : PropTypes.func,*/


//index.js does not need much info
//just accepts details from children.

