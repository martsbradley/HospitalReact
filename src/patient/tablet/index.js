import React,{useEffect, useState} from 'react'
import {Route, Switch, matchPath} from 'react-router-dom'
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

const button = (label, isDisabled, target) => {
    const b = {label     : label,
               isDisabled : isDisabled,
               target    : target};
               
    return b;
}


const Ctrl = ({page, selectedMedId, path, history}) => {

    console.log(`history is ${history}`);
    const gotoStartDate =  () => history.push(`${path}/pageTwo`);
    const toPatientsPage = () => history.push("/patients/list");

    const buttons = [];

    if (page === 'select') {

        const c = button('Back', false, toPatientsPage);
        buttons.push(c);
        const b = button('Next', false, gotoStartDate);
        buttons.push(b);

        if (selectedMedId === -1) {
            console.log(`make ${b.label} false`);
            b.isDisabled = true;
        }
    }
    /*else if (page === 'pageTwo') {
    }*/

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

Ctrl.propTypes = {
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

    console.log('match');
    console.log(match);

    let subPage = '';
    const {pathname} = location;

    // Now have which sub page is active currently in result.
    const subPages = ['select','pageTwo'];

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
                <Route path={`${match.path}/pageTwo`} render={()=><h2>Hi</h2>} />
                <Route component={NoMatch} />
            </Switch>

            <Ctrl page={subPage}
                     selectedMedId={state.selectedMedId}
                     path={match.path}
                     {...props}/>

        </>
    </ErrorBoundary>;
}

/*
            <Buttons {...props}
                     path={match.path} 
                     selectedMedId={state.selectedMedId}/>
*/


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
