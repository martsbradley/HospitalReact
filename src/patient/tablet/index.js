import React,{useEffect, useState} from 'react'
import {Route, Switch, matchPath} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tabletSelect'
import PropTypes from 'prop-types';
import StartDate from './start-date';
import TabletWizardController from './tablet-wizard-controller';
//import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD, dateFormat} from '../../dateutils.js'
import {tomorrowAsYYYYMMDD, todayAsYYYYMMDD} from '../../dateutils.js'
 
function NoMatch() {
  return <h3> No match </h3>;
}

export default function TabletWizard({loadMedicines,
                                      medicines,
                                      activePage,
                                      itemsPerPage,
                                      totalItemsCount,
                                      match,
                                      location,
                                      ...props})
{
    const [state, setState] = useState( { filter       : "", 
                                          medicineName : '',
                                          startDate    : todayAsYYYYMMDD(),
                                          endDate      : tomorrowAsYYYYMMDD(),
                                          selectedMedId: -1});
    useEffect(() => {
        loadMedicines(activePage, itemsPerPage);
    },[]);

    function filterChanged(aFilter) {

        setState(state => ({...state,
                       filter: aFilter }));
    }

    const dateChanged = dateName => value => 
        setState(state => ({...state, 
                            [dateName]: value }));

    function medicineSelected(medicineId) {
        // Deselect if clicked twice.
        medicineId = state.selectedMedId === medicineId? -1 : medicineId;

        const med = medicines.find(e => e.id === medicineId);
        if (med != null) {
            const name = med.name;

            setState(state => ({...state,
                                medicineName : name,
                                selectedMedId: medicineId }));
        }
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

    console.log('match');
    console.log(match);

    let subPage = '';
    const {pathname} = location;

    // Now have which sub page is active currently in result.
    const subPages = ['select','startDate','endDate'];

    for (let i = 0; i < subPages.length; i++) {
        subPage = subPages[i];

        const matched = matchPath(pathname, { path: `${match.path}/${subPage}`}) !== null;
        if (matched) {
            break;
        }
    }
    console.log(`Subpage is ${subPage}`);


    return <ErrorBoundary>
        <>
        active={subPage}
            <Switch>
                <Route path={`${match.path}/select`} exact component={Selection} />
                <Route path={`${match.path}/startDate`} component={StartPage} />
                <Route path={`${match.path}/endDate`}   component={EndPage} />
                <Route component={NoMatch} />
            </Switch>

            <TabletWizardController page={subPage}
                                    selectedMedId={state.selectedMedId}
                                    path={match.path}
                                    {...props}/>
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
    location       : PropTypes.shape({
                         pathname: PropTypes.string
                    })
}
