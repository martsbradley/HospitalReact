import React from 'react'

export function ImageTable(props) {
    const images = props.list


    let detail = images.map(
        p => <tr key={`id${p.id}`}>
                <td><img width="400" height="400" src={p}/></td>
             </tr>);

    const table = (
        <table className='table table-bordered'>
            <thead className='thead-dark'>
            <tr key="{0}">
                <th scope="col">Image</th>
            </tr>
            </thead>
            <tbody>{detail}</tbody>
        </table>);
    return table
}
