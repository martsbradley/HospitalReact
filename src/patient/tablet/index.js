import React,{useEffect, useState} from 'react'
import {Route, Switch, matchPath} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tabletSelect'
import PropTypes from 'prop-types';
 
function NoMatch() {
  return (
          <div>
            <h3>
              No match 
            </h3>
          </div>
        );
}

const ButtonInfo = (label, isDisabled, target) => {
    const b = {label     : label,
               isDisabled : isDisabled,
               target    : target};
    return b;
}

const TabletWizardController = ({page, selectedMedId, path, history}) => {

    console.log(`history is ${history}`);
    const toPatientsPage = () => history.push("/patients/list");
    const select    = () => history.push(`${path}/select`);
    const startDate = () => history.push(`${path}/startDate`);
    const endDate   = () => history.push(`${path}/endDate`);

    const buttons = [];

    if (page === 'select') {

        let c = ButtonInfo('Back', false, toPatientsPage);
        buttons.push(c);
        let b = ButtonInfo('Next', false, startDate);
        buttons.push(b);

        if (selectedMedId === -1) {
            console.log(`make ${b.label} false`);
            b.isDisabled = true;
        }
    }
    else if (page === 'startDate') {
        let c = ButtonInfo('Back', false, select);
        buttons.push(c);
        let b = ButtonInfo('Next', false, endDate);
        buttons.push(b);
    }
    else if (page === 'endDate') {
        let c = ButtonInfo('Bakk', false, startDate);
        buttons.push(c);
        let b = ButtonInfo('Next', false, endDate);
        buttons.push(b);
    }

    const res = buttons.map(
        b => 
        { 
            console.log(`${b.label} = ${b.isDisabled}`);
            return (
            <button key={b.label} disabled={b.isDisabled} type="input" onClick={b.target}>
                {b.label}
            </button>
        );
        });


    return (<div className="form-line">
                 <div className="form-group">
                    {res}
                </div>
            </div>); 
}

TabletWizardController.propTypes = {
    page          : PropTypes.string,
    selectedMedId : PropTypes.number,
    path          : PropTypes.string,
    history       : PropTypes.object,
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
    const [state, setState] = useState( { filter: "xx", 
                                          activeWizardPage: "",
                                          selectedMedId: -1});
    useEffect(() => {
        loadMedicines(activePage, itemsPerPage);
    },[]);

    function filterChanged(aFilter) {

        setState(state => ({...state,
                       filter: aFilter }));
        /*console.log("<<<");
        console.log(aFilter);
        console.log(">>>");
        console.log(state.filter);*/
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
                <Route path={`${match.path}/startDate`} render={()=><h2>Start Date</h2>} />
                <Route path={`${match.path}/endDate`} render={()=><h2>End Date</h2>} />
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
