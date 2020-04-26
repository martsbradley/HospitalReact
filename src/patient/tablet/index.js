import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import TabletSelect from './tabletSelect.js'
import { connect } from "react-redux";
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

function TabletRouter({match}) {
    console.log("here... in tablerouter")
    return <ErrorBoundary>
        <Switch>
            <Route path={`${match.path}/select`} exact 
                                                      component={TabletSelect} />

               <Route component={NoMatch} />
        </Switch>
    </ErrorBoundary>;
}
//<!--
//<Route path={`${this.props.match.path}/setDateStart`} component={SetStartDate} />
//<Route path={`${this.props.match.path}/setDateEnd`}   component={SetEndDate} />
//<Route path={`${this.props.match.path}/confirmation`} component={Confirmation} /> -->


TabletRouter.propTypes = {
    match : PropTypes.object,
}

function mapStateToProps(state) {
  const medicine = state.medicine;

  const result = {
      medicines         : medicine['list'],
      activePage        : medicine['pageNumber'],
      itemsPerPage      : medicine['itemsPerPage'],
      totalItemsCount   : medicine['totalItems'],
      errorInfo         : state.error
  };

  return result;
}

const mapDispatchToProps = {
  loadMedicine:  medicineActions.loadMedicineAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(TabletRouter);