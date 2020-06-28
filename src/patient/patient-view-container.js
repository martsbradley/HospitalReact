import { connect } from "react-redux";
import PatientView from './patient-view'

function mapStateToProps(state) {
    return {
        patient    : state.patient.current,
    };
}

export default connect(mapStateToProps, null)(PatientView);
