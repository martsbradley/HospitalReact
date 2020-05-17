import TabletSelect from './tabletSelect'
import {medicinesPaged} from '../../redux/actions/medicineActions';
import { connect } from "react-redux";

function mapStateToProps(state) {
  const medicine = state.medicine;

  const result = {
      medicines         : medicine['list'],
      activePage        : medicine['pageNumber'],
      itemsPerPage      : medicine['itemsPerPage'],
      totalItemsCount   : medicine['totalItems'],
      filter            : medicine['filter'],
  };

  return result;
}

const mapDispatchToProps = {
    pageChanged:  medicinesPaged
}

export default connect(mapStateToProps, mapDispatchToProps)(TabletSelect);
