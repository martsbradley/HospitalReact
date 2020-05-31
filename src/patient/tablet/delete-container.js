import TabletDelete from './delete';
import {deletePrescriptionAction} from '../../redux/actions/medicineActions';
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        presc: state.patient.prescription
    };
}

const mapDispatchToProps = {
    deletePrescription:  deletePrescriptionAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TabletDelete);
