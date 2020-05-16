import TabletWizard from './index.js'
import {medicinesPaged} from '../../redux/actions/medicineActions';
import { connect } from "react-redux";

function mapStateToProps(state) {
  const medicine = state.medicine;

  const result = {
      medicines         : medicine['list'],
      activePage        : medicine['pageNumber'],
      itemsPerPage      : medicine['itemsPerPage'],
      totalItemsCount   : medicine['totalItems'],
      /*errorInfo         : state.error*/
  };

  return result;
}

const mapDispatchToProps = {
    medicinesPaged:  medicinesPaged
}

export default connect(mapStateToProps, mapDispatchToProps)(TabletWizard);
