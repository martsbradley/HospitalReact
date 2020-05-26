import React,{useEffect} from 'react'
//import { connect } from "react-redux";
//import {createPrescription} from '../../redux/actions/medicineActions';
import {useParams /*,Route, Switch, Link, useHistory, useRouteMatch,useLocation*/ } from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import PropTypes from 'prop-types';
 
TabletDelete.propTypes = {
    deletePrescription: PropTypes.func
};

export default function TabletDelete()
{
    const {patientId,id} = useParams()

    useEffect(() => {
        console.log("loading delete data");
        // run an action to load the prescription details.
        // directly from the loaded list.
        //
        // Rather than using a Link to get here
        // Create a redux action that will
        // store the prescription details.
        // The data for this screen is already
        // present so it should not be loaded across
        // the network.
        //
    },[]);

    const medicineName = "heroine";
    const startDate = "2020-01-01";
    const endDate = "2020-01-01";

    console.log("Now in patient delete");

   return <ErrorBoundary>
        <>
           <h1>Delete Prescription</h1>
            <div className="col-md-6 form-line">
               <div className="form-group">
                   <label htmlFor="medicine">Medicine</label>
                   <input type="input" className="form-control-plaintext" name="medicine" 
                          readOnly disabled value={medicineName} />
               </div>
               <div className="form-group">
                   <label htmlFor="{fieldName}">Start Date</label>
                   <span className="form-control-plaintext">{startDate}</span>
               </div>
               <div className="form-group">
                   <label htmlFor="{fieldName}">End Date</label>
                   <span className="form-control-plaintext">{endDate}</span>
               </div>
          
             <br/>
              patientId = {patientId}
              id = {id}
            </div>
        </>
    </ErrorBoundary>;
}
/*
const mapDispatchToProps = {
    createPrescription: createPrescription
};

export default connect(null, mapDispatchToProps)(TabletWizard);*/
