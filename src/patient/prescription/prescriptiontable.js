import React from 'react'

export function PrescriptionTable(props) {
    const prescriptions = props.list

    let detail = <tr></tr>

    if (prescriptions) {
        detail = prescriptions.map(p =>
            <tr key={p.prescriptionId}>
            <td className="d-none d-sm-table-cell">{p.prescriptionId}</td>
            <td>{p.medicine.name}</td>
            <td className="d-none d-md-table-cell">{p.medicine.manufacturer}</td>
            <td className="d-none d-sm-table-cell">{p.amount}</td>
            <td><i className="far fa-trash-alt fa-2x"></i></td>
            </tr>)
    }

    const table = (<table className='table table-bordered'>
        <thead className='thead-dark'>
        <tr>
        <th scope="col" className="d-none d-sm-table-cell">Id</th>
        <th scope="col">Name</th>
        <th scope="col" className="d-none d-md-table-cell">Manufacturer</th>
        <th scope="col" className="d-none d-sm-table-cell">Amount</th>
        <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>{detail}</tbody></table>)
    return table
}
