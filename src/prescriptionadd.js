import React from 'react'
import PropTypes from 'prop-types';
import BackButton from './backbutton.js'
import Pagination from 'react-js-pagination'

function Medicine (props) {
  const meds = props.list

  let detail = <tr></tr>

  if (meds) {
    detail = meds.map(p =>
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.name}</td>
        <td>{p.manufacturer}</td>
      </tr>)
  }

  const table = (<table className='table table-bordered'>
    <thead className='thead-dark'>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Manufacturer</th>
      </tr>
    </thead>
    <tbody>{detail}</tbody></table>)
  return table
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
      return this.urlPrefix + '/total'
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
            totalItemsCount: total })
        }
        )
        .catch(() => {
          alert('There were errors')
        })

    }

    handleFilterChange(event) {
        this.handleFormChange(event);
        this.loadTable(this.state.activePage)
    }
    handleFormChange (event) {
      let formData = this.state.formData
      formData[event.target.name] = event.target.value
      this.setState({ formData })
    }



    render () {
        const meds = this.state.meds;
        let result = (<div>
            
            <h1>Prescription Medicine</h1>
            <form onSubmit={this.next}>

                <div className="col-md-6">
                    <div className="form-inline">
                        <label htmlFor="filter">Filter:</label>
                        <input type="text" className="form-control" name="filter" value={this.state.formData.filter}
                               onChange={this.handleFilterChange} />
                        <BackButton {...this.props}/>
                    </div>
                    <div className="form-line">
                        <Medicine list={meds}/>
                         <Pagination activePage={this.state.activePage}
                           itemsCountPerPage={this.state.numItemsOnPage}
                           totalItemsCount={this.state.totalItemsCount}
                           pageRangeDisplayed={5}
                           onChange={this.pageChange} />
                    </div>
                    <div className="form-line">
                        <div className="form-group">
                            <BackButton {...this.props}/>
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
