import React from 'react'

export function ImageTable(props) {
    const images = props.list

    let detail = <tr></tr>

    detail = images.map(
        p => <tr key={p.id}>
                <td><img width="400" height="400" src={p}/></td>
             </tr>);

    const table = (
        <table className='table table-bordered'>
            <thead className='thead-dark'>
            <tr key="{1}">
                <th scope="col">Image</th>
            </tr>
            </thead>
            <tbody>{detail}</tbody>
        </table>);
    return table
}
