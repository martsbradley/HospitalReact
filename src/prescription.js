import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import PrescriptionAdd from './prescriptionadd.js'
import BackButton from './backbutton.js'


function setStartDate(props) {
                            
    return <div>Set Start Date<BackButton {...props}/></div>;
}

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
          <Route path={`${this.props.match.path}`} exact component={PrescriptionAdd} />
          <Route path={`${this.props.match.path}/setStartDate`} render={setStartDate} />
        </Switch>)
    }
}

Prescription.propTypes = {
    match : PropTypes.object,
}
