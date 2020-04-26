import React from 'react'
//import PropTypes from 'prop-types';
//import Pagination from 'react-js-pagination'
//import { Redirect, Link } from 'react-router-dom'
//import ValidationMessage from '../../validationmessage.js'
//import Medicine from '../../medicine.js'

/* this.handleFilterChange = this.handleFilterChange.bind(this);
 * onSubmit
 * the filter
 * the active page
itemsCountPerPage={this.props.numItemsOnPage}
totalItemsCount={this.props.totalItemsCount}
 */

export default class TabletSelect extends React.Component {
    constructor(props) {
        super(props);

    //  this.state = {  
    //    success: false,
    //    showWarning: false,
    //    meds: [],
    //    loaded: false,
    //    numItemsOnPage: 5,
    //    totalItemsCount: 0,
    //  };
    //  this.handleFilterChange = this.handleFilterChange.bind(this);
    //  this.loadTable = this.loadTable.bind(this);
    //  this.totalMedsURL = this.totalMedsURL.bind(this)
    //  this.pageChange  = this.pageChange.bind(this);
    }

    render () {
        return <h1>here</h1>;
    }
}

//      const meds = [];

//      const isBlocking = false;//this.state.showWarning;

//    //if (this.state.success === true) {
//    //    return <Redirect to="setStartDate"/>
//    //}

//      let filterElement = <input type="text" style={{display: 'inline'}} 
//                                 name="filter" value={'filter'}
//                                 onChange={null} />

//      let result = (<div>
//          
//          <h1>Prescription Select Medicine</h1>
//          <form onSubmit={null}>
//              <div className="col-md-6">
//                  <div className="form-line">
//                      <div style={{display:'inline'}}>
//                          <label htmlFor="filter">Filter:</label>
//                          {filterElement }
//                      </div>
//                      <div className="bordered">
//                          <Pagination itemClass="page-item"
//                                      linkClass="page-link"
//                                      activePage={1}
//                                      itemsCountPerPage={5}
//                                      totalItemsCount={5}
//                                      pageRangeDisplayed={5}
//                                      onChange={null} 
//                                      innerClass="pagination pages" />

//                        <Medicine meds={meds} 
//                                  selectedMedicine={1} 
//                                  mouseClicked={null} />
//                      </div>

//                  </div>
//                  <div style={{clear: 'right'}} className="form-line">
//                      <ValidationMessage when={isBlocking} what="Please select a medicine"/>
//                  </div>

//                  <div className="form-line">
//                      <div className="form-group">
//                          <Link to={`/patients/edit/${this.props.patientId}`}><button>Cancel</button></Link>
//                          <button type="submit">Next</button>
//                      </div>
//                  </div>
//              </div>
//          </form>
//      
//      </div>);
//      return result;
//  }
//}

//  TabletSelect.propTypes = {
//      mouseClicked: PropTypes.func,
//      selectedMedicine: PropTypes.number,
//      canMoveNextPage: PropTypes.func,
//      patientId : PropTypes.string,
//      history : PropTypes.object,
//      activePage: PropTypes.number,
//      pageChanged: PropTypes.func,
//      filter:      PropTypes.string,
//      filterChanged: PropTypes.func,
//  }