import React from 'react'
//import {Link} from 'react-router-dom'

export function PrescriptionTable(props) {
    const prescriptions = props.list;
    const patientId = props.patientId;

    let detail = <tr></tr>
    const myfn = (id) => {
        console.log(`myfn ${id} ${patientId}`);
        props.loadPrescription(id);
    }

    if (prescriptions) {
        detail = prescriptions.map(p =>
    
            <tr key={p.prescriptionId}>
            <td className="d-none d-sm-table-cell">{p.prescriptionId}</td>
            <td>{p.medicine.name}</td>
            <td className="d-none d-md-table-cell">{p.startDate}</td>
            <td className="d-none d-sm-table-cell">{p.amount}</td>
            <td><a href="#" onClick={() => {myfn(p.prescriptionId);}}><i className="far fa-trash-alt fa-2x"></i></a></td>
            </tr>)
    }

    const table = (<table className='table table-bordered'>
        <thead className='thead-dark'>
        <tr>
        <th scope="col" className="d-none d-sm-table-cell">Id</th>
        <th scope="col">Name</th>
        <th scope="col" className="d-none d-md-table-cell">Start Date</th>
        <th scope="col" className="d-none d-sm-table-cell">Amount</th>
        <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>{detail}</tbody></table>)
    return table
}
