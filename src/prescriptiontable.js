import React from 'react'

export function PrescriptionTable(props) {
    const prescriptions = props.list

    let detail = <tr></tr>

    if (prescriptions) {
        detail = prescriptions.map(p =>
            <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.medicine.name}</td>
            <td>{p.medicine.manufacturer}</td>
            <td>{p.amount}</td>
            <td><i className="far fa-trash-alt fa-2x"></i></td>
            </tr>)
    }

    const table = (<table className='table table-bordered'>
        <thead className='thead-dark'>
        <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Manufacturer</th>
        <th scope="col">Amount</th>
        <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>{detail}</tbody></table>)
    return table
}
