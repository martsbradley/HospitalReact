import React,{useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tabletSelect'
import PropTypes from 'prop-types';
import Buttons from './buttons';

function NoMatch() {
  return (
          <div>
            <h3>
              No match 
            </h3>
          </div>
        );
}

export default function TabletWizard({loadMedicines,
                                      medicines,
                                      activePage,
                                      itemsPerPage,
                                      totalItemsCount,
                                      match}){
    const [state, setState] = useState(
                      { filter: "xx", 
                        selectedMedId: -1});
    
    useEffect(() => {
        loadMedicines(activePage, itemsPerPage);
    },[]);


    function filterChanged(aFilter) {

        setState(state => ({...state,
                       filter: aFilter }));
        console.log("<<<");
        console.log(aFilter);
        console.log(">>>");
        console.log(state.filter);
    }

    function medicineSelected(medicineId) {
        medicineId = state.selectedMedId === medicineId? -1 : medicineId;
        console.log(`id is ${medicineId}`);
        setState(state => ({...state,
                            selectedMedId: medicineId }));
    }

    function medicinePageChanged(aPage) {
        console.log("Page " + aPage);
        loadMedicines(activePage, itemsPerPage);
    }


    function Selection() {
        return  <TabletSelect filter={state.filter} 
                                      filterChanged   ={filterChanged} 
                                      medicines       ={medicines}
                                      medicineClicked ={medicineSelected}
                                      selectedMedId   ={state.selectedMedId}
                                      activePage      ={activePage}
                                      itemsPerPage    ={itemsPerPage}
                                      pageChanged     ={medicinePageChanged}
                                      totalItemsCount ={totalItemsCount}/>
    }

    return <ErrorBoundary>
        <>
            <Switch>
                <Route path={`${match.path}/select`} exact component={Selection} />
                <Route component={NoMatch} />
            </Switch>

            <Buttons/>
        </>
    </ErrorBoundary>;
}

TabletWizard.propTypes = {
    match          : PropTypes.object,
    loadMedicines  : PropTypes.func,
    medicines      : PropTypes.array,
    activePage     : PropTypes.number,
    itemsPerPage   : PropTypes.number,
    totalItemsCount: PropTypes.number,
    pageChanged    : PropTypes.func,
}
