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
import differenceInDays from 'date-fns/difference_in_days'


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

        this.state = { selectedMedicineId : -1,
                       selectedMedicineName : '',
                       startDate : todayAsYYYYMMDD(),
                       endDate : todayAsYYYYMMDD()}
        this.medicineSelectionClick = this.medicineSelectionClick.bind(this);
        this.isMedicineSelected = this.isMedicineSelected.bind(this);
        this.startDateChanged = this.startDateChanged.bind(this);
        this.isStartDateValid = this.isStartDateValid.bind(this);

        this.endDateChanged = this.endDateChanged.bind(this);
        this.isEndDateValid = this.isEndDateValid.bind(this);

        console.log("constr isStartDateValid " + this.state.startDate);

    }

    isMedicineSelected() {
        return this.state.selectedMedicineId !== -1;
    }

    medicineSelectionClick(medicineId, medicineName) {
        if (medicineId === this.state.selectedMedicineId) {
            medicineId = -1;
            medicineName = '';
        }
        console.log("Got the medicineName "+ medicineName);

        this.setState({selectedMedicineId : medicineId,
                       selectedMedicineName : medicineName});

    }

    startDateChanged(aDate) {
        console.log("startDateChanged " + aDate);
        this.setState({startDate: aDate});
    }

    endDateChanged(aDate) {
        console.log("endDateChanged " + aDate);
        this.setState({endDate: aDate});
    }

    isStartDateValid() {
        let startDateValid = false;
        try {
            const nowIs = new Date();

            const startDate = parse(this.state.startDate, 
                                    dateFormat(),
                                    new Date());

            //  Same day or after today
            startDateValid = differenceInDays (nowIs, startDate) === 0 || 
                             isBefore(nowIs, startDate);

            console.log("startDate " + startDate);
            console.log("now " + nowIs);
                             
        } catch (e) {
            console.log("Caught an error" + e);
        }

        console.log("startDate after now " + startDateValid);
        return startDateValid
    }

    isEndDateValid() {
        let endDateValid = false;
        try {
            const startDate = parse(this.state.startDate, 
                                    dateFormat(),
                                    new Date());

            const endDate = parse(this.state.endDate, 
                                    dateFormat(),
                                    new Date());

            endDateValid = isBefore(startDate, endDate);
                             
        } catch (e) {
            console.log("Caught an error" + e);
        }

        console.log("endDateValid after now " + endDateValid);
        return endDateValid
    }

    render () {
        const patientId = this.props.match.params["patientId"];
      return (
        <Switch>
          <Route path={`${this.props.match.path}/medicine`} exact 
               render={() => <PrescriptionAdd   
                                 patientId={patientId}
                                 selectedMedicine={this.state.selectedMedicineId}
                                 canMoveNextPage={this.isMedicineSelected}
                                 mouseClicked={this.medicineSelectionClick} 
                                 {...this.props}/> } />

          <Route path={`${this.props.match.path}/setStartDate`} render={
               ()=> <PrescriptionStart 
                                 medicineName={this.state.selectedMedicineName} 
                                 startDate={this.state.startDate} 
                                 updateDate={this.startDateChanged} 
                                 canMoveNextPage={this.isStartDateValid}
                                 {...this.props}/> } />

          <Route path={`${this.props.match.path}/setEndDate`} render = {
              () => <PrescriptionEnd 
                        medicineName={this.state.selectedMedicineName} 
                        startDate={this.state.endDate} 
                        updateDate={this.endDateChanged} 
                        canMoveNextPage={this.isEndDateValid}
                        {...this.props} /> } />

          <Route path={`${this.props.match.path}/confirmed`} component={Confirm}/>

          <Route component={NoMatch} />

        </Switch>)
    }
}

Prescription.propTypes = {
    match : PropTypes.object,
}
