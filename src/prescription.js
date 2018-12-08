import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import PrescriptionAdd from './prescriptionadd.js'
import PrescriptionStart from './prescriptionstart.js'
import PrescriptionEnd from './prescriptionend.js'
import Confirm from './confirm.js'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'


function dateFormat() {
    return 'YYYY-MM-DD';
}
function todayAsYYYYMMDD() {
    const today = format(new Date(), dateFormat());
    return today;
}

function NoMatch() {
  return (
          <div>
            <h3>
              No match 
            </h3>
          </div>
        );
}

export default class Prescription extends React.Component {

    constructor(props) {
        super(props);

        this.state = { selectedMedicine : -1,
                       startDate : todayAsYYYYMMDD()}
        this.medicineSelectionClick = this.medicineSelectionClick.bind(this);
        this.isMedicineSelected = this.isMedicineSelected.bind(this);
        this.startDateChanged = this.startDateChanged.bind(this);
        this.isStartDateValid = this.isStartDateValid.bind(this);
        console.log("constr isStartDateValid " + this.state.startDate);

    }

    isMedicineSelected() {
        return this.state.selectedMedicine !== -1;
    }

    medicineSelectionClick(medicineId) {
        if (medicineId === this.state.selectedMedicine) {
            medicineId = -1;
        }

        this.setState({selectedMedicine : medicineId });

    }

    startDateChanged(aDate) {
        console.log("startDateChanged " + aDate);
        this.setState({startDate: aDate});
    }

    isStartDateValid() {
        let startDateInFuture = true;
        try {
            const nowIs = new Date();

            const startDate = parse(this.state.startDate, 
                                    dateFormat(),
                                    new Date());

            startDateInFuture = isBefore(nowIs, startDate)

            console.log("now " + nowIs);
            console.log("startDate " + startDate);
        } catch (e) {
            console.log("Caught an error" + e);
        }

        console.log("startDate after now " + startDateInFuture);
        return startDateInFuture
    }

    render () {
        const patientId = this.props.match.params["patientId"];
      return (
        <Switch>
          <Route path={`${this.props.match.path}/medicine`} exact 
               render={() => <PrescriptionAdd   
                                 patientId={patientId}
                                 selectedMedicine={this.state.selectedMedicine}
                                 canMoveNextPage={this.isMedicineSelected}
                                 mouseClicked={this.medicineSelectionClick} 
                                 {...this.props}/> } />

          <Route path={`${this.props.match.path}/setStartDate`} render={
               ()=> <PrescriptionStart 
                                 startDate={this.state.startDate} 
                                 updateDate={this.startDateChanged} 
                                 canMoveNextPage={this.isStartDateValid}
                                 {...this.props}/> } />

          <Route path={`${this.props.match.path}/setEndDate`} component={PrescriptionEnd}/>
          <Route path={`${this.props.match.path}/confirmed`} component={Confirm}/>
          <Route component={NoMatch} />
        </Switch>)
    }
}

Prescription.propTypes = {
    match : PropTypes.object,
}
