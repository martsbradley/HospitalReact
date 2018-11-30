import React from 'react'
import PropTypes from 'prop-types';
import BackButton from './backbutton.js'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'

class Medicine extends React.Component {
    constructor(props) {
        super(props);
        this.myClick = this.myClick.bind(this);
        this.state = {selectedRow : -1}
    }

    myClick(medicineId){
        if (medicineId === this.state.selectedRow) {
            medicineId = -1;
        }
        this.setState({ selectedRow: medicineId});
        console.log("selected " + medicineId);
    }

    render()  {
        let detail = <tr></tr>
        console.log("Rendered table again");

        const meds = this.props.meds;
        if (meds) {

            detail = meds.map(p =>
              <tr className={this.state.selectedRow === p.id? "selected": ""}
                   onClick={() => this.myClick(p.id)} key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.manufacturer}</td>
              </tr>)
        }

        const table = (<table className='table table-border selectabletable'>
          <thead className=''>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Manufacturer</th>
            </tr>
          </thead>
          <tbody>{detail}</tbody></table>)
        return table
    }
}

Medicine.propTypes = {
    meds : PropTypes.array,
}

export default class PrescriptionAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
          formData: { "filter": "" },
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
    }

    totalMedsURL () {
        const filter =  this.state.formData["filter"];
        return this.urlPrefix + `/total?filter=${filter}`;
    }

    createLoadURL(aActivePage) {
        let numItemsOnPage = this.state.numItemsOnPage

        let start = (aActivePage - 1) * numItemsOnPage
        console.log("Starting at " + start);
        const filter =  this.state.formData["filter"];

        let result = this.urlPrefix + `?start=${start}&max=${numItemsOnPage}&filter=${filter}`;
        console.log("result is " + result);

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
          console.log("JavaScript total is " + total);

      
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
        console.log("rendering " + this.state.meds.length);
        const meds = this.state.meds;
        let result = (<div>
            
            <h1>Prescription Medicine</h1>
            <form onSubmit={this.next}>

                <div className="col-md-6">
                    <div className="form-inline">
                        <label htmlFor="filter">Filter:</label>
                        <input type="text" className="form-control" name="filter" value={this.state.formData.filter}
                               onChange={this.handleFilterChange} />
                    </div>
                    <div className="form-line">
                        <Medicine meds={meds}/>
                         <Pagination activePage={this.state.activePage}
                           itemsCountPerPage={this.state.numItemsOnPage}
                           totalItemsCount={this.state.totalItemsCount}
                           pageRangeDisplayed={5}
                           onChange={this.pageChange} />
                    </div>
                    <div className="form-line">
                        <div className="form-group">
                            <BackButton {...this.props}/>
                            <Link to={`${this.props.match.url}/setStartDate`}><button>Next</button></Link>
                        </div>
                    </div>
                </div>
            </form>
        
        </div>);
        return result;
    }
}

PrescriptionAdd.propTypes = {
    message : PropTypes.object,
}
