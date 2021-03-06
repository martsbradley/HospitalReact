import React, {useEffect} from 'react'
import Pagination from 'react-js-pagination'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function PatientRow (props) {
  let pat = props.pat;
  let id  = pat.id;
  //pat.dob = new Date(pat.dob).toISOString().split('T')[0];

  let editIcon = <i className="fas fa-user-edit fa-2x"></i>;
  return (<tr>
    <td style={{width: '5%'}} className="d-none d-sm-table-cell">{pat.id}</td>
    <td style={{width: '20%'}} >{pat.forename}</td>
    <td style={{width: '20%'}} className="d-none d-sm-table-cell">{pat.surname}</td>
    <td style={{width: '10%'}} className="d-none d-md-table-cell"><Link to={`/patient/${id}`}>{pat.dateOfBirth}</Link></td>
    <td style={{width: '5%'}} ><Link to={`/patient/${id}`}>{editIcon}</Link></td>
    </tr>);
}

PatientRow.propTypes = {
    pat : PropTypes.object
}

export default function patientList({patients,
                                     activePage,
                                     itemsPerPage,
                                     totalItemsCount,
                                     loadPatients,
                                     changePage}) {
    useEffect(() => {
        // Update the document title using the browser API
        loadPatients(activePage,itemsPerPage);
    },[activePage]);

    const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>)

    return <>
        <div className="tablehead col-md-6">
        <h1>Patients</h1>
            <div className="myleft">
                <Link to="/patient/new/"><i className="fa fa-plus-square fa-3x"></i></Link>
            </div>
            <div className="float-right">
                <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                            activePage={activePage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={changePage} >
                </Pagination>
            </div>

        <table className='table table-bordered'>
                   <thead className='thead-dark'>
            <tr>
              <th scope="col" className="d-none d-sm-table-cell">Id</th>
              <th scope="col">First</th>
              <th scope="col" className="d-none d-sm-table-cell">Last</th>
              <th scope="col" className="d-none d-md-table-cell">DOB</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        </div>
    </>
}
patientList.propTypes = {
    patients:  PropTypes.array,
    activePage      : PropTypes.number,
    itemsPerPage    : PropTypes.number,
    totalItemsCount : PropTypes.number,
    loadPatients    : PropTypes.func,
    changePage      : PropTypes.func
}
