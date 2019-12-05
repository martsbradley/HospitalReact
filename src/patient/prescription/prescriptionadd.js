import React from 'react'
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination'
import { Redirect, Link } from 'react-router-dom'
import ValidationMessage from '../../validationmessage.js'
import Medicine from '../../medicine.js'


export default class PrescriptionAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
          success: false,
          showWarning: false,
          meds: [],
          loaded: false,
          numItemsOnPage: 5,
          totalItemsCount: 0,
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.createLoadURL = this.createLoadURL.bind(this);
        this.urlPrefix = '/rest/hospital/medicines/';
        this.loadTable = this.loadTable.bind(this);
        this.totalMedsURL = this.totalMedsURL.bind(this)
        this.pageChange  = this.pageChange.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);
    }


    totalMedsURL () {
        const filter =  this.props.filter;
        return this.urlPrefix + `total?filter=${filter}`;
    }

    createLoadURL(aActivePage) {
        let numItemsOnPage = this.state.numItemsOnPage

        let start = (aActivePage - 1) * numItemsOnPage
        const filter =  this.props.filter;

        let result = this.urlPrefix + `?start=${start}&max=${numItemsOnPage}&filter=${filter}`;

        return result
    }

    componentDidMount () {
        this.loadTable(this.props.activePage)
    }

    pageChange (activePage) {
      this.loadTable(activePage)
    }

    loadTable (aActivePage) {
      const loadMeds = fetch(this.createLoadURL(aActivePage))
      const countMeds = fetch(this.totalMedsURL())
      
      Promise.all([loadMeds, countMeds])
        .then(responses => {
          // All the headers have arrived.
          if (responses[0].ok && responses[1].ok) {
            return Promise.all([responses[0].json(), responses[1].json()])
          } else {
            throw Error([responses[0].statusText(), responses[1].statusText()])
          }
        },
        networkError => {
          alert('Network Failure ' + networkError)
        }
        )
        .then(dataArray => {
          // The data from the response bodies has arrived.
          const medsArray = dataArray[0];
          const total = dataArray[1];

      
          this.setState({ meds: medsArray,
            totalItemsCount: total },
          () => {console.log("finally loaded " + medsArray.length);})

           this.props.pageChanged(aActivePage);
        }
        )
        .catch(() => {
          alert('There were errors')
        })
    }

    handleFilterChange(event) {
        this.props.filterChanged(event.target.value);

        this.setState({ activePage: 1 },
            () => {
            this.loadTable(this.state.activePage);
        });
    }

    handleFormChange (event) {
      let formData = this.state.formData
      formData[event.target.name] = event.target.value
      this.setState({ formData })
    }

    onSubmit(event) {
      console.log("prescriptionadd submitted");

      if (this.props.canMoveNextPage()) {
          console.log("Can move to the next page!");
          console.log("History is a " + typeof(this.props.history));
        this.setState({success: true});
      }
      else {
        this.setState({showWarning: true});
      }
    }

    render () {
        const meds = this.state.meds;

        const isBlocking = this.state.showWarning;

        if (this.state.success === true) {
            return <Redirect to="setStartDate"/>
        }
        //
        let filterElement = <input type="text" style={{display: 'inline'}} 
                                   name="filter" value={this.props.filter}
                                   onChange={this.handleFilterChange} />

        if (this.props.filter === '') {

            filterElement = <input type="text" style={{display: 'inline'}} 
                                   name="filter" value={this.props.filter}
                                   placeholder="filter by name" 
                                   onChange={this.handleFilterChange} />
        }

        let result = (<div>
            
            <h1>Prescription Select Medicine</h1>
            <form onSubmit={this.onSubmit}>
                <div className="col-md-6">
                    <div className="form-line">
                        <div style={{display:'inline'}}>
                            <label htmlFor="filter">Filter:</label>
                            {filterElement }
                        </div>
                        <div className="bordered">
                            <Pagination itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={this.props.activePage}
                                        itemsCountPerPage={this.state.numItemsOnPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={5}
                                        onChange={this.pageChange} 
                                        innerClass="pagination pages" />

                          <Medicine meds={meds} 
                                    selectedMedicine={this.props.selectedMedicine} 
                                    mouseClicked={this.props.mouseClicked} />
                        </div>

                    </div>
                    <div style={{clear: 'right'}} className="form-line">
                        <ValidationMessage when={isBlocking} what="Please select a medicine"/>
                    </div>

                    <div className="form-line">
                        <div className="form-group">
                            <Link to={`/patients/edit/${this.props.patientId}`}><button>Cancel</button></Link>
                            <button type="submit">Next</button>
                        </div>
                    </div>
                </div>
            </form>
        
        </div>);
        return result;
    }
}

PrescriptionAdd.propTypes = {
    mouseClicked: PropTypes.func,
    selectedMedicine: PropTypes.number,
    canMoveNextPage: PropTypes.func,
    patientId : PropTypes.string,
    history : PropTypes.object,
    activePage: PropTypes.number,
    pageChanged: PropTypes.func,
    filter:      PropTypes.string,
    filterChanged: PropTypes.func,
}
