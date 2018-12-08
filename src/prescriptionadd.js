import React from 'react'
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import ValidationMessage from './validationmessage.js'
import Medicine from './medicine.js'


export default class PrescriptionAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
          formData: { "filter": "" },
          showWarning: false,
          meds: [],
          loaded: false,
          activePage: 1,
          numItemsOnPage: 5,
          totalItemsCount: 0,
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.createLoadURL = this.createLoadURL.bind(this);
        this.urlPrefix = '/firstcup/rest/hospital/medicines/';
        this.loadTable = this.loadTable.bind(this);
        this.totalMedsURL = this.totalMedsURL.bind(this)
        this.pageChange  = this.pageChange.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);
    }

    onSubmit(event) {

        if (this.props.canMoveNextPage()) {
            console.log("Can move to the next page!");
            this.setState({showWarning: false});
            console.log("History is a " + typeof(this.props.history));
            this.props.history.push('setStartDate')
        }
        else {
            this.setState({showWarning: true});
        }
        event.preventDefault();
        event.target.reset();//??????????? why...
    }

    totalMedsURL () {
        const filter =  this.state.formData["filter"];
        return this.urlPrefix + `/total?filter=${filter}`;
    }

    createLoadURL(aActivePage) {
        let numItemsOnPage = this.state.numItemsOnPage

        let start = (aActivePage - 1) * numItemsOnPage
        const filter =  this.state.formData["filter"];

        let result = this.urlPrefix + `?start=${start}&max=${numItemsOnPage}&filter=${filter}`;

        return result
    }

    componentDidMount () {
        this.loadTable(this.state.activePage)
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
            activePage: aActivePage,
            totalItemsCount: total },
          () => {console.log("finally loaded " + medsArray.length);})
        }
        )
        .catch(() => {
          alert('There were errors')
        })

    }

    handleFilterChange(event) {
        this.handleFormChange(event);
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

    render () {
        const meds = this.state.meds;

        const isBlocking = this.state.showWarning;

        let result = (<div>
            
            <h1>Prescription Medicine</h1>
            <form onSubmit={this.onSubmit}>


                <div className="col-md-6">
                    <div className="form-line">
                        <Medicine meds={meds} 
                                  selectedMedicine={this.props.selectedMedicine} 
                                  mouseClicked={this.props.mouseClicked} />

                        <div style={{display:'inline'}}>

                            <Pagination activePage={this.state.activePage}
                              itemsCountPerPage={this.state.numItemsOnPage}
                              totalItemsCount={this.state.totalItemsCount}
                              pageRangeDisplayed={5}
                              onChange={this.pageChange} 
                              innerClass="pagination pages" />

                            <div style={{float:'right'}}>
                                <label htmlFor="filter">Filter:</label>
                                <input type="text" style={{display: 'inline'}} 
                                          name="filter" value={this.state.formData.filter}
                                                    placeholder="filter by name" onChange={this.handleFilterChange} />
                            </div>
                        </div>
                    </div>
                    <div style={{clear: 'right'}} className="form-line">
                        <ValidationMessage when={isBlocking} what="Please select a medicine"/>
                    </div>

                    <div className="form-line">
                        <div className="form-group">
                            <Link to={`/patients/edit/${this.props.patientId}`}><button>Cancel</button></Link>
                            <input type="submit" value="Next"></input>
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
}
