import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
//import {createPrescription} from '../../redux/actions/medicineActions';
import {useParams /*,Route, Switch, Link, useHistory, useRouteMatch,useLocation*/ } from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import PropTypes from 'prop-types';
 
TabletDelete.propTypes = {
    deletePrescription: PropTypes.func,
    prescription      : PropTypes.obj
};

export default function TabletDelete({prescription})
                 
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

   return <ErrorBoundary>
        <>
           <h1>Delete Prescription {id} </h1>
            <form>
            <div className="col-md-6">
               <div className="form-group row">
                   <label htmlFor="medicine" className="col-sm-2 col-form-label">Medicine</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput">{prescription.medicine.name}</span>
                   </div>
               </div>
               <div className="form-group row">
                   <label className="col-sm-2 col-form-label">Start Date</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput">{prescription.startDate}</span>
                   </div>
               </div>
               <div className="form-group row">
                   <label className="col-sm-2 col-form-label">End Date</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput"  >{prescription.endDate}</span>
                   </div>
               </div>
          
                <Link  to={`/patients/form/${patientId}`}><button>Cancel</button></Link>
            </div>
            </form>
        </>
    </ErrorBoundary>;
}
/*
const mapDispatchToProps = {
    createPrescription: createPrescription
};

export default connect(null, mapDispatchToProps)(TabletWizard);*/
