import React,{useEffect} from 'react'
import {Link} from "react-router-dom";
import {useParams/*, useHistory*/} from 'react-router-dom'
import ErrorBoundary from '../../errorboundary.js'
import PropTypes from 'prop-types';

export default function TabletDelete(props)
{
    const {patientId,prescriptionId} = useParams()

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

    //let history = useHistory();

    const reloadPatientPage = () => {
        //history.push(`/patients/form/${patientId}`);
        console.log("reloadPatientPage");
    }

    function performDelete()  {
      console.log("performDelete");

      props.deletePrescription(prescriptionId, reloadPatientPage);
    }

   return <ErrorBoundary>
        <>
           <h1>Delete Prescription {prescriptionId} </h1>
            <div className="col-md-6">
               <div className="form-group row">
                   <label htmlFor="medicine" className="col-sm-2 col-form-label">Medicine</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput">{props.presc.medicine.name}</span>
                   </div>
               </div>
               <div className="form-group row">
                   <label className="col-sm-2 col-form-label">Start Date</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput">{props.presc.startDate}</span>
                   </div>
               </div>
               <div className="form-group row">
                   <label className="col-sm-2 col-form-label">End Date</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput"  >{props.presc.endDate}</span>
                   </div>
               </div>
          
                <Link to={`/patients/form/${patientId}`}><button>Cancel</button></Link>
                 <button onClick={performDelete}>Delete</button>
            </div>
        </>
    </ErrorBoundary>;
}

TabletDelete.propTypes = {
    presc: PropTypes.object,
    deletePrescription: PropTypes.func,
};

