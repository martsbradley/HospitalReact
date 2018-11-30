import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import PrescriptionAdd from './prescriptionadd.js'
import PrescriptionStart from './prescriptionstart.js'
import PrescriptionEnd from './prescriptionend.js'
import Confirm from './confirm.js'



export default class Prescription extends React.Component {
    constructor(props) {
        super(props);

        console.log("Prescription constructor " + this.props.match);
        this.state = {  };
    }

    render () {
        console.log("Render Prescription " + this.props.match.path);
      return (
        <Switch>
          <Route path={`${this.props.match.path}/medicine`} exact component={PrescriptionAdd} />
          <Route path={`${this.props.match.path}/setStartDate`} component={PrescriptionStart} />
          <Route path={`${this.props.match.path}/setEndDate`} component={PrescriptionEnd}/>
          <Route path={`${this.props.match.path}/confirm`} component={Confirm}/>
        </Switch>)
    }
}

Prescription.propTypes = {
    match : PropTypes.object,
}
