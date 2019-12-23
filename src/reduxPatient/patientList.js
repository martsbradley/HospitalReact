import React, {useEffect} from 'react'
import Pagination from 'react-js-pagination'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function PatientRow (props) {
  let pat = props.pat;
  let id  = pat.id;
  pat.dob = new Date(pat.dob).toISOString().split('T')[0];

  let editIcon = <i className="fas fa-user-edit fa-2x"></i>;
  return (<tr>
    <td className="d-none d-sm-table-cell">{pat.id}</td>
    <td>{pat.forename}</td>
    <td className="d-none d-sm-table-cell">{pat.surname}</td>
    <td className="d-none d-md-table-cell">{pat.dob}</td>
    <td><Link to={`/patients/edit/${id}`}>{editIcon}</Link></td>
  </tr>)
}


PatientRow.propTypes = {
    pat : PropTypes.object
}

export default function patientList({patients, activePage,itemsPerPage, totalItemsCount, loadPatients, changePage, ...props}) {


    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked times ${activePage} and ${itemsPerPage}`;
        loadPatients(activePage,itemsPerPage);
    },[activePage]);

    const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>)

    return <>
        <h1>Patients</h1>
        <h2>Active page is {activePage} </h2>
        <div className="tablehead">
            <div className="myleft">
                <Link to="/patients/new/"><i className="fa fa-plus-square fa-3x"></i></Link>
            </div>
            <div className="float-right">
                <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                            activePage={activePage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={15}
                            onChange={changePage} >
                </Pagination>
            </div>
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
    </>
}
